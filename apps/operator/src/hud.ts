// In-VR text panel. DOM elements aren't drawn in an immersive session, so status goes on a canvas
// texture attached to the camera (head-locked). Redraws are throttled: canvas → GPU upload isn't free on Quest.

import { CanvasTexture, Euler, Mesh, MeshBasicMaterial, PlaneGeometry, Quaternion, SRGBColorSpace, Vector3 } from "three";
import type { Quat } from "@arm-mirror/protocol";
import { DEG, type IKResult, type JointLimits } from "@arm-mirror/kinematics";
import { JOINT_LABELS } from "./joint-jog";
import type { HandSample } from "./tracking";

const W = 1024;
const H = 768;
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

/** Hand elevation (+ up) from the wrist→knuckle positions and from the wrist joint frame's −Z, to see whether tracking registers wrist flex. */
export function formatHandPitch(hand: HandSample | null): string {
  if (!hand) return "hand pitch: no hand";
  const joints = new Vector3(...hand.knuckle).sub(new Vector3(...hand.wrist.position)).normalize();
  const frame = new Vector3(0, 0, -1).applyQuaternion(new Quaternion(...hand.wrist.orientation));
  return `hand pitch: joints ${signedDeg(Math.asin(joints.y) * DEG)}  wrist frame ${signedDeg(Math.asin(frame.y) * DEG)}`;
}

const BAR_SLOTS = 9;

function signedDeg(d: number): string {
  return `${d >= 0 ? "+" : ""}${d.toFixed(1)}°`.padStart(7);
}

/** One line per joint (commanded, reported, position within limits) plus an IK result line. */
export function formatJoints(
  cmd: readonly number[],
  reported: readonly number[] | null,
  limits: readonly JointLimits[],
  ik: IKResult | null,
): string[] {
  const lines = cmd.map((d, i) => {
    const lo = limits[i].lower * DEG;
    const hi = limits[i].upper * DEG;
    const slot = Math.round(((d - lo) / (hi - lo)) * (BAR_SLOTS - 1));
    const bar = Array.from({ length: BAR_SLOTS }, (_, k) => (k === slot ? "•" : "·")).join("");
    const rep = reported ? signedDeg(reported[i]) : "    —  ";
    return `${JOINT_LABELS[i].padEnd(11)} ${signedDeg(d)}  rep ${rep}  [${bar}]`;
  });
  if (!ik) return [...lines, "ik: idle"];
  const state = ik.stepRejected ? "step rejected" : ik.reachable ? "ok" : "out of reach";
  const err = `err ${(ik.positionError * 1000).toFixed(0)} mm / ${(ik.rotationError * DEG).toFixed(1)}°`;
  return [...lines, `ik: ${state}${ik.clamped ? " · clamped" : ""} · ${err}`];
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
