// Guarded bench calibration. No J commands, automated servo sweeps, or movement retries.
import { readFileSync } from "node:fs";
import { createInterface, type Interface } from "node:readline/promises";
import process from "node:process";
import { setTimeout as delay } from "node:timers/promises";
import { ReadlineParser, SerialPort } from "serialport";
import { DEG, loadArm } from "@arm-mirror/kinematics";
import {
  CALIBRATION_ENTER_ACK, CALIBRATION_REFERENCE_ACK, CALIBRATION_KEY_ARITY,
  CALIBRATION_FULL_STEP_RATE,
  calibrationReplyMatches, crc8, encodeCalibration, nextSeq, parseCalibration,
  parseCalibrationReply, parseStatus, SERIAL_BAUD,
  type CalibrationCommand, type CalibrationKey, type CalibrationMutableKey, type CalibrationReply, type StatusMsg,
} from "@arm-mirror/protocol";
import { fitServo, fitStepper, fitWrist, type AngleSample, type WristSample } from "./calibration-fit";

type GoodReply = Extract<CalibrationReply, { ok: true }>;
type Sample = Extract<GoodReply, { kind: "sample" }>;
class FirmwareError extends Error {}
/** Rejected before any bytes were sent: no actuator state changed. */
class InputError extends Error {}

/** Exactly one outstanding C transaction, including heartbeat. Never retries a movement. */
class CalibrationLink {
  private sequence = 0;
  private queue: Promise<unknown> = Promise.resolve();
  private pending: { seq: number; command: CalibrationCommand; resolve: (r: GoodReply) => void; reject: (e: Error) => void } | undefined;
  private heartbeat: NodeJS.Timeout;
  private keeping = false;
  private lease = false;
  private benchConsent = false;
  private closed = false;
  private failed = false;
  private lastArmState: StatusMsg["state"] | undefined;
  onFatal: ((e: Error) => void) | undefined;

  constructor(readonly port: SerialPort) {
    const lines = port.pipe(new ReadlineParser({ delimiter: "\n" }));
    lines.on("data", (line: string) => {
      if (line.startsWith("#")) { console.log(`[MCU] ${line.trim()}`); return; }
      const reply = parseCalibrationReply(line);
      if (reply) {
        const pending = this.pending;
        if (!pending || reply.seq !== pending.seq) { console.error(`ignored unmatched K sequence ${reply.seq}`); return; }
        if (!reply.ok) pending.reject(new FirmwareError(reply.fields.join(",")));
        else if (calibrationReplyMatches(pending.command, reply)) pending.resolve(reply);
        else pending.reject(new Error(`unexpected K response for ${pending.command.verb}`));
        return;
      }
      const status = parseStatus(line);
      if (status) {
        const changed = status.state !== this.lastArmState;
        this.lastArmState = status.state;
        if (changed && (status.state === "ESTOP" || status.state === "WATCHDOG")) {
          console.error(`[arm] ${status.state}, joint sequence ${status.seq}`);
        }
        return;
      }
      console.error(`ignored malformed serial line ${JSON.stringify(line)}`);
    });
    port.on("error", (e) => this.abort(e));
    port.on("close", () => { if (!this.closed) this.abort(new Error("serial port disconnected")); });
    this.heartbeat = setInterval(() => {
      if (!this.lease || this.keeping || this.failed || this.closed) return;
      this.keeping = true;
      void this.request({ verb: "keep" }).catch((e: unknown) => this.abort(e instanceof Error ? e : new Error(String(e))))
        .finally(() => { this.keeping = false; });
    }, 50);
  }

  abort(error: Error): void {
    this.lease = false;
    this.failed = true;
    this.pending?.reject(error);
    this.onFatal?.(error);
  }

  request(command: CalibrationCommand, cleanup = false): Promise<GoodReply> {
    const run = async (): Promise<GoodReply> => {
      if (this.closed || (this.failed && !cleanup && command.verb !== "status")) throw new Error("serial session aborted; no more movement is allowed");
      if (["arm", "jog", "step", "pose"].includes(command.verb) && !this.benchConsent) throw new InputError("enter bench mode with explicit unloaded/e-stop consent in THIS session before any movement");
      const seq = command.verb === "status" ? 0 : this.sequence;
      const frame = encodeCalibration(seq, command);
      // Consume before writing: an uncertain ACK must never cause a duplicate movement.
      if (command.verb !== "status") this.sequence = nextSeq(seq);
      let timer: NodeJS.Timeout | undefined;
      try {
        const reply = await new Promise<GoodReply>((resolve, reject) => {
          this.pending = { seq, command, resolve, reject };
          timer = setTimeout(() => reject(new Error(`timeout for ${command.verb}; movement will NOT be retried`)), 750);
          this.port.write(frame, (e) => { if (e) reject(e); });
        });
        if (command.verb === "status" && reply.kind === "status") this.sequence = reply.haveseq ? nextSeq(reply.lastseq) : 0;
        if (command.verb === "enter") this.benchConsent = true;
        if (command.verb === "exit" || command.verb === "halt") this.benchConsent = false;
        if (command.verb === "apply" || command.verb === "arm") this.lease = true;
        if (["enter", "set", "disarm", "save", "exit", "halt"].includes(command.verb)) this.lease = false;
        return reply;
      } catch (e) {
        if (!(e instanceof FirmwareError) && (command.verb !== "status" || this.onFatal) && !cleanup) this.abort(e instanceof Error ? e : new Error(String(e)));
        throw e;
      } finally {
        clearTimeout(timer);
        this.pending = undefined;
      }
    };
    const result = this.queue.then(run);
    this.queue = result.catch(() => undefined);
    return result;
  }

  async close(cleanQuit: boolean): Promise<void> {
    this.lease = false;
    clearInterval(this.heartbeat);
    if (this.port.isOpen) {
      let preserveReference = cleanQuit && !this.failed;
      if (preserveReference) {
        try {
          const status = await this.request({ verb: "status" }, true);
          if (status.kind !== "status") throw new Error("missing shutdown status");
          if (status.mode === "calibration") {
            await this.request({ verb: "disarm" }, true);
            await this.request({ verb: "exit" }, true);
          }
          console.log("Clean close: normal-mode reference preserved if present. Reopening USB may reset DTR and require a NEW marked-home reference.");
        } catch (e) {
          preserveReference = false;
          console.error(`clean close failed: ${e instanceof Error ? e.message : e}`);
        }
      }
      if (!preserveReference) {
        // New-sequence safety commands only, never retries of preceding movement.
        for (const verb of ["disarm", "halt"] as const) {
          try { await this.request({ verb }, true); }
          catch (e) { console.error(`cleanup ${verb}: ${e instanceof Error ? e.message : e}`); }
        }
      }
    }
    this.closed = true;
    if (this.port.isOpen) await new Promise<void>((resolve) => this.port.close(() => resolve()));
  }
}

/** Same canonical parser as firmware-facing protocol; whitespace is just console convenience. */
function consoleCommand(text: string): CalibrationCommand {
  const fields = text.trim().split(/[\s,]+/).join(",");
  const payload = `,0,${fields}`;
  const parsed = parseCalibration(`C${payload}*${crc8(payload).toString(16).padStart(2, "0")}\n`);
  if (!parsed) {
    if (/^jog,/.test(fields)) {
      throw new InputError("jog usage: jog INDEX ±PULSE — one integer step up to 2000 µs, e.g. `jog 0 +100`");
    }
    throw new InputError("invalid command/arity; type help");
  }
  return parsed.command;
}

class Guide {
  private readonly model = loadArm(readFileSync(new URL("../../hardware/urdf/arm.urdf", import.meta.url), "utf8"));
  private readonly limits = this.model.limits.map((l) => ({ lo: l.lower * DEG, hi: l.upper * DEG }));
  constructor(private readonly link: CalibrationLink, private readonly terminal: Interface, private readonly signal: AbortSignal) {}

  private async ask(prompt: string): Promise<string> {
    if (this.signal.aborted) throw new Error("interrupted");
    return (await this.terminal.question(prompt, { signal: this.signal })).trim();
  }

  private async number(prompt: string, suggestion?: number, validate: (n: number) => boolean = Number.isFinite): Promise<number> {
    for (;;) {
      const text = await this.ask(`${prompt}${suggestion === undefined ? "" : ` [${suggestion}]`}: `);
      if (text === "abort") throw new Error("data entry aborted");
      const value = text === "" && suggestion !== undefined ? suggestion : text === "" ? NaN : Number(text);
      if (Number.isFinite(value) && validate(value)) return value;
      console.error("Invalid value. Enter a finite value in the stated range.");
    }
  }

  private async confirmation(prompt: string, exact: string): Promise<void> {
    if (await this.ask(`${prompt}\nType ${exact}: `) !== exact) throw new Error("confirmation not given; nothing enabled");
  }

  private async set(key: CalibrationMutableKey, values: readonly number[]): Promise<void> {
    await this.link.request(consoleCommand(`set,${key},${values.join(",")}`));
  }

  private async get(key: CalibrationKey, index?: number): Promise<number[]> {
    const command: CalibrationCommand = key === "pulse" ? { verb: "get", key, index: index ?? 0 } : { verb: "get", key };
    const reply = await this.link.request(command);
    if (reply.kind !== "get") throw new Error("missing configuration values");
    return reply.values;
  }

  private async sample(): Promise<Sample> {
    const reply = await this.link.request({ verb: "sample" });
    if (reply.kind !== "sample") throw new Error("missing actuator sample");
    return reply;
  }

  private async angle(joint: number, label: string): Promise<number> {
    const limit = this.limits[joint];
    return this.number(`${label}, measured logical ${this.model.names[joint]} angle in degrees (${limit.lo}..${limit.hi})`, undefined,
      (n) => n >= limit.lo && n <= limit.hi);
  }

  private async enter(): Promise<void> {
    await this.confirmation("Disconnect/unload all linkage, clear the work area and keep a physical servo-power e-stop within reach. Arming can JUMP servos to 1500us centers. The assumed 500–2500us PWM windows are NOT verified mechanical travel or learned angle mappings. Pins, e-stop and hard windows live in board_config.h; changes require reflashing. Enter starts a FRESH draft and discards unsaved changes; use arm wrist to retain the current draft.", CALIBRATION_ENTER_ACK);
    await this.link.request({ verb: "enter", acknowledgement: CALIBRATION_ENTER_ACK });
  }

  async reference(): Promise<void> {
    console.log("WARNING: AS5047P is on the MOTOR SHAFT. With reduction gearing it cannot determine absolute elbow position. Repeat marked-home reference after EVERY boot, power loss, e-stop or fault. Never infer elbow home from the raw encoder angle.");
    console.log(`Manually park ALL axes at generated home degrees: ${this.model.names.map((name, i) => `${name}=${this.model.restPose[i] * DEG}`).join(", ")}. Keep the work area clear; reference enables firmware safe homing.`);
    const status = await this.link.request({ verb: "status" });
    if (status.kind !== "status" || status.mode !== "normal") throw new Error("exit bench mode before reference (save first if needed)");
    await this.confirmation("Confirm all axes are physically at their marked generated homes and encoder/e-stop are healthy.", CALIBRATION_REFERENCE_ACK);
    console.log(await this.link.request({ verb: "reference", acknowledgement: CALIBRATION_REFERENCE_ACK }));
    console.log("Reference accepted. This tool never sends normal J motion. Normal control is a separate deliberate action.");
  }

  private async exportConstants(): Promise<void> {
    console.log("--- Calibration constants (enter bench mode before replaying mutable set lines) ---");
    for (const key of Object.keys(CALIBRATION_KEY_ARITY) as CalibrationKey[]) {
      for (const index of key === "pulse" ? [0, 1, 2, 3] : [undefined]) {
        const values = await this.get(key, index);
        if (key === "pins" || key === "estop" || key === "pulse") {
          console.log(`# get,${key}${index === undefined ? "" : `,${index}`} -> ${values.join(",")} (read-only board_config.h; reflash to change)`);
        } else console.log(`set,${key},${values.join(",")}`);
      }
    }
    console.log("--- arm prepares only the selected outputs; optional apply diagnoses full setup; save validates the FULL mapping/generated joint envelope and persists mutable values to NVS ---");
  }

  private async measureGripper(): Promise<void> {
    console.log("Jogging is explicit and stepwise — the +/- shortcuts default to 5us and accept an amount (e.g. grip+ 100); there is NO automatic sweep. Watch the actual mechanism and stop before binding. Confirm actual closed/open poses; software does not discover travel.");
    await this.confirmation("Arm only the gripper at its configured center with linkage unloaded?", "ARM");
    await this.link.request({ verb: "arm", actuator: "gripper" });
    const samples: AngleSample[] = [];
    for (let i = 0; i < 2;) {
      const label = i === 0 ? "closed" : "open";
      const deg = i === 0 ? this.limits[4].lo : this.limits[4].hi;
      const text = await this.ask(`Physically ${label.toUpperCase()} = generated j5 ${deg}deg: + / - (5us), ${label} to confirm actual measured pose, or abort: `);
      if (text === "abort") throw new Error("gripper measurement aborted");
      if (text === label) {
        samples.push({ deg, pulse: (await this.sample()).pulses[3] });
        i++;
      } else if (text === "+" || text === "-") {
        console.log(await this.link.request({ verb: "jog", index: 3, deltaUs: text === "+" ? 5 : -5 }));
      } else console.error(`Use one explicit 5us jog or confirm ${label}.`);
    }
    await this.link.request({ verb: "disarm" });
    await this.set("gripper", fitServo(samples as [AngleSample, AngleSample]));
  }

  private async measureBase(): Promise<void> {
    // Ask for angle while still holding each sampled pose, not after moving to the next one.
    const measured: AngleSample[] = [];
    await this.confirmation("Arm base at center, then measure two distinct real angles with a protractor?", "ARM");
    await this.link.request({ verb: "arm", actuator: "base" });
    for (let i = 0; i < 2;) {
      const action = await this.ask(`Base pose ${i + 1}/2: + / - (5us), measure, or abort: `);
      if (action === "abort") throw new Error("base measurement aborted");
      if (action === "+" || action === "-") {
        console.log(await this.link.request({ verb: "jog", index: 0, deltaUs: action === "+" ? 5 : -5 }));
      } else if (action === "measure") {
        const deg = await this.angle(0, "Actual base");
        measured.push({ deg, pulse: (await this.sample()).pulses[0] }); i++;
      } else console.error("Use +, -, measure or abort.");
    }
    await this.link.request({ verb: "disarm" });
    await this.set("base", fitServo(measured as [AngleSample, AngleSample]));
  }

  private async measureWrist(): Promise<void> {
    const measured: WristSample[] = [];
    console.log("Measure three NONCOLLINEAR actual roll/pitch poses (vary both independently), not three points on one line. Pulses A/B are sampled while you measure each pose.");
    await this.confirmation("Arm the wrist pair at configured centers?", "ARM");
    await this.link.request({ verb: "arm", actuator: "wrist" });
    for (let i = 0; i < 3;) {
      const action = await this.ask(`Wrist pose ${i + 1}/3: a+ / a- / b+ / b- (5us), measure, or abort: `);
      if (action === "abort") throw new Error("wrist measurement aborted");
      if (/^[ab][+-]$/.test(action)) {
        console.log(await this.link.request({ verb: "jog", index: action[0] === "a" ? 1 : 2, deltaUs: action[1] === "+" ? 5 : -5 }));
      } else if (action === "measure") {
        const roll = await this.angle(3, "Actual wrist roll"), pitch = await this.angle(2, "Actual wrist pitch");
        const sample = await this.sample();
        measured.push({ roll, pitch, a: sample.pulses[1], b: sample.pulses[2] }); i++;
      } else console.error("Use a+/a-/b+/b-/measure/abort.");
    }
    await this.link.request({ verb: "disarm" });
    await this.set("wrist", fitWrist(measured as [WristSample, WristSample, WristSample]));
  }

  private async measuredStep(): Promise<void> {
    const stepper = await this.get("stepper");
    const microsteps = stepper[1];
    if (!Number.isInteger(microsteps) || microsteps <= 0 || !Number.isFinite(stepper[0]) || stepper[0] <= 0) throw new Error("set plausible motor full steps and microsteps before arming the stepper");
    console.log("Motor-shaft encoder trial: one explicit jog, capped by firmware at the full elbow range. Choose a short move with known clearance. No automatic correction/retry. Observe the logical elbow direction (generated positive j2 direction), not just shaft direction.");
    const amount = await this.number("Signed trial microsteps, nonzero integer [-2147483648,2147483647]", undefined,
      (n) => Number.isInteger(n) && n !== 0 && n >= -2147483648 && n <= 2147483647);
    await this.confirmation("Arm ONLY stepper with unloaded linkage and e-stop ready, then perform exactly that single trial?", "ARM");
    await this.link.request({ verb: "arm", actuator: "stepper" });
    const before = await this.sample();
    if (before.raw === null || before.counts === null || before.steps === null) throw new Error("stepper encoder/counter unavailable; no trial movement sent");
    const reply = await this.link.request({ verb: "step", microsteps: amount });
    if (reply.kind !== "target") throw new Error("missing target counter");
    const after = await this.waitTarget(reply.target, amount);
    // Disarm before asking observations: a stationary motor needs no hold lease for this entry.
    await this.link.request({ verb: "disarm" });
    if (after.raw === null || after.counts === null || after.steps === null) throw new Error("stepper encoder/counter unavailable; cannot fit a stepper mapping");
    const direction = await this.number("Observed logical elbow direction: +1 positive j2, -1 negative j2; type abort if motion was absent/uncertain", undefined, (n) => n === 1 || n === -1);
    const fit = fitStepper(after.steps - before.steps, after.counts - before.counts, microsteps, direction);
    console.log(`MEASURED effective full steps/rev=${fit.fullSteps}, motorDirection=${fit.motorDirection}, encoderDirection=${fit.encoderDirection}; encoder delta=${after.counts - before.counts}, completed microsteps=${after.steps - before.steps}.`);
    await this.confirmation("Store this measured stepper fit into the draft? Check the encoder motion against the physical observation first.", "ACCEPT");
    stepper[0] = fit.fullSteps; stepper[3] = fit.motorDirection; stepper[4] = fit.encoderDirection;
    await this.set("stepper", stepper);
  }

  private async waitTarget(target: number, microsteps: number): Promise<Sample> {
    const microstepRate = CALIBRATION_FULL_STEP_RATE * (await this.get("stepper"))[1];
    const deadline = Date.now() + Math.ceil(Math.abs(microsteps) * 1000 / microstepRate) + 3000;
    let settledAt = 0;
    let settledCounts = 0;
    for (;;) {
      const sample = await this.sample();
      if (sample.raw === null || sample.counts === null || sample.steps === null) throw new Error("stepper encoder/counter unavailable; cannot wait for a stepper target");
      const now = Date.now();
      if (sample.steps !== target) {
        settledAt = 0;
      } else if (settledAt === 0 || Math.abs(sample.counts - settledCounts) > 2) {
        settledAt = now;
        settledCounts = sample.counts;
      } else if (now - settledAt >= 100) {
        return sample;
      }
      if (Date.now() > deadline) {
        const error = new Error("step counter/encoder did not settle; safe abort, no retry. Inspect hardware before restarting.");
        this.link.abort(error);
        throw error;
      }
      await delay(50, undefined, { signal: this.signal });
    }
  }

  async console(): Promise<void> {
    console.log("Quick jog: wrist -> UNLOADED_ESTOP_READY -> a+ / a- / b+ (default 5us, or an amount: a+ 100). Simultaneous: `wrist 1600 1400` sets A and B together; `pose 1 1600 2 1400` for any armed set. base+/base-, grip+/grip- after arm base / arm gripper. One step per entry; A/B do not imply roll/pitch directions.");
    console.log("Maintenance: help; export; optional measure base|wrist|gripper|stepper; enter; status; get KEY [INDEX]; set KEY VALUES; optional apply; arm base|wrist|gripper|stepper; jog INDEX +/-PULSE; pose INDEX US [INDEX US...]; wrist A_US B_US; step N; sample; disarm; save; exit; reference; quit. Commas or spaces. No normal J commands.");
    while (!this.signal.aborted) {
      try {
        const text = await this.ask("calibrate> ");
        if (!text) continue;
        if (text === "quit") {
          const status = await this.link.request({ verb: "status" });
          if (status.kind === "status" && status.mode === "calibration") await this.confirmation("Quit disables outputs, exits bench mode and discards UNSAVED draft. Export/save first if needed.", "QUIT");
          return;
        }
        if (text === "help") {
          console.log("Quick jog: wrist -> type UNLOADED_ESTOP_READY once -> a+/a-/b+ (default 5us) or an explicit amount (a+ 100). Simultaneous sets are atomic: `wrist 1600 1400` moves A and B together, and `pose 1 1600 2 1400` sets any armed channels. base+/base-/grip+/grip- after arm base / arm gripper. wrist enters a FRESH draft, arms only A/B directly (no apply, encoder or motor questionnaire), then shows pulses. To retain a draft, use arm wrist instead. Each entry validates every pulse before writing, then samples; no assumed roll/pitch directions, sweeps or movement retries.");
          console.log("WARNING: center arming can jump to 1500us. The assumed 500–2500us PWM windows are NOT verified mechanical travel or learned angle mappings; stop before binding. Pins, e-stop and hard windows are read-only board_config.h configuration; reflash to change them.");
          console.log(`step N: a nonzero integer relative move at ${CALIBRATION_FULL_STEP_RATE} full steps/s (x microsteps), at most the full elbow range in microsteps (else ERR step_bounds). The resulting counter must also fit signed 32-bit. Positive/negative follow raw driver direction. Keep linkage unloaded, verify clearance and keep physical e-stop ready.`);
          console.log("enter requires unloaded/e-stop acknowledgement; set mutable mappings only while disarmed. Each arm prepares and isolates its selected actuator/pair at center; apply is an optional full-setup diagnostic, never a prerequisite. Step is one guarded bounded jog and waits for its completed counter. status/get do not feed the lease; serialized 50ms keepalive after apply/arm preserves the firmware 200ms lease. disarm/save/exit stop it. export emits read-only hardware as comments/get values and mutable keys as recoverable set lines. save still requires FULL mapping/generated-envelope validation. exit discards UNSAVED draft, not quit. reference needs saved valid config, normal mode and manual marked homes EVERY boot/power loss. Clean normal-mode quit preserves reference; SIGINT/error halts and clears it. USB reopening may reset and require reference again. Never retry an uncertain move; inspect before restart.");
          continue;
        }
        if (text.startsWith("wrist ")) {
          const values = text.split(/[\s,]+/).slice(1).map(Number);
          if (values.length !== 2 || values.some((v) => !Number.isInteger(v))) throw new InputError("wrist usage: wrist A_US B_US, e.g. `wrist 1600 1400`");
          await this.link.request({ verb: "pose", values: [[1, values[0]], [2, values[1]]] });
          const sample = await this.sample();
          console.log(`A=${sample.pulses[1]} B=${sample.pulses[2]} us (both applied together)`);
          continue;
        }
        if (text === "wrist") {
          await this.enter();
          await this.link.request({ verb: "arm", actuator: "wrist" });
          const sample = await this.sample();
          console.log(`Wrist A=${sample.pulses[1]}us B=${sample.pulses[2]}us. a+/a-/b+/b- (optional amount: a+ 100); disarm stops outputs.`);
          continue;
        }
        const shortcut = /^(base|grip|[ab])\s*([+-])(?:\s*(\d+))?$/.exec(text);
        if (shortcut) {
          const index = shortcut[1] === "base" ? 0 : shortcut[1] === "a" ? 1 : shortcut[1] === "b" ? 2 : 3;
          const amount = shortcut[3] ? Number(shortcut[3]) : 5;
          await this.link.request({ verb: "jog", index, deltaUs: shortcut[2] === "+" ? amount : -amount });
          const sample = await this.sample();
          console.log(`base=${sample.pulses[0]} A=${sample.pulses[1]} B=${sample.pulses[2]} grip=${sample.pulses[3]} us`);
          continue;
        }
        if (text === "export") { await this.exportConstants(); continue; }
        if (text === "enter") { await this.enter(); continue; }
        if (text === "reference" || text.startsWith("reference,")) { await this.reference(); continue; }
        if (text.startsWith("measure ")) {
          const kind = text.slice(8).trim();
          if (kind === "base") await this.measureBase();
          else if (kind === "wrist") await this.measureWrist();
          else if (kind === "stepper") await this.measuredStep();
          else if (kind === "gripper") await this.measureGripper();
          else throw new Error("measure base|wrist|gripper|stepper");
          continue;
        }
        const command = consoleCommand(text);
        // Do not permit bypassing the confirmation prompts with raw wire text.
        if (command.verb === "enter" || command.verb === "reference") throw new InputError("use enter/reference without arguments for explicit safety confirmation");
        if (command.verb === "exit") await this.confirmation("Exit bench mode, disable outputs and discard unsaved draft? Normal motion remains blocked until marked-home reference.", "EXIT");
        if (command.verb === "save") await this.confirmation("Validate full generated envelope and persist all draft constants?", "SAVE");
        const reply = await this.link.request(command);
        console.log(reply);
        if (command.verb === "jog" || command.verb === "pose") {
          const sample = await this.sample();
          console.log(`base=${sample.pulses[0]} A=${sample.pulses[1]} B=${sample.pulses[2]} grip=${sample.pulses[3]} us`);
        }
        if (command.verb === "arm" && command.actuator === "wrist") {
          const sample = await this.sample();
          console.log(`Wrist A=${sample.pulses[1]}us B=${sample.pulses[2]}us`);
        }
        if (command.verb === "step" && reply.kind === "target") console.log(await this.waitTarget(reply.target, command.microsteps));
      } catch (e) {
        if (this.signal.aborted) throw e;
        console.error(e instanceof Error ? e.message : e);
        if (e instanceof InputError) {
          // Nothing was transmitted, so no actuator state changed; keep the current arm.
          console.error("Nothing was sent; actuator arming is unchanged.");
          continue;
        }
        // An ERR or bad data fit is recoverable. Never leave the actuator armed while recovering.
        try { await this.link.request({ verb: "disarm" }); }
        catch (cleanup) { console.error(`disarm: ${cleanup instanceof Error ? cleanup.message : cleanup}`); }
        console.error("Draft retained. Use get/export, set mutable corrections and explicit arm to resume (arm wrist retains the draft); apply is optional. Save only after full validation succeeds.");
      }
    }
  }
}

/** USB vendor matching is only a suggestion; never choose between multiple controllers. */
export async function resolveSerialPort(explicit?: string): Promise<string> {
  if (explicit) return explicit;
  const ports = await SerialPort.list();
  const supportedVids: Record<string, true> = { "303a": true, "10c4": true, "1a86": true, "0403": true }; // Espressif, CP210x, CH340, FTDI
  const matches = ports.filter((p) => supportedVids[p.vendorId?.toLowerCase() ?? ""] === true);
  if (matches.length === 1) return matches[0].path;
  const reason = matches.length > 1
    ? `Multiple matching USB serial ports (${matches.map((p) => p.path).join(", ")}); refusing to choose a motor controller.`
    : "No supported USB serial bridge/Espressif port found.";
  const available = ports.map((p) => `  ${p.path}  ${p.manufacturer ?? ""} ${p.vendorId ?? ""}:${p.productId ?? ""}`).join("\n");
  throw new Error(`${reason} Pass --port <path> explicitly. Available ports:\n${available || "  (none)"}`);
}

export async function runCalibration(portPath?: string): Promise<void> {
  const path = await resolveSerialPort(portPath);
  const port = new SerialPort({ path, baudRate: SERIAL_BAUD, autoOpen: false });
  await new Promise<void>((resolve, reject) => port.open((e) => e ? reject(e) : resolve()));
  const abort = new AbortController();
  const link = new CalibrationLink(port);
  const terminal = createInterface({ input: process.stdin, output: process.stdout });
  const interrupt = () => {
    link.abort(new Error("terminal interrupted/closed"));
    abort.abort();
  };
  process.once("SIGINT", interrupt);
  terminal.on("SIGINT", interrupt);
  terminal.on("close", interrupt);
  let cleanQuit = false;
  try {
    console.log(`Calibration @ ${path}, ${SERIAL_BAUD} baud. Motor-shaft encoder is NOT absolute elbow position. Marked-home reference is mandatory every boot/power loss. No normal motion is sent.`);
    // Opening USB may reset the board. Only read-only status, seq0, is polled during startup.
    const deadline = Date.now() + 6000;
    let status: GoodReply | undefined;
    while (!abort.signal.aborted) {
      try { status = await link.request({ verb: "status" }); break; }
      catch (e) { if (Date.now() > deadline) throw e; await delay(100, undefined, { signal: abort.signal }); }
    }
    if (!status) throw new Error("interrupted during status synchronization");
    console.log(status);
    console.log("Next: wrist -> type UNLOADED_ESTOP_READY once -> a+/a-/b+/b- (one 5us jog each). wrist starts a FRESH draft; arm wrist retains the current draft. No apply or full-system questionnaire.");
    console.log("WARNING: arming can jump to 1500us centers; assumed 500–2500us PWM is NOT verified mechanical travel or a learned angle mapping. Pins, e-stop and hard windows are in board_config.h; changes require reflashing.");
    if (status.kind === "status" && status.mode === "calibration") {
      console.log("Bench mode blocks normal motion and reports ESTOP. Use status for the specific fault; movement requires explicit isolated arming.");
    }
    link.onFatal = (e) => { console.error(`SAFE ABORT: ${e.message}. No movement retry; disabling outputs and closing.`); abort.abort(); };
    const guide = new Guide(link, terminal, abort.signal);
    // Console starts without entering bench mode; wrist/enter are explicit actions.
    await guide.console();
    cleanQuit = !abort.signal.aborted;
  } finally {
    abort.abort();
    process.removeListener("SIGINT", interrupt);
    terminal.removeListener("close", interrupt);
    terminal.removeListener("SIGINT", interrupt);
    await link.close(cleanQuit);
    terminal.close();
  }
}
