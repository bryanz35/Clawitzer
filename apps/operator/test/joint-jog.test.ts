import { describe, expect, it } from "vitest";
import { DEG, type JointLimits } from "@arm-mirror/kinematics";
import type { JointDeg } from "@arm-mirror/protocol";
import { JointJog } from "../src/joint-jog";

const limits: JointLimits[] = Array.from({ length: 5 }, () => ({
  lower: -10 / DEG, upper: 10 / DEG, velocity: 20 / DEG, acceleration: 40 / DEG,
}));
const origin: JointDeg = [0, 0, 0, 0, 0];

describe("normal joint jogging", () => {
  it("requires a deadman and ramps simultaneous joint motion inside URDF limits", () => {
    const jog = new JointJog(limits);
    jog.speedPercent = 100;
    jog.sync(origin, true);
    jog.key("KeyA", true);
    expect(jog.tick(0)).toBeNull();
    jog.key("ShiftLeft", true);
    jog.key("KeyW", true);
    const first = jog.tick(20)!;
    expect(first[0]).toBeCloseTo(0.016);
    expect(first[1]).toBeCloseTo(-0.016);
    expect(first.slice(2)).toEqual([0, 0, 0]);
    const second = jog.tick(40)!;
    expect(second[0] - first[0]).toBeCloseTo(0.032);
    for (let time = 60; time <= 2000; time += 20) {
      const command = jog.tick(time)!;
      expect(command[0]).toBeLessThanOrEqual(10);
      expect(command[1]).toBeGreaterThanOrEqual(-10);
    }
    expect(jog.target?.[0]).toBeCloseTo(10);
    expect(jog.target?.[1]).toBeCloseTo(-10);
  });

  it("releases to the latest firmware pose, not a queued future target", () => {
    const jog = new JointJog(limits);
    jog.sync(origin, true);
    jog.key("ShiftLeft", true);
    jog.key("KeyA", true);
    for (let time = 0; time <= 200; time += 20) jog.tick(time);
    const reported: JointDeg = [0.2, -0.1, 0, 0, 0];
    jog.sync(reported, true);
    jog.key("ShiftLeft", false);
    expect(jog.tick(220)).toEqual(reported);
    expect(jog.tick(240)).toBeNull();
    jog.key("KeyA", true, true);
    expect(jog.tick(260)).toBeNull();
  });

  it("requires fresh inputs after loss of readiness and starts from the new pose", () => {
    const jog = new JointJog(limits);
    jog.sync(origin, true);
    jog.key("ShiftLeft", true);
    jog.key("KeyA", true);
    jog.tick(0);
    jog.sync(null, false);
    expect(jog.tick(20)).toBeNull();
    const reported: JointDeg = [2, 1, -1, 0, 0];
    jog.sync(reported, true);
    jog.key("ShiftLeft", true, true);
    jog.key("KeyA", true, true);
    expect(jog.tick(40)).toBeNull();
    jog.key("ShiftLeft", true);
    jog.key("KeyA", true);
    const command = jog.tick(60)!;
    expect(command[0]).toBeCloseTo(2.016);
    expect(command.slice(1)).toEqual(reported.slice(1));
  });

  it("stops a held gesture after a stalled browser callback instead of catching up", () => {
    const jog = new JointJog(limits);
    jog.sync(origin, true);
    jog.key("ShiftLeft", true);
    jog.key("KeyA", true);
    jog.tick(0);
    expect(jog.tick(500)).toEqual(origin);
    expect(jog.moving).toBe(false);
    expect(jog.tick(520)).toBeNull();
  });

  it("uses held mouse jogging without latching it after release or a disconnect", () => {
    const jog = new JointJog(limits);
    jog.sync(origin, true);
    jog.pressPointer(4, -1);
    expect(jog.tick(0)?.[4]).toBeLessThan(0);
    jog.release();
    expect(jog.tick(20)).toEqual(origin);
    expect(jog.tick(40)).toBeNull();
    jog.pressPointer(4, 1);
    jog.tick(60);
    jog.sync(origin, false);
    jog.sync(origin, true);
    expect(jog.tick(80)).toBeNull();
  });
});
