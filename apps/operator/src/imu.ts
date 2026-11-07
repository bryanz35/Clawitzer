// IMU wearable client: ws:// straight to the ESP32 (Web Bluetooth isn't usable in Quest Browser).
// URL from the `imu=` query param, e.g. ?imu=ws://192.168.4.20:81

import { isImuMsg, parseJson, seqIsNewer, type ImuMsg } from "@arm-mirror/protocol";

export class ImuClient {
  private last: { msg: ImuMsg; atMs: number } | null = null;

  constructor(private readonly url: string) {
    this.connect();
  }

  /** Latest sample if it is fresher than `maxAgeMs`, else null (never a stale or zero pose). */
  latest(maxAgeMs = 100): ImuMsg | null {
    if (!this.last || performance.now() - this.last.atMs > maxAgeMs) return null;
    return this.last.msg;
  }

  private connect(): void {
    const ws = new WebSocket(this.url);
    // A reconnect usually means the wearable rebooted and its seq restarted at 0.
    ws.onopen = () => (this.last = null);
    ws.onmessage = (e) => {
      const msg = typeof e.data === "string" ? parseJson(e.data, isImuMsg) : null;
      if (!msg) return;
      // The wearable's seq is a free-running counter; compare modulo 2^16 like the serial link.
      if (this.last && !seqIsNewer(msg.seq % 0x10000, this.last.msg.seq % 0x10000)) return;
      this.last = { msg, atMs: performance.now() };
    };
    ws.onclose = () => setTimeout(() => this.connect(), 1000);
  }
}

// TODO(stretch): fallback fusion. When Quest hand/body poses are null or low-confidence, derive
// the forearm/hand orientation from latest() (after a calibration that maps each BNO085 frame to
// WebXR) and feed that to the IK instead.
