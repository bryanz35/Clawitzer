// Debug arm model (toggled from the phone app): arm.urdf's chain as flat bars, posed at given joint angles.
// Built from joint origins only (no mesh loader). Bars are flat so wrist roll shows. Gripper isn't drawn.

import { BoxGeometry, Group, Matrix4, Mesh, MeshNormalMaterial, Object3D, SphereGeometry, Vector3 } from "three";
import { RAD, type ArmModel } from "@arm-mirror/kinematics";

const BAR_W = 0.03;
const BAR_H = 0.012;

export class DebugArm {
  /** Arm base frame expressed in WebXR axes; place and scale this. */
  readonly object = new Group();
  /** Tool point, for tests. */
  readonly tip: Object3D;
  private readonly joints: { frame: Object3D; axis: Vector3 }[] = [];

  constructor(model: ArmModel) {
    // Unlit scene: normal shading still reads as 3D without lights.
    const material = new MeshNormalMaterial();
    // Arm frame (+X forward, +Y left, +Z up) → WebXR (+X right, +Y up, −Z forward).
    const base = new Object3D();
    base.quaternion.setFromRotationMatrix(new Matrix4().makeBasis(new Vector3(0, 0, -1), new Vector3(-1, 0, 0), new Vector3(0, 1, 0)));
    this.object.add(base);

    let parent = base;
    for (const j of model.chain) {
      const offset = new Vector3(...j.xyz);
      const length = offset.length();
      if (length > 0) {
        const bar = new Mesh(new BoxGeometry(length, BAR_W, BAR_H).translate(length / 2, 0, 0), material);
        bar.quaternion.setFromUnitVectors(new Vector3(1, 0, 0), offset.clone().normalize());
        parent.add(bar);
      }
      const origin = new Object3D();
      origin.position.copy(offset);
      origin.rotation.set(j.rpy[0], j.rpy[1], j.rpy[2], "ZYX"); // URDF rpy: fixed-axis X, then Y, then Z
      parent.add(origin);
      parent = origin;
      if (j.type === "revolute" && j.role === "pose") {
        origin.add(new Mesh(new SphereGeometry(BAR_W * 0.75, 12, 8), material));
        const frame = new Object3D();
        origin.add(frame);
        parent = frame;
        this.joints[model.names.indexOf(j.name)] = { frame, axis: new Vector3(...j.axis) };
      }
    }
    this.tip = parent;
  }

  /** Degrees in protocol order (j1…j5). The gripper coordinate is ignored. */
  setDeg(deg: readonly number[]): void {
    this.joints.forEach((j, i) => j.frame.quaternion.setFromAxisAngle(j.axis, deg[i] * RAD));
  }
}
