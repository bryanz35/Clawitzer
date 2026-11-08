import { describe, expect, it } from "vitest";
import { panCommandDeg, recenterOffset } from "../src/video";

describe("panCommandDeg", () => {
  it("follows the head inside the stand's range", () => {
    expect(panCommandDeg(30, 110, 50)).toBe(120);
    expect(panCommandDeg(30, 110, 50, -1)).toBe(60);
  });

  it("holds the nearer end instead of flipping when the head crosses behind", () => {
    expect(panCommandDeg(179, 180, 50)).toBe(180);
    expect(panCommandDeg(-179, 180, 50)).toBe(180);
    expect(panCommandDeg(-179, 0, 50)).toBe(0);
  });

  it("wraps base-relative yaw so a turned base counter-rotates the stand", () => {
    expect(panCommandDeg(30 - 40, 90, 50)).toBe(80); // base 40° left, head 30° left → stand 10° right
    expect(panCommandDeg(170 - -170, 90, 50)).toBe(70); // −20° after wrapping, not the far end
    expect(panCommandDeg(200, 180, 50)).toBe(180); // −160°: behind, hold the near end
  });

  it("moves at most maxStepDeg per command", () => {
    expect(panCommandDeg(80, 90, 4.8)).toBeCloseTo(94.8);
    expect(panCommandDeg(-90, 90, 4.8)).toBeCloseTo(85.2);
  });
});

describe("recenterOffset", () => {
  it("snaps when uncalibrated, then eases toward centering on the stand", () => {
    expect(recenterOffset(null, 0.5, 0.2, 0.05)).toBeCloseTo(0.3);
    expect(recenterOffset(0.2, 0.5, 0.2, 0.5)).toBeCloseTo(0.25);
  });

  it("takes the short way across ±π", () => {
    expect(recenterOffset(3.1, 0, 3.1, 0.5)).toBeCloseTo(3.1 + 0.5 * (2 * Math.PI - 6.2));
  });
});
