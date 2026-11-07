import { describe, expect, it } from "vitest";
import { Deadman, DEFAULT_DEADMAN } from "../src/deadman";
import type { HandSample, Pose } from "../src/tracking";

// Head at eye height looking down −Z; hand 0.4 m in front of it.
const head: Pose = { position: [0, 1.6, 0], orientation: [0, 0, 0, 1] };
// Identity wrist: palm normal (−Y) points at the floor, away from the head.
const palmDown: Pose["orientation"] = [0, 0, 0, 1];
// 180° about Z: palm normal points up, toward the head above the hand.
const palmUp: Pose["orientation"] = [0, 0, 1, 0];

function hand(gapM: number, orientation = palmDown): HandSample {
  return {
    wrist: { position: [0, 1.2, -0.4], orientation },
    knuckle: [0, 1.2, -0.5],
    thumbTip: [0, 1.2, -0.5],
    indexTip: [gapM, 1.2, -0.5],
  };
}

const PINCH = 0.005;
const OPEN = 0.05;
const HOLD = DEFAULT_DEADMAN.holdMs;

describe("Deadman", () => {
  it("engages only after the pinch is held for holdMs", () => {
    const d = new Deadman();
    expect(d.update(hand(PINCH), head, 0)).toBeNull();
    expect(d.state).toBe("arming");
    expect(d.update(hand(PINCH), head, HOLD - 1)).toBeNull();
    expect(d.update(hand(PINCH), head, HOLD)).toBe("engage");
    expect(d.engaged).toBe(true);
  });

  it("stays engaged inside the hysteresis band and releases beyond it", () => {
    const d = new Deadman();
    d.update(hand(PINCH), head, 0);
    d.update(hand(PINCH), head, HOLD);
    const between = (DEFAULT_DEADMAN.engageDistance + DEFAULT_DEADMAN.releaseDistance) / 2;
    expect(d.update(hand(between), head, HOLD + 10)).toBeNull();
    expect(d.engaged).toBe(true);
    expect(d.update(hand(OPEN), head, HOLD + 20)).toBe("release");
    expect(d.engaged).toBe(false);
  });

  it("releases immediately when hand or head tracking is lost", () => {
    for (const [h, hd] of [[null, head], [hand(PINCH), null]] as const) {
      const d = new Deadman();
      d.update(hand(PINCH), head, 0);
      d.update(hand(PINCH), head, HOLD);
      expect(d.update(h, hd, HOLD + 10)).toBe("release");
      expect(d.state).toBe("released");
    }
  });

  it("never engages on the system (palm toward head) pinch, and releases if the palm turns", () => {
    const d = new Deadman();
    d.update(hand(PINCH, palmUp), head, 0);
    expect(d.update(hand(PINCH, palmUp), head, HOLD * 2)).toBeNull();
    expect(d.engaged).toBe(false);

    d.update(hand(PINCH), head, 1000);
    d.update(hand(PINCH), head, 1000 + HOLD);
    expect(d.engaged).toBe(true);
    expect(d.update(hand(PINCH, palmUp), head, 1000 + HOLD + 10)).toBe("release");
  });
});
