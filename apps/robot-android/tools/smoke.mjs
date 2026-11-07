// Laptop-as-operator smoke test for the robot app (AVD or a USB-connected phone).
// Runs headless Chromium with mDNS host-candidate hiding disabled (the emulator can't resolve
// .local names), loads the app's root page through `adb forward`, and plays the operator's
// WebRTC role: offer, control channel, recvonly video. Then it sends 1 s of engaged joints.
//
//   adb forward tcp:8080 tcp:8080     # app running, "Mock MCU" on, camera started
//   node apps/robot-android/tools/smoke.mjs
//
// Passes when the data channel opens, status shows ACTIVE then WATCHDOG, camOrient arrives
// and video frames decode. Needs Node >= 22 (global WebSocket) and chromium on PATH (or $CHROME).
import { spawn } from "node:child_process";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const PORT = 9333;
const chrome = spawn(process.env.CHROME ?? "chromium", [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${mkdtempSync(join(tmpdir(), "smoke-"))}`,
  "--disable-features=WebRtcHideLocalIpsWithMdns",
  "about:blank",
], { stdio: "ignore" });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Runs in the page (origin http://localhost:8080). Mirrors apps/operator/src/link.ts.
const pageTest = async () => {
  const ws = new WebSocket(`ws://${location.host}/signal?role=operator`);
  const pc = new RTCPeerConnection({ iceServers: [] });
  const dc = pc.createDataChannel("control", { ordered: false, maxRetransmits: 0 });
  pc.addTransceiver("video", { direction: "recvonly" });
  const got = { status: 0, camOrient: 0, states: [], lastStatus: null };
  dc.onmessage = (e) => {
    const m = JSON.parse(e.data);
    got[m.t]++;
    if (m.t === "status") {
      if (got.states.at(-1) !== m.state) got.states.push(m.state);
      got.lastStatus = m;
    }
  };
  pc.onicecandidate = (e) => e.candidate && ws.send(JSON.stringify({ t: "ice", candidate: e.candidate.toJSON() }));
  ws.onmessage = async (e) => {
    const m = JSON.parse(e.data);
    if (m.t === "peer" && m.present) {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      ws.send(JSON.stringify({ t: "offer", sdp: offer.sdp }));
    } else if (m.t === "answer") await pc.setRemoteDescription({ type: "answer", sdp: m.sdp });
    else if (m.t === "ice") await pc.addIceCandidate(m.candidate);
  };
  await new Promise((res, rej) => {
    dc.onopen = res;
    setTimeout(() => rej(new Error(`data channel timeout, ice=${pc.iceConnectionState}`)), 15000);
  });
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  dc.send(JSON.stringify({ t: "joints", seq: 1, deg: [99, 0, 0, 0, 0], engaged: false })); // must NOT reach serial
  for (let i = 2; i <= 51; i++) {
    dc.send(JSON.stringify({ t: "joints", seq: i, deg: [i, -i / 2, 0, 0, 0], engaged: true }));
    await wait(20);
  }
  await wait(800); // silence → mock MCU reports WATCHDOG
  const video = [...(await pc.getStats()).values()].find((s) => s.type === "inbound-rtp" && s.kind === "video");
  return { ice: pc.iceConnectionState, ...got, frames: video?.framesDecoded ?? 0, size: `${video?.frameWidth}x${video?.frameHeight}` };
};

async function main() {
  let target;
  for (let i = 0; i < 50 && !target; i++) {
    target = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:8080/`, { method: "PUT" })
      .then((r) => r.json())
      .catch(() => sleep(200));
  }
  const cdp = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => (cdp.onopen = r));
  await sleep(1000); // page load
  const reply = new Promise((r) => (cdp.onmessage = (e) => r(JSON.parse(e.data))));
  cdp.send(JSON.stringify({
    id: 1,
    method: "Runtime.evaluate",
    params: { expression: `(${pageTest})()`, awaitPromise: true, returnByValue: true },
  }));
  const { result } = await reply;
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.exception?.description ?? "page error");
  const r = result.result.value;
  console.log(JSON.stringify(r, null, 2));
  const ok = r.states.includes("ACTIVE") && r.states.at(-1) === "WATCHDOG" && r.lastStatus.seq === 50 &&
    r.camOrient > 0 && r.frames > 0;
  console.log(ok ? "PASS" : "FAIL");
  return ok;
}

main()
  .then((ok) => (process.exitCode = ok ? 0 : 1))
  .catch((e) => {
    console.error("FAIL", e.message);
    process.exitCode = 1;
  })
  .finally(() => chrome.kill());
