/** Five logical joints: base, elbow, differential roll/pitch, gripper. Must match hardware/urdf/arm.urdf. */
export const NUM_JOINTS = 5;

/** Independent camera servo: not an arm joint, not IK, not calibrated. */
export const CAMERA_MIN_DEG = 0;
export const CAMERA_MAX_DEG = 180;

/** Phone → MCU serial link. */
export const SERIAL_BAUD = 115200;

/** Joint command rate, phone → MCU. */
export const CMD_HZ = 50;

/** Status line rate, MCU → phone. */
export const STATUS_HZ = 10;

/** Firmware holds position if no valid command arrives within this window. */
export const WATCHDOG_MS = 200;

/**
 * Largest per-frame change in any joint that the client IK accepts. Bigger jumps are rejected
 * (the arm holds), per safety invariant 6. Firmware velocity/accel limits apply independently.
 * TODO: tune on the real arm. 5° per frame at 72 Hz is roughly 360°/s, far above the
 * conservative firmware velocity limit, so this only catches IK flips.
 */
export const MAX_JOINT_STEP_DEG = 5;

/** Serial sequence numbers are uint16 and wrap. Compare with `seqIsNewer`, never with `>`. */
export const SEQ_MODULUS = 0x10000;
