// Reads the operator's hand, elbow and head from a WebXR frame.
// Every missing pose is `null`, never zeros (safety invariant 5: callers hold the last good pose).

import type { Quat } from "@arm-mirror/protocol";
import type { Vec3 } from "@arm-mirror/kinematics";

export interface Pose {
  position: Vec3;
  /** [x, y, z, w], WebXR frame. */
  orientation: Quat;
}

export interface HandSample {
  wrist: Pose;
  /** Knuckle of the middle finger: the point the arm's tool frame tracks. */
  knuckle: Vec3;
  thumbTip: Vec3;
  indexTip: Vec3;
}

export interface TrackingSample {
  hand: HandSample | null;
  elbow: Vec3 | null;
  head: Pose | null;
}

// TODO: verify on device. In Meta's body-tracking joint set, "<side>-arm-lower" starts at the elbow.
const ELBOW_JOINT = { left: "left-arm-lower", right: "right-arm-lower" } as const;

let loggedBodyJoints = false;

function finite(...xs: number[]): boolean {
  return xs.every(Number.isFinite);
}

function toPose(t: XRRigidTransform): Pose | null {
  const p = t.position;
  const o = t.orientation;
  if (!finite(p.x, p.y, p.z, o.x, o.y, o.z, o.w)) return null;
  return { position: [p.x, p.y, p.z], orientation: [o.x, o.y, o.z, o.w] };
}

function jointPose(frame: XRFrame, hand: XRHand, joint: XRHandJoint, ref: XRReferenceSpace): Pose | null {
  const space = hand.get(joint);
  if (!space || !frame.getJointPose) return null;
  const pose = frame.getJointPose(space, ref);
  return pose ? toPose(pose.transform) : null;
}

function readHand(frame: XRFrame, ref: XRReferenceSpace, side: XRHandedness): HandSample | null {
  for (const source of frame.session.inputSources) {
    if (source.handedness !== side || !source.hand) continue;
    const wrist = jointPose(frame, source.hand, "wrist", ref);
    const knuckle = jointPose(frame, source.hand, "middle-finger-phalanx-proximal", ref);
    const thumbTip = jointPose(frame, source.hand, "thumb-tip", ref);
    const indexTip = jointPose(frame, source.hand, "index-finger-tip", ref);
    if (!wrist || !knuckle || !thumbTip || !indexTip) return null;
    return { wrist, knuckle: knuckle.position, thumbTip: thumbTip.position, indexTip: indexTip.position };
  }
  return null;
}

function readElbow(frame: XRFrame, ref: XRReferenceSpace, side: "left" | "right"): Vec3 | null {
  const body = frame.body;
  if (!body) return null;
  if (!loggedBodyJoints) {
    loggedBodyJoints = true;
    console.info("[tracking] body joints:", [...body.keys()].join(", "));
  }
  const space = body.get(ELBOW_JOINT[side]);
  const pose = space ? frame.getPose(space, ref) : undefined;
  return pose ? (toPose(pose.transform)?.position ?? null) : null;
}

export function readTracking(frame: XRFrame, ref: XRReferenceSpace, side: "left" | "right"): TrackingSample {
  const viewer = frame.getViewerPose(ref);
  return {
    hand: readHand(frame, ref, side),
    elbow: readElbow(frame, ref, side),
    head: viewer ? toPose(viewer.transform) : null,
  };
}
