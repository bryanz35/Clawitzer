import { NUM_JOINTS } from "./constants";

/** Quaternion, `[x, y, z, w]`. */
export type Quat = [number, number, number, number];

/** j1 base yaw, j2 elbow pitch, j3 wrist pitch/j4 wrist roll (differential), j5 gripper closed→open; degrees at the serial boundary and in these messages. */
export type JointDeg = [number, number, number, number, number];

export const ARM_STATES = ["HOMING", "IDLE", "ACTIVE", "WATCHDOG", "ESTOP"] as const;
export type ArmState = (typeof ARM_STATES)[number];

// ── WebRTC data channel `control` (Quest ↔ phone) ──────────────────────────

/** Quest → phone. The phone forwards to serial only when `engaged` is true. */
export interface JointsMsg {
  t: "joints";
  seq: number;
  deg: JointDeg;
  engaged: boolean;
}

/** Phone → Quest. Phone orientation (it rides the pan/tilt stand, so this is the camera pose). */
export interface CamOrientMsg {
  t: "camOrient";
  q: Quat;
  /** Sender's epoch milliseconds. Clocks are not synchronized across devices. */
  ts: number;
}

/** Phone → Quest. Mirrors the serial status line. `seq` is the last command seq the MCU accepted. */
export interface StatusMsg {
  t: "status";
  seq: number;
  state: ArmState;
  deg: JointDeg;
}

/** Phone → Quest. The phone app's debug switch: show the commanded-pose arm model in VR. Resent ~1 Hz (the channel drops). */
export interface DebugMsg {
  t: "debug";
  on: boolean;
}

// ── IMU wearable WebSocket (wearable → Quest) ──────────────────────────────

export interface ImuMsg {
  t: "imu";
  seq: number;
  /** BNO085 game rotation vector (no magnetometer). Sensor frame; mapping to WebXR is done on the Quest. */
  forearm: Quat;
  hand: Quat;
}

// ── WebRTC signaling over ws://<host>/signal ───────────────────────────────

export type PeerRole = "operator" | "robot";

export interface OfferMsg {
  t: "offer";
  sdp: string;
}

export interface AnswerMsg {
  t: "answer";
  sdp: string;
}

/** Mirrors RTCIceCandidateInit; `candidate: null` is not sent (end-of-candidates is implicit). */
export interface IceCandidate {
  candidate: string;
  sdpMid: string | null;
  sdpMLineIndex: number | null;
  usernameFragment?: string | null;
}

export interface IceMsg {
  t: "ice";
  candidate: IceCandidate;
}

/**
 * Sent by the signaling server only: tells a peer whether the other role is connected,
 * so the operator knows when to (re)send an offer. Transport presence, not business logic.
 */
export interface PeerMsg {
  t: "peer";
  role: PeerRole;
  present: boolean;
}

export type ControlMsg = JointsMsg | CamOrientMsg | StatusMsg | DebugMsg;
export type SignalMsg = OfferMsg | AnswerMsg | IceMsg | PeerMsg;
export type Message = ControlMsg | ImuMsg | SignalMsg;

// ── Type guards ────────────────────────────────────────────────────────────

type Obj = Record<string, unknown>;

function isObj(x: unknown): x is Obj {
  return typeof x === "object" && x !== null && !Array.isArray(x);
}

function isFiniteNum(x: unknown): x is number {
  return typeof x === "number" && Number.isFinite(x);
}

function isSeq(x: unknown): x is number {
  return Number.isInteger(x) && (x as number) >= 0;
}

function isNumTuple(x: unknown, len: number): boolean {
  return Array.isArray(x) && x.length === len && x.every(isFiniteNum);
}

export function isQuat(x: unknown): x is Quat {
  return isNumTuple(x, 4);
}

export function isJointDeg(x: unknown): x is JointDeg {
  return isNumTuple(x, NUM_JOINTS);
}

export function isArmState(x: unknown): x is ArmState {
  return typeof x === "string" && (ARM_STATES as readonly string[]).includes(x);
}

export function isJointsMsg(x: unknown): x is JointsMsg {
  return isObj(x) && x.t === "joints" && isSeq(x.seq) && isJointDeg(x.deg) && typeof x.engaged === "boolean";
}

export function isCamOrientMsg(x: unknown): x is CamOrientMsg {
  return isObj(x) && x.t === "camOrient" && isQuat(x.q) && isFiniteNum(x.ts);
}

export function isStatusMsg(x: unknown): x is StatusMsg {
  return isObj(x) && x.t === "status" && isSeq(x.seq) && isArmState(x.state) && isJointDeg(x.deg);
}

export function isDebugMsg(x: unknown): x is DebugMsg {
  return isObj(x) && x.t === "debug" && typeof x.on === "boolean";
}

export function isImuMsg(x: unknown): x is ImuMsg {
  return isObj(x) && x.t === "imu" && isSeq(x.seq) && isQuat(x.forearm) && isQuat(x.hand);
}

export function isOfferMsg(x: unknown): x is OfferMsg {
  return isObj(x) && x.t === "offer" && typeof x.sdp === "string";
}

export function isAnswerMsg(x: unknown): x is AnswerMsg {
  return isObj(x) && x.t === "answer" && typeof x.sdp === "string";
}

export function isIceMsg(x: unknown): x is IceMsg {
  if (!isObj(x) || x.t !== "ice" || !isObj(x.candidate)) return false;
  const c = x.candidate;
  return (
    typeof c.candidate === "string" &&
    (c.sdpMid === null || typeof c.sdpMid === "string") &&
    (c.sdpMLineIndex === null || Number.isInteger(c.sdpMLineIndex))
  );
}

export function isPeerRole(x: unknown): x is PeerRole {
  return x === "operator" || x === "robot";
}

export function isPeerMsg(x: unknown): x is PeerMsg {
  return isObj(x) && x.t === "peer" && isPeerRole(x.role) && typeof x.present === "boolean";
}

export function isControlMsg(x: unknown): x is ControlMsg {
  return isJointsMsg(x) || isCamOrientMsg(x) || isStatusMsg(x) || isDebugMsg(x);
}

export function isSignalMsg(x: unknown): x is SignalMsg {
  return isOfferMsg(x) || isAnswerMsg(x) || isIceMsg(x) || isPeerMsg(x);
}

/** Parses JSON text and validates it against `guard`. Returns null on bad JSON or shape. */
export function parseJson<T>(text: string, guard: (x: unknown) => x is T): T | null {
  let value: unknown;
  try {
    value = JSON.parse(text);
  } catch {
    return null;
  }
  return guard(value) ? value : null;
}
