import { describe, expect, it } from "vitest";
import { curlRatio, Deadman, DEFAULT_DEADMAN } from "../src/deadman";
import type { HandSample, Pose } from "../src/tracking";

const head: Pose = { position: [0, 1.6, 0], orientation: [0, 0, 0, 1] };

/** Knuckles 9 cm from the wrist along −Z; each tip at `ratio` × that distance (≈2 straight, <1 fist). */
function hand(ratio: number): HandSample {
  const w = 0.09;
  return {
    wrist: { position: [0, 1.2, -0.4], orientation: [0, 0, 0, 1] },
    knuckle: [0, 1.2, -0.49],
    thumbTip: [0, 1.2, -0.5],
    indexTip: [0, 1.2, -0.5],
    curlFingers: [-0.02, 0, 0.02].map((x) => ({
      knuckle: [x, 1.2, -0.4 - Math.sqrt(w * w - x * x)],
      tip: [x, 1.2, -0.4 - Math.sqrt((ratio * w) ** 2 - x * x)],
    })),
  };
}

const CURLED = 0.8;
const BETWEEN = (DEFAULT_DEADMAN.curlRatio + DEFAULT_DEADMAN.extendRatio) / 2;
const OPEN = 1.9;
const HOLD = DEFAULT_DEADMAN.holdMs;
const GRACE = DEFAULT_DEADMAN.lostGraceMs;

function engaged(): Deadman {
  const d = new Deadman();
  d.update(hand(CURLED), head, 0);
  expect(d.update(hand(CURLED), head, HOLD)).toBe("engage");
  return d;
}

describe("Deadman", () => {
  it("measures curl as tip/knuckle distance from the wrist", () => {
    expect(curlRatio(hand(0.8))).toBeCloseTo(0.8, 2);
    expect(curlRatio(hand(1.9))).toBeCloseTo(1.9, 2);
  });

  it("engages only after the curl is held for holdMs", () => {
    const d = new Deadman();
    expect(d.update(hand(CURLED), head, 0)).toBeNull();
    expect(d.state).toBe("arming");
    expect(d.update(hand(CURLED), head, HOLD - 1)).toBeNull();
    expect(d.update(hand(CURLED), head, HOLD)).toBe("engage");
  });

  it("never engages on a half-curled hand", () => {
    const d = new Deadman();
    d.update(hand(BETWEEN), head, 0);
    expect(d.update(hand(BETWEEN), head, HOLD * 2)).toBeNull();
    expect(d.state).toBe("released");
  });

  it("stays engaged while half-curled and releases only when extended", () => {
    const d = engaged();
    expect(d.update(hand(BETWEEN), head, HOLD + 10)).toBeNull();
    expect(d.engaged).toBe(true);
    expect(d.update(hand(OPEN), head, HOLD + 20)).toBe("release");
    expect(d.engaged).toBe(false);
  });

  it("rides out a tracking dropout shorter than the grace period", () => {
    for (const [h, hd] of [[null, head], [hand(CURLED), null]] as const) {
      const d = engaged();
      expect(d.update(h, hd, HOLD + 10)).toBeNull();
      expect(d.update(h, hd, HOLD + 10 + GRACE)).toBeNull();
      expect(d.engaged).toBe(true);
      expect(d.update(hand(CURLED), head, HOLD + 20 + GRACE)).toBeNull();
      // The grace timer restarts after tracking comes back.
      expect(d.update(h, hd, HOLD + 30 + GRACE)).toBeNull();
      expect(d.update(h, hd, HOLD + 30 + 2 * GRACE)).toBeNull();
      expect(d.engaged).toBe(true);
    }
  });

  it("releases once tracking has been lost longer than the grace period", () => {
    const d = engaged();
    d.update(null, head, HOLD + 10);
    expect(d.update(null, head, HOLD + 11 + GRACE)).toBe("release");
    expect(d.state).toBe("released");
  });

  it("drops arming immediately when tracking is lost", () => {
    const d = new Deadman();
    d.update(hand(CURLED), head, 0);
    d.update(null, head, 10);
    expect(d.update(hand(CURLED), head, HOLD)).toBeNull();
    expect(d.state).toBe("arming");
  });

  it("release() reports a release only when it was engaged", () => {
    expect(new Deadman().release()).toBeNull();
    const d = engaged();
    expect(d.release()).toBe("release");
    expect(d.engaged).toBe(false);
  });
});
