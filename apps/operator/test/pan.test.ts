import { describe, expect, it } from "vitest";
import { panCommandDeg } from "../src/video";

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

  it("moves at most maxStepDeg per command", () => {
    expect(panCommandDeg(80, 90, 4.8)).toBeCloseTo(94.8);
    expect(panCommandDeg(-90, 90, 4.8)).toBeCloseTo(85.2);
  });
});
