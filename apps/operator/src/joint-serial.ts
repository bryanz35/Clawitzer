import {
  CALIBRATION_MAX_LINE,
  CALIBRATION_REFERENCE_ACK,
  CAMERA_MAX_DEG,
  CAMERA_MIN_DEG,
  SERIAL_BAUD,
  calibrationReplyMatches,
  encodeCalibration,
  encodeCameraCommand,
  encodeJoints,
  nextSeq,
  parseCalibrationReply,
  parseCameraStatus,
  parseStatus,
  seqIsNewer,
  type CalibrationCommand,
  type CalibrationReply,
  type JointDeg,
  type StatusMsg,
} from "@arm-mirror/protocol";

export type CalibrationStatus = Extract<CalibrationReply, { ok: true; kind: "status" }>;
export interface JointSerialState {
  connection: "disconnected" | "connecting" | "connected";
  status: StatusMsg | null;
  calibration: CalibrationStatus | null;
  /** Latest V frame; independent of arm calibration and reference. */
  camera: { seq: number; deg: number; active: boolean; lastAt: number } | null;
  lastStatusAt: number;
  error: string | null;
  portLabel: string;
}

// Web Serial is not included in the app's DOM typings. Keep its small used surface local.
interface UsbSerialPort {
  readonly readable: ReadableStream<Uint8Array> | null;
  readonly writable: WritableStream<Uint8Array> | null;
  open(options: { baudRate: number; bufferSize: number; flowControl: "none" }): Promise<void>;
  close(): Promise<void>;
  getInfo(): { usbVendorId?: number; usbProductId?: number };
}
interface UsbSerial {
  requestPort(): Promise<UsbSerialPort>;
}
type GoodReply = Extract<CalibrationReply, { ok: true }>;
interface PendingCommand {
  seq: number;
  command: CalibrationCommand;
  resolve(reply: GoodReply): void;
  reject(error: Error): void;
}

const STATUS_FRESH_MS = 200;
const POLL_MS = 500;
const RESPONSE_MS = 750;
const errorOf = (error: unknown): Error => error instanceof Error ? error : new Error(String(error));

/** Direct normal-mode control. There are no automatic J keepalives, retries or references. */
export class JointSerial {
  readonly state: JointSerialState = {
    connection: "disconnected", status: null, calibration: null, camera: null,
    lastStatusAt: 0, error: null, portLabel: "",
  };
  onChange: (() => void) | null = null;

  private port: UsbSerialPort | null = null;
  private reader: ReadableStreamDefaultReader<Uint8Array> | null = null;
  private writer: WritableStreamDefaultWriter<Uint8Array> | null = null;
  private reading: Promise<void> | null = null;
  private closing: Promise<void> | null = null;
  private polling: number | undefined;
  private pending: PendingCommand | null = null;
  private commands: Promise<unknown> = Promise.resolve();
  private activeWrite: Promise<void> | null = null;
  private commandWriting = false;
  private acting = 0;
  private epoch = 0;
  private calibrationSequence: number | null = null;
  private confirmedCalibrationSequence: number | null = null;
  private jointSequence: number | null = null;
  private observedJointSequence: number | null = null;
  private cameraSequence: number | null = null;
  private calibrationAt = 0;
  private readonly encoder = new TextEncoder();

  private get serial(): UsbSerial | undefined {
    if (typeof navigator === "undefined") return undefined;
    return (navigator as Navigator & { serial?: UsbSerial }).serial;
  }

  get supported(): boolean {
    return globalThis.isSecureContext === true && this.serial !== undefined;
  }

  get ready(): boolean {
    const { status, calibration } = this.state;
    const now = performance.now();
    return this.state.connection === "connected" && !this.acting &&
      status !== null && now - this.state.lastStatusAt <= STATUS_FRESH_MS &&
      calibration !== null && now - this.calibrationAt <= POLL_MS + RESPONSE_MS &&
      calibration.mode === "normal" && calibration.configured && calibration.referenced &&
      calibration.fault === "none" &&
      (status.state === "IDLE" || status.state === "ACTIVE" || status.state === "WATCHDOG");
  }

  async connect(): Promise<void> {
    if (this.closing) await this.closing;
    if (this.state.connection !== "disconnected") return;
    if (!this.supported) throw new Error("Web Serial requires desktop Chrome or Edge on localhost or a secure origin.");
    const epoch = ++this.epoch;
    this.resetSession();
    this.state.connection = "connecting";
    this.state.error = null;
    this.emit();
    let selected: UsbSerialPort | null = null;
    let opened = false;
    try {
      selected = await this.serial!.requestPort();
      if (epoch !== this.epoch) return;
      await selected.open({ baudRate: SERIAL_BAUD, bufferSize: 4096, flowControl: "none" });
      opened = true;
      if (epoch !== this.epoch) { await selected.close(); return; }
      if (!selected.readable || !selected.writable) throw new Error("The selected port has no readable/writable serial streams.");
      this.port = selected;
      this.reader = selected.readable.getReader();
      this.writer = selected.writable.getWriter();
      const info = selected.getInfo();
      const hex = (value: number | undefined) => value === undefined ? "????" : value.toString(16).padStart(4, "0");
      this.state.portLabel = `USB ${hex(info.usbVendorId)}:${hex(info.usbProductId)}`;
      this.state.connection = "connected";
      this.reading = this.readLoop(this.reader, epoch);
      this.emit();
      // Opening USB may reset the board. Only read-only status is retried during boot.
      await this.poll(epoch);
      if (epoch === this.epoch && this.state.connection === "connected") {
        this.polling = window.setInterval(() => { void this.poll(epoch); }, POLL_MS);
      }
    } catch (error) {
      if (epoch !== this.epoch) return;
      this.state.error = errorOf(error).message;
      if (this.port) await this.disconnect();
      else {
        if (opened && selected) await selected.close().catch(() => undefined);
        this.state.connection = "disconnected";
        this.emit();
      }
      throw error;
    }
  }

  /** Closing USB leaves firmware to hold via its watchdog; it does not issue halt/disarm. */
  disconnect(): Promise<void> {
    if (this.closing) return this.closing;
    ++this.epoch;
    window.clearInterval(this.polling);
    this.polling = undefined;
    this.pending?.reject(new Error("Serial session disconnected."));
    this.pending = null;
    const reader = this.reader;
    const writer = this.writer;
    const port = this.port;
    const reading = this.reading;
    this.reader = null;
    this.writer = null;
    this.port = null;
    this.reading = null;
    this.state.connection = "disconnected";
    this.resetSession();
    this.emit();
    this.closing = (async () => {
      // Abort queued bytes rather than flushing delayed joint commands on shutdown.
      const stopped = await Promise.allSettled([reader?.cancel(), writer?.abort()]);
      await reading;
      writer?.releaseLock();
      if (port) await port.close();
      const failure = stopped.find((result) => result.status === "rejected");
      if (failure?.status === "rejected") throw failure.reason;
    })().catch((error: unknown) => {
      this.state.error = errorOf(error).message;
      this.emit();
    }).finally(() => { this.closing = null; });
    return this.closing;
  }

  /** Caller must first obtain explicit confirmation that ALL axes match their home marks. */
  reference(): Promise<void> {
    return this.action(async (epoch) => {
      const calibration = await this.statusRequest(epoch);
      if (calibration.mode !== "normal" || !calibration.configured) {
        throw new Error("Saved valid calibration and normal mode are required before reference. Exit bench explicitly first.");
      }
      if (calibration.referenced) throw new Error("Already referenced. Disable outputs explicitly before making a new reference.");
      this.clearStatus();
      this.state.calibration = null;
      this.emit();
      await this.request({ verb: "reference", acknowledgement: CALIBRATION_REFERENCE_ACK }, epoch);
      // Do not enable motion using an S frame buffered before the reference acknowledgement.
      this.clearStatus();
      await this.statusRequest(epoch);
    });
  }

  /** Caller must explicitly confirm discarding any unsaved bench calibration draft. */
  exitBench(): Promise<void> {
    return this.action(async (epoch) => {
      const calibration = await this.statusRequest(epoch);
      if (calibration.mode !== "calibration") throw new Error("The firmware is not in bench mode.");
      this.clearStatus();
      await this.request({ verb: "disarm" }, epoch);
      await this.request({ verb: "exit" }, epoch);
      await this.statusRequest(epoch);
    });
  }

  /** Explicit software output disable: unlike hold, this may drop a supported load. */
  halt(): Promise<void> {
    return this.action(async (epoch) => {
      await this.statusRequest(epoch);
      this.clearStatus();
      this.state.calibration = null;
      this.emit();
      await this.request({ verb: "halt" }, epoch);
      await this.statusRequest(epoch);
    }, true);
  }

  /** One write in flight, never a queued J. Caller owns hold-to-run authorization. */
  async sendJoints(deg: JointDeg): Promise<boolean> {
    if (!this.ready || this.commandWriting || this.activeWrite || !this.writer || this.jointSequence === null) return false;
    const epoch = this.epoch;
    const seq = nextSeq(this.jointSequence);
    const bytes = this.encoder.encode(encodeJoints(seq, deg));
    this.jointSequence = seq; // Consume before writing, including uncertain writes.
    const write = this.writer.write(bytes);
    this.activeWrite = write;
    try {
      await write;
      return epoch === this.epoch;
    } catch (error) {
      this.fail(error, epoch);
      return false;
    } finally {
      if (this.activeWrite === write) this.activeWrite = null;
    }
  }

  /**
   * One independent camera-servo target. Unlike sendJoints, this deliberately does not
   * require arm calibration/reference; the firmware still enforces range and e-stop.
   */
  async sendCamera(deg: number): Promise<boolean> {
    if (this.state.connection !== "connected" || !this.writer ||
        this.commandWriting || this.activeWrite ||
        !Number.isFinite(deg) || deg < CAMERA_MIN_DEG || deg > CAMERA_MAX_DEG) return false;
    if (this.state.status?.state === "ESTOP" || this.state.calibration?.fault === "estop") return false;
    const epoch = this.epoch;
    const seq = nextSeq(this.cameraSequence ?? 0);
    const bytes = this.encoder.encode(encodeCameraCommand(seq, deg));
    this.cameraSequence = seq; // Consume before writing; uncertainty is never retried.
    const write = this.writer.write(bytes);
    this.activeWrite = write;
    try {
      await write;
      return epoch === this.epoch;
    } catch (error) {
      this.fail(error, epoch);
      return false;
    } finally {
      if (this.activeWrite === write) this.activeWrite = null;
    }
  }

  private emit(): void { this.onChange?.(); }

  private clearStatus(): void {
    this.state.status = null;
    this.state.lastStatusAt = 0;
  }

  private resetSession(): void {
    this.clearStatus();
    this.state.calibration = null;
    this.state.portLabel = "";
    this.calibrationAt = 0;
    this.calibrationSequence = null;
    this.confirmedCalibrationSequence = null;
    this.jointSequence = null;
    this.observedJointSequence = null;
    this.cameraSequence = null;
    this.state.camera = null;
    this.acting = 0;
    this.commandWriting = false;
    this.activeWrite = null;
    this.commands = Promise.resolve();
  }

  private fail(error: unknown, epoch: number): void {
    if (epoch !== this.epoch) return;
    this.state.error = errorOf(error).message;
    void this.disconnect();
  }

  private async readLoop(reader: ReadableStreamDefaultReader<Uint8Array>, epoch: number): Promise<void> {
    let line = "";
    let dropping = false;
    try {
      while (epoch === this.epoch) {
        const { value, done } = await reader.read();
        if (done) {
          if (epoch === this.epoch) this.fail(new Error("USB serial disconnected."), epoch);
          return;
        }
        if (!value) continue;
        for (const byte of value) {
          if (byte === 10) {
            if (!dropping && line) this.receive(line, epoch);
            line = "";
            dropping = false;
          } else if (!dropping) {
            if (line.length >= CALIBRATION_MAX_LINE || (byte !== 13 && (byte < 32 || byte > 126))) {
              line = "";
              dropping = true;
            } else line += String.fromCharCode(byte);
          }
        }
      }
    } catch (error) {
      this.fail(error, epoch);
    } finally {
      reader.releaseLock();
    }
  }

  private receive(line: string, epoch: number): void {
    if (epoch !== this.epoch) return;
    const reply = parseCalibrationReply(line);
    if (reply) {
      const pending = this.pending;
      if (!pending || reply.seq !== pending.seq) return;
      if (!reply.ok) pending.reject(new Error(`Firmware rejected ${pending.command.verb}: ${reply.fields.join(",")}`));
      else if (!calibrationReplyMatches(pending.command, reply)) pending.reject(new Error(`Unexpected firmware reply to ${pending.command.verb}.`));
      else pending.resolve(reply);
      return;
    }
    const camera = parseCameraStatus(line);
    if (camera) {
      // Only forward: V (incl. the 1 Hz heartbeat) lags our own P sends; a reset MCU accepts any seq.
      if (this.cameraSequence === null || seqIsNewer(camera.seq, this.cameraSequence)) this.cameraSequence = camera.seq;
      this.state.camera = { ...camera, lastAt: performance.now() };
      this.emit();
      return;
    }
    const status = parseStatus(line);
    if (!status) return; // Includes SDK boot/debug output and bad-CRC/partial frames.
    const previous = this.observedJointSequence;
    if ((status.state === "ESTOP" && this.state.calibration?.referenced) || (previous !== null && seqIsNewer(previous, status.seq))) {
      // A reset/fault cannot inherit an earlier ready calibration snapshot.
      this.state.calibration = null;
    }
    this.observedJointSequence = status.seq;
    this.advanceJointSequence(status.seq);
    this.state.status = status;
    this.state.lastStatusAt = performance.now();
    this.emit();
  }

  private advanceJointSequence(seq: number): void {
    if (this.jointSequence === null || seqIsNewer(seq, this.jointSequence)) this.jointSequence = seq;
  }

  private acceptCalibration(status: CalibrationStatus): void {
    const previous = this.confirmedCalibrationSequence;
    const reset = previous !== null && (!status.haveseq || seqIsNewer(previous, status.lastseq));
    if (reset) {
      this.calibrationSequence = status.haveseq ? status.lastseq : null;
      this.jointSequence = status.lastjointseq;
      this.observedJointSequence = null;
      this.clearStatus();
    } else {
      if (status.haveseq && (this.calibrationSequence === null || seqIsNewer(status.lastseq, this.calibrationSequence))) {
        this.calibrationSequence = status.lastseq;
      }
      this.advanceJointSequence(status.lastjointseq);
    }
    this.confirmedCalibrationSequence = status.haveseq ? status.lastseq : null;
    this.state.calibration = status;
    this.calibrationAt = performance.now();
    this.state.error = null;
    this.emit();
  }

  private async poll(epoch: number): Promise<void> {
    if (epoch !== this.epoch || this.state.connection !== "connected" || this.acting || this.pending || this.commandWriting) return;
    try {
      await this.statusRequest(epoch);
    } catch (error) {
      if (epoch !== this.epoch) return;
      this.state.calibration = null;
      this.state.error = errorOf(error).message;
      this.emit();
    }
  }

  private async statusRequest(epoch: number): Promise<CalibrationStatus> {
    const reply = await this.request({ verb: "status" }, epoch);
    if (epoch !== this.epoch) throw new Error("Serial session changed during status sync.");
    if (reply.kind !== "status") throw new Error("Missing calibration status.");
    this.acceptCalibration(reply);
    return reply;
  }

  private async action(run: (epoch: number) => Promise<void>, interrupt = false): Promise<void> {
    if (this.state.connection !== "connected") throw new Error("Connect to the arm first.");
    if (this.acting && !interrupt) throw new Error("Another firmware action is still in progress.");
    const epoch = this.epoch;
    this.acting++;
    this.state.error = null;
    this.emit();
    try {
      await run(epoch);
    } catch (error) {
      if (epoch === this.epoch) {
        this.state.calibration = null;
        this.state.error = errorOf(error).message;
      }
      throw error;
    } finally {
      if (epoch === this.epoch) { this.acting--; this.emit(); }
    }
  }

  private request(command: CalibrationCommand, epoch: number): Promise<GoodReply> {
    const run = async (): Promise<GoodReply> => {
      if (epoch !== this.epoch || this.state.connection !== "connected" || !this.writer) throw new Error("Serial session is not connected.");
      const seq = command.verb === "status" ? 0 : this.calibrationSequence === null ? 0 : nextSeq(this.calibrationSequence);
      const bytes = this.encoder.encode(encodeCalibration(seq, command));
      if (command.verb !== "status") this.calibrationSequence = seq;
      let timer: number | undefined;
      let writeComplete = false;
      const writer = this.writer;
      this.commandWriting = true;
      try {
        return await new Promise<GoodReply>((resolve, reject) => {
          this.pending = { seq, command, resolve, reject };
          timer = window.setTimeout(() => {
            const error = new Error(`No firmware reply to ${command.verb} within ${RESPONSE_MS} ms; command was not retried.`);
            reject(error);
            // An uncertain movement or stuck write must never execute later in this session.
            if (command.verb !== "status" || !writeComplete) this.fail(error, epoch);
          }, RESPONSE_MS);
          const preceding = this.activeWrite;
          const write = (async () => {
            if (preceding) await preceding;
            if (epoch !== this.epoch) throw new Error("Serial session disconnected before command write.");
            await writer.write(bytes);
            writeComplete = true;
          })();
          this.activeWrite = write;
          void write.catch((error: unknown) => {
            reject(errorOf(error));
            this.fail(error, epoch);
          }).finally(() => { if (this.activeWrite === write) this.activeWrite = null; });
        });
      } finally {
        window.clearTimeout(timer);
        if (epoch === this.epoch) { this.pending = null; this.commandWriting = false; }
      }
    };
    const result = this.commands.then(run);
    this.commands = result.catch(() => undefined);
    return result;
  }
}
