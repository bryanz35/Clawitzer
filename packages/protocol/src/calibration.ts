import { crc8 } from "./serial";

/** Calibration C sequence numbers are independent of the normal J stream. */
export const CALIBRATION_MAX_LINE = 192;
export const CALIBRATION_ENTER_ACK = "UNLOADED_ESTOP_READY";
export const CALIBRATION_REFERENCE_ACK = "HOME_MARK_CONFIRMED";
// Raw bench jog policy; keep firmware calibration_protocol.h in sync.
export const CALIBRATION_STEP_RATE = 1000; // Microsteps per second.
export const CALIBRATION_KEY_ARITY = {
  pins: 14, estop: 1, pulse: 4, base: 2, wrist: 6, gripper: 2,
  stepper: 7, following: 1, address: 1,
} as const;
export type CalibrationKey = keyof typeof CALIBRATION_KEY_ARITY;
export type CalibrationMutableKey = Exclude<CalibrationKey, "pins" | "estop" | "pulse">;
export type CalibrationActuator = "base" | "wrist" | "gripper" | "stepper";
type Values = {
  pins: [number, number, number, number, number, number, number, number, number, number, number, number, number, number];
  estop: [number]; pulse: [number, number, number, number]; base: [number, number];
  wrist: [number, number, number, number, number, number]; gripper: [number, number];
  stepper: [number, number, number, number, number, number, number]; following: [number]; address: [number];
};
type SetCommand = { [K in CalibrationMutableKey]: { verb: "set"; key: K; values: Values[K] } }[CalibrationMutableKey];
export type CalibrationCommand =
  | { verb: "status" | "apply" | "keep" | "sample" | "disarm" | "save" | "exit" | "halt" }
  | { verb: "enter"; acknowledgement: typeof CALIBRATION_ENTER_ACK }
  | { verb: "reference"; acknowledgement: typeof CALIBRATION_REFERENCE_ACK }
  | { verb: "get"; key: Exclude<CalibrationKey, "pulse"> }
  | { verb: "get"; key: "pulse"; index: number }
  | SetCommand
  | { verb: "arm"; actuator: CalibrationActuator }
  | { verb: "jog"; index: number; deltaUs: number }
  | { verb: "pose"; values: [number, number][] }
  | { verb: "step"; microsteps: number };
export type CalibrationReply = { seq: number } & (
  | { ok: false; fields: string[] }
  | { ok: true; kind: "ack" }
  | { ok: true; kind: "status"; mode: "calibration" | "normal"; configured: boolean; referenced: boolean;
      lastseq: number; haveseq: boolean; fault: string; lastjointseq: number }
  | { ok: true; kind: "get"; key: CalibrationKey; values: number[] }
  | { ok: true; kind: "pulse"; index: number; pulseUs: number }
  | { ok: true; kind: "target"; target: number }
  | { ok: true; kind: "sample"; raw: number | null; counts: number | null; steps: number | null; pulses: [number, number, number, number] }
);
const token = /^[A-Za-z0-9_.+\-]+$/;
const numeric = /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?$/;
const isKey = (s: string): s is CalibrationKey => Object.hasOwn(CALIBRATION_KEY_ARITY, s);
const isMutableKey = (s: string): s is CalibrationMutableKey => isKey(s) && s !== "pins" && s !== "estop" && s !== "pulse";
const integer = (n: number, lo: number, hi: number): boolean => Number.isSafeInteger(n) && n >= lo && n <= hi;
const SERVO_COUNT = 4;
const seqValid = (n: number): boolean => integer(n, 0, 65535);
const indexValid = (n: number): boolean => integer(n, 0, SERVO_COUNT - 1);

/** Validates grammar/arity; physical setup/envelope validation remains firmware-owned. */
export function calibrationCommandFields(command: CalibrationCommand): string[] {
  switch (command.verb) {
    case "enter":
      if (command.acknowledgement !== CALIBRATION_ENTER_ACK) throw new Error("explicit unloaded/e-stop acknowledgement required");
      return [command.verb, command.acknowledgement];
    case "reference":
      if (command.acknowledgement !== CALIBRATION_REFERENCE_ACK) throw new Error("explicit home mark acknowledgement required");
      return [command.verb, command.acknowledgement];
    case "set":
      if (!isMutableKey(command.key) || command.values.length !== CALIBRATION_KEY_ARITY[command.key] || !command.values.every(Number.isFinite)) throw new Error("invalid or read-only calibration set key/values");
      return ["set", command.key, ...command.values.map(String)];
    case "get":
      if (!isKey(command.key)) throw new Error("unknown calibration key");
      if (command.key === "pulse") {
        if (!indexValid(command.index)) throw new Error("invalid servo index");
        return ["get", "pulse", String(command.index)];
      }
      return ["get", command.key];
    case "arm":
      if (!["base", "wrist", "gripper", "stepper"].includes(command.actuator)) throw new Error("invalid actuator");
      return ["arm", command.actuator];
    case "jog":
      if (!indexValid(command.index) || !integer(command.deltaUs, -2000, 2000) || command.deltaUs === 0) throw new Error("jog must be a nonzero integer pulse step within the 500-2500us hard window (max 2000us)");
      return ["jog", String(command.index), String(command.deltaUs)];
    case "pose": {
      if (command.values.length < 1 || command.values.length > SERVO_COUNT) throw new Error("pose takes 1..4 servo pulses");
      const seen = [false, false, false, false];
      for (const [index, microseconds] of command.values) {
        if (!indexValid(index) || seen[index] || !Number.isSafeInteger(microseconds)) throw new Error("pose requires distinct servo indices and integer pulse widths");
        seen[index] = true;
      }
      return ["pose", ...command.values.flatMap(([index, microseconds]) => [String(index), String(microseconds)])];
    }
    case "step":
      if (!integer(command.microsteps, -2147483648, 2147483647) || command.microsteps === 0) throw new Error("step must be nonzero signed 32-bit integer microsteps");
      return ["step", String(command.microsteps)];
    default:
      if (!["status", "apply", "keep", "sample", "disarm", "save", "exit", "halt"].includes(command.verb)) throw new Error("unknown calibration verb");
      return [command.verb];
  }
}

export function encodeCalibration(seq: number, command: CalibrationCommand): string {
  if (!seqValid(seq)) throw new RangeError("calibration sequence must be uint16");
  const payload = `,${seq},${calibrationCommandFields(command).join(",")}`;
  const line = `C${payload}*${crc8(payload).toString(16).toUpperCase().padStart(2, "0")}`;
  if (line.length > CALIBRATION_MAX_LINE) throw new RangeError("calibration frame exceeds 192 ASCII characters");
  return `${line}\n`;
}

function unframe(line: string, letter: "C" | "K"): string[] | null {
  const s = line.replace(/\r?\n$/, "");
  if (s.length > CALIBRATION_MAX_LINE || !s.startsWith(`${letter},`) || !/^[\x20-\x7e]+$/.test(s)) return null;
  const match = /^.[,]([^*]+)\*([0-9a-fA-F]{2})$/.exec(s);
  if (!match || crc8(`,${match[1]}`) !== Number.parseInt(match[2], 16)) return null;
  const fields = match[1].split(",");
  if (!fields.every((s) => token.test(s)) || !/^\d{1,5}$/.test(fields[0]) || !seqValid(Number(fields[0]))) return null;
  return fields;
}

/** Parses requests for diagnostic tools and protocol tests, not sequence admission. */
export function parseCalibration(line: string): { seq: number; command: CalibrationCommand } | null {
  const f = unframe(line, "C");
  if (!f) return null;
  const [s, verb, ...args] = f;
  let command: CalibrationCommand;
  if (verb === "set" && isMutableKey(args[0]) && args.slice(1).every((x) => numeric.test(x))) {
    command = { verb, key: args[0], values: args.slice(1).map(Number) } as SetCommand;
  } else if (verb === "get" && isKey(args[0])) {
    command = args[0] === "pulse" ? { verb, key: "pulse", index: Number(args[1]) } : { verb, key: args[0] };
  } else if (verb === "enter" || verb === "reference") {
    command = { verb, acknowledgement: args[0] } as CalibrationCommand;
  } else if (verb === "arm") command = { verb, actuator: args[0] as CalibrationActuator };
  else if (verb === "jog") command = { verb, index: Number(args[0]), deltaUs: Number(args[1]) };
  else if (verb === "pose") {
    if (args.length % 2 !== 0) return null;
    const values: [number, number][] = [];
    for (let i = 0; i < args.length; i += 2) values.push([Number(args[i]), Number(args[i + 1])]);
    command = { verb, values };
  }
  else if (verb === "step") command = { verb, microsteps: Number(args[0]) };
  else command = { verb } as CalibrationCommand;
  try {
    const expected = calibrationCommandFields(command);
    if (expected.length !== f.length - 1 || expected.some((value, i) => {
      const actual = f[i + 1];
      return value !== actual && !(numeric.test(value) && numeric.test(actual) && Number(value) === Number(actual));
    })) return null;
    return { seq: Number(s), command };
  } catch { return null; }
}

/** Rejects CRC-valid but malformed/unknown positive replies, including wrong key arities. */
export function parseCalibrationReply(line: string): CalibrationReply | null {
  const f = unframe(line, "K");
  if (!f) return null;
  const seq = Number(f[0]);
  const v = f.slice(2);
  if (f[1] === "ERR") return v.length === 1 ? { seq, ok: false, fields: v } : null;
  if (f[1] !== "OK") return null;
  if (!v.length) return { seq, ok: true, kind: "ack" };
  const nums = (values: string[]) => values.every((s) => numeric.test(s) && Number.isFinite(Number(s)));
  if (isKey(v[0]) && v.length === CALIBRATION_KEY_ARITY[v[0]] + 1 && nums(v.slice(1))) {
    if (v[0] === "pulse" && !indexValid(Number(v[1]))) return null;
    return { seq, ok: true, kind: "get", key: v[0], values: v.slice(1).map(Number) };
  }
  if (v[0] === "pulse" && v.length === 3 && nums(v.slice(1)) && indexValid(Number(v[1])) && integer(Number(v[2]), 1, 2147483647)) return { seq, ok: true, kind: "pulse", index: Number(v[1]), pulseUs: Number(v[2]) };
  if (v[0] === "target" && v.length === 2 && nums(v.slice(1)) && integer(Number(v[1]), -2147483648, 2147483647)) return { seq, ok: true, kind: "target", target: Number(v[1]) };
  if (v.length === 14 && ["mode", "configured", "referenced", "lastseq", "haveseq", "fault", "lastjointseq"].every((key, i) => v[i * 2] === key)
      && (v[1] === "normal" || v[1] === "calibration") && [v[3], v[5], v[9]].every((x) => x === "0" || x === "1")
      && /^\d{1,5}$/.test(v[7]) && seqValid(Number(v[7])) && /^\d{1,5}$/.test(v[13]) && seqValid(Number(v[13]))) {
    return { seq, ok: true, kind: "status", mode: v[1], configured: v[3] === "1", referenced: v[5] === "1", lastseq: Number(v[7]), haveseq: v[9] === "1", fault: v[11], lastjointseq: Number(v[13]) };
  }
  if (v.length === 14 && ["raw", "counts", "steps", "pulse0", "pulse1", "pulse2", "pulse3"].every((key, i) => v[i * 2] === key)) {
    const n = v.filter((_, i) => i % 2 === 1);
    const encoderAbsent = n.slice(0, 3).every((x) => x === "NA");
    if (!encoderAbsent && (!nums(n.slice(0, 3)) || !n.slice(0, 3).every((x) => Number.isSafeInteger(Number(x))) || !integer(Number(n[0]), 0, 16383) || !integer(Number(n[2]), -2147483648, 2147483647))) return null;
    if (!nums(n.slice(3)) || !n.slice(3).every((x) => integer(Number(x), 0, 2147483647))) return null;
    return { seq, ok: true, kind: "sample", raw: encoderAbsent ? null : Number(n[0]), counts: encoderAbsent ? null : Number(n[1]), steps: encoderAbsent ? null : Number(n[2]), pulses: n.slice(3).map(Number) as [number, number, number, number] };
  }
  return null;
}

/** Canonical K encoder for serial simulators and diagnostics. Firmware is the real sender. */
export function encodeCalibrationReply(reply: CalibrationReply): string {
  if (!seqValid(reply.seq)) throw new RangeError("calibration sequence must be uint16");
  let fields: (string | number)[];
  if (!reply.ok) fields = ["ERR", ...reply.fields];
  else {
    switch (reply.kind) {
      case "ack": fields = ["OK"]; break;
      case "status":
        fields = ["OK", "mode", reply.mode, "configured", Number(reply.configured), "referenced", Number(reply.referenced),
          "lastseq", reply.lastseq, "haveseq", Number(reply.haveseq), "fault", reply.fault, "lastjointseq", reply.lastjointseq];
        break;
      case "get": fields = ["OK", reply.key, ...reply.values]; break;
      case "pulse": fields = ["OK", "pulse", reply.index, reply.pulseUs]; break;
      case "target": fields = ["OK", "target", reply.target]; break;
      case "sample":
        fields = ["OK", "raw", reply.raw ?? "NA", "counts", reply.counts ?? "NA", "steps", reply.steps ?? "NA",
          "pulse0", reply.pulses[0], "pulse1", reply.pulses[1], "pulse2", reply.pulses[2], "pulse3", reply.pulses[3]];
        break;
    }
  }
  const payload = `,${reply.seq},${fields.join(",")}`;
  const line = `K${payload}*${crc8(payload).toString(16).toUpperCase().padStart(2, "0")}\n`;
  const parsed = parseCalibrationReply(line);
  if (!parsed || parsed.ok !== reply.ok || (parsed.ok && reply.ok && parsed.kind !== reply.kind)) throw new Error("invalid calibration reply fields or frame length");
  return line;
}

/** Match not just the sequence but the expected successful response shape. */
export function calibrationReplyMatches(command: CalibrationCommand, reply: CalibrationReply): boolean {
  if (!reply.ok) return true;
  switch (command.verb) {
    case "status": return reply.kind === "status";
    case "sample": return reply.kind === "sample";
    case "get": return reply.kind === "get" && reply.key === command.key && (command.key !== "pulse" || reply.values[0] === command.index);
    case "jog": return reply.kind === "pulse" && reply.index === command.index;
    case "step": return reply.kind === "target";
    default: return reply.kind === "ack";
  }
}
