import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { ArmIK, loadArm, quatAngle, rpyToQuat, xrToArmQuat, xrToArmVec } from "../src";

/** Effectively disables the step cap, for tests that check convergence rather than the cap. */
const MAX_STEP_FOR_TESTS = 1e9;

const urdf = readFileSync(new URL("../../../hardware/urdf/arm.urdf", import.meta.url), "utf8");

describe("loadArm", () => {
  it("reads the placeholder URDF", () => {
    const arm = loadArm(urdf);
    expect(arm.names).toEqual(["j1", "j2", "j3", "j4", "j5"]);
    expect(arm.restPose).toEqual([0, 0, 0, 0, 0]);
    expect(arm.limits[0]).toEqual({ lower: -0.7854, upper: 0.7854, velocity: 0.5, acceleration: 1 });
    expect(arm.baseLink).toBe("base_link");
    expect(arm.tipLink).toBe("tool");
  });

  it("fails loudly on unsupported or missing data", () => {
    expect(() => loadArm(urdf.replace('type="revolute"', 'type="prismatic"'))).toThrow(/unsupported type/);
    expect(() => loadArm(urdf.replace('<arm_mirror home="0" acceleration="1.0"/>', ""))).toThrow(/arm_mirror/);
    expect(() => loadArm(urdf.replace('<axis xyz="0 0 1"/>', '<axis xyz="0 0.7 0.7"/>'))).toThrow(/axis/);
  });
});

describe("ArmIK", () => {
  const model = loadArm(urdf);

  it("reproduces the rest pose", () => {
    const ik = new ArmIK(model);
    const rest = ik.forward([0, 0, 0, 0, 0]);
    const r = ik.solve(rest.position, rest.quaternion);
    expect(r.reachable).toBe(true);
    expect(r.stepRejected).toBe(false);
    r.deg.forEach((d) => expect(Math.abs(d)).toBeLessThan(0.1));
  });

  it("reaches a reachable non-rest pose (position + 2 orientation DOF)", () => {
    const ik = new ArmIK(model, { maxStepDeg: MAX_STEP_FOR_TESTS });
    const target = ik.forward([20, -15, 10, 25, -10]);
    let r = ik.solve(target.position, target.quaternion);
    for (let i = 0; i < 20 && !r.reachable; i++) r = ik.solve(target.position, target.quaternion);
    expect(r.reachable).toBe(true);
    const reached = ik.forward(r.deg);
    const err = Math.hypot(...reached.position.map((p, i) => p - target.position[i]));
    expect(err).toBeLessThan(0.005);
  });

  it("reports an unreachable target without exceeding physical joint limits", () => {
    const ik = new ArmIK(model, { maxStepDeg: MAX_STEP_FOR_TESTS });
    // Orientation and position compete; an unreachable optimum need not pin a joint at its limit.
    const quat = rpyToQuat([0, 0, 0]);
    let r = ik.solve([-0.2, 0.2, 0.08], quat);
    for (let i = 0; i < 20; i++) r = ik.solve([-0.2, 0.2, 0.08], quat);
    expect(r.reachable).toBe(false);
    r.deg.forEach((d) => {
      expect(d).toBeGreaterThanOrEqual(-45.001);
      expect(d).toBeLessThanOrEqual(45.001);
    });
  });

  it("holds the previous pose when a solution jumps more than maxStepDeg", () => {
    const ik = new ArmIK(model, { maxStepDeg: 5 });
    const far = ik.forward([40, -40, 30, 40, -30]);
    const before = ik.deg;
    const r = ik.solve(far.position, far.quaternion);
    expect(r.stepRejected).toBe(true);
    expect(r.reachable).toBe(false);
    r.deg.forEach((d, i) => expect(Math.abs(d - before[i])).toBeLessThanOrEqual(5));
    expect(r.deg).toEqual(before);
  });

  it("accepts small per-frame motions under the step cap", () => {
    const ik = new ArmIK(model, { maxStepDeg: 5 });
    let prev = ik.deg;
    for (let k = 1; k <= 30; k++) {
      const t = ik.forward([k * 0.5, -k * 0.3, 0, k * 0.4, 0]);
      const r = ik.solve(t.position, t.quaternion);
      expect(r.stepRejected).toBe(false);
      r.deg.forEach((d, i) => expect(Math.abs(d - prev[i])).toBeLessThanOrEqual(5));
      prev = r.deg;
    }
  });

  it("forward() does not disturb solver state", () => {
    const ik = new ArmIK(model);
    ik.setCurrent([10, 0, 0, 0, 0]);
    ik.forward([40, 40, 40, 40, 40]);
    expect(ik.deg[0]).toBeCloseTo(10, 4);
  });

  it("keeps gripper opening independent from tool pose and IK targets", () => {
    const ik = new ArmIK(model, { maxStepDeg: MAX_STEP_FOR_TESTS });
    const closed = ik.forward([10, -10, 5, 15, -30]);
    const open = ik.forward([10, -10, 5, 15, 30]);
    expect(open.position).toEqual(closed.position);
    expect(open.quaternion).toEqual(closed.quaternion);
    ik.setCurrent([0, 0, 0, 0, 23]);
    for (let i = 0; i < 20; ++i) {
      expect(ik.solve(open.position, open.quaternion).deg[4]).toBeCloseTo(23, 6);
    }
  });
});

describe("frame conversion", () => {
  it("maps WebXR forward/up/right to arm +X/+Z/−Y", () => {
    expect(xrToArmVec([0, 0, -1])).toEqual([1, -0, 0]);
    expect(xrToArmVec([0, 1, 0])).toEqual([-0, -0, 1]);
    expect(xrToArmVec([1, 0, 0])).toEqual([-0, -1, 0]);
  });

  it("maps a WebXR yaw (about +Y) to an arm yaw (about +Z)", () => {
    const a = 0.3;
    const xrYaw: [number, number, number, number] = [0, Math.sin(a / 2), 0, Math.cos(a / 2)];
    expect(quatAngle(xrToArmQuat(xrYaw), rpyToQuat([0, 0, a]))).toBeLessThan(1e-6);
  });
});
