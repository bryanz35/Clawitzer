import type { Vec3 } from "./math";

// Minimal URDF reader for the subset arm.urdf uses: a single serial chain of revolute and
// fixed joints with axes along ±X/±Y/±Z. Parses text directly (no DOMParser) so it runs in
// Node tests and the browser alike. Anything outside the subset throws.
// tools/gen-arm-config.ts uses this reader for the firmware C header.

export interface ChainJoint {
  name: string;
  type: "revolute" | "fixed";
  /** Gripper coordinates are commanded independently and do not rotate the tool frame. */
  role: "pose" | "gripper";
  parent: string;
  child: string;
  xyz: Vec3;
  rpy: Vec3;
  /** Unit axis in the joint frame. Revolute joints only. */
  axis: Vec3;
}

/** Radians, rad/s, rad/s². */
export interface JointLimits {
  lower: number;
  upper: number;
  velocity: number;
  acceleration: number;
}

export interface ArmModel {
  /** Movable joint names in chain order (base → tip). */
  names: string[];
  limits: JointLimits[];
  /** Home pose in radians, from <arm_mirror home>. */
  restPose: number[];
  /** Every joint (movable and fixed) in chain order. */
  chain: ChainJoint[];
  baseLink: string;
  tipLink: string;
}

type Attrs = Record<string, string>;

function parseAttrs(s: string): Attrs {
  const out: Attrs = {};
  for (const m of s.matchAll(/([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    out[m[1]] = m[2] ?? m[3] ?? "";
  }
  return out;
}

function childAttrs(body: string, tag: string): Attrs | null {
  const m = new RegExp(`<${tag}\\b([^>]*?)/?>`).exec(body);
  return m ? parseAttrs(m[1]) : null;
}

function vec3(text: string | undefined, fallback: Vec3, what: string): Vec3 {
  if (text === undefined) return fallback;
  const parts = text.trim().split(/\s+/).map(Number);
  if (parts.length !== 3 || !parts.every(Number.isFinite)) throw new Error(`URDF: bad ${what} "${text}"`);
  return [parts[0], parts[1], parts[2]];
}

function num(attrs: Attrs | null, key: string, where: string): number {
  const v = attrs?.[key];
  const n = v === undefined ? NaN : Number(v);
  if (!Number.isFinite(n)) throw new Error(`URDF: ${where} is missing a numeric "${key}"`);
  return n;
}

export function loadArm(urdfText: string): ArmModel {
  const text = urdfText.replace(/<!--[\s\S]*?-->/g, "");
  const chainJoints: ChainJoint[] = [];
  const limitsByName = new Map<string, JointLimits>();
  const homeByName = new Map<string, number>();

  // Self-closing <joint/> (e.g. inside <transmission>) is matched by the first branch and skipped.
  for (const m of text.matchAll(/<joint\b[^>]*?\/>|<joint\b([^>]*)>([\s\S]*?)<\/joint>/g)) {
    if (m[1] === undefined) continue;
    const attrs = parseAttrs(m[1]);
    const body = m[2];
    if (attrs.type === undefined) continue; // transmission joint reference, not a kinematic joint
    const name = attrs.name;
    if (!name) throw new Error("URDF: joint without a name");
    const where = `joint "${name}"`;
    if (attrs.type !== "revolute" && attrs.type !== "fixed") {
      throw new Error(`URDF: ${where} has unsupported type "${attrs.type}" (only revolute and fixed)`);
    }
    const parent = childAttrs(body, "parent")?.link;
    const child = childAttrs(body, "child")?.link;
    if (!parent || !child) throw new Error(`URDF: ${where} is missing <parent link> or <child link>`);
    const origin = childAttrs(body, "origin");
    const extra = childAttrs(body, "arm_mirror");
    const role = extra?.role ?? "pose";
    if (role !== "pose" && role !== "gripper") throw new Error(`URDF: ${where} has unsupported role "${role}"`);
    const joint: ChainJoint = {
      name,
      type: attrs.type,
      role,
      parent,
      child,
      xyz: vec3(origin?.xyz, [0, 0, 0], `${where} origin xyz`),
      rpy: vec3(origin?.rpy, [0, 0, 0], `${where} origin rpy`),
      axis: vec3(childAttrs(body, "axis")?.xyz, [1, 0, 0], `${where} axis`),
    };
    if (joint.type === "revolute") {
      const nonZero = joint.axis.filter((a) => a !== 0);
      if (nonZero.length !== 1 || Math.abs(nonZero[0]) !== 1) {
        throw new Error(`URDF: ${where} axis must be ±X, ±Y or ±Z, got "${joint.axis.join(" ")}"`);
      }
      const limit = childAttrs(body, "limit");
      const lim: JointLimits = {
        lower: num(limit, "lower", `${where} <limit>`),
        upper: num(limit, "upper", `${where} <limit>`),
        velocity: num(limit, "velocity", `${where} <limit>`),
        acceleration: num(extra, "acceleration", `${where} <arm_mirror>`),
      };
      if (!(lim.lower < lim.upper)) throw new Error(`URDF: ${where} has lower >= upper`);
      if (!(lim.velocity > 0 && lim.acceleration > 0)) {
        throw new Error(`URDF: ${where} velocity and acceleration limits must be > 0`);
      }
      const home = num(extra, "home", `${where} <arm_mirror>`);
      if (home < lim.lower || home > lim.upper) throw new Error(`URDF: ${where} home is outside its limits`);
      limitsByName.set(name, lim);
      homeByName.set(name, home);
    }
    chainJoints.push(joint);
  }
  if (chainJoints.length === 0) throw new Error("URDF: no joints found");

  // Order base → tip, insisting on a single unbranched chain.
  const byParent = new Map<string, ChainJoint>();
  const childLinks = new Set<string>();
  for (const j of chainJoints) {
    if (byParent.has(j.parent)) throw new Error(`URDF: link "${j.parent}" branches; only a serial chain is supported`);
    byParent.set(j.parent, j);
    childLinks.add(j.child);
  }
  const roots = [...byParent.keys()].filter((l) => !childLinks.has(l));
  if (roots.length !== 1) throw new Error(`URDF: expected one root link, found ${roots.length}`);

  const chain: ChainJoint[] = [];
  let link = roots[0];
  for (let j = byParent.get(link); j; j = byParent.get(link)) {
    chain.push(j);
    link = j.child;
    if (chain.length > chainJoints.length) throw new Error("URDF: joint cycle");
  }
  if (chain.length !== chainJoints.length) throw new Error("URDF: joints not connected to the root chain");

  const movable = chain.filter((j) => j.type === "revolute");
  return {
    names: movable.map((j) => j.name),
    limits: movable.map((j) => limitsByName.get(j.name)!),
    restPose: movable.map((j) => homeByName.get(j.name)!),
    chain,
    baseLink: roots[0],
    tipLink: link,
  };
}
