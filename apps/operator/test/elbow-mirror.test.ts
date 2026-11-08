import { describe, expect, it } from "vitest";
import { Quaternion, Vector3 } from "three";
import type { Quat } from "@arm-mirror/protocol";
import { ArmIK, loadArm, xrToArmQuat, type Pose as ToolPose, type Vec3 } from "@arm-mirror/kinematics";
import urdfText from "../../../hardware/urdf/arm.urdf?raw";
import { BLEND_S, ElbowMirror, MAX_FOREARM_STRETCH, PINCH_PITCH_DOWN_DEG } from "../src/elbow-mirror";
import type { HandSample, Pose } from "../src/tracking";

const RAD = Math.PI / 180;
const model = loadArm(urdfText);
const home = new ArmIK(model).forward([0, 0, 0, 0, 0]);
// Arm j2 → tool point at home, so a forearm this long reaches exactly the home tool point.
const FOREARM = home.position[0] - Math.hypot(model.chain[1].xyz[0], model.chain[1].xyz[1]);
const HAND = 0.09; // wrist → knuckle

function rot(axis: Vec3, deg: number): Quaternion {
  return new Quaternion().setFromAxisAngle(new Vector3(...axis).normalize(), deg * RAD);
}

function q(r: Quaternion): Quat {
  return [r.x, r.y, r.z, r.w];
}

function head(yawDeg: number): Pose {
  return { position: [0, 1.6, 0], orientation: q(rot([0, 1, 0], yawDeg)) };
}

/** The wrist sits HAND behind the knuckle along the hand's −Z; `wristFrame` overrides the wrist joint's reported orientation. */
function hand(knuckle: Vec3, orientation: Quaternion, wristFrame = orientation): HandSample {
  const wrist = new Vector3(0, 0, HAND).applyQuaternion(orientation).add(new Vector3(...knuckle));
  return { wrist: { position: [wrist.x, wrist.y, wrist.z], orientation: q(wristFrame) }, knuckle, thumbTip: knuckle, indexTip: knuckle };
}

function expectPose(actual: { p: Vec3; q: Quat }, expected: ToolPose): void {
  actual.p.forEach((x, i) => expect(x).toBeCloseTo(expected.position[i], 6));
  expect(Math.abs(new Quaternion(...actual.q).dot(new Quaternion(...expected.quaternion)))).toBeCloseTo(1, 6);
}

// Arm somewhere other than home, so the engage blend has work to do.
const tool: ToolPose = { position: [0.2, 0.1, 0.3], quaternion: q(rot([0, 1, 0], -40)) };
const elbow: Vec3 = [0.2, 1.1, -0.2];
// Forearm and hand level and straight ahead (XR −Z), palm down: the home pose with the claw pitched PINCH_PITCH_DOWN_DEG down.
const forward = hand([elbow[0], elbow[1], elbow[2] - FOREARM], new Quaternion());
const pinch = rot([1, 0, 0], -PINCH_PITCH_DOWN_DEG);
const pinched: ToolPose = { position: home.position, quaternion: xrToArmQuat(q(pinch)) };

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
    const end = m.target(forward, elbow, 10 + BLEND_S)!;
    expectPose(end, pinched);
    // A straight hand points the claw PINCH_PITCH_DOWN_DEG below level.
    const clawX = new Vector3(1, 0, 0).applyQuaternion(new Quaternion(...end.q));
    expect(clawX.z).toBeCloseTo(-Math.sin(PINCH_PITCH_DOWN_DEG * RAD), 9);
  });

  it("mirrors a level forward forearm, palm down, as the home pose whatever the facing", () => {
    const m = new ElbowMirror(model);
    m.engage(head(90), tool); // facing XR −X
    const turned = rot([0, 1, 0], 90);
    m.target(forward, elbow, 0);
    const k = new Vector3(-FOREARM, 0, 0).add(new Vector3(...elbow));
    expectPose(m.target(hand([k.x, k.y, k.z], turned), elbow, BLEND_S)!, pinched);
  });

  it("ignores body translation: only the elbow→knuckle vector matters", () => {
    const m = new ElbowMirror(model);
    m.engage(head(0), tool);
    m.target(forward, elbow, 0);
    const shift = (v: Vec3): Vec3 => [v[0] + 0.15, v[1] - 0.1, v[2] + 0.3];
    const moved = hand(shift(forward.knuckle), new Quaternion());
    expectPose(m.target(moved, shift(elbow), BLEND_S)!, pinched);
  });

  it("raises the tool when the forearm points up", () => {
    const m = new ElbowMirror(model);
    m.engage(head(0), tool);
    m.target(forward, elbow, 0);
    const up = m.target(hand([elbow[0], elbow[1] + FOREARM, elbow[2]], rot([1, 0, 0], 90)), elbow, BLEND_S)!;
    expect(up.p[2]).toBeCloseTo(home.position[2] + FOREARM, 6);
    // Fingers up, back of hand toward the operator: tool +X up, less the pinch pitch.
    const x = new Vector3(1, 0, 0).applyQuaternion(new Quaternion(...up.q));
    expect(x.z).toBeCloseTo(Math.cos(PINCH_PITCH_DOWN_DEG * RAD), 9);
  });

  it("keeps the forearm length from the engage blend: elbow noise along the forearm doesn't change reach", () => {
    const m = new ElbowMirror(model);
    m.engage(head(0), tool);
    m.target(forward, elbow, 0);
    const slid: Vec3 = [elbow[0], elbow[1], elbow[2] + 0.1 * FOREARM]; // elbow reads 10% farther from the wrist
    expectPose(m.target(forward, slid, BLEND_S)!, pinched);
    expect(m.forearm).toBeCloseTo(FOREARM - HAND, 9);
  });

  it("drops a frame whose elbow→wrist length jumps, then accepts plausible ones again", () => {
    const m = new ElbowMirror(model);
    m.engage(head(0), tool);
    m.target(forward, elbow, 0);
    const far: Vec3 = [elbow[0], elbow[1], elbow[2] + (MAX_FOREARM_STRETCH + 0.05) * FOREARM];
    expect(m.target(forward, far, BLEND_S)).toBeNull();
    expectPose(m.target(forward, elbow, BLEND_S)!, pinched);
  });

  it("takes hand pitch from wrist→knuckle, not the wrist frame (Quest 3 read it ~42° high), and roll from the frame", () => {
    const m = new ElbowMirror(model);
    m.engage(head(0), tool);
    m.target(forward, elbow, 0);
    expectPose(m.target(hand(forward.knuckle, new Quaternion(), rot([1, 0, 0], 42)), elbow, BLEND_S)!, pinched);
    const rolled = m.target(hand(forward.knuckle, new Quaternion(), rot([0, 0, 1], 30)), elbow, BLEND_S)!;
    expectPose(rolled, { position: home.position, quaternion: xrToArmQuat(q(rot([0, 0, 1], 30).multiply(pinch))) });
  });

  it("measures the forearm afresh on each engage", () => {
    const m = new ElbowMirror(model);
    m.engage(head(0), tool);
    m.target(forward, elbow, 0);
    m.engage(head(0), tool);
    const longer: Vec3 = [elbow[0], elbow[1], elbow[2] + 0.5 * FOREARM];
    expect(m.target(forward, longer, 0)).not.toBeNull();
    expect(m.forearm).toBeCloseTo(1.5 * FOREARM - HAND, 9);
  });
});
