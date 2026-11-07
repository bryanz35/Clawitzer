// World-locked video panel showing a crop of the phone's wide-FOV stream.
// Crop offset = head orientation − phone orientation (the phone rides the pan/tilt stand, so its
// sensor gives the true camera pose). The stand follows the head; the crop hides its lag.

import { Mesh, MeshBasicMaterial, PlaneGeometry, Quaternion, SRGBColorSpace, Vector3, VideoTexture } from "three";
import type { Quat } from "@arm-mirror/protocol";

export interface VideoPanelOptions {
  /** Horizontal / vertical FOV of the captured stream (landscape). */
  sourceHFovDeg: number;
  sourceVFovDeg: number;
  /** FOV of the crop shown on the panel. */
  cropHFovDeg: number;
  /** Panel width in meters; height follows the crop aspect. */
  widthM: number;
}

export const DEFAULT_VIDEO: VideoPanelOptions = {
  // Galaxy S25 Ultra 2.2 mm ultrawide, full 4:3 sensor (pinhole FOV the phone app reports on its camera button).
  sourceHFovDeg: 105,
  sourceVFovDeg: 88,
  cropHFovDeg: 90,
  // 2·2 m·tan(35°): at the 2 m panel distance (main.ts) the panel spans the 70° crop, so the view is life-size
  // and the video is not minified (minifying a non-mipmapped VideoTexture shimmers and loses detail).
  widthM: 2.8,
};

/** The −Z axis rotated by q, as [x, y, z]. */
function forward(q: Quat): [number, number, number] {
  const f = new Vector3(0, 0, -1).applyQuaternion(new Quaternion(...q));
  return [f.x, f.y, f.z];
}

function wrapPi(a: number): number {
  return Math.atan2(Math.sin(a), Math.cos(a));
}

/** Yaw (CCW from above) and pitch (up +) of the WebXR head's forward (−Z) axis. */
export function headYawPitch(q: Quat): [number, number] {
  const f = forward(q);
  return [Math.atan2(-f[0], -f[2]), Math.asin(Math.max(-1, Math.min(1, f[1])))];
}

/**
 * Yaw (CCW from above) and pitch of the phone's rear camera. AbsoluteOrientationSensor reports
 * the device frame relative to Earth ENU (x east, y north, z up); the rear camera looks along −Z.
 * Independent of roll about the lens axis, so the landscape mount needs no change here.
 */
export function cameraYawPitch(q: Quat): [number, number] {
  const f = forward(q);
  return [Math.atan2(-f[0], f[1]), Math.asin(Math.max(-1, Math.min(1, f[2])))];
}

export class VideoPanel {
  readonly mesh: Mesh;
  private readonly opts: VideoPanelOptions;
  private readonly video: HTMLVideoElement;
  private readonly texture: VideoTexture;
  private yawOffset: number | null = null;

  constructor(opts: Partial<VideoPanelOptions> = {}) {
    this.opts = { ...DEFAULT_VIDEO, ...opts };
    this.video = document.createElement("video");
    this.video.muted = true;
    this.video.playsInline = true;
    this.texture = new VideoTexture(this.video);
    this.texture.colorSpace = SRGBColorSpace;
    const cropVFov = (this.opts.cropHFovDeg * this.opts.sourceVFovDeg) / this.opts.sourceHFovDeg;
    const heightM = (this.opts.widthM * cropVFov) / this.opts.cropHFovDeg;
    this.mesh = new Mesh(new PlaneGeometry(this.opts.widthM, heightM), new MeshBasicMaterial({ map: this.texture }));
    this.texture.repeat.set(this.opts.cropHFovDeg / this.opts.sourceHFovDeg, cropVFov / this.opts.sourceVFovDeg);
    this.center();
  }

  setStream(stream: MediaStream): void {
    this.video.srcObject = stream;
    void this.video.play().catch((e) => console.warn("[video] play failed", e));
  }

  /**
   * Re-zero the heading offset between the XR frame and Earth north. Call while the operator
   * looks at what the camera is pointing at (e.g. when the stream starts, or a "recenter" input).
   */
  calibrate(head: Quat, cam: Quat): void {
    this.yawOffset = headYawPitch(head)[0] - cameraYawPitch(cam)[0];
  }

  /** Per frame. Without a camera orientation (or before calibration) the crop stays centered. */
  update(head: Quat | null, cam: Quat | null): void {
    if (!head || !cam) return;
    if (this.yawOffset === null) this.calibrate(head, cam);
    const [hy, hp] = headYawPitch(head);
    const [cy, cp] = cameraYawPitch(cam);
    const dYaw = wrapPi(hy - cy - (this.yawOffset ?? 0));
    const dPitch = hp - cp;
    // Linear angle→UV mapping. TODO: replace with the lens model once the phone is known.
    const rx = this.texture.repeat.x;
    const ry = this.texture.repeat.y;
    const u = 0.5 - rx / 2 - (dYaw * 180) / Math.PI / this.opts.sourceHFovDeg;
    const v = 0.5 - ry / 2 + (dPitch * 180) / Math.PI / this.opts.sourceVFovDeg;
    this.texture.offset.set(Math.min(1 - rx, Math.max(0, u)), Math.min(1 - ry, Math.max(0, v)));
  }

  private center(): void {
    this.texture.offset.set(0.5 - this.texture.repeat.x / 2, 0.5 - this.texture.repeat.y / 2);
  }
}
