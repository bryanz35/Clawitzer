import { CAMERA_MAX_DEG, CAMERA_MIN_DEG, NUM_JOINTS, SEQ_MODULUS } from "./constants";
import { isArmState, type JointDeg, type StatusMsg } from "./messages";

// Line formats (ASCII, '\n' terminated, 115200 baud):
//   command  J,<seq>,<j1>,…,<j5>*<crc8>
//   status   S,<seq>,<state>,<j1>,…,<j5>*<crc8>
//   camera   P,<seq>,<deg>*<crc8>          (0–180°, independent of arm joints)
//   camera   V,<seq>,<deg>,<active>*<crc8> (status, active 0/1)
// Angles are degrees with 1 decimal. crc8 covers the bytes strictly between the leading
// letter and '*', written as 2 uppercase hex digits. Firmware mirror: firmware/arm-controller/src/protocol.cpp.

/** Sequence number + angles parsed from a `J` line. */
export interface JointsLine {
  seq: number;
  deg: JointDeg;
}

/** Independent camera servo command/status angle and sequence. */
export interface CameraLine {
  seq: number;
  deg: number;
}

export interface CameraStatusMsg extends CameraLine {
  active: boolean;
}

/** CRC-8, polynomial 0x07, init 0x00, no reflection, no final XOR. Check value: crc8("123456789") === 0xF4. */
export function crc8(data: Uint8Array | string): number {
  const bytes = typeof data === "string" ? asciiBytes(data) : data;
  let crc = 0;
  for (const b of bytes) {
    crc ^= b;
    for (let i = 0; i < 8; i++) {
      crc = crc & 0x80 ? ((crc << 1) ^ 0x07) & 0xff : (crc << 1) & 0xff;
    }
  }
  return crc;
}

function asciiBytes(s: string): Uint8Array {
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c > 0x7f) throw new Error(`non-ASCII character in serial payload: ${JSON.stringify(s)}`);
    out[i] = c;
  }
  return out;
}

function hex2(n: number): string {
  return n.toString(16).toUpperCase().padStart(2, "0");
}

/** Next sequence number, wrapping at SEQ_MODULUS. */
export function nextSeq(seq: number): number {
  return (seq + 1) % SEQ_MODULUS;
}

/**
 * True if `seq` is newer than `last` under uint16 serial-number arithmetic (RFC 1982), so
 * 0 is newer than 65535. Equal or older (including duplicates) is false.
 */
export function seqIsNewer(seq: number, last: number): boolean {
  const diff = (seq - last + SEQ_MODULUS) % SEQ_MODULUS;
  return diff !== 0 && diff < SEQ_MODULUS / 2;
}

function assertSeq(seq: number): void {
  if (!Number.isInteger(seq) || seq < 0 || seq >= SEQ_MODULUS) {
    throw new RangeError(`seq must be an integer in [0, ${SEQ_MODULUS}), got ${seq}`);
  }
}

function formatDeg(deg: readonly number[]): string {
  if (deg.length !== NUM_JOINTS || !deg.every(Number.isFinite)) {
    throw new RangeError(`expected ${NUM_JOINTS} finite angles, got ${JSON.stringify(deg)}`);
  }
  // toFixed(1) can produce "-0.0"; normalize so the CRC'd text is canonical.
  return deg.map((d) => (Math.abs(d) < 0.05 ? "0.0" : d.toFixed(1))).join(",");
}

function formatCameraDeg(deg: number): string {
  if (!Number.isFinite(deg) || deg < CAMERA_MIN_DEG || deg > CAMERA_MAX_DEG) {
    throw new RangeError(`camera angle must be finite in [${CAMERA_MIN_DEG}, ${CAMERA_MAX_DEG}], got ${deg}`);
  }
  return (Math.abs(deg) < 0.05 ? 0 : deg).toFixed(1);
}

function frame(letter: string, payload: string): string {
  return `${letter}${payload}*${hex2(crc8(payload))}\n`;
}

/** Encodes a joint command line. Throws on invalid input (a programming error, not line noise). */
export function encodeJoints(seq: number, deg: readonly number[]): string {
  assertSeq(seq);
  return frame("J", `,${seq},${formatDeg(deg)}`);
}

/** Encodes a status line. Used by mocks and tests; the real sender is the firmware. */
export function encodeStatus(status: Omit<StatusMsg, "t">): string {
  assertSeq(status.seq);
  return frame("S", `,${status.seq},${status.state},${formatDeg(status.deg)}`);
}

/** Encodes the independent camera servo command. The firmware enforces the same range. */
export function encodeCameraCommand(seq: number, deg: number): string {
  assertSeq(seq);
  return frame("P", `,${seq},${formatCameraDeg(deg)}`);
}

/** Encodes a camera status line. Used by mocks and tests; the real sender is the firmware. */
export function encodeCameraStatus(status: CameraStatusMsg): string {
  assertSeq(status.seq);
  if (typeof status.active !== "boolean") throw new TypeError("camera active must be boolean");
  return frame("V", `,${status.seq},${formatCameraDeg(status.deg)},${status.active ? 1 : 0}`);
}

/** Splits `<L><payload>*<crc>` and verifies the CRC. Returns the comma-split payload fields (after the letter). */
function unframe(line: string, letter: string): string[] | null {
  const s = line.replace(/\r?\n$/, "");
  if (!s.startsWith(letter)) return null;
  const star = s.lastIndexOf("*");
  if (star < 0 || s.length - star !== 3) return null;
  const crcText = s.slice(star + 1);
  if (!/^[0-9A-Fa-f]{2}$/.test(crcText)) return null;
  const payload = s.slice(1, star);
  let crc: number;
  try {
    crc = crc8(payload);
  } catch {
    return null;
  }
  if (crc !== parseInt(crcText, 16)) return null;
  if (!payload.startsWith(",")) return null;
  return payload.slice(1).split(",");
}

function parseSeqField(s: string): number | null {
  if (!/^\d{1,5}$/.test(s)) return null;
  const n = Number(s);
  return n < SEQ_MODULUS ? n : null;
}

function parseDegFields(fields: string[]): JointDeg | null {
  if (fields.length !== NUM_JOINTS) return null;
  const out: number[] = [];
  for (const f of fields) {
    if (!/^-?\d+(\.\d+)?$/.test(f)) return null;
    out.push(Number(f));
  }
  return out as JointDeg;
}

function parseCameraDeg(s: string): number | null {
  if (!/^-?\d+(\.\d+)?$/.test(s)) return null;
  const deg = Number(s);
  return Number.isFinite(deg) && deg >= CAMERA_MIN_DEG && deg <= CAMERA_MAX_DEG ? deg : null;
}

/** Parses a `J` line. Returns null on bad CRC or a malformed line. */
export function parseJoints(line: string): JointsLine | null {
  const f = unframe(line, "J");
  if (!f || f.length !== 1 + NUM_JOINTS) return null;
  const seq = parseSeqField(f[0]);
  const deg = parseDegFields(f.slice(1));
  return seq === null || deg === null ? null : { seq, deg };
}

/** Parses a `P` camera command. Returns null on bad CRC, malformed data or out-of-range angle. */
export function parseCameraCommand(line: string): CameraLine | null {
  const f = unframe(line, "P");
  if (!f || f.length !== 2) return null;
  const seq = parseSeqField(f[0]);
  const deg = parseCameraDeg(f[1]);
  return seq === null || deg === null ? null : { seq, deg };
}

/** Parses a `V` camera status line. Returns null on bad CRC or malformed data. */
export function parseCameraStatus(line: string): CameraStatusMsg | null {
  const f = unframe(line, "V");
  if (!f || f.length !== 3) return null;
  const seq = parseSeqField(f[0]);
  const deg = parseCameraDeg(f[1]);
  if (seq === null || deg === null || (f[2] !== "0" && f[2] !== "1")) return null;
  return { seq, deg, active: f[2] === "1" };
}

/** Parses an `S` line into a status message. Returns null on bad CRC or a malformed line. */
export function parseStatus(line: string): StatusMsg | null {
  const f = unframe(line, "S");
  if (!f || f.length !== 2 + NUM_JOINTS) return null;
  const seq = parseSeqField(f[0]);
  const state = f[1];
  const deg = parseDegFields(f.slice(2));
  if (seq === null || deg === null || !isArmState(state)) return null;
  return { t: "status", seq, state, deg };
}
