import { readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { renderArmConfig } from "../../../tools/arm-config";

const read = (path: string) => readFileSync(new URL(path, import.meta.url), "utf8");

// Firmware limits are the safety authority; a URDF edit without regenerating would leave them stale.
it("firmware arm_config.h matches arm.urdf (fix: npm run gen:arm-config)", () => {
  expect(read("../../../firmware/arm-controller/include/arm_config.h"))
    .toBe(renderArmConfig(read("../../../hardware/urdf/arm.urdf")));
});
