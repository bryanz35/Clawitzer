import { Goal, Joint, Link, Solver, type DOF } from "closed-chain-ik/core";
import { MAX_JOINT_STEP_DEG, NUM_JOINTS, type JointDeg, type Quat } from "@arm-mirror/protocol";
import { DEG, quatAngle, RAD, rpyToQuat, type Vec3 } from "./math";
import type { ArmModel } from "./urdf";

/** Rotation axis in the tool frame that the IK is allowed to ignore. */
export type FreeAxis = "x" | "y" | "z";

export interface ArmIKOptions {
  /**
   * The tool-axis rotation ignored by the existing pose objective. "z" = hand swing left/right: the arm has
   * no wrist yaw, base yaw j1 supplies left/right (team choice, recorded in arm.urdf).
   */
  freeAxis: FreeAxis;
  /** Reject any solution that moves a joint more than this per solve(). */
  maxStepDeg: number;
  /** Position error (m) below which the target counts as reached. */
  positionTolerance: number;
  /** Error (rad) in the constrained orientation DOF below which the target counts as reached. */
  rotationTolerance: number;
  /** Solver iterations per solve() call. */
  maxIterations: number;
}

export const DEFAULT_IK_OPTIONS: ArmIKOptions = {
  freeAxis: "z",
  maxStepDeg: MAX_JOINT_STEP_DEG,
  positionTolerance: 0.005,
  rotationTolerance: 2 * RAD,
  maxIterations: 20,
};

export interface IKResult {
  /** Joint angles to command, degrees, j1…j5. Always within URDF limits. */
  deg: JointDeg;
  /** The solver hit the target within tolerance. False → `deg` is the nearest pose it found (or the held pose). */
  reachable: boolean;
  /** At least one joint is pinned at a URDF limit. */
  clamped: boolean;
  /** The solution jumped more than `maxStepDeg`; `deg` is the previous pose (held). */
  stepRejected: boolean;
  positionError: number;
  rotationError: number;
}

export interface Pose {
  position: Vec3;
  quaternion: Quat;
}

// closed-chain-ik's DOF is an ambient const enum, which isolatedModules can't read. Same values.
const ROT_DOF: Record<FreeAxis, DOF> = { x: 3, y: 4, z: 5 };
const AXES: FreeAxis[] = ["x", "y", "z"];

interface IKJoint {
  joint: Joint;
  /** Index in the full protocol joint array, including independent gripper coordinates. */
  index: number;
  dof: DOF;
  /** +1 if the URDF axis is +X/+Y/+Z, −1 if negative. Solver value = sign · URDF value. */
  sign: number;
  lower: number;
  upper: number;
}

/**
 * Main-thread pose IK (independent gripper excluded) using closed-chain-ik's `Solver` (never `WorkerSolver`:
 * it needs SharedArrayBuffer, which Chromium on Android lacks).
 *
 * closed-chain-ik goals constrain rotation on all three axes or none, so "position + 2
 * orientation DOF" is built by appending an unlimited virtual revolute joint about `freeAxis`
 * after the tool frame and closing the chain to a full 6-DOF goal. The virtual joint soaks up
 * the sacrificed rotation.
 *
 * Targets are in the arm base frame (URDF: +X forward, +Z up). Convert WebXR poses with
 * xrToArmVec / xrToArmQuat first.
 */
export class ArmIK {
  readonly model: ArmModel;
  readonly options: ArmIKOptions;
  private readonly solver: Solver;
  private readonly joints: IKJoint[] = [];
  private readonly freeJoint: Joint;
  private readonly tip: Link;
  private readonly effector: Link;
  private readonly goal: Goal;
  /** Last accepted pose, radians (URDF sign convention). */
  private current: number[];

  constructor(model: ArmModel, options: Partial<ArmIKOptions> = {}) {
    if (model.names.length !== NUM_JOINTS) {
      throw new Error(`ArmIK: URDF has ${model.names.length} movable joints, protocol expects ${NUM_JOINTS}`);
    }
    this.model = model;
    this.options = { ...DEFAULT_IK_OPTIONS, ...options };

    const root = new Link();
    root.name = model.baseLink;
    let parent: Link = root;
    let movable = 0;
    for (const cj of model.chain) {
      const joint = new Joint();
      joint.name = cj.name;
      joint.setPosition(...cj.xyz);
      joint.setQuaternion(...rpyToQuat(cj.rpy));
      if (cj.type === "revolute") {
        const index = movable++;
        if (cj.role === "gripper") {
          joint.setDoF();
        } else {
          const axisIndex = cj.axis.findIndex((a) => a !== 0);
          const sign = Math.sign(cj.axis[axisIndex]);
          const lim = model.limits[index];
          const lower = Math.min(sign * lim.lower, sign * lim.upper);
          const upper = Math.max(sign * lim.lower, sign * lim.upper);
          const dof = ROT_DOF[AXES[axisIndex]];
          joint.setDoF(dof);
          joint.setMinLimits(lower);
          joint.setMaxLimits(upper);
          joint.setRestPoseValues(sign * model.restPose[index]);
          joint.setDoFValues(sign * model.restPose[index]);
          this.joints.push({ joint, index, dof, sign, lower, upper });
        }
      } else {
        joint.setDoF();
      }
      const link = new Link();
      link.name = cj.child;
      parent.addChild(joint);
      joint.addChild(link);
      parent = link;
    }
    this.tip = parent;

    this.freeJoint = new Joint();
    this.freeJoint.name = "__free_axis";
    this.freeJoint.setDoF(ROT_DOF[this.options.freeAxis]);
    this.effector = new Link();
    this.tip.addChild(this.freeJoint);
    this.freeJoint.addChild(this.effector);

    this.goal = new Goal();
    this.goal.makeClosure(this.effector);

    this.current = [...model.restPose];
    this.applyToSolver(this.current);
    this.solver = new Solver(root);
    this.solver.maxIterations = this.options.maxIterations;
    this.syncGoalToEffector();
  }

  /** Current (last accepted) pose in degrees. */
  get deg(): JointDeg {
    return this.current.map((r) => r * DEG) as JointDeg;
  }

  /**
   * Re-seed the solver from a known arm pose (e.g. the status line when the deadman engages),
   * so the next solve() is step-checked against where the arm actually is.
   */
  setCurrent(deg: readonly number[]): void {
    if (deg.length !== NUM_JOINTS) throw new Error(`setCurrent: expected ${NUM_JOINTS} angles`);
    this.current = deg.map((d, i) => this.clampJoint(i, d * RAD));
    this.applyToSolver(this.current);
    this.syncGoalToEffector();
  }

  /** Tool-frame pose for the given joint angles (degrees), without changing solver state. */
  forward(deg: readonly number[]): Pose {
    this.applyToSolver(deg.map((d) => d * RAD));
    const position: Vec3 = [0, 0, 0];
    const quaternion: Quat = [0, 0, 0, 1];
    this.tip.getWorldPosition(position);
    this.tip.getWorldQuaternion(quaternion);
    this.applyToSolver(this.current);
    return { position, quaternion };
  }

  /** Solve for a tool-frame target in the arm base frame. See IKResult for the safety semantics. */
  solve(targetPos: Vec3, targetQuat: Quat): IKResult {
    this.goal.setPosition(...targetPos);
    this.goal.setQuaternion(...targetQuat);
    this.solver.solve();

    // Pose solving must never open/close the gripper to satisfy wrist orientation.
    const solution = [...this.current];
    for (const j of this.joints) {
      solution[j.index] = this.clampJoint(j.index, j.sign * Number(j.joint.getDoFValue(j.dof)));
    }

    const pos: Vec3 = [0, 0, 0];
    const quat: Quat = [0, 0, 0, 1];
    this.effector.getWorldPosition(pos);
    this.effector.getWorldQuaternion(quat);
    const positionError = Math.hypot(pos[0] - targetPos[0], pos[1] - targetPos[1], pos[2] - targetPos[2]);
    const rotationError = quatAngle(quat, targetQuat);
    const reachable =
      positionError < this.options.positionTolerance && rotationError < this.options.rotationTolerance;

    const maxStep = Math.max(...solution.map((r, i) => Math.abs(r - this.current[i]))) * DEG;
    const stepRejected = maxStep > this.options.maxStepDeg;
    if (stepRejected) {
      this.applyToSolver(this.current); // hold; next frame starts from the held pose
    } else {
      this.current = solution;
    }

    const clamped = this.joints.some(({ index, lower, upper, sign }) => {
      const s = sign * this.current[index];
      return s <= lower + 1e-6 || s >= upper - 1e-6;
    });

    return { deg: this.deg, reachable: reachable && !stepRejected, clamped, stepRejected, positionError, rotationError };
  }

  private clampJoint(i: number, urdfRad: number): number {
    const lim = this.model.limits[i];
    return Math.min(lim.upper, Math.max(lim.lower, urdfRad));
  }

  private applyToSolver(urdfRad: readonly number[]): void {
    this.joints.forEach((j) => j.joint.setDoFValues(j.sign * urdfRad[j.index]));
  }

  private syncGoalToEffector(): void {
    this.freeJoint.setDoFValues(0);
    const pos: Vec3 = [0, 0, 0];
    const quat: Quat = [0, 0, 0, 1];
    this.effector.getWorldPosition(pos);
    this.effector.getWorldQuaternion(quat);
    this.goal.setPosition(...pos);
    this.goal.setQuaternion(...quat);
  }
}
