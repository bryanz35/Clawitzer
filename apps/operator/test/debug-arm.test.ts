import { describe, expect, it } from "vitest";
import { Vector3 } from "three";
import { ArmIK, loadArm } from "@arm-mirror/kinematics";
import urdfText from "../../../hardware/urdf/arm.urdf?raw";
import { DebugArm } from "../src/debug-arm";

describe("DebugArm", () => {
  it("puts the tool point where the IK's forward kinematics does", () => {
    const model = loadArm(urdfText);
    const ik = new ArmIK(model);
    const arm = new DebugArm(model);
    for (const deg of [[0, 0, 0, 0, 0], [30, -40, 25, 60, -20], [-120, 15, -80, -45, 90]]) {
      arm.setDeg(deg);
      arm.object.updateMatrixWorld(true);
      const [x, y, z] = ik.forward(deg).position; // arm base frame
      const tip = arm.tip.getWorldPosition(new Vector3());
      expect(tip.distanceTo(new Vector3(-y, z, -x))).toBeLessThan(1e-6);
    }
  });
});
