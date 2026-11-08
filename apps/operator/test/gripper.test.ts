import { describe, expect, it } from "vitest";
import { DEG, type JointLimits } from "@arm-mirror/kinematics";
import { gripperDeg, PINCH_CLOSED_M, PINCH_OPEN_M, rampDeg } from "../src/gripper";
import type { HandSample } from "../src/tracking";

const lim: JointLimits = { lower: -1, upper: 1, velocity: 0.5, acceleration: 1 };

function hand(gapM: number): HandSample {
  return {
    wrist: { position: [0, 0, 0], orientation: [0, 0, 0, 1] },
    knuckle: [0, 0, 0],
    thumbTip: [0, 0, 0],
    indexTip: [gapM, 0, 0],
    curlFingers: [],
  };
}

describe("gripperDeg", () => {
  it("maps the fingertip gap linearly from closed (lower) to open (upper), clamped", () => {
    expect(gripperDeg(hand(0), lim)).toBeCloseTo(-DEG);
    expect(gripperDeg(hand(PINCH_CLOSED_M), lim)).toBeCloseTo(-DEG);
    expect(gripperDeg(hand((PINCH_CLOSED_M + PINCH_OPEN_M) / 2), lim)).toBeCloseTo(0);
    expect(gripperDeg(hand(PINCH_OPEN_M), lim)).toBeCloseTo(DEG);
    expect(gripperDeg(hand(0.5), lim)).toBeCloseTo(DEG);
  });
});

describe("rampDeg", () => {
  it("steps toward the target by at most maxStep and lands on it", () => {
    expect(rampDeg(0, 10, 3)).toBe(3);
    expect(rampDeg(0, -10, 3)).toBe(-3);
    expect(rampDeg(9, 10, 3)).toBe(10);
  });
});
