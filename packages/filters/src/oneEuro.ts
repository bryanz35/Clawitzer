// One Euro filter (Casiez, Roussel, Vogel, CHI 2012): a low-pass filter whose cutoff rises
// with speed, so it is smooth when the hand is still and responsive when it moves fast.

import type { Quat } from "@arm-mirror/protocol";

export interface OneEuroParams {
  /** Cutoff (Hz) at zero speed. Lower = smoother at rest, more lag. */
  minCutoff: number;
  /** Cutoff increase per unit of speed. Higher = less lag on fast motion. */
  beta: number;
  /** Cutoff (Hz) for the derivative estimate. */
  dCutoff: number;
}

/** Starting values; TODO: tune against real Quest hand-tracking jitter. */
export const DEFAULT_ONE_EURO: OneEuroParams = { minCutoff: 1.0, beta: 0.05, dCutoff: 1.0 };

function smoothingFactor(dt: number, cutoff: number): number {
  const r = 2 * Math.PI * cutoff * dt;
  return r / (r + 1);
}

/** Scalar One Euro filter. Timestamps are in seconds and must increase. */
export class OneEuroFilter {
  private readonly p: OneEuroParams;
  private x: number | null = null;
  private dx = 0;
  private t = 0;

  constructor(params: Partial<OneEuroParams> = {}) {
    this.p = { ...DEFAULT_ONE_EURO, ...params };
  }

  filter(value: number, tSec: number): number {
    if (this.x === null) {
      this.x = value;
      this.t = tSec;
      return value;
    }
    const dt = tSec - this.t;
    if (!(dt > 0)) return this.x; // duplicate or out-of-order sample: keep the last output
    this.t = tSec;

    const rawDx = (value - this.x) / dt;
    this.dx += smoothingFactor(dt, this.p.dCutoff) * (rawDx - this.dx);
    const cutoff = this.p.minCutoff + this.p.beta * Math.abs(this.dx);
    this.x += smoothingFactor(dt, cutoff) * (value - this.x);
    return this.x;
  }

  /** Forget history. Call on tracking loss so the next sample is not blended with a stale one. */
  reset(): void {
    this.x = null;
    this.dx = 0;
  }
}

function dot(a: Quat, b: Quat): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

function normalize(q: Quat): Quat {
  const n = Math.hypot(q[0], q[1], q[2], q[3]);
  return [q[0] / n, q[1] / n, q[2] / n, q[3] / n];
}

/** Shortest-arc slerp; `t` in [0, 1]. Quaternions are [x, y, z, w]. */
export function slerp(a: Quat, b: Quat, t: number): Quat {
  let d = dot(a, b);
  let bb: Quat = b;
  if (d < 0) {
    d = -d;
    bb = [-b[0], -b[1], -b[2], -b[3]];
  }
  if (d > 0.9995) {
    return normalize([
      a[0] + t * (bb[0] - a[0]),
      a[1] + t * (bb[1] - a[1]),
      a[2] + t * (bb[2] - a[2]),
      a[3] + t * (bb[3] - a[3]),
    ]);
  }
  const theta = Math.acos(d);
  const s = Math.sin(theta);
  const wa = Math.sin((1 - t) * theta) / s;
  const wb = Math.sin(t * theta) / s;
  return [wa * a[0] + wb * bb[0], wa * a[1] + wb * bb[1], wa * a[2] + wb * bb[2], wa * a[3] + wb * bb[3]];
}

/** Rotation angle (radians, 0…π) between two unit quaternions. */
export function angleBetween(a: Quat, b: Quat): number {
  return 2 * Math.acos(Math.min(1, Math.abs(dot(a, b))));
}

/**
 * Quaternion One Euro filter: the "speed" is angular speed (rad/s), and each step slerps the
 * previous output toward the new sample by the adaptive smoothing factor.
 */
export class OneEuroQuatFilter {
  private readonly p: OneEuroParams;
  private q: Quat | null = null;
  private speed = 0;
  private t = 0;

  constructor(params: Partial<OneEuroParams> = {}) {
    this.p = { ...DEFAULT_ONE_EURO, ...params };
  }

  filter(value: Quat, tSec: number): Quat {
    const v = normalize(value);
    if (this.q === null) {
      this.q = v;
      this.t = tSec;
      return v;
    }
    const dt = tSec - this.t;
    if (!(dt > 0)) return this.q;
    this.t = tSec;

    const rawSpeed = angleBetween(this.q, v) / dt;
    this.speed += smoothingFactor(dt, this.p.dCutoff) * (rawSpeed - this.speed);
    const cutoff = this.p.minCutoff + this.p.beta * this.speed;
    this.q = slerp(this.q, v, smoothingFactor(dt, cutoff));
    return this.q;
  }

  reset(): void {
    this.q = null;
    this.speed = 0;
  }
}
