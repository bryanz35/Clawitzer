import { describe, expect, it } from "vitest";
import { Quaternion, Vector3 } from "three";
import type { Quat } from "@arm-mirror/protocol";
import type { Pose as ToolPose, Vec3 } from "@arm-mirror/kinematics";
import { Clutch } from "../src/clutch";
import type { HandSample, Pose } from "../src/tracking";

const RAD = Math.PI / 180;

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
  return {
    wrist: { position: knuckle, orientation: q(orientation) },
    knuckle,
    thumbTip: knuckle,
    indexTip: knuckle,
    curlFingers: [],
  };
}

// Arm tool somewhere in front of the base, pitched 20° about arm +Y.
const tool: ToolPose = { position: [0.3, 0, 0.2], quaternion: q(rot([0, 1, 0], 20)) };
const startKnuckle: Vec3 = [0.1, 1.2, -0.4];
// Arbitrary non-identity start wrist so the delta (not the absolute orientation) is what's tested.
const startWrist = rot([1, 2, 3], 40);

function expectQuat(actual: Quat, expected: Quaternion): void {
  // q and −q are the same rotation.
  expect(Math.abs(new Quaternion(...actual).dot(expected))).toBeCloseTo(1, 6);
}

describe("Clutch", () => {
  it("targets the arm's anchor pose at engage", () => {
    const c = new Clutch();
    c.engage(hand(startKnuckle, startWrist), head(37), tool);
    const t = c.target(hand(startKnuckle, startWrist))!;
    t.p.forEach((x, i) => expect(x).toBeCloseTo(tool.position[i], 9));
    expectQuat(t.q, new Quaternion(...tool.quaternion));
  });

  it("returns null before the first engage", () => {
    expect(new Clutch().target(hand(startKnuckle, startWrist))).toBeNull();
  });

  it("maps the operator's forward to arm +X when facing −Z", () => {
    const c = new Clutch();
    c.engage(hand(startKnuckle, startWrist), head(0), tool);
    const t = c.target(hand([0.1, 1.2, -0.5], startWrist))!;
    expect(t.p[0]).toBeCloseTo(0.4, 9);
    expect(t.p[1]).toBeCloseTo(0, 9);
    expect(t.p[2]).toBeCloseTo(0.2, 9);
  });

  it("maps the operator's forward to arm +X after turning 90° left", () => {
    const c = new Clutch();
    c.engage(hand(startKnuckle, startWrist), head(90), tool); // now facing XR −X
    const t = c.target(hand([0, 1.2, -0.4], startWrist))!;
    expect(t.p[0]).toBeCloseTo(0.4, 9);
    expect(t.p[1]).toBeCloseTo(0, 9);
    // Up stays up.
    const up = c.target(hand([0.1, 1.3, -0.4], startWrist))!;
    expect(up.p[2]).toBeCloseTo(0.3, 9);
  });

  it("applies a wrist turn about the operator's up as a turn about arm +Z", () => {
    const c = new Clutch();
    c.engage(hand(startKnuckle, startWrist), head(0), tool);
    const turned = rot([0, 1, 0], 30).multiply(startWrist);
    const t = c.target(hand(startKnuckle, turned))!;
    expectQuat(t.q, rot([0, 0, 1], 30).multiply(new Quaternion(...tool.quaternion)));
  });

  it("applies a wrist pitch about the operator's right as a turn about arm −Y, whatever the facing", () => {
    const c = new Clutch();
    c.engage(hand(startKnuckle, startWrist), head(90), tool); // facing XR −X, so right is XR −Z
    const turned = rot([0, 0, -1], 30).multiply(startWrist);
    const t = c.target(hand(startKnuckle, turned))!;
    expectQuat(t.q, rot([0, -1, 0], 30).multiply(new Quaternion(...tool.quaternion)));
  });
});
