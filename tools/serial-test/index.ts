// Laptop CLI for exercising the arm firmware over USB serial, without the phone.
//
//   npm run serial -w @arm-mirror/tools -- list
//   npm run serial -w @arm-mirror/tools -- watch               [--port /dev/ttyUSB0]
//   npm run serial -w @arm-mirror/tools -- home                [--seconds 5]
//   npm run serial -w @arm-mirror/tools -- jog <joint> <deg>   [--seconds 3]   relative to the current pose
//   npm run serial -w @arm-mirror/tools -- sweep <joint>       [--speed 10]    deg/s, one slow cycle within limits
//   npm run serial -w @arm-mirror/tools -- calibrate           [--port /dev/ttyUSB0]  guarded wrist jogging + maintenance
//
// <joint> is j1…j5 or 1…5. Commands stream at CMD_HZ so the watchdog stays fed; when the CLI
// stops (or you press Ctrl-C) the stream stops and the firmware holds via its watchdog.

import { readFileSync } from "node:fs";
import { ReadlineParser, SerialPort } from "serialport";
import {
  CMD_HZ,
  encodeJoints,
  nextSeq,
  NUM_JOINTS,
  parseStatus,
  SERIAL_BAUD,
  type JointDeg,
  type StatusMsg,
} from "@arm-mirror/protocol";
import { DEG, loadArm } from "@arm-mirror/kinematics";
import { resolveSerialPort, runCalibration } from "./calibrate";

const SWEEP_MARGIN_DEG = 2;

const model = loadArm(readFileSync(new URL("../../hardware/urdf/arm.urdf", import.meta.url), "utf8"));
const limitsDeg = model.limits.map((l) => ({ lo: l.lower * DEG, hi: l.upper * DEG }));
const homeDeg = model.restPose.map((r) => r * DEG) as JointDeg;

// ── args ───────────────────────────────────────────────────────────────────
const argv = process.argv.slice(2);
const flags = new Map<string, string>();
const positional: string[] = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith("--")) flags.set(argv[i].slice(2), argv[++i] ?? "");
  else positional.push(argv[i]);
}
const [command, ...rest] = positional;

function usage(): never {
  console.error("usage: serial-test list | watch | calibrate | home | jog <joint> <deg> | sweep <joint>  [--port P] [--seconds N] [--speed DEG_S]");
  process.exit(2);
}

function jointIndex(arg: string | undefined): number {
  const n = arg ? Number(arg.replace(/^j/i, "")) : NaN;
  if (!Number.isInteger(n) || n < 1 || n > NUM_JOINTS) {
    console.error(`joint must be j1…j${NUM_JOINTS} or 1…${NUM_JOINTS}, got ${arg}`);
    process.exit(2);
  }
  return n - 1;
}

function clampToLimits(deg: number[]): JointDeg {
  return deg.map((d, i) => Math.min(limitsDeg[i].hi, Math.max(limitsDeg[i].lo, d))) as JointDeg;
}

const fmt = (deg: readonly number[]) => deg.map((d) => d.toFixed(1).padStart(6)).join(" ");

// ── serial ─────────────────────────────────────────────────────────────────
interface Conn {
  port: SerialPort;
  latest: () => StatusMsg | null;
  onStatus: (fn: (s: StatusMsg) => void) => void;
}

async function open(): Promise<Conn> {
  const path = await resolveSerialPort(flags.get("port"));
  const port = new SerialPort({ path, baudRate: SERIAL_BAUD, autoOpen: false });
  await new Promise<void>((res, rej) => port.open((e) => (e ? rej(e) : res())));
  console.log(`opened ${path} @ ${SERIAL_BAUD}`);
  const lines = port.pipe(new ReadlineParser({ delimiter: "\n" }));
  let latest: StatusMsg | null = null;
  const listeners: ((s: StatusMsg) => void)[] = [];
  lines.on("data", (line: string) => {
    if (line.startsWith("#")) {
      console.log(`\x1b[2m${line.trim()}\x1b[0m`);
      return;
    }
    const s = parseStatus(line);
    if (!s) {
      console.log(`\x1b[33m? ${JSON.stringify(line)}\x1b[0m`);
      return;
    }
    latest = s;
    listeners.forEach((fn) => fn(s));
  });
  return { port, latest: () => latest, onStatus: (fn) => listeners.push(fn) };
}

/** Waits for a status line and for homing to finish (the board may reset when the port opens). */
async function handshake(conn: Conn): Promise<StatusMsg> {
  const deadline = Date.now() + 60_000;
  let warned = false;
  for (;;) {
    const s = conn.latest();
    if (s && s.state !== "HOMING") return s;
    if (s && !warned) {
      console.log("waiting for homing to finish…");
      warned = true;
    }
    if (Date.now() > deadline) throw new Error(s ? "homing did not finish within 60 s" : "no status line within 60 s");
    await new Promise((r) => setTimeout(r, 50));
  }
}

/** Streams `target(tSec)` at CMD_HZ until it returns null or Ctrl-C. Continues from the MCU's seq. */
async function stream(conn: Conn, target: (tSec: number) => JointDeg | null): Promise<void> {
  const first = await handshake(conn);
  if (first.state === "ESTOP") throw new Error("arm reports ESTOP");
  let seq = first.seq;
  const t0 = Date.now();
  let lastPrint = 0;
  await new Promise<void>((resolve) => {
    const timer = setInterval(() => {
      const t = (Date.now() - t0) / 1000;
      const deg = target(t);
      if (!deg) {
        clearInterval(timer);
        resolve();
        return;
      }
      seq = nextSeq(seq);
      conn.port.write(encodeJoints(seq, clampToLimits(deg)));
      if (t - lastPrint >= 0.2) {
        lastPrint = t;
        const s = conn.latest();
        console.log(`t=${t.toFixed(1)}s cmd ${fmt(deg)} | mcu ${s?.state ?? "?"} ${s ? fmt(s.deg) : ""}`);
      }
    }, 1000 / CMD_HZ);
    process.once("SIGINT", () => {
      clearInterval(timer);
      resolve();
    });
  });
  console.log("stream stopped; firmware watchdog will hold position");
  await new Promise((r) => setTimeout(r, 600)); // > WATCHDOG_MS + one status period
  console.log(`final: ${conn.latest()?.state ?? "?"} ${fmt(conn.latest()?.deg ?? [])}`);
}

// ── commands ───────────────────────────────────────────────────────────────
async function run(): Promise<void> {
  const seconds = Number(flags.get("seconds") ?? NaN);
  switch (command) {
    case "calibrate":
      await runCalibration(flags.get("port"));
      return;
    case "list": {
      for (const p of await SerialPort.list()) {
        console.log(`${p.path}\t${p.manufacturer ?? ""}\t${p.vendorId ?? ""}:${p.productId ?? ""}\t${p.serialNumber ?? ""}`);
      }
      return;
    }
    case "watch": {
      const conn = await open();
      conn.onStatus((s) => console.log(`${s.state.padEnd(8)} seq=${String(s.seq).padStart(5)} ${fmt(s.deg)}`));
      await new Promise<void>((r) => process.once("SIGINT", () => r()));
      return void conn.port.close();
    }
    case "home": {
      const conn = await open();
      const dur = Number.isFinite(seconds) ? seconds : 5;
      await stream(conn, (t) => (t < dur ? homeDeg : null));
      return void conn.port.close();
    }
    case "jog": {
      const j = jointIndex(rest[0]);
      const delta = Number(rest[1]);
      if (!Number.isFinite(delta)) usage();
      const conn = await open();
      const base = (await handshake(conn)).deg;
      const target = [...base] as JointDeg;
      target[j] += delta;
      const dur = Number.isFinite(seconds) ? seconds : 3;
      console.log(`jog ${model.names[j]} ${base[j].toFixed(1)} → ${clampToLimits(target)[j].toFixed(1)}°`);
      await stream(conn, (t) => (t < dur ? target : null));
      return void conn.port.close();
    }
    case "sweep": {
      const j = jointIndex(rest[0]);
      const speed = Number(flags.get("speed") ?? 10);
      if (!(speed > 0 && speed <= 30)) {
        console.error("--speed must be in (0, 30] deg/s");
        process.exit(2);
      }
      const conn = await open();
      const base = (await handshake(conn)).deg;
      const lo = limitsDeg[j].lo + SWEEP_MARGIN_DEG;
      const hi = limitsDeg[j].hi - SWEEP_MARGIN_DEG;
      const start = Math.min(hi, Math.max(lo, base[j]));
      // start → hi → lo → start, at `speed`.
      const legs = [hi - start, hi - lo, start - lo].map((d) => d / speed);
      const total = legs[0] + legs[1] + legs[2];
      console.log(`sweep ${model.names[j]} ${lo.toFixed(1)}…${hi.toFixed(1)}° at ${speed}°/s (${total.toFixed(1)} s)`);
      await stream(conn, (t) => {
        if (t > total + 1) return null;
        const d = [...base] as JointDeg;
        if (t < legs[0]) d[j] = start + speed * t;
        else if (t < legs[0] + legs[1]) d[j] = hi - speed * (t - legs[0]);
        else d[j] = Math.min(start, lo + speed * (t - legs[0] - legs[1]));
        return d;
      });
      return void conn.port.close();
    }
    default:
      usage();
  }
}

run().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
