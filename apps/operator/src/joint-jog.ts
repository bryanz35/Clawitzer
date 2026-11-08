import { CMD_HZ, NUM_JOINTS, type JointDeg } from "@arm-mirror/protocol";
import { DEG, type JointLimits } from "@arm-mirror/kinematics";

/**
 * [positive, negative] key per joint: j1 base, j2 elbow, j3 wrist pitch, j4 wrist roll, j5 gripper.
 * Positive j1 is CCW (left) from above, positive j2 and j3 are DOWN, positive j4 is CCW about the
 * forearm, positive j5 is open. The modifier below must be held for any of these to act.
 */
export const JOINT_KEYS = [
  ["KeyA", "KeyD"],             // base:    A left, D right
  ["KeyS", "KeyW"],             // elbow:   W up, S down
  ["ArrowDown", "ArrowUp"],     // pitch:   Up up, Down down
  ["ArrowRight", "ArrowLeft"],  // roll:    Right right, Left left
  ["KeyT", "KeyG"],             // gripper: T open, G close
] as const;

const MODIFIER_CODES: Record<string, true> = { ShiftLeft: true, ShiftRight: true };

const MAX_TICK_GAP_MS = 100;

/** User authorization and degree-space jog trajectory. Firmware remains authoritative. */
export class JointJog {
  private readonly limits: JointLimits[];
  private readonly keys = new Set<string>();
  private pointer: { joint: number; direction: -1 | 1 } | null = null;
  private readonly feedback: JointDeg = [0, 0, 0, 0, 0];
  private readonly commanded: JointDeg = [0, 0, 0, 0, 0];
  private readonly velocity: JointDeg = [0, 0, 0, 0, 0];
  private hasFeedback = false;
  private permitted = false;
  private active = false;
  private holdRequested = false;
  private lastTick: number | null = null;
  private fraction = 0.2;

  constructor(limits: readonly JointLimits[]) {
    if (limits.length !== NUM_JOINTS) throw new Error("Expected limits for all five joints");
    this.limits = limits.map((limit) => ({
      lower: limit.lower * DEG, upper: limit.upper * DEG,
      velocity: limit.velocity * DEG, acceleration: limit.acceleration * DEG,
    }));
  }

  get target(): Readonly<JointDeg> | null { return this.hasFeedback ? this.commanded : null; }
  get moving(): boolean { return this.permitted && this.hasIntent(); }

  set speedPercent(value: number) {
    if (Number.isFinite(value)) this.fraction = Math.min(1, Math.max(0.05, value / 100));
  }

  /** Losing readiness clears held inputs: reconnect/homing cannot resume an old gesture. */
  sync(deg: JointDeg | null, ready: boolean): void {
    const valid = deg !== null && deg.every(Number.isFinite);
    if (valid) {
      for (let i = 0; i < NUM_JOINTS; i++) this.feedback[i] = deg[i];
      this.hasFeedback = true;
    }
    const permitted = ready && valid;
    if (!permitted || !this.permitted) {
      this.release();
      this.holdRequested = false;
    }
    this.permitted = permitted;
    if (!this.active && this.hasFeedback) this.resetTarget();
  }

  key(code: string, down: boolean, repeat = false): boolean {
    const modifier = MODIFIER_CODES[code] === true;
    if (!modifier && !JOINT_KEYS.some((pair) => pair[0] === code || pair[1] === code)) return false;
    if (!down) {
      const wasMoving = this.hasIntent();
      this.keys.delete(code);
      if (modifier) this.release();
      else if (wasMoving && !this.hasIntent()) this.requestHold();
    } else if (this.permitted && !repeat) {
      this.keys.add(code);
    }
    return true;
  }

  pressPointer(joint: number, direction: -1 | 1): void {
    if (!this.permitted || !Number.isInteger(joint) || joint < 0 || joint >= NUM_JOINTS) return;
    this.pointer = { joint, direction };
  }

  /** Release, focus loss and explicit hold all stop without disabling powered holding. */
  release(): void {
    const wasMoving = this.hasIntent() || this.active;
    this.keys.clear();
    this.pointer = null;
    if (wasMoving) this.requestHold();
  }

  tick(nowMs: number): JointDeg | null {
    const elapsed = this.lastTick === null ? 1000 / CMD_HZ : nowMs - this.lastTick;
    this.lastTick = nowMs;
    if (!this.permitted || !this.hasFeedback) return null;
    if (this.hasIntent() && (elapsed > MAX_TICK_GAP_MS || elapsed < 0)) this.release();
    if (!this.hasIntent()) {
      if (!this.holdRequested) return null;
      this.holdRequested = false;
      return [...this.feedback];
    }
    this.holdRequested = false;
    if (!this.active) {
      this.resetTarget();
      this.active = true;
    }
    // Never catch up a delayed browser callback with a large target jump.
    const dt = Math.min(0.04, Math.max(0, elapsed / 1000));
    for (let i = 0; i < NUM_JOINTS; i++) {
      const limit = this.limits[i];
      const desired = this.direction(i) * limit.velocity * this.fraction;
      const change = limit.acceleration * dt;
      this.velocity[i] += Math.min(change, Math.max(-change, desired - this.velocity[i]));
      const next = this.commanded[i] + this.velocity[i] * dt;
      this.commanded[i] = Math.min(limit.upper, Math.max(limit.lower, next));
      if (this.commanded[i] !== next) this.velocity[i] = 0;
    }
    return [...this.commanded];
  }

  private direction(joint: number): number {
    const pair = JOINT_KEYS[joint];
    const modifier = this.keys.has("ShiftLeft") || this.keys.has("ShiftRight");
    let direction = modifier ? Number(this.keys.has(pair[0])) - Number(this.keys.has(pair[1])) : 0;
    if (this.pointer?.joint === joint) direction += this.pointer.direction;
    return Math.min(1, Math.max(-1, direction));
  }

  private hasIntent(): boolean {
    return JOINT_KEYS.some((_, i) => this.direction(i) !== 0);
  }

  private resetTarget(): void {
    for (let i = 0; i < NUM_JOINTS; i++) {
      this.commanded[i] = this.feedback[i];
      this.velocity[i] = 0;
    }
  }

  private requestHold(): void {
    this.active = false;
    this.holdRequested = this.permitted && this.hasFeedback;
    this.resetTarget();
  }
}
