// Deadman: the arm follows only while an index–thumb pinch is held (safety invariant 3).
//
// Quest reserves the *palm* pinch (pinching with the palm facing you) for the system menu, so
// a pinch only counts while the palm faces away from the head. Release is immediate on any of:
// fingers apart, palm turned toward the head, or hand/head tracking lost.

import { Quaternion, Vector3 } from "three";
import type { HandSample, Pose } from "./tracking";

export interface DeadmanParams {
  /** Thumb–index distance (m) below which a pinch starts. */
  engageDistance: number;
  /** Distance (m) above which a pinch ends. Larger than engageDistance for hysteresis. */
  releaseDistance: number;
  /** Pinch must be held this long (ms) before the arm engages. */
  holdMs: number;
  /** cos(angle) between palm normal and the direction to the head above which the pinch is the system gesture. */
  palmTowardHeadCos: number;
}

// TODO: tune on the headset.
export const DEFAULT_DEADMAN: DeadmanParams = {
  engageDistance: 0.015,
  releaseDistance: 0.03,
  holdMs: 150,
  palmTowardHeadCos: 0.3,
};

export type DeadmanState = "released" | "arming" | "engaged";
export type DeadmanEvent = "engage" | "release" | null;

function dist(a: readonly number[], b: readonly number[]): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

/** True when the palm faces the head (the reserved system pinch). */
export function palmFacesHead(wrist: Pose, head: Pose, cosThreshold: number): boolean {
  // WebXR hand joints: −Y points out of the palm. TODO: verify in IWER and on the headset.
  const normal = new Vector3(0, -1, 0).applyQuaternion(new Quaternion(...wrist.orientation));
  const toHead = new Vector3(...head.position).sub(new Vector3(...wrist.position));
  const len = toHead.length();
  if (len < 1e-6) return true;
  return normal.dot(toHead) / len > cosThreshold;
}

export class Deadman {
  private readonly p: DeadmanParams;
  private _state: DeadmanState = "released";
  private armingSince = 0;

  constructor(params: Partial<DeadmanParams> = {}) {
    this.p = { ...DEFAULT_DEADMAN, ...params };
  }

  get state(): DeadmanState {
    return this._state;
  }

  get engaged(): boolean {
    return this._state === "engaged";
  }

  /** Call once per XR frame. `nowMs` is the frame timestamp. */
  update(hand: HandSample | null, head: Pose | null, nowMs: number): DeadmanEvent {
    const wasEngaged = this._state === "engaged";
    if (!hand || !head || palmFacesHead(hand.wrist, head, this.p.palmTowardHeadCos)) {
      this._state = "released";
      return wasEngaged ? "release" : null;
    }
    const d = dist(hand.thumbTip, hand.indexTip);
    switch (this._state) {
      case "released":
        if (d < this.p.engageDistance) {
          this._state = "arming";
          this.armingSince = nowMs;
        }
        return null;
      case "arming":
        if (d > this.p.releaseDistance) this._state = "released";
        else if (nowMs - this.armingSince >= this.p.holdMs) {
          this._state = "engaged";
          return "engage";
        }
        return null;
      case "engaged":
        if (d > this.p.releaseDistance) {
          this._state = "released";
          return "release";
        }
        return null;
    }
  }
}
