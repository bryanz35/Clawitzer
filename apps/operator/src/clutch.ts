// Clutch (relative) mapping: hand motion since the deadman engaged moves the arm's tool from where it was.
// Needs only Quest hand tracking (no body elbow), starts with zero error so engaging never trips the IK
// step check, and works in the operator's facing frame so turning your body doesn't rotate the arm.
// Release, move the hand back, pinch again to ratchet.

import { Euler, Quaternion, Vector3 } from "three";
import type { Quat } from "@arm-mirror/protocol";
import { xrToArmQuat, xrToArmVec, type Pose as ToolPose, type Vec3 } from "@arm-mirror/kinematics";
import type { HandSample, Pose } from "./tracking";

/** The operator's facing frame: head yaw only (rotation about +Y), so looking up/down doesn't tilt the mapping. */
export function facingOf(head: Pose): Quaternion {
  const yaw = new Euler().setFromQuaternion(new Quaternion(...head.orientation), "YXZ").y;
  return new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), yaw);
}

export class Clutch {
  private readonly handPos = new Vector3();
  private readonly handQuatInv = new Quaternion();
  /** Head yaw at engage (rotation about +Y) and its inverse. */
  private readonly facing = new Quaternion();
  private readonly facingInv = new Quaternion();
  private tool: ToolPose | null = null;

  /** Hand → arm displacement scale. Arm elbow→tool is 0.38 m, close to a human elbow→knuckle; tune per operator. */
  constructor(private readonly scale = 1.0) {}

  /** Anchor: this hand pose now corresponds to the arm's current tool pose (arm base frame). */
  engage(hand: HandSample, head: Pose, tool: ToolPose): void {
    this.handPos.set(...hand.knuckle);
    this.handQuatInv.set(...hand.wrist.orientation).invert();
    this.facing.copy(facingOf(head));
    this.facingInv.copy(this.facing).invert();
    this.tool = tool;
  }

  /** Tool target in the arm base frame, or null before the first engage. */
  target(hand: HandSample): { p: Vec3; q: Quat } | null {
    if (!this.tool) return null;
    const d = new Vector3(...hand.knuckle).sub(this.handPos).applyQuaternion(this.facingInv);
    const dArm = xrToArmVec([d.x, d.y, d.z]);
    const p = this.tool.position.map((x, i) => x + this.scale * dArm[i]) as Vec3;
    // World-frame wrist rotation since engage, re-expressed in the operator's facing frame.
    const dq = this.facingInv.clone()
      .multiply(new Quaternion(...hand.wrist.orientation))
      .multiply(this.handQuatInv)
      .multiply(this.facing);
    const q = new Quaternion(...xrToArmQuat([dq.x, dq.y, dq.z, dq.w])).multiply(new Quaternion(...this.tool.quaternion));
    return { p, q: [q.x, q.y, q.z, q.w] };
  }
}
