// Immersive video: the phone's full wide-FOV frame on a big plane placed where the camera
// actually points (phone orientation, yaw re-zeroed to the XR frame). The stand follows the head,
// so the view follows gaze while the world stays put. The frame is shrunk to `displayHFovDeg` so both
// edges sit inside the headset's view; a uniformly scaled pinhole image is still undistorted (just zoomed out).

import { DataTexture, Group, LinearFilter, Mesh, MeshBasicMaterial, PlaneGeometry, Quaternion, SRGBColorSpace, Vector3, VideoTexture } from "three";
import { CAMERA_MAX_DEG, CAMERA_MIN_DEG, type Quat } from "@arm-mirror/protocol";
import type { Pose } from "./tracking";

export interface VideoPanelOptions {
  /** Horizontal / vertical FOV of the captured stream (landscape). */
  sourceHFovDeg: number;
  sourceVFovDeg: number;
  /** Horizontal angle the whole frame subtends in the headset; vertical follows the source aspect. */
  displayHFovDeg: number;
  /** Plane distance from the eye. Far enough that the eyes' offset from the pivot is negligible. */
  distanceM: number;
  /** Fraction of each edge faded to black. */
  feather: number;
}

export const DEFAULT_VIDEO: VideoPanelOptions = {
  // Galaxy S25 Ultra 2.2 mm ultrawide, full 4:3 sensor (pinhole FOV the phone app reports on its camera button).
  sourceHFovDeg: 105,
  sourceVFovDeg: 88,
  // Quest 3 is ~110°×96° but blurs toward the lens edges; 80° keeps both edges clearly in view.
  displayHFovDeg: 80,
  distanceM: 10,
  feather: 0.02,
};

/** The −Z axis rotated by q, as [x, y, z]. */
function forward(q: Quat): [number, number, number] {
  const f = new Vector3(0, 0, -1).applyQuaternion(new Quaternion(...q));
  return [f.x, f.y, f.z];
}

/** Yaw (CCW from above) and pitch (up +) of the WebXR head's forward (−Z) axis. */
export function headYawPitch(q: Quat): [number, number] {
  const f = forward(q);
  return [Math.atan2(-f[0], -f[2]), Math.asin(Math.max(-1, Math.min(1, f[1])))];
}

/**
 * Pan servo command (90 = ahead) for a yaw in degrees relative to the arm base (the stand rides j1),
 * moving at most `maxStepDeg` from `lastDeg`. The stand spans ±90°: past that the head is behind it,
 * so hold the end nearest the last command instead of flipping ends where the yaw wraps at 180°.
 */
export function panCommandDeg(yawDeg: number, lastDeg: number, maxStepDeg: number, sign = 1): number {
  const y = ((((yawDeg + 180) % 360) + 360) % 360) - 180;
  const wanted = Math.abs(y) <= 90 ? 90 + sign * y : lastDeg >= 90 ? CAMERA_MAX_DEG : CAMERA_MIN_DEG;
  return lastDeg + Math.max(-maxStepDeg, Math.min(maxStepDeg, wanted - lastDeg));
}

/**
 * Yaw (CCW from above) and pitch of the phone's rear camera. camOrient is the device frame
 * relative to a z-up world frame with an arbitrary heading (no compass); the rear camera looks along −Z.
 * Independent of roll about the lens axis, so the landscape mount needs no change here.
 */
export function cameraYawPitch(q: Quat): [number, number] {
  const f = forward(q);
  return [Math.atan2(-f[0], f[1]), Math.asin(Math.max(-1, Math.min(1, f[2])))];
}

/**
 * Heading offset (XR yaw − camera yaw) eased `gain` of the way toward centering the panel on `standYaw`,
 * the XR-frame yaw the settled stand was commanded to. Null (uncalibrated) snaps. Wraps at ±π.
 */
export function recenterOffset(offset: number | null, standYaw: number, camYaw: number, gain: number): number {
  const target = standYaw - camYaw;
  if (offset === null) return target;
  const d = target - offset;
  return offset + gain * Math.atan2(Math.sin(d), Math.cos(d));
}

/** Alpha mask: opaque middle, smoothstep fade over `feather` of each edge. */
function featherMask(feather: number, n = 64): DataTexture {
  const ramp = (t: number) => {
    const x = Math.min(1, Math.min(t, 1 - t) / feather);
    return x * x * (3 - 2 * x);
  };
  const data = new Uint8Array(n * n * 4);
  for (let j = 0; j < n; j++)
    for (let i = 0; i < n; i++) data.fill(Math.round(255 * ramp((i + 0.5) / n) * ramp((j + 0.5) / n)), (j * n + i) * 4, (j * n + i + 1) * 4);
  const tex = new DataTexture(data, n, n);
  tex.magFilter = tex.minFilter = LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

export class VideoPanel {
  /** Pivot at the eye; the plane hangs `distanceM` down its −Z. */
  readonly object = new Group();
  private readonly video: HTMLVideoElement;
  private yawOffset: number | null = null;

  constructor(opts: Partial<VideoPanelOptions> = {}) {
    const o = { ...DEFAULT_VIDEO, ...opts };
    this.video = document.createElement("video");
    this.video.muted = true;
    this.video.playsInline = true;
    const texture = new VideoTexture(this.video);
    texture.colorSpace = SRGBColorSpace;
    const tan = (deg: number) => Math.tan((deg * Math.PI) / 360);
    const widthM = 2 * o.distanceM * tan(o.displayHFovDeg);
    const plane = new Mesh(
      new PlaneGeometry(widthM, (widthM * tan(o.sourceVFovDeg)) / tan(o.sourceHFovDeg)),
      new MeshBasicMaterial({ map: texture, alphaMap: featherMask(o.feather), transparent: true, depthWrite: false }),
    );
    plane.position.z = -o.distanceM;
    plane.renderOrder = -1; // behind the HUD
    this.object.add(plane);
  }

  setStream(stream: MediaStream): void {
    this.video.srcObject = stream;
    void this.video.play().catch((e) => console.warn("[video] play failed", e));
  }

  /**
   * Re-zero the heading offset between the XR frame and the phone's world frame so the panel centers on
   * `standYaw`. Call every frame while the stand has settled there: a one-shot zero drifts with the
   * gyro-only heading and keeps any error from the moment it was taken (head moving, pan trim changed).
   */
  recenter(cam: Quat, standYaw: number, gain: number): void {
    this.yawOffset = recenterOffset(this.yawOffset, standYaw, cameraYawPitch(cam)[0], gain);
  }

  /** A new XR session has a new heading; head-lock until the next recenter. */
  resetCalibration(): void {
    this.yawOffset = null;
  }

  /** Per frame. Head-locked until the first recenter, or without a camera orientation. */
  update(head: Pose | null, cam: Quat | null): void {
    if (!head) return;
    this.object.position.set(...head.position);
    let yaw: number, pitch: number;
    if (cam && this.yawOffset !== null) {
      [yaw, pitch] = cameraYawPitch(cam);
      yaw += this.yawOffset;
    } else {
      [yaw, pitch] = headYawPitch(head.orientation);
    }
    // Yaw/pitch only: the stand has no roll axis, and ignoring the sensor's roll keeps the horizon level.
    this.object.rotation.set(pitch, yaw, 0, "YXZ");
  }
}
