// hardware/urdf/arm.urdf → firmware/arm-controller/include/arm_config.h
// Run: npm run gen:arm-config. Fails loudly (non-zero exit) on anything missing or unsupported.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { renderArmConfig } from "./arm-config";

const URDF_PATH = fileURLToPath(new URL("../hardware/urdf/arm.urdf", import.meta.url));
const OUT_PATH = fileURLToPath(new URL("../firmware/arm-controller/include/arm_config.h", import.meta.url));

try {
  writeFileSync(OUT_PATH, renderArmConfig(readFileSync(URDF_PATH, "utf8")));
  console.log(`wrote ${OUT_PATH}`);
} catch (e) {
  console.error(`gen-arm-config: ${e instanceof Error ? e.message : e}`);
  process.exit(1);
}
