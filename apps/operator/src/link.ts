// WebRTC offerer. Signaling over ws://<host>/signal?role=operator; data channel "control"
// (unordered, no retransmits: a late joint command is worse than a dropped one).

import {
  isAnswerMsg,
  isControlMsg,
  isIceMsg,
  isPeerMsg,
  isSignalMsg,
  parseJson,
  type ControlMsg,
  type SignalMsg,
} from "@arm-mirror/protocol";

export type LinkState = "signaling-down" | "waiting-for-robot" | "connecting" | "connected" | "replaced";

export class OperatorLink {
  onControl: (msg: ControlMsg) => void = () => {};
  onStream: (stream: MediaStream) => void = () => {};
  onState: (state: LinkState) => void = () => {};

  private ws: WebSocket | null = null;
  private pc: RTCPeerConnection | null = null;
  private dc: RTCDataChannel | null = null;
  private pendingIce: RTCIceCandidateInit[] = [];

  constructor(private readonly signalUrl: string) {
    this.connectSignaling();
  }

  /** Sends on the data channel if open. Returns false if it was dropped. */
  send(msg: ControlMsg): boolean {
    if (this.dc?.readyState !== "open") return false;
    this.dc.send(JSON.stringify(msg));
    return true;
  }

  private connectSignaling(): void {
    const url = new URL(this.signalUrl);
    url.searchParams.set("role", "operator");
    const ws = new WebSocket(url);
    this.ws = ws;
    this.onState("signaling-down");
    ws.onopen = () => this.onState("waiting-for-robot");
    ws.onclose = (e) => {
      // 4000: the server replaced us with a newer operator page. Reconnecting would kick it out in a loop.
      if (e.code === 4000) return this.onState("replaced");
      this.onState("signaling-down");
      setTimeout(() => this.connectSignaling(), 1000);
    };
    ws.onmessage = (e) => {
      const msg = typeof e.data === "string" ? parseJson(e.data, isSignalMsg) : null;
      if (msg) void this.onSignal(msg);
    };
  }

  private signal(msg: SignalMsg): void {
    if (this.ws?.readyState === WebSocket.OPEN) this.ws.send(JSON.stringify(msg));
  }

  private async onSignal(msg: SignalMsg): Promise<void> {
    if (isPeerMsg(msg) && msg.role === "robot") {
      if (msg.present) await this.call();
      else this.hangUp();
    } else if (isAnswerMsg(msg) && this.pc) {
      await this.pc.setRemoteDescription({ type: "answer", sdp: msg.sdp });
      for (const c of this.pendingIce.splice(0)) await this.pc.addIceCandidate(c);
    } else if (isIceMsg(msg) && this.pc) {
      if (this.pc.remoteDescription) await this.pc.addIceCandidate(msg.candidate);
      else this.pendingIce.push(msg.candidate);
    }
  }

  private hangUp(): void {
    this.dc?.close();
    this.pc?.close();
    this.dc = null;
    this.pc = null;
    this.pendingIce = [];
    this.onState(this.ws?.readyState === WebSocket.OPEN ? "waiting-for-robot" : "signaling-down");
  }

  private async call(): Promise<void> {
    this.hangUp();
    this.onState("connecting");
    // LAN only: host candidates suffice, no STUN/TURN.
    const pc = new RTCPeerConnection({ iceServers: [] });
    this.pc = pc;
    const dc = pc.createDataChannel("control", { ordered: false, maxRetransmits: 0 });
    this.dc = dc;
    dc.onopen = () => this.onState("connected");
    dc.onclose = () => {
      if (this.dc === dc) this.onState("connecting");
    };
    dc.onmessage = (e) => {
      const msg = typeof e.data === "string" ? parseJson(e.data, isControlMsg) : null;
      if (msg) this.onControl(msg);
    };
    const video = pc.addTransceiver("video", { direction: "recvonly" });
    // Prefer H.265, then H.264 (hardware on both ends). The answer picks the first codec both sides support,
    // so a missing H.265 on either end falls back to H.264, then the rest in the browser's order.
    const preferred = ["video/H265", "video/H264"];
    const rank = (c: RTCRtpCodec) => {
      const i = preferred.indexOf(c.mimeType);
      return i < 0 ? preferred.length : i;
    };
    video.setCodecPreferences([...(RTCRtpReceiver.getCapabilities("video")?.codecs ?? [])].sort((a, b) => rank(a) - rank(b)));
    pc.ontrack = (e) => this.onStream(e.streams[0] ?? new MediaStream([e.track]));
    pc.onicecandidate = (e) => {
      const c = e.candidate;
      if (c) this.signal({ t: "ice", candidate: { candidate: c.candidate, sdpMid: c.sdpMid, sdpMLineIndex: c.sdpMLineIndex, usernameFragment: c.usernameFragment } });
    };
    pc.onconnectionstatechange = () => {
      if (pc.connectionState === "failed") void this.call();
    };
    await pc.setLocalDescription(await pc.createOffer());
    this.signal({ t: "offer", sdp: pc.localDescription!.sdp });
  }
}
