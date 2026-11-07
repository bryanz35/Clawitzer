import type { Quat } from "@arm-mirror/protocol";

export type Vec3 = [number, number, number];

export const DEG = 180 / Math.PI;
export const RAD = Math.PI / 180;

/** URDF fixed-axis roll/pitch/yaw → quaternion [x, y, z, w]. R = Rz(yaw) · Ry(pitch) · Rx(roll). */
export function rpyToQuat([roll, pitch, yaw]: Vec3): Quat {
  const cr = Math.cos(roll / 2), sr = Math.sin(roll / 2);
  const cp = Math.cos(pitch / 2), sp = Math.sin(pitch / 2);
  const cy = Math.cos(yaw / 2), sy = Math.sin(yaw / 2);
  return [
    sr * cp * cy - cr * sp * sy,
    cr * sp * cy + sr * cp * sy,
    cr * cp * sy - sr * sp * cy,
    cr * cp * cy + sr * sp * sy,
  ];
}

/** Angle (radians, 0…π) between two unit quaternions. */
export function quatAngle(a: ArrayLike<number>, b: ArrayLike<number>): number {
  const d = Math.abs(a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]);
  return 2 * Math.acos(Math.min(1, d));
}

// WebXR frame: +X right, +Y up, −Z forward. Arm (URDF) frame: +X forward, +Y left, +Z up.
// arm = M · xr with M = [[0,0,-1],[-1,0,0],[0,1,0]] (a proper rotation, det = +1), so a
// quaternion's vector part maps the same way and w is unchanged.

/** WebXR-frame vector → arm-base-frame vector. Translation to the arm base is the caller's job. */
export function xrToArmVec([x, y, z]: Vec3): Vec3 {
  return [-z, -x, y];
}

/** WebXR-frame orientation → arm-base-frame orientation. */
export function xrToArmQuat([x, y, z, w]: Quat): Quat {
  return [-z, -x, y, w];
}
