// Digital twin: arm.urdf rendered with urdf-loader, posed from joint angles.
// Two instances in main.ts: the commanded pose (solid) and the MCU-reported pose (ghost).

import { Group, Mesh, MeshStandardMaterial, type Object3D } from "three";
import URDFLoader, { type URDFRobot } from "urdf-loader";
import type { JointDeg } from "@arm-mirror/protocol";
import type { ArmModel } from "@arm-mirror/kinematics";

export class Twin {
  readonly object: Group = new Group();
  private readonly robot: URDFRobot;
  private readonly names: string[];
  private readonly poseJoints: boolean[];

  constructor(urdfText: string, model: ArmModel, opts: { color: number; opacity?: number }) {
    this.robot = new URDFLoader().parse(urdfText);
    this.names = model.names;
    const grippers = new Set(model.chain.filter((joint) => joint.role === "gripper").map((joint) => joint.name));
    this.poseJoints = this.names.map((name) => !grippers.has(name));
    const material = new MeshStandardMaterial({
      color: opts.color,
      transparent: (opts.opacity ?? 1) < 1,
      opacity: opts.opacity ?? 1,
      depthWrite: (opts.opacity ?? 1) >= 1,
    });
    this.robot.traverse((o: Object3D) => {
      if (o instanceof Mesh) o.material = material;
    });
    // URDF is Z-up; WebXR/three is Y-up.
    this.robot.rotation.x = -Math.PI / 2;
    this.object.add(this.robot);
  }

  setDeg(deg: readonly number[] | JointDeg): void {
    // The placeholder hand mesh is not a finger model; grasp must not render as wrist yaw.
    this.names.forEach((name, i) => {
      if (this.poseJoints[i]) this.robot.setJointValue(name, (deg[i] * Math.PI) / 180);
    });
  }
}
