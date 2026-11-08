// Elbow + hand (absolute) mapping: the operator's forearm drives the arm's forearm directly. The arm's elbow (j2)
// stands in for the operator's elbow, so the tool target is the operator's elbow→knuckle vector placed at j2,
// and the tool orientation is the operator's hand orientation (wrist→knuckle direction, back-of-hand roll). Leaning or shifting moves elbow and knuckle
// together and cancels out, and re-engaging can't ratchet the arm away from your pose (unlike the clutch).
// Works in the operator's facing frame (head yaw at engage), like the clutch. Needs body tracking for the elbow.
// On engage the target blends from the arm's current tool pose to the mirrored pose over BLEND_S, so engaging
// with your arm posed differently from the robot's doesn't trip the IK step check.
// Elbow fusion: the body-tracked elbow (camera-tracked on Quest 3) only sets the forearm's direction. The forearm
// hangs off the more precise hand-tracked wrist at a length averaged over the engage blend, so elbow noise
// along the forearm doesn't change reach. A frame whose elbow→wrist length is off by more than
// MAX_FOREARM_STRETCH is dropped (WebXR body tracking has no per-joint confidence).

import { Matrix4, Quaternion, Vector3 } from "three";
import type { Quat } from "@arm-mirror/protocol";
import { xrToArmQuat, xrToArmVec, type ArmModel, type Pose as ToolPose, type Vec3 } from "@arm-mirror/kinematics";
import { facingOf } from "./clutch";
import type { HandSample, Pose } from "./tracking";

/** Seconds from the arm's pose at engage to the mirrored pose. At 72 Hz, 1.5 s keeps even a 180° j1 swing near 1.7°/frame. */
export const BLEND_S = 1.5;
/** Fraction the elbow→wrist length may differ from the measured forearm before the frame is dropped. */
export const MAX_FOREARM_STRETCH = 0.2;
/**
 * The claw points this much below the wrist→knuckle line, toward where the fingers point during the pinch.
 * Team choice from headset testing: pointing the claw down then needs less wrist flex, which is easier on the
 * wrist and turns the palm toward the head less (fewer system-menu palm pinches).
 */
export const PINCH_PITCH_DOWN_DEG = 20;
const PINCH_PITCH = new Quaternion().setFromAxisAngle(new Vector3(1, 0, 0), -PINCH_PITCH_DOWN_DEG * (Math.PI / 180));

export class ElbowMirror {
  /** j2 pivot: reach from the j1 axis (it swings with j1) and height above the base, from arm.urdf. */
  private readonly elbowReach: number;
  private readonly elbowHeight: number;
  private readonly facingInv = new Quaternion();
  private tool: ToolPose | null = null;
  /** Arm tool pose minus the mirrored pose at the first tracked frame after engage; decays to zero over BLEND_S. */
  private offset: { p: Vec3; q: Quaternion; t0: number } | null = null;
  private forearmSum = 0;
  private forearmN = 0;

  /** Operator forearm → arm scale. Arm j2→tool is 0.38 m, close to a human elbow→knuckle; tune per operator. */
  constructor(model: ArmModel, private readonly scale = 1.0) {
    const origin = (name: string) => model.chain.find((j) => j.name === name)!.xyz;
    this.elbowReach = Math.hypot(origin("j2")[0], origin("j2")[1]);
    this.elbowHeight = origin("j1")[2] + origin("j2")[2];
  }

  /** The blend starts from this arm tool pose (arm base frame). */
  engage(head: Pose, tool: ToolPose): void {
    this.facingInv.copy(facingOf(head)).invert();
    this.tool = tool;
    this.offset = null;
    this.forearmSum = this.forearmN = 0;
  }

  /** Operator forearm length (m) measured since engage, or null before the first tracked frame. */
  get forearm(): number | null {
    return this.forearmN ? this.forearmSum / this.forearmN : null;
  }

  /** Tool target in the arm base frame, or null before the first engage or for an implausible elbow. `t` (seconds) drives the engage blend. */
  target(hand: HandSample, elbow: Vec3, t: number): { p: Vec3; q: Quat } | null {
    if (!this.tool) return null;
    const wrist = new Vector3(...hand.wrist.position);
    const forearm = wrist.clone().sub(new Vector3(...elbow));
    const len = forearm.length();
    if (!(len > 0) || (this.forearm !== null && Math.abs(len / this.forearm - 1) > MAX_FOREARM_STRETCH)) return null;
    if (!this.offset || t - this.offset.t0 < BLEND_S) {
      this.forearmSum += len;
      this.forearmN++;
    }
    const knuckle = new Vector3(...hand.knuckle);
    const d = knuckle.clone().sub(wrist).addScaledVector(forearm, this.forearm! / len).applyQuaternion(this.facingInv);
    const v = xrToArmVec([d.x, d.y, d.z]).map((x) => x * this.scale);
    const yaw = Math.atan2(v[1], v[0]); // forearm heading; the arm's j1 follows it
    const p: Vec3 = [v[0] + this.elbowReach * Math.cos(yaw), v[1] + this.elbowReach * Math.sin(yaw), v[2] + this.elbowHeight];
    // Hand frame: −Z along the fingers, +Y out of the back of the hand; xrToArmQuat turns those into tool +X and +Z,
    // which is the tool frame at home (all joints 0). −Z comes from the wrist→knuckle positions, because on a Quest 3
    // the wrist joint's own −Z read ~42° above a straight hand; only roll (+Y) comes from the wrist frame.
    // TODO: verify gripper roll on hardware.
    const z = wrist.clone().sub(knuckle).normalize();
    const x = new Vector3(0, 1, 0).applyQuaternion(new Quaternion(...hand.wrist.orientation)).cross(z).normalize();
    if (!(x.lengthSq() > 0)) return null; // knuckle on the wrist, or the back of the hand along the fingers
    const handQ = new Quaternion().setFromRotationMatrix(new Matrix4().makeBasis(x, new Vector3().crossVectors(z, x), z));
    const w = this.facingInv.clone().multiply(handQ).multiply(PINCH_PITCH);
    const q = new Quaternion(...xrToArmQuat([w.x, w.y, w.z, w.w]));

    this.offset ??= {
      p: this.tool.position.map((x, i) => x - p[i]) as Vec3,
      q: new Quaternion(...this.tool.quaternion).multiply(q.clone().invert()),
      t0: t,
    };
    const k = Math.max(0, 1 - (t - this.offset.t0) / BLEND_S);
    const { p: dp, q: dq } = this.offset;
    q.premultiply(new Quaternion().slerp(dq, k));
    return { p: p.map((x, i) => x + k * dp[i]) as Vec3, q: [q.x, q.y, q.z, q.w] };
  }
}
