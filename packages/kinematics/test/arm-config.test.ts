import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { renderArmConfig, renderArmConfigKotlin } from "../../../tools/arm-config";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

// Firmware limits are the safety authority; a URDF edit without regenerating would leave them stale.
it("firmware arm_config.h matches arm.urdf (fix: npm run gen:arm-config)", () => {
  expect(read("../../../firmware/arm-controller/include/arm_config.h"))
    .toBe(renderArmConfig(read("../../../hardware/urdf/arm.urdf")));
});

// The phone's Return-home target must be the pose the firmware references to.
it("phone ArmConfig.kt matches arm.urdf (fix: npm run gen:arm-config)", () => {
  expect(read("../../../apps/robot-android/app/src/main/java/com/armmirror/robot/generated/ArmConfig.kt"))
    .toBe(renderArmConfigKotlin(read("../../../hardware/urdf/arm.urdf")));
});
