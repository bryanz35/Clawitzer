// Gripper: thumb–index distance → jaw position. Closing past the object's width leaves the servo pushing
// against it, so a tighter pinch squeezes harder (position servo, no force feedback). Firmware still
// clamps to the measured closed endpoint.

import { DEG, type JointLimits } from "@arm-mirror/kinematics";
import type { HandSample } from "./tracking";

/** j5 in protocol order. Generated lower = closed, upper = open. */
export const GRIPPER = 4;

// TODO: tune on the headset.
/** Fingertip gap (m) at or below which the jaws are commanded fully closed. */
export const PINCH_CLOSED_M = 0.015;
/** Fingertip gap (m) at or above which the jaws are commanded fully open. */
export const PINCH_OPEN_M = 0.08;

export function gripperDeg(hand: HandSample, lim: JointLimits): number {
  const [a, b] = [hand.thumbTip, hand.indexTip];
  const gap = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  const t = Math.min(1, Math.max(0, (gap - PINCH_CLOSED_M) / (PINCH_OPEN_M - PINCH_CLOSED_M)));
  return (lim.lower + t * (lim.upper - lim.lower)) * DEG;
}

/** Move `fromDeg` toward `toDeg` by at most `maxStepDeg`. */
export function rampDeg(fromDeg: number, toDeg: number, maxStepDeg: number): number {
  return fromDeg + Math.max(-maxStepDeg, Math.min(maxStepDeg, toDeg - fromDeg));
}
