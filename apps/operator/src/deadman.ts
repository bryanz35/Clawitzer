// Deadman: the arm follows only while the middle, ring and little fingers are curled (safety invariant 3).
// The index–thumb pinch is left free for the gripper.
//
// Curl per finger = |tip − wrist| / |knuckle − wrist|: about 2 when straight, under 1 in a fist.
// Release needs the fingers clearly extended. An in-between reading keeps the current state, and
// a brief tracking dropout keeps the deadman engaged (the arm holds meanwhile: no hand, no target).

import type { Vec3 } from "@arm-mirror/kinematics";
import type { HandSample, Pose } from "./tracking";

export interface DeadmanParams {
  /** Mean curl ratio below which the fingers count as curled. */
  curlRatio: number;
  /** Mean curl ratio above which the fingers count as extended. Larger than curlRatio for hysteresis. */
  extendRatio: number;
  /** Curl must be held this long (ms) before the arm engages. */
  holdMs: number;
  /** Hand or head tracking lost for longer than this (ms) releases. */
  lostGraceMs: number;
}

// TODO: tune on the headset.
export const DEFAULT_DEADMAN: DeadmanParams = {
  curlRatio: 1.1,
  extendRatio: 1.5,
  holdMs: 150,
  lostGraceMs: 500,
};

export type DeadmanState = "released" | "arming" | "engaged";
export type DeadmanEvent = "engage" | "release" | null;

function dist(a: Vec3, b: Vec3): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

/** Mean tip-to-wrist over knuckle-to-wrist distance of the middle, ring and little fingers. */
export function curlRatio(hand: HandSample): number {
  const w = hand.wrist.position;
  const ratios = hand.curlFingers.map((f) => dist(f.tip, w) / Math.max(dist(f.knuckle, w), 1e-6));
  return ratios.reduce((a, b) => a + b, 0) / ratios.length;
}

export class Deadman {
  private readonly p: DeadmanParams;
  private _state: DeadmanState = "released";
  private armingSince = 0;
  private lostSince: number | null = null;

  constructor(params: Partial<DeadmanParams> = {}) {
    this.p = { ...DEFAULT_DEADMAN, ...params };
  }

  get state(): DeadmanState {
    return this._state;
  }

  get engaged(): boolean {
    return this._state === "engaged";
  }

  /** Release now, e.g. arm not ready or the XR session ended. */
  release(): DeadmanEvent {
    const wasEngaged = this._state === "engaged";
    this._state = "released";
    this.lostSince = null;
    return wasEngaged ? "release" : null;
  }

  /** Call once per XR frame. `nowMs` is the frame timestamp. */
  update(hand: HandSample | null, head: Pose | null, nowMs: number): DeadmanEvent {
    if (!hand || !head) {
      if (this._state !== "engaged") {
        this._state = "released";
        return null;
      }
      this.lostSince ??= nowMs;
      return nowMs - this.lostSince > this.p.lostGraceMs ? this.release() : null;
    }
    this.lostSince = null;
    const r = curlRatio(hand);
    switch (this._state) {
      case "released":
        if (r < this.p.curlRatio) {
          this._state = "arming";
          this.armingSince = nowMs;
        }
        return null;
      case "arming":
        if (r > this.p.extendRatio) this._state = "released";
        else if (nowMs - this.armingSince >= this.p.holdMs) {
          this._state = "engaged";
          return "engage";
        }
        return null;
      case "engaged":
        return r > this.p.extendRatio ? this.release() : null;
    }
  }
}
