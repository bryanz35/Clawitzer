import { CMD_HZ } from "@arm-mirror/protocol";
import { DEG, loadArm } from "@arm-mirror/kinematics";
import urdfText from "../../../hardware/urdf/arm.urdf?raw";
import { JointJog, JOINT_KEYS, JOINT_LABELS } from "./joint-jog";
import { JointSerial } from "./joint-serial";

const model = loadArm(urdfText);
const serial = new JointSerial();
const jog = new JointJog(model.limits);

function element<T extends HTMLElement>(id: string): T {
  const result = document.getElementById(id);
  if (!result) throw new Error(`Missing control element: ${id}`);
  return result as T;
}

const connect = element<HTMLButtonElement>("connect");
const disconnect = element<HTMLButtonElement>("disconnect");
const reference = element<HTMLButtonElement>("reference");
const referenceConfirm = element<HTMLInputElement>("reference-confirm");
const exitBench = element<HTMLButtonElement>("exit-bench");
const disable = element<HTMLButtonElement>("disable");
const hold = element<HTMLButtonElement>("hold");
const speed = element<HTMLInputElement>("speed");
const speedValue = element<HTMLOutputElement>("speed-value");
const cameraAngle = element<HTMLInputElement>("camera-angle");
const cameraValue = element<HTMLOutputElement>("camera-value");
const cameraState = element("camera-state");
const connectionState = element("connection-state");
const firmwareState = element("firmware-state");
const calibrationState = element("calibration-state");
const referenceState = element("reference-state");
const fault = element("fault");
const notice = element("notice");
const controlState = element("control-state");
const lastUpdate = element("last-update");
let actions = 0;
let message = "Connect the controller. No motion is sent until calibration, reference and homing are ready.";
let previousConnection = serial.state.connection;
let previouslyReferenced = false;
let previousFirmwareState = "";
let writeStarted: number | null = null;
let cameraPending: number | null = null;
let cameraSentAt = 0;

const rows = model.names.map((name, joint) => {
  const row = document.createElement("article");
  row.className = "joint-card";
  row.dataset.joint = String(joint);
  const keys = JOINT_KEYS[joint].map((key) => key.slice(3));
  const lo = model.limits[joint].lower * DEG;
  const hi = model.limits[joint].upper * DEG;
  row.innerHTML = `
    <div class="joint-head"><h3></h3><span class="joint-key"><kbd>${keys[0]}</kbd> + / <kbd>${keys[1]}</kbd> −</span></div>
    <div class="joint-readouts"><span class="joint-actual">—</span><span class="joint-target">—</span></div>
    <div class="joint-track" aria-hidden="true"><span class="joint-position"></span><span class="joint-command"></span></div>
    <div class="joint-limits"><span>${lo.toFixed(1)}°</span><span>${hi.toFixed(1)}°</span></div>
    <div class="joint-buttons"><button type="button" class="jog-button" data-joint="${joint}" data-direction="-1" disabled>−</button><button type="button" class="jog-button" data-joint="${joint}" data-direction="1" disabled>+</button></div>`;
  row.querySelector("h3")!.textContent = `${name} · ${JOINT_LABELS[joint]}`;
  const buttons = [...row.querySelectorAll<HTMLButtonElement>(".jog-button")];
  buttons.forEach((button) => {
    const direction = Number(button.dataset.direction) as -1 | 1;
    button.setAttribute("aria-label", `Hold to jog ${JOINT_LABELS[joint]} ${direction > 0 ? "positive" : "negative"}`);
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || !serial.ready || document.hidden) return;
      event.preventDefault();
      button.focus();
      button.setPointerCapture(event.pointerId);
      jog.pressPointer(joint, direction);
      button.setAttribute("aria-pressed", "true");
      render();
    });
    for (const event of ["pointerup", "pointercancel", "lostpointercapture"] as const) {
      button.addEventListener(event, holdPosition);
    }
    button.addEventListener("keydown", (event) => {
      if (event.code !== "Enter" || event.repeat || !serial.ready) return;
      event.preventDefault();
      event.stopPropagation();
      jog.pressPointer(joint, direction);
      button.setAttribute("aria-pressed", "true");
    });
    button.addEventListener("keyup", (event) => {
      if (event.code !== "Enter") return;
      event.preventDefault();
      event.stopPropagation();
      holdPosition();
    });
    button.addEventListener("blur", holdPosition);
  });
  element("joint-controls").append(row);
  return {
    row, buttons, lo, hi,
    actual: row.querySelector<HTMLElement>(".joint-actual")!,
    target: row.querySelector<HTMLElement>(".joint-target")!,
    position: row.querySelector<HTMLElement>(".joint-position")!,
    command: row.querySelector<HTMLElement>(".joint-command")!,
  };
});

async function action(run: () => Promise<void>, success: string): Promise<void> {
  actions++;
  jog.release();
  render();
  try {
    await run();
    message = success;
  } catch (error) {
    message = error instanceof Error ? error.message : String(error);
  } finally {
    actions--;
    render();
  }
}

function holdPosition(): void {
  jog.release();
  rows.forEach(({ buttons }) => buttons.forEach((button) => button.setAttribute("aria-pressed", "false")));
  pump();
}

connect.addEventListener("click", () => {
  void action(() => serial.connect(), "Connected. Check calibration and reference before jogging.");
});
disconnect.addEventListener("click", () => {
  holdPosition();
  void action(() => serial.disconnect(), "Disconnected. The firmware watchdog holds position; USB reopening may reset the board.");
});
referenceConfirm.addEventListener("change", render);
reference.addEventListener("click", () => {
  if (!referenceConfirm.checked) return;
  referenceConfirm.checked = false;
  void action(() => serial.reference(), "Reference accepted. Wait for all-joint homing to finish; then use a fresh hold-to-run gesture.");
});
exitBench.addEventListener("click", () => {
  if (!window.confirm("Exit bench mode and discard its UNSAVED draft? This does not create valid calibration or reference the arm.")) return;
  void action(() => serial.exitBench(), "Bench mode exited. Normal control still requires saved calibration and marked-home reference.");
});
disable.addEventListener("click", () => {
  holdPosition();
  referenceConfirm.checked = false;
  void action(() => serial.halt(), "Outputs disabled. Support the load; a NEW marked-home reference is required before motion.");
});
hold.addEventListener("click", () => {
  holdPosition();
  message = "Holding. Powered holding is not an e-stop; use the physical power cut in an emergency.";
  render();
});
speed.addEventListener("input", () => {
  jog.speedPercent = Number(speed.value);
  speedValue.value = `${speed.value}%`;
});
jog.speedPercent = Number(speed.value);
speedValue.value = `${speed.value}%`;

cameraAngle.addEventListener("input", () => {
  const value = Number(cameraAngle.value);
  cameraValue.value = `${value}°`;
  cameraPending = value;
});
cameraAngle.addEventListener("change", () => {
  cameraPending = Number(cameraAngle.value);
  flushCamera(performance.now());
});

function flushCamera(now: number): void {
  if (cameraPending === null) return;
  const state = serial.state;
  if (state.connection !== "connected" || state.status?.state === "ESTOP") return;
  if (now - cameraSentAt < 50) return;
  const value = cameraPending;
  cameraSentAt = now;
  void serial.sendCamera(value).then((sent) => {
    if (sent && cameraPending === value) cameraPending = null;
    render();
  });
}

window.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    event.preventDefault();
    holdPosition();
    return;
  }
  if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable=true]")) return;
  if (event.ctrlKey || event.metaKey || event.altKey) { holdPosition(); return; }
  if (jog.key(event.code, true, event.repeat)) event.preventDefault();
});
window.addEventListener("keyup", (event) => {
  if (jog.key(event.code, false)) {
    event.preventDefault();
    pump();
  }
});
window.addEventListener("blur", holdPosition);
window.addEventListener("pagehide", holdPosition);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) holdPosition();
});
document.addEventListener("focusin", (event) => {
  if (event.target instanceof Element && event.target.closest("input, textarea, select, [contenteditable=true]")) holdPosition();
});

function pump(): void {
  const ready = serial.ready && actions === 0;
  jog.sync(serial.state.status?.deg ?? null, ready);
  if (document.hidden || !document.hasFocus()) jog.release();
  if (writeStarted !== null && performance.now() - writeStarted > 100) jog.release();
  const command = jog.tick(performance.now());
  if (command && writeStarted === null) {
    writeStarted = performance.now();
    void serial.sendJoints(command).catch((error: unknown) => {
      jog.release();
      message = error instanceof Error ? error.message : String(error);
    }).finally(() => { writeStarted = null; render(); });
  }
  flushCamera(performance.now());
  render();
}

function setText(node: HTMLElement, value: string): void {
  if (node.textContent !== value) node.textContent = value;
}

function render(): void {
  const state = serial.state;
  const connected = state.connection === "connected";
  const status = state.status;
  const calibration = state.calibration;
  const inBench = calibration?.mode === "calibration";
  const busy = actions > 0;
  const ready = serial.ready && !busy && !document.hidden && document.hasFocus();
  if (state.connection !== previousConnection || (previouslyReferenced && !calibration?.referenced) ||
      (status?.state === "ESTOP" && previousFirmwareState !== "ESTOP")) referenceConfirm.checked = false;
  previousConnection = state.connection;
  previouslyReferenced = calibration?.referenced ?? false;
  previousFirmwareState = status?.state ?? "";
  setText(connectionState, connected ? state.portLabel : state.connection);
  connectionState.dataset.state = connected ? "ready" : "idle";
  setText(firmwareState, status?.state ?? "No status");
  firmwareState.dataset.state = status?.state === "ESTOP" ? "fault" : ready ? "ready" : "idle";
  calibrationState.textContent = calibration ? calibration.configured ? "Saved / valid" : "Required" : "Unknown";
  referenceState.textContent = calibration ? calibration.referenced ? "Referenced" : "Required after every reset" : "Unknown";
  fault.textContent = state.error ?? calibration?.fault ?? "—";
  fault.dataset.state = state.error || (calibration && calibration.fault !== "none") ? "fault" : "idle";
  lastUpdate.textContent = status ? `${Math.max(0, Math.round(performance.now() - state.lastStatusAt))} ms ago` : "No telemetry";
  connect.disabled = state.connection !== "disconnected" || busy || !serial.supported;
  disconnect.disabled = state.connection === "disconnected" || busy;
  referenceConfirm.disabled = !connected || busy || !calibration?.configured || inBench || calibration.referenced;
  reference.disabled = referenceConfirm.disabled || !referenceConfirm.checked;
  exitBench.hidden = !inBench;
  exitBench.disabled = !connected || busy;
  disable.disabled = !connected;
  hold.disabled = !connected;
  speed.disabled = !connected || busy;
  const camera = state.camera;
  const cameraStopped = status?.state === "ESTOP" || state.calibration?.fault === "estop";
  cameraAngle.disabled = !connected || cameraStopped;
  if (camera) {
    if (document.activeElement !== cameraAngle && cameraPending === null) {
      cameraAngle.value = String(Math.round(camera.deg));
      cameraValue.value = `${Math.round(camera.deg)}°`;
    }
    setText(cameraState, camera.active ? `${camera.deg.toFixed(1)}° · servo active` : "Servo off");
    cameraState.dataset.state = cameraStopped ? "fault" : camera.active ? "active" : "idle";
  } else {
    setText(cameraState, cameraStopped ? "Servo stopped" : connected ? "Servo off" : "Not connected");
    cameraState.dataset.state = cameraStopped ? "fault" : "idle";
  }
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    row.buttons.forEach((button) => { button.disabled = !ready; });
    row.row.classList.toggle("is-active", ready && jog.moving);
    const value = status?.deg[i];
    const target = status ? jog.target?.[i] : undefined;
    row.actual.textContent = value === undefined ? "Firmware: —" : `Firmware: ${value.toFixed(1)}°`;
    row.target.textContent = target === undefined ? "Target: —" : `Target: ${target.toFixed(1)}°`;
    row.position.hidden = value === undefined;
    row.command.hidden = target === undefined;
    if (value !== undefined) row.position.style.left = `${Math.min(100, Math.max(0, (value - row.lo) / (row.hi - row.lo) * 100))}%`;
    if (target !== undefined) row.command.style.left = `${Math.min(100, Math.max(0, (target - row.lo) / (row.hi - row.lo) * 100))}%`;
  }
  if (ready) {
    setText(controlState, jog.moving ? "Jogging · release to hold" : "Ready · hold Space + joint keys, or hold a jog button");
    controlState.dataset.state = jog.moving ? "active" : "ready";
  } else {
    controlState.dataset.state = "idle";
    setText(controlState, !connected ? "Not connected" : busy ? "Waiting for controller" : !calibration ? "Synchronizing controller" :
      inBench ? "Bench mode · exit it before normal control" : !calibration.configured ? "Saved full-arm calibration required" :
      !calibration.referenced ? "Marked-home reference required" : status?.state === "HOMING" ? "Homing all joints · motion locked" :
      !status || performance.now() - state.lastStatusAt > 200 ? "Telemetry stale · holding" :
      status.state === "ESTOP" ? "Controller stopped · inspect fault" : "Controls paused · focus this window");
  }
  setText(notice, state.error ?? (connected && calibration && !calibration.configured ?
    "No valid saved full-arm calibration. Bench current/microstep settings alone are not calibration. Complete and save all actuator mappings using the calibration CLI before normal control." : message));
}
const compatibility = element("compatibility");
compatibility.hidden = serial.supported;
if (!serial.supported) {
  compatibility.textContent = "Direct USB requires desktop Chrome/Chromium with Web Serial. Open this page on http://localhost:5173/operator/control.html; close the serial CLI first. No HTTPS setup is required.";
}
serial.onChange = () => {
  if (serial.state.connection !== "connected" || serial.state.status?.state === "ESTOP") cameraPending = null;
  jog.sync(serial.state.status?.deg ?? null, serial.ready && actions === 0);
  render();
};
render();
setInterval(pump, 1000 / CMD_HZ);
