import { describe, expect, it } from "vitest";
import { fitServo, fitStepper, fitWrist } from "../../../tools/serial-test/calibration-fit";

describe("measured servo mapping", () => {
  it("recovers nonzero center and reversed travel from two real angle/pulse pairs", () => {
    const [center, slope] = fitServo([{ deg: -20, pulse: 1700 }, { deg: 30, pulse: 1200 }]);
    expect(center).toBeCloseTo(1500);
    expect(slope).toBeCloseTo(-10);
    expect(center + slope * 12).toBeCloseTo(1380);
  });
  it("rejects repeated, nearly coincident, nonfinite or immobile observations", () => {
    for (const [a, b] of [[0, 0], [10, 10.001]]) {
      expect(() => fitServo([{ deg: a, pulse: 1400 }, { deg: b, pulse: 1600 }])).toThrow(/close/);
    }
    expect(() => fitServo([{ deg: -10, pulse: 1500 }, { deg: 10, pulse: 1500 }])).toThrow(/degenerate/);
    expect(() => fitServo([{ deg: NaN, pulse: 1400 }, { deg: 20, pulse: 1600 }])).toThrow(/finite/);
  });
  it("maps measured closed/open pulses to arbitrary generated gripper endpoints, not hardcoded angles", () => {
    const [center, slope] = fitServo([{ deg: -12, pulse: 1830 }, { deg: 57, pulse: 1140 }]);
    expect(center + slope * -12).toBeCloseTo(1830);
    expect(center + slope * 57).toBeCloseTo(1140);
    expect(slope).toBe(-10);
  });
});

describe("differential affine calibration", () => {
  it("solves both channels with offsets and unequal cross coupling", () => {
    const fit = fitWrist([
      { roll: 5, pitch: -3, a: 1514, b: 1445 },
      { roll: 15, pitch: 2, a: 1564, b: 1440 },
      { roll: -5, pitch: 7, a: 1494, b: 1525 },
    ]);
    expect(fit).toEqual([1500, 4, 2, 1475, -3, 5]);
    const [ac, ar, ap, bc, br, bp] = fit;
    // Predict an independent fourth pose, not one of the fitting observations.
    expect(ac + ar * 8 + ap * 9).toBe(1550);
    expect(bc + br * 8 + bp * 9).toBe(1496);
  });
  it("rejects collinear and numerically ill-conditioned angle measurements", () => {
    expect(() => fitWrist([
      { roll: 0, pitch: 0, a: 1500, b: 1500 },
      { roll: 10, pitch: 10, a: 1600, b: 1400 },
      { roll: 20, pitch: 20, a: 1700, b: 1300 },
    ])).toThrow(/degenerate|ill-conditioned/);
    expect(() => fitWrist([
      { roll: 0, pitch: 0, a: 1500, b: 1500 },
      { roll: 100, pitch: 100, a: 1600, b: 1400 },
      { roll: 100, pitch: 100.001, a: 1601, b: 1401 },
    ])).toThrow(/ill-conditioned/);
  });
  it("rejects a singular measured output mix even with independent angle poses", () => {
    expect(() => fitWrist([
      { roll: 0, pitch: 0, a: 1500, b: 1500 },
      { roll: 10, pitch: 0, a: 1600, b: 1700 },
      { roll: 0, pitch: 10, a: 1600, b: 1700 },
    ])).toThrow(/singular/);
  });
});

describe("completed step/encoder trial fitting", () => {
  it("derives effective full steps/rev and independent direction signs from observed motion", () => {
    expect(fitStepper(50, -256, 16, -1)).toEqual({ fullSteps: 200, motorDirection: -1, encoderDirection: 1 });
    expect(fitStepper(-50, 256, 16, -1)).toEqual({ fullSteps: 200, motorDirection: 1, encoderDirection: -1 });
    expect(fitStepper(50, 256, 16, 1)).toEqual({ fullSteps: 200, motorDirection: 1, encoderDirection: 1 });
  });
  it("does not invent a motor configuration from absent, too-small or invalid observations", () => {
    for (const args of [[0, 256, 16, 1], [50, 0, 16, 1], [50, 3, 16, 1], [50, 256, 0, 1], [50, 256, 16, 0], [1.5, 256, 16, 1], [50, Infinity, 16, 1]]) {
      expect(() => fitStepper(args[0], args[1], args[2], args[3])).toThrow();
    }
  });
});
