// Operator page (Quest Browser). Per XR frame:
//   tracking → deadman → IK (main thread) → joints @ CMD_HZ over WebRTC → phone → MCU.
// Query params:
//   ?emulate=1      install IWER (Meta's WebXR emulator, Quest 3 preset) for desktop testing
//   ?mockRobot=1    no WebRTC peer; commands are echoed back locally
//   ?imu=ws://…     IMU wearable fallback (stretch)
//   ?signal=ws://…  signaling URL override (default ws://<page host>:8080/signal)
//   ?hand=left      track the left hand (default right)
//   ?fov=80         horizontal degrees the whole camera frame spans in the headset

import { Color, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import {
  CMD_HZ,
  nextSeq,
  type CamOrientMsg,
  type ControlMsg,
  type JointDeg,
  type JointsMsg,
  type Quat,
  type StatusMsg,
} from "@arm-mirror/protocol";
import { ArmIK, loadArm, xrToArmQuat, xrToArmVec, type Vec3 } from "@arm-mirror/kinematics";
import { OneEuroFilter, OneEuroQuatFilter } from "@arm-mirror/filters";
import urdfText from "../../../hardware/urdf/arm.urdf?raw";
import { Deadman } from "./deadman";
import { formatHead, Hud } from "./hud";
import { ImuClient } from "./imu";
import { OperatorLink, type LinkState } from "./link";
import { readTracking } from "./tracking";
import { VideoPanel } from "./video";

const params = new URLSearchParams(location.search);
const MOCK_ROBOT = params.get("mockRobot") === "1";
const HAND: "left" | "right" = params.get("hand") === "left" ? "left" : "right";
const SIGNAL_URL = params.get("signal") ?? `ws://${location.hostname}:8080/signal`;

// TODO(open-item): link lengths. Human elbow→knuckle vs. arm reach; 1.0 until the arm is built.
const HAND_TO_ARM_SCALE = 1.0;
// TODO(open-item): joint list. Elbow (j2) position in the arm base frame, from arm.urdf j1 + j2 origins.
const ELBOW_IN_ARM: Vec3 = [0, 0, 0.08];

const statusEl = document.getElementById("status")!;
const enterButton = document.getElementById("enter-vr") as HTMLButtonElement;

async function installEmulatorIfRequested(): Promise<void> {
  if (params.get("emulate") !== "1") return;
  const { XRDevice, metaQuest3 } = await import("iwer");
  const { DevUI } = await import("@iwer/devui");
  const device = new XRDevice(metaQuest3);
  // Desktop Chrome exposes a native navigator.xr (no headset); ?emulate=1 means "use IWER anyway".
  device.installRuntime({ forceInstall: true });
  new DevUI(device);
}

// Shown on the button (the status line is overwritten every frame). null = immersive-vr is available.
async function xrUnavailableReason(): Promise<string | null> {
  if (!window.isSecureContext) {
    return `${location.origin} is not a secure context. Add exactly "${location.origin}" to ` +
      "chrome://flags/#unsafely-treat-insecure-origin-as-secure, set it to Enabled, then fully restart the browser.";
  }
  if (!navigator.xr) return "navigator.xr is missing (this browser has no WebXR). Use Quest Browser, or ?emulate=1 on desktop.";
  try {
    if (await navigator.xr.isSessionSupported("immersive-vr")) return null;
    return "isSessionSupported('immersive-vr') returned false (no headset runtime).";
  } catch (e) {
    return `isSessionSupported threw: ${e instanceof Error ? e.message : String(e)}`;
  }
}

async function main(): Promise<void> {
  // IWER must patch navigator.xr before the renderer exists.
  await installEmulatorIfRequested();

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.xr.enabled = true;
  renderer.xr.setReferenceSpaceType("local-floor");
  document.body.appendChild(renderer.domElement);

  const scene = new Scene();
  // The video panel is the only world content; all materials are unlit, so no lights.
  scene.background = new Color(0x000000);

  const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 50);
  camera.position.set(0, 1.6, 0.5);
  // The HUD rides the camera, so the camera must be in the scene for its children to render.
  const hud = new Hud();
  hud.mesh.position.set(0, -0.12, -0.6); // a bit below eye line, 60 cm out
  camera.add(hud.mesh);
  scene.add(camera);
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  const model = loadArm(urdfText);
  const ik = new ArmIK(model);

  const fov = Number(params.get("fov"));
  const video = new VideoPanel(fov > 0 && fov < 180 ? { displayHFovDeg: fov } : {});
  video.object.position.set(0, 1.6, 0); // eye height until the first XR frame
  scene.add(video.object);

  // ── State ────────────────────────────────────────────────────────────────
  const deadman = new Deadman();
  const posFilter = [0, 1, 2].map(() => new OneEuroFilter());
  const quatFilter = new OneEuroQuatFilter();
  let commanded: JointDeg = ik.deg;
  let lastStatus: StatusMsg | null = null;
  let camOrient: CamOrientMsg | null = null;
  let linkState: LinkState | "mock" = MOCK_ROBOT ? "mock" : "signaling-down";
  let seq = 0;
  let lastSendMs = 0;
  let hint = "";
  let headQ: Quat | null = null;

  const link = MOCK_ROBOT ? null : new OperatorLink(SIGNAL_URL);
  if (link) {
    link.onState = (s) => (linkState = s);
    link.onStream = (s) => video.setStream(s);
    link.onControl = (msg: ControlMsg) => {
      if (msg.t === "status") lastStatus = msg;
      else if (msg.t === "camOrient") camOrient = msg;
    };
  }
  const imuUrl = params.get("imu");
  const imu = imuUrl ? new ImuClient(imuUrl) : null;

  function send(engaged: boolean, nowMs: number): void {
    if (nowMs - lastSendMs < 1000 / CMD_HZ) return;
    // Advance by the period (not to nowMs) so frame-locked sends average CMD_HZ; the max() avoids bursts after a stall.
    lastSendMs = Math.max(lastSendMs + 1000 / CMD_HZ, nowMs - 1000 / CMD_HZ);
    seq = nextSeq(seq);
    const msg: JointsMsg = { t: "joints", seq, deg: commanded, engaged };
    if (link) link.send(msg);
    else lastStatus = { t: "status", seq, state: engaged ? "ACTIVE" : "IDLE", deg: commanded }; // mockRobot echo
  }

  // ── Per frame ────────────────────────────────────────────────────────────
  renderer.setAnimationLoop((timeMs: number, frame?: XRFrame) => {
    const ref = renderer.xr.getReferenceSpace();
    if (frame && ref) {
      const s = readTracking(frame, ref, HAND);
      headQ = s.head?.orientation ?? null;
      const event = deadman.update(s.hand, s.head, timeMs);

      if (event === "engage") {
        // Step-check the IK against where the arm really is, not where we last asked it to be.
        if (lastStatus) ik.setCurrent(lastStatus.deg);
        // Hold where the arm is until IK runs; a stale `commanded` from an earlier session would drive it there.
        commanded = ik.deg;
        posFilter.forEach((f) => f.reset());
        quatFilter.reset();
      }

      if (deadman.engaged && s.hand && s.elbow) {
        const t = timeMs / 1000;
        const rel = s.hand.knuckle.map((k, i) => (k - s.elbow![i]) * HAND_TO_ARM_SCALE) as Vec3;
        const p = xrToArmVec(rel).map((v, i) => posFilter[i].filter(v + ELBOW_IN_ARM[i], t)) as Vec3;
        const q: Quat = quatFilter.filter(xrToArmQuat(s.hand.wrist.orientation), t);
        const r = ik.solve(p, q);
        commanded = r.deg;
        hint = r.stepRejected ? "jump too large: move your hand back toward the arm's pose" : r.reachable ? "" : "out of reach (clamped)";
      } else if (deadman.engaged) {
        hint = "elbow not tracked: holding"; // TODO(stretch): IMU fallback via imu.latest()
      } else {
        hint = deadman.state === "arming" ? "hold pinch…" : "pinch (palm away) to engage";
      }

      send(deadman.engaged, timeMs);
      video.update(s.head, camOrient?.q ?? null);
    } else if (MOCK_ROBOT) {
      send(false, timeMs);
    }

    // TODO(open-item): head pose → pan/tilt stand. No message for stand commands exists in
    // packages/protocol yet (servo wiring and controller for the stand are undecided).

    const lines = [
      ...formatHead(headQ),
      `link: ${linkState}   deadman: ${deadman.state}   arm: ${lastStatus?.state ?? "?"}`,
      `cmd: ${commanded.map((d) => d.toFixed(1)).join(" ")}`,
      imu ? `imu: ${imu.latest() ? "live" : "stale"}` : "",
      hint,
    ].filter(Boolean);
    statusEl.textContent = lines.join("\n");
    hud.setLines(lines, timeMs);

    renderer.render(scene, camera);
  });

  // ── Enter VR ─────────────────────────────────────────────────────────────
  const why = await xrUnavailableReason();
  const supported = why === null;
  enterButton.disabled = !supported;
  enterButton.textContent = supported ? "Enter VR" : `WebXR unavailable: ${why}`;
  enterButton.onclick = async () => {
    const session = await navigator.xr!.requestSession("immersive-vr", {
      requiredFeatures: ["local-floor"],
      optionalFeatures: ["hand-tracking", "body-tracking"],
    });
    // Render at the headset's native resolution; Quest Browser's default framebuffer is smaller and softens the video.
    renderer.xr.setFramebufferScaleFactor(XRWebGLLayer.getNativeFramebufferScaleFactor?.(session) ?? 1);
    await renderer.xr.setSession(session);
    session.addEventListener("end", () => (enterButton.textContent = "Enter VR"));
    enterButton.textContent = "In VR";
  };
}

main().catch((e) => {
  console.error(e);
  statusEl.textContent = `startup failed: ${e instanceof Error ? e.message : String(e)}`;
});
