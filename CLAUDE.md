# Clawitzer: VR-teleoperated 5-DOF robot arm

<!-- Maintainers: keep this file under ~200 lines. Put multi-step procedures in .claude/skills/,
     and package-specific rules in that package's own CLAUDE.md. -->

## Context

- **36-hour hackathon** with a team of 3 (mechanical, electrical, software).
- Optimize for a working demo, not polish. Prefer small increments that can be demoed.
- Prefer mocks and stubs over blocking on hardware.
- First-time setup: run `/scaffold-project`.

**What it does:**
- A Meta Quest 3 user's **head orientation** drives a pan/tilt stand holding an Android phone (the camera).
- The user's **forearm and hand pose** drives four arm pose axes plus an independent gripper. The arm is human-like, with a fixed elbow at its base.
- A native Android app on the phone serves the operator page, streams video to the Quest, and relays joint commands to the arm's microcontroller over USB.
- Actual arm controller: **NodeMCU-32S / ESP-WROOM-32** (classic ESP32, not S3). DS3235 base, TMC2209 elbow + AS5047P motor-shaft encoder, differential MS62 wrist pair and MS62 gripper. Pins, e-stop polarity and hard pulse windows are code-owned in `board_config.h`; the serial console jogs the wrist directly and persists only discovered mappings.
- No native USB on this board: UART0 (GPIO1/3) goes through its onboard USB-UART bridge (CP210x/CH340-style). The phone app's usb-serial-for-android prober supports those chips, and `device_filter.xml` matches the CP210x and CH340 VIDs (unverified against the exact board). Untested on hardware; see README before wiring.
- User-approved bench exception: unloaded/disconnected linkage, physical e-stop ready, explicit acknowledgement, isolated bounded jogs and 200 ms keepalive. Normal operation still enforces generated limits. Every boot/power loss/e-stop requires manual alignment of all axes to generated home marks and explicit encoder reference before homing.

## Architecture

```
Quest Browser (apps/operator)                Android app (apps/robot-android)            NodeMCU-32S (firmware/arm-controller)
 hand/body tracking → filter → IK ──WebRTC data──► relay joint cmds ──USB serial──►  limits, watchdog, servos
 world-locked video panel + crop  ◄──WebRTC video── camera + phone orientation
        ▲ ws:// direct over Wi-Fi
 IMU wearable (firmware/imu-wearable: ESP32 + 2× BNO085)
The app also embeds an HTTP + WebSocket server on :8080: serves the operator page + signaling only (no business logic)
```

| Path | What | Key tech |
|---|---|---|
| `apps/operator` | Quest WebXR page. **IK runs here.** | Vite, TypeScript, Three.js, raw WebXR hand (`hand-tracking`) + body (`body-tracking`, `XRFrame.body`) APIs, closed-chain-ik |
| `apps/robot-android` | Native phone app (Gradle, not an npm workspace). Embedded server, WebRTC answerer, USB serial, orientation | Kotlin, Jetpack Compose, Ktor (CIO + websockets), stream-webrtc-android (libwebrtc), usb-serial-for-android, `SensorManager` rotation vector |
| `packages/protocol` | ALL message types + serial encode/decode + CRC | TS, shared by every app |
| `packages/kinematics` | URDF loading, IK wrapper, limit clamping | TS + vitest |
| `packages/filters` | One Euro filter | TS + vitest |
| `firmware/arm-controller` | Serial parser, limits, watchdog, servo output | PlatformIO, ESP-IDF, C++17, Nix dev shell |
| `firmware/imu-wearable` | 2× BNO085 → WebSocket server | PlatformIO, Adafruit BNO08x, links2004/WebSockets |
| `hardware/urdf/arm.urdf` | **Single source of truth** for geometry and joint limits | URDF |
| `tools/` | `gen-arm-config.ts` (URDF → C header), serial test CLI | TS |

## Key decisions (do not change without asking the team)

1. **WebXR in Quest Browser**, not a native Unity/Unreal app.
2. **Plain HTTP.** The Quest uses the `chrome://flags/#unsafely-treat-insecure-origin-as-secure` dev flag for the operator origin. Do not add HTTPS, certificate or mkcert tooling.
3. **The phone side is a native Android app** (Kotlin + Compose). It embeds the HTTP + signaling server on :8080, so there is no Termux and no phone web page. Camera, USB and sensors use native APIs, so no secure context is needed.
4. **No Bluetooth path to the Quest.** Web Bluetooth is not usable in Quest Browser, so the IMU wearable talks to the Quest over `ws://`.
5. **Three.js only.** No Babylon.js, no IWSDK. The IK library (closed-chain-ik) is built on Three.js.
6. **IK uses closed-chain-ik `Solver` on the main thread.**
   - Never use `WorkerSolver`: it needs SharedArrayBuffer, which isn't available in Chromium on Android.
   - The 5-DOF arm can't match a full 6-DOF hand pose. The goal constrains position + 2 orientation DOF.
   - The sacrificed axis is TBD and is recorded in `arm.urdf` comments.
7. **Hybrid tracking.** Quest hand/body tracking is primary. The IMU wearable is the fallback when joint poses are null or low-confidence.
8. **Video.**
   - Wide-FOV capture, shown on a world-locked panel.
   - Crop offset = head orientation − phone orientation (the phone rides the stand, so its sensor gives the true camera pose).
   - WebRTC, never MJPEG.
9. **Phone → MCU link: USB serial** via Android USB host (usb-serial-for-android, CDC-ACM). Fallback if the app can't claim the device: Wi-Fi WebSocket to the ESP32.

## Safety invariants (MUST hold; stop and ask before weakening any)

1. **Firmware enforces limits.** Joint position, velocity and acceleration limits live in firmware. Client-side clamping is additional, never a replacement.
2. **Watchdog.** No valid command for **200 ms** → firmware holds position and reports `WATCHDOG`.
3. **Deadman.** The arm follows only while the deadman gesture (pinch) is held. On release, it holds.
4. **Soft start.** On boot, move slowly to the **park pose** (`<arm_mirror park>`, defaulting to the home pose). Ignore commands until homing completes. Zero angles stay at the home pose, so a joint whose physical rest differs can park elsewhere without shifting the angle frame. Reference is restored automatically only when the motor-shaft encoder still reads the angle recorded at the last marked-home reference; any other reading still requires manual marked-home confirmation.
5. **Tracking dropouts.** A null or invalid pose → hold the last good pose. Never interpolate from zero/origin.
6. **Unreachable IK target.** Clamp to the nearest reachable pose. Reject solutions that jump more than `MAX_JOINT_STEP_DEG` per frame.
7. **Bad input.** Drop commands with a bad CRC or a non-increasing sequence number.
8. **E-stop.** A physical e-stop cuts servo power. Code must tolerate sudden power loss and re-home afterwards.
9. **Servo power.** Servos run on a separate supply with a shared ground. Never assume servos are powered over USB.

## Protocols (canonical definitions live in `packages/protocol`; never redefine shapes in apps)

**Units and conventions:**
- Meters and radians internally.
- Degrees only at the serial boundary.
- Quaternions are `[x, y, z, w]`.
- Frames follow WebXR: right-handed, +Y up, −Z forward.

**Serial (phone → MCU):** 115200 baud, ASCII lines, 50 Hz.
- Command: `J,<seq>,<j1>,<j2>,<j3>,<j4>,<j5>*<crc8>\n`
  - Angles in degrees with 1 decimal place.
  - `crc8` = CRC-8 (polynomial 0x07) over the bytes between `J` and `*`, written as 2 hex digits.
- Status (MCU → phone), 10 Hz: `S,<seq>,<state>,<j1>,…,<j5>*<crc8>\n`
  - `state` ∈ `HOMING | IDLE | ACTIVE | WATCHDOG | ESTOP`.
- The firmware may reset when the port opens (DTR line). The phone app must re-handshake on reconnect.

**WebRTC data channel (Quest ↔ phone):** JSON with a `t` discriminator.
- `joints`: `{seq, deg[5], engaged}`
- `pan`: `{seq, deg}` camera servo 0–180°, from head yaw; not deadman-gated. Phone → serial `P` line.
- `camOrient`: `{q, ts}`
- `debug`: `{on}` (phone app's debug switch → in-VR arm model; resent 1 Hz)
- `track`: `{mode: "hand" | "elbow"}` (phone app's hand-tracking choice; resent 1 Hz)
- `status`: mirrors the serial status line.

**IMU wearable WebSocket (wearable → Quest), ~100 Hz:** `{t:"imu", seq, forearm:q, hand:q}`.
- Use BNO085 **game rotation vector**, which ignores the magnetometer (servos distort magnetic readings).

## Commands

```
npm install                      # all workspaces
npm run dev:operator             # Vite on laptop, LAN-exposed; Quest opens http://<laptop-ip>:5173/operator/?signal=ws://<phone-ip>:8080/signal
npm run build                    # builds the operator into the Android app's assets (apps/robot-android/app/src/main/assets/web)
npm run android                  # build + install the phone app on the connected device/AVD (adb)
(cd apps/robot-android && ./gradlew testDebugUnitTest)   # JVM tests: protocol mirror, relay, serial handshake, hub
node apps/robot-android/tools/smoke.mjs                  # laptop plays operator against the app (needs adb forward tcp:8080 tcp:8080)
npm test                         # vitest across packages
npm run typecheck                # tsc --noEmit across workspaces
npm run gen:arm-config           # hardware/urdf/arm.urdf → firmware/arm-controller/include/arm_config.h
pio run -d firmware/arm-controller -t upload
pio device monitor -d firmware/arm-controller
```

- **Desktop testing without a headset:** open the operator page with `?emulate=1`. This installs IWER (Meta's WebXR emulator) with the Quest 3 preset.

## Conventions

- **TypeScript:** strict mode, ESM, npm workspaces, Vite for apps, vitest for tests. No `any` in `packages/`.
- **Firmware:**
  - C++17.
  - No dynamic allocation inside the control loop.
  - Fixed-rate control loop.
  - Every state change is logged to serial behind a `DEBUG` flag.
- **Generated files** (`arm_config.h`, anything under `generated/`) are never edited by hand.
- **Dependencies:** don't add any beyond those listed here without asking.
- **Android:** Kotlin, minSdk 31, compileSdk 37, AGP 9 (built-in Kotlin), Gradle wrapper. Versions live in `apps/robot-android/gradle/libs.versions.toml`.

## Gotchas

**Quest Browser:**
- The dev flag needs the exact origin, including the port. Restart the browser after setting it.
- The palm pinch gesture is reserved by the system. Don't use it as the deadman.

**Android / phone:**
- Another app or the system may hold the USB interface, which makes the claim fail. Test the exact board early.
- The app picks the back camera with the shortest focal length. Samsung may only expose the ultrawide through the logical back camera; check the camera buttons on the S25 Ultra.
- Keep the app in the foreground (it holds `FLAG_KEEP_SCREEN_ON`). Backgrounding may stop the server and camera.
- Kotlin mirrors of the protocol live in `apps/robot-android/.../protocol/`. `packages/protocol` stays canonical; update both and keep the test vectors in sync.
- On the emulator, the laptop reaches the app only through `adb forward`. Desktop Chrome must disable mDNS host-candidate hiding, as `apps/robot-android/tools/smoke.mjs` does.
- Expect thermal throttling.

**Network:**
- Venue Wi-Fi often blocks device-to-device traffic. Use the team's own router or the phone's hotspot.

## How Claude should work here

- **Hardware access.** Claude cannot touch the hardware. Verify with unit tests, typecheck, IWER, the in-VR HUD and the serial test CLI. Always state what was NOT tested on real hardware.
- **Stop and ask** before changing anything under "Key decisions" or "Safety invariants", or before editing `hardware/urdf/arm.urdf` joint limits.
- **Open items.** If a task depends on one of these (joint list/limits/link lengths, sacrificed IK axis, gripper, servo models, phone model), use a clearly marked `TODO(open-item)` placeholder and say so.

## Build order (track progress in docs/STATUS.md)

1. Arm firmware: serial parser, limits, watchdog, e-stop handling. Tested from a laptop with the serial test CLI.
2. The phone app serves the operator page; the Quest connects; head pose drives the pan/tilt stand.
3. Quest hand tracking → IK → arm, with the deadman gesture. The HUD shows commanded and reported state; an in-VR arm model of the commanded pose appears only when the phone app's debug switch is on.
4. Video stream with wide-FOV crop.
5. Stretch goals: IMU fallback, IOBT elbow fusion, polish.
