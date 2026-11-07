import { describe, expect, it } from "vitest";
import type { Quat } from "@arm-mirror/protocol";
import { angleBetween, OneEuroFilter, OneEuroQuatFilter } from "../src";

const DT = 1 / 72; // Quest frame rate

/** Fraction of a step covered after the first sample following the step. */
function scalarStepResponse(step: number): number {
  const f = new OneEuroFilter({ minCutoff: 1, beta: 0.5, dCutoff: 1 });
  let t = 0;
  for (let i = 0; i < 10; i++) f.filter(0, (t += DT));
  return f.filter(step, (t += DT)) / step;
}

function quatAboutY(rad: number): Quat {
  return [0, Math.sin(rad / 2), 0, Math.cos(rad / 2)];
}

function quatStepResponse(stepRad: number): number {
  const f = new OneEuroQuatFilter({ minCutoff: 1, beta: 0.5, dCutoff: 1 });
  const start = quatAboutY(0);
  let t = 0;
  for (let i = 0; i < 10; i++) f.filter(start, (t += DT));
  const out = f.filter(quatAboutY(stepRad), (t += DT));
  return angleBetween(start, out) / stepRad;
}

describe("OneEuroFilter", () => {
  it("converges on a constant input", () => {
    const f = new OneEuroFilter();
    let t = 0;
    f.filter(0, t);
    let y = 0;
    for (let i = 0; i < 500; i++) y = f.filter(3, (t += DT));
    expect(y).toBeCloseTo(3, 4);
  });

  it("responds faster to a fast (large) step than a slow (small) one", () => {
    expect(scalarStepResponse(10)).toBeGreaterThan(scalarStepResponse(0.01));
  });

  it("ignores non-increasing timestamps", () => {
    const f = new OneEuroFilter();
    f.filter(1, 1);
    expect(f.filter(100, 1)).toBe(1);
    expect(f.filter(100, 0.5)).toBe(1);
  });
});

describe("OneEuroQuatFilter", () => {
  it("converges on a constant input", () => {
    const f = new OneEuroQuatFilter();
    const target = quatAboutY(1.2);
    let t = 0;
    f.filter(quatAboutY(0), t);
    let y: Quat = [0, 0, 0, 1];
    for (let i = 0; i < 500; i++) y = f.filter(target, (t += DT));
    expect(angleBetween(y, target)).toBeLessThan(1e-3);
  });

  it("responds faster to a fast (large) rotation than a slow (small) one", () => {
    expect(quatStepResponse(1.5)).toBeGreaterThan(quatStepResponse(0.001));
  });

  it("treats q and -q as the same rotation", () => {
    const f = new OneEuroQuatFilter();
    const q = quatAboutY(0.5);
    f.filter(q, 0);
    const out = f.filter([-q[0], -q[1], -q[2], -q[3]], DT);
    expect(angleBetween(out, q)).toBeLessThan(1e-6);
  });
});
