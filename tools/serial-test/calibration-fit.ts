export interface AngleSample { deg: number; pulse: number }
export interface WristSample { roll: number; pitch: number; a: number; b: number }

/** pulse = center + usPerDeg * angle; inputs must be actual independently measured poses. */
export function fitServo(samples: readonly [AngleSample, AngleSample]): [number, number] {
  const [a, b] = samples;
  if (![a.deg, a.pulse, b.deg, b.pulse].every(Number.isFinite)) throw new Error("measurements must be finite");
  const delta = b.deg - a.deg;
  if (Math.abs(delta) < 0.1 || Math.abs(delta) < Math.max(Math.abs(a.deg), Math.abs(b.deg)) * 1e-6) throw new Error("angle measurements are too close; measure separated poses");
  const slope = (b.pulse - a.pulse) / delta;
  const center = a.pulse - slope * a.deg;
  if (!Number.isFinite(center) || !Number.isFinite(slope) || Math.abs(slope) < 1e-6) throw new Error("degenerate servo measurements");
  return [center, slope];
}

/** Two coupled affine pulse equations, solved from three noncollinear measured roll/pitch poses. */
export function fitWrist(samples: readonly [WristSample, WristSample, WristSample]): [number, number, number, number, number, number] {
  const [o, a, b] = samples;
  if (!samples.every((s) => [s.roll, s.pitch, s.a, s.b].every(Number.isFinite))) throw new Error("measurements must be finite");
  const r1 = a.roll - o.roll, p1 = a.pitch - o.pitch;
  const r2 = b.roll - o.roll, p2 = b.pitch - o.pitch;
  const det = r1 * p2 - r2 * p1;
  const norm = Math.max(Math.abs(r1) + Math.abs(p1), Math.abs(r2) + Math.abs(p2));
  const inverseNormNumerator = Math.max(Math.abs(p2) + Math.abs(p1), Math.abs(r2) + Math.abs(r1));
  if (Math.abs(det) < 0.01 || norm * inverseNormNumerator / Math.abs(det) > 1000) throw new Error("roll/pitch measurements are degenerate or ill-conditioned; use independently separated axes");
  const result: number[] = [];
  for (const key of ["a", "b"] as const) {
    const d1 = a[key] - o[key], d2 = b[key] - o[key];
    const roll = (d1 * p2 - d2 * p1) / det;
    const pitch = (r1 * d2 - r2 * d1) / det;
    result.push(o[key] - roll * o.roll - pitch * o.pitch, roll, pitch);
  }
  const [, ar, ap, , br, bp] = result;
  const mixScale = Math.hypot(ar, ap) * Math.hypot(br, bp);
  if (!result.every(Number.isFinite) || mixScale === 0 || Math.abs(ar * bp - ap * br) / mixScale < 1e-3) throw new Error("measured differential mapping is singular or ill-conditioned");
  return result as [number, number, number, number, number, number];
}

export function fitStepper(deltaSteps: number, deltaCounts: number, microsteps: number, observedLogicalDirection: number): { fullSteps: number; motorDirection: number; encoderDirection: number } {
  if (![deltaSteps, deltaCounts, microsteps].every(Number.isSafeInteger) || !deltaSteps || Math.abs(deltaCounts) < 8 || microsteps <= 0 || Math.abs(observedLogicalDirection) !== 1) throw new Error("need completed steps, measurable encoder motion and observed logical direction +1/-1");
  const fullSteps = Math.abs(deltaSteps * 16384 / (deltaCounts * microsteps));
  if (!Number.isFinite(fullSteps) || fullSteps < 1 || fullSteps > 10000) throw new Error("implausible effective full steps/revolution; check encoder/step measurements");
  return { fullSteps, motorDirection: Math.sign(deltaSteps) * observedLogicalDirection, encoderDirection: Math.sign(deltaCounts) * observedLogicalDirection };
}
