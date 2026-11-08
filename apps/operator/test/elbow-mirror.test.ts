import { describe, expect, it } from "vitest";
import { Quaternion, Vector3 } from "three";
import type { Quat } from "@arm-mirror/protocol";
import { ArmIK, loadArm, type Pose as ToolPose, type Vec3 } from "@arm-mirror/kinematics";
import urdfText from "../../../hardware/urdf/arm.urdf?raw";
import { BLEND_S, ElbowMirror } from "../src/elbow-mirror";
import type { HandSample, Pose } from "../src/tracking";

const RAD = Math.PI / 180;
const model = loadArm(urdfText);
const home = new ArmIK(model).forward([0, 0, 0, 0, 0]);
// Arm j2 → tool point at home, so a forearm this long reaches exactly the home tool point.
const FOREARM = home.position[0] - Math.hypot(model.chain[1].xyz[0], model.chain[1].xyz[1]);

function rot(axis: Vec3, deg: number): Quaternion {
  return new Quaternion().setFromAxisAngle(new Vector3(...axis).normalize(), deg * RAD);
}

function q(r: Quaternion): Quat {
  return [r.x, r.y, r.z, r.w];
}

function head(yawDeg: number): Pose {
  return { position: [0, 1.6, 0], orientation: q(rot([0, 1, 0], yawDeg)) };
}

function hand(knuckle: Vec3, orientation: Quaternion): HandSample {
  return { wrist: { position: knuckle, orientation: q(orientation) }, knuckle, thumbTip: knuckle, indexTip: knuckle };
}

function expectPose(actual: { p: Vec3; q: Quat }, expected: ToolPose): void {
  actual.p.forEach((x, i) => expect(x).toBeCloseTo(expected.position[i], 6));
  expect(Math.abs(new Quaternion(...actual.q).dot(new Quaternion(...expected.quaternion)))).toBeCloseTo(1, 6);
}

// Arm somewhere other than home, so the engage blend has work to do.
const tool: ToolPose = { position: [0.2, 0.1, 0.3], quaternion: q(rot([0, 1, 0], -40)) };
const elbow: Vec3 = [0.2, 1.1, -0.2];
// Forearm level and straight ahead (XR −Z), palm down: the arm's home pose.
const forward = hand([elbow[0], elbow[1], elbow[2] - FOREARM], new Quaternion());

describe("ElbowMirror", () => {
  it("returns null before the first engage", () => {
    expect(new ElbowMirror(model).target(forward, elbow, 0)).toBeNull();
  });

  it("starts at the arm's pose at engage and blends to the mirrored pose", () => {
    const m = new ElbowMirror(model);
    m.engage(head(0), tool);
    expectPose(m.target(forward, elbow, 10)!, tool);
    const half = m.target(forward, elbow, 10 + BLEND_S / 2)!;
    half.p.forEach((x, i) => expect(x).toBeCloseTo((tool.position[i] + home.position[i]) / 2, 6));
    expectPose(m.target(forward, elbow, 10 + BLEND_S)!, home);
  });

  it("mirrors a level forward forearm, palm down, as the home pose whatever the facing", () => {
    const m = new ElbowMirror(model);
    m.engage(head(90), tool); // facing XR −X
    const turned = rot([0, 1, 0], 90);
    m.target(forward, elbow, 0);
    const k = new Vector3(-FOREARM, 0, 0).add(new Vector3(...elbow));
    expectPose(m.target(hand([k.x, k.y, k.z], turned), elbow, BLEND_S)!, home);
  });

  it("ignores body translation: only the elbow→knuckle vector matters", () => {
    const m = new ElbowMirror(model);
    m.engage(head(0), tool);
    m.target(forward, elbow, 0);
    const shift = (v: Vec3): Vec3 => [v[0] + 0.15, v[1] - 0.1, v[2] + 0.3];
    const moved = hand(shift(forward.knuckle), new Quaternion());
    expectPose(m.target(moved, shift(elbow), BLEND_S)!, home);
  });

  it("raises the tool when the forearm points up", () => {
    const m = new ElbowMirror(model);
    m.engage(head(0), tool);
    m.target(forward, elbow, 0);
    const up = m.target(hand([elbow[0], elbow[1] + FOREARM, elbow[2]], rot([1, 0, 0], 90)), elbow, BLEND_S)!;
    expect(up.p[2]).toBeCloseTo(home.position[2] + FOREARM, 6);
    // Fingers up, back of hand toward the operator: tool +X up.
    const x = new Vector3(1, 0, 0).applyQuaternion(new Quaternion(...up.q));
    expect(x.z).toBeCloseTo(1, 9);
  });
});
