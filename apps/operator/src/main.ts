// Operator page (Quest Browser). Per XR frame:
//   tracking → deadman → clutch (hand motion since engage) or elbow mirror (elbow→hand vector) → IK (main thread) → joints @ CMD_HZ over WebRTC → phone → MCU.
// Query params:
//   ?emulate=1      install IWER (Meta's WebXR emulator, Quest 3 preset) for desktop testing
//   ?mockRobot=1    no WebRTC peer; commands are echoed back locally
//   ?imu=ws://…     IMU wearable fallback (stretch)
//   ?signal=ws://…  signaling URL override (default ws://<page host>:8080/signal)
//   ?hand=left      track the left hand (default right)
//   ?fov=80         horizontal degrees the whole camera frame spans in the headset
//   ?debug=1        start with the debug arm model shown (the phone app's switch overrides it once connected)
//   ?track=elbow    start in the elbow + hand mapping (default hand delta; the phone app's choice overrides it)

import { Color, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import {
  CMD_HZ,
  nextSeq,
  type ArmState,
  type CamOrientMsg,
  type ControlMsg,
  type JointDeg,
  type JointsMsg,
  type PanMsg,
  type Quat,
  type StatusMsg,
  type TrackMode,
} from "@arm-mirror/protocol";
import { ArmIK, loadArm, type IKResult, type Vec3 } from "@arm-mirror/kinematics";
import { OneEuroFilter, OneEuroQuatFilter } from "@arm-mirror/filters";
import urdfText from "../../../hardware/urdf/arm.urdf?raw";
import { Clutch } from "./clutch";
import { DebugArm } from "./debug-arm";
import { Deadman } from "./deadman";
import { ElbowMirror } from "./elbow-mirror";
import { formatHead, formatJoints, Hud } from "./hud";
import { ImuClient } from "./imu";
import { OperatorLink, type LinkState } from "./link";
import { readTracking } from "./tracking";
import { headYawPitch, panCommandDeg, VideoPanel } from "./video";

const params = new URLSearchParams(location.search);
const MOCK_ROBOT = params.get("mockRobot") === "1";
const HAND: "left" | "right" = params.get("hand") === "left" ? "left" : "right";
const SIGNAL_URL = params.get("signal") ?? `ws://${location.hostname}:8080/signal`;

// A status older than this (10 Hz nominal) means the phone or arm link is down.
const STATUS_STALE_MS = 500;
// Head yaw (CCW from above) → pan servo degrees, 90 = straight ahead.
// TODO(open-item): servo direction and the 90° = forward horn alignment are unverified on the stand.
const PAN_SIGN = 1;
// Pan slew limit; firmware writes P lines straight to the servo. The sensor-driven crop absorbs the lag.
// TODO(open-item): tune on the stand with the phone mounted.
const PAN_MAX_DEG_S = 240;
// The arm accepts commands only once homed; engaging against HOMING/ESTOP/no status would anchor IK to a guess.
const ENGAGEABLE: readonly ArmState[] = ["IDLE", "ACTIVE", "WATCHDOG"];

const statusEl = document.getElementById("status")!;
const enterButton = document.getElementById("enter-vr") as HTMLButtonElement;

async function installEmulatorIfRequested(): Promise<void> {
  if (params.get("emulate") !== "1") return;
  const { XRDevice, metaQuest3 } = await import("iwer");
  const { DevUI } = await import("@iwer/devui");
  const device = new XRDevice(metaQuest3);
  // Desktop Chrome exposes a native navigator.xr (no headset); ?emulate=1 means "use IWER anyway".
  device.installRuntime({ forceInstall: true });
  Object.assign(window, { iwer: device }); // lets a test script drive the emulated hands
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
  // Debug: the commanded pose as a small head-locked model right of the HUD, seen from behind and above.
  const debugArm = new DebugArm(model);
  debugArm.object.position.set(0.36, -0.28, -0.65);
  debugArm.object.rotation.set(0.4, 0.3, 0, "YXZ");
  debugArm.object.scale.setScalar(0.6);
  debugArm.object.visible = params.get("debug") === "1";
  camera.add(debugArm.object);

  const fov = Number(params.get("fov"));
  const video = new VideoPanel(fov > 0 && fov < 180 ? { displayHFovDeg: fov } : {});
  video.object.position.set(0, 1.6, 0); // eye height until the first XR frame
  scene.add(video.object);

  // ── State ────────────────────────────────────────────────────────────────
  const deadman = new Deadman();
  const clutch = new Clutch();
  const elbowMirror = new ElbowMirror(model);
  let track: TrackMode = params.get("track") === "elbow" ? "elbow" : "hand";
  /** Mapping anchored at the last engage; a different `track` holds the arm until the next pinch. */
  let anchored: TrackMode = track;
  let lastIK: IKResult | null = null;
  const posFilter = [0, 1, 2].map(() => new OneEuroFilter());
  const quatFilter = new OneEuroQuatFilter();
  let commanded: JointDeg = ik.deg;
  let lastStatus: StatusMsg | null = null;
  let lastStatusMs = -Infinity;
  const freshStatus = (): StatusMsg | null => (performance.now() - lastStatusMs <= STATUS_STALE_MS ? lastStatus : null);
  let camOrient: CamOrientMsg | null = null;
  let linkState: LinkState | "mock" = MOCK_ROBOT ? "mock" : "signaling-down";
  let seq = 0;
  let panSeq = 0;
  let panDeg = 90; // firmware's boot pan
  let lastSendMs = 0;
  let hint = "";
  let headQ: Quat | null = null;

  const link = MOCK_ROBOT ? null : new OperatorLink(SIGNAL_URL);
  if (link) {
    link.onState = (s) => (linkState = s);
    link.onStream = (s) => video.setStream(s);
    link.onControl = (msg: ControlMsg) => {
      if (msg.t === "status") {
        lastStatus = msg;
        lastStatusMs = performance.now();
      }
      else if (msg.t === "camOrient") camOrient = msg;
      else if (msg.t === "debug") debugArm.object.visible = msg.on;
      else if (msg.t === "track") track = msg.mode;
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
    if (link) {
      link.send(msg);
      // The pan stand follows the head regardless of the deadman; firmware still enforces range and e-stop.
      if (headQ) {
        const yawDeg = (headYawPitch(headQ)[0] * 180) / Math.PI;
        panDeg = panCommandDeg(yawDeg, panDeg, PAN_MAX_DEG_S / CMD_HZ, PAN_SIGN);
        panSeq = nextSeq(panSeq);
        const pan: PanMsg = { t: "pan", seq: panSeq, deg: panDeg };
        link.send(pan);
      }
    } else {
      lastStatus = { t: "status", seq, state: engaged ? "ACTIVE" : "IDLE", deg: commanded }; // mockRobot echo
      lastStatusMs = performance.now();
    }
  }

  // ── Per frame ────────────────────────────────────────────────────────────
  renderer.setAnimationLoop((timeMs: number, frame?: XRFrame) => {
    const ref = renderer.xr.getReferenceSpace();
    if (frame && ref) {
      const s = readTracking(frame, ref, HAND);
      headQ = s.head?.orientation ?? null;
      // No fresh status, or homing/e-stop (incl. a reset mid-pinch), releases the deadman and blocks engage.
      const status = freshStatus();
      const armReady = status !== null && ENGAGEABLE.includes(status.state);
      const event = deadman.update(armReady ? s.hand : null, s.head, timeMs);

      if (event === "engage" && status) {
        // Step-check the IK against where the arm really is, not where we last asked it to be.
        ik.setCurrent(status.deg);
        // Hold where the arm is until IK runs; a stale `commanded` from an earlier session would drive it there.
        commanded = ik.deg;
        posFilter.forEach((f) => f.reset());
        quatFilter.reset();
        lastIK = null;
        // The deadman only engages with a hand and head in view. Anchor on the arm's current tool pose.
        anchored = track;
        if (track === "elbow") elbowMirror.engage(s.head!, ik.forward(ik.deg));
        else clutch.engage(s.hand!, s.head!, ik.forward(ik.deg));
      }

      if (event === "release") lastIK = null;

      const t = timeMs / 1000;
      const target = !deadman.engaged || !s.hand || anchored !== track ? null
        : track === "hand" ? clutch.target(s.hand)
        : s.elbow ? elbowMirror.target(s.hand, s.elbow, t) : null;
      if (target) {
        const p = target.p.map((x, i) => posFilter[i].filter(x, t)) as Vec3;
        const q: Quat = quatFilter.filter(target.q, t);
        lastIK = ik.solve(p, q);
        commanded = lastIK.deg;
        hint = lastIK.stepRejected
          ? "jump too large: slow down, or release and re-pinch"
          : lastIK.reachable ? "" : "out of reach (clamped)";
        // TODO(stretch): when s.hand is null, feed an IMU-derived hand pose (imu.latest()) to the same clutch.
      } else if (deadman.engaged) {
        // Hold the last good pose (safety invariant 5).
        hint = anchored !== track ? "tracking mode changed: release and re-pinch" : "elbow not tracked: holding";
      } else {
        hint = !armReady ? `arm not ready (${status?.state ?? "no status"})`
          : deadman.state === "arming" ? "hold pinch…" : "pinch (palm away) to engage";
      }

      send(deadman.engaged, timeMs);
      video.update(s.head, camOrient?.q ?? null);
    } else if (MOCK_ROBOT) {
      send(false, timeMs);
    }

    const lines = [
      ...formatHead(headQ),
      `link: ${linkState}   deadman: ${deadman.state}   arm: ${freshStatus()?.state ?? (lastStatus ? "STALE (no status)" : "?")}   track: ${track}`,
      ...formatJoints(commanded, freshStatus()?.deg ?? null, model.limits, lastIK),
      imu ? `imu: ${imu.latest() ? "live" : "stale"}` : "",
      hint,
    ].filter(Boolean);
    statusEl.textContent = lines.join("\n");
    hud.setLines(lines, timeMs);
    if (debugArm.object.visible) debugArm.setDeg(commanded);

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
    session.addEventListener("end", () => {
      enterButton.textContent = "Enter VR";
      // The next session has a new reference space: the clutch anchor and video heading don't carry over.
      deadman.release();
      lastIK = null;
      video.resetCalibration();
    });
    enterButton.textContent = "In VR";
  };
}

main().catch((e) => {
  console.error(e);
  statusEl.textContent = `startup failed: ${e instanceof Error ? e.message : String(e)}`;
});
