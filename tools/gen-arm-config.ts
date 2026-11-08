// hardware/urdf/arm.urdf → firmware/arm-controller/include/arm_config.h + the phone app's ArmConfig.kt
// Run: npm run gen:arm-config. Fails loudly (non-zero exit) on anything missing or unsupported.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { renderArmConfig, renderArmConfigKotlin } from "./arm-config";

const URDF_PATH = fileURLToPath(new URL("../hardware/urdf/arm.urdf", import.meta.url));
const OUT_PATH = fileURLToPath(new URL("../firmware/arm-controller/include/arm_config.h", import.meta.url));
const KT_PATH = fileURLToPath(new URL("../apps/robot-android/app/src/main/java/com/armmirror/robot/generated/ArmConfig.kt", import.meta.url));

try {
  const urdf = readFileSync(URDF_PATH, "utf8");
  const header = renderArmConfig(urdf);
  const kotlin = renderArmConfigKotlin(urdf);
  writeFileSync(OUT_PATH, header);
  console.log(`wrote ${OUT_PATH}`);
  writeFileSync(KT_PATH, kotlin);
  console.log(`wrote ${KT_PATH}`);
} catch (e) {
  console.error(`gen-arm-config: ${e instanceof Error ? e.message : e}`);
  process.exit(1);
}
