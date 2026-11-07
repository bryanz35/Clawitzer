// In-VR text panel. DOM elements aren't drawn in an immersive session, so status goes on a canvas
// texture attached to the camera (head-locked). Redraws are throttled: canvas → GPU upload isn't free on Quest.

import { CanvasTexture, Euler, Mesh, MeshBasicMaterial, PlaneGeometry, Quaternion, SRGBColorSpace } from "three";
import type { Quat } from "@arm-mirror/protocol";

const W = 1024;
const H = 512;
const REDRAW_MS = 100;

/** Head orientation as text. Euler order YXZ: yaw about +Y (left +), pitch about X (up +), roll about Z (tilt left +). */
export function formatHead(q: Quat | null): string[] {
  if (!q) return ["head: no pose"];
  const e = new Euler().setFromQuaternion(new Quaternion(...q), "YXZ");
  const d = (r: number) => ((r * 180) / Math.PI).toFixed(1).padStart(6);
  return [
    `yaw ${d(e.y)}°  pitch ${d(e.x)}°  roll ${d(e.z)}°`,
    `q [${q.map((v) => v.toFixed(3)).join(", ")}]`,
  ];
}

export class Hud {
  readonly mesh: Mesh;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly texture: CanvasTexture;
  private lastDrawMs = -Infinity;

  constructor(widthM = 0.32) {
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    this.ctx = canvas.getContext("2d")!;
    this.texture = new CanvasTexture(canvas);
    this.texture.colorSpace = SRGBColorSpace;
    const material = new MeshBasicMaterial({ map: this.texture, transparent: true, depthTest: false });
    this.mesh = new Mesh(new PlaneGeometry(widthM, (widthM * H) / W), material);
    this.mesh.renderOrder = 999; // draw over the scene
  }

  setLines(lines: string[], nowMs: number): void {
    if (nowMs - this.lastDrawMs < REDRAW_MS) return;
    this.lastDrawMs = nowMs;
    const c = this.ctx;
    c.clearRect(0, 0, W, H);
    c.fillStyle = "rgba(0, 0, 0, 0.6)";
    c.fillRect(0, 0, W, H);
    c.fillStyle = "#eee";
    c.font = "36px ui-monospace, monospace";
    lines.forEach((line, i) => c.fillText(line, 24, 56 + i * 48, W - 48));
    this.texture.needsUpdate = true;
  }
}
