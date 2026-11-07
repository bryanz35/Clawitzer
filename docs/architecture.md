# Architecture

```
Quest Browser (apps/operator)                Android app (apps/robot-android)            NodeMCU-32S (firmware/arm-controller)
 hand/body tracking → filter → IK ──WebRTC data──► relay joint cmds ──USB serial──►  limits, watchdog, servos
 world-locked video panel + crop  ◄──WebRTC video── camera + phone orientation
        ▲ ws:// direct over Wi-Fi
 IMU wearable (firmware/imu-wearable: ESP32 + 2× BNO085)
The app also embeds an HTTP + WebSocket server on :8080: serves the operator page + signaling only (no business logic)
```

## Data flow, one control frame

1. The Quest renders an XR frame. `tracking.ts` reads the wrist, the middle-finger knuckle, the thumb and index tips, the elbow (`XRFrame.body`) and the head. Missing poses are `null`.
2. `deadman.ts` decides whether the arm should follow: an index–thumb pinch held for 150 ms, with the palm facing away from the head. The palm-toward-head pinch is reserved by the system.
3. While engaged:
   - The knuckle position relative to the elbow, plus the wrist orientation, is converted from the WebXR frame to the arm base frame (`xrToArmVec`/`xrToArmQuat`).
   - The pose is One Euro filtered, then solved by `ArmIK` on the main thread.
   - The IK clamps to URDF limits and rejects any per-frame jump above `MAX_JOINT_STEP_DEG`.
4. At 50 Hz, the operator sends `joints {seq, deg[5], engaged}` on the unordered `control` data channel.
5. The phone drops stale or reordered messages by seq. It forwards to serial **only if `engaged`**, as `J,<seq>,…*crc`, using its own serial seq.
6. The firmware checks the CRC and seq, clamps position, velocity and acceleration per joint, and steps the servos at 100 Hz. If no valid command arrives for 200 ms, it holds and reports `WATCHDOG`.
7. Status flows back at 10 Hz as `S,<seq>,<state>,…` → `status` on the data channel → the ghost twin in VR.

## Components

**apps/operator (Quest Browser, WebXR + Three.js).** Owns all user-facing logic: tracking, the deadman, filtering, IK, the digital twin and the video panel.
- The IK runs here, not on the phone. The Quest has the poses, and keeping the phone a dumb relay keeps its thermals down.
- Two twins: a solid one for the commanded pose and a ghost for the MCU-reported pose. Any gap between them is visible lag or limiting.
- `?emulate=1` installs IWER for desktop work. `?mockRobot=1` runs without a phone.
- `control.html` is a separate desktop Chrome page that sends normal `J` commands directly to the MCU over Web Serial. It reuses protocol, URDF and twin code but not WebRTC, tracking or IK. Web Serial is unavailable in Quest Browser and the Android WebView, so this page is laptop-only.

**apps/robot-android (native Android app, Kotlin + Compose).** One process does what the phone web page and the Termux server used to do.
- `hub/Hub.kt` (Ktor CIO on :8080) serves the operator bundle from `assets/web/` and the `/signal?role=operator` WebSocket. The robot peer is in-process, so the hub tells the operator `peer robot present:true` on connect. A newer operator replaces the old one with close code 4000. No business logic.
- `rtc/RobotPeer.kt` is the WebRTC answerer (libwebrtc via stream-webrtc-android). It sends the Camera2 track plus `camOrient` and `status` on the `control` channel. No STUN: LAN host candidates only.
- `arm/Relay.kt` drops stale `joints` by seq and forwards only `engaged` ones. `arm/UsbArmLink.kt` writes them to the MCU over USB host (usb-serial-for-android). `arm/SerialSession` handshakes on every (re)connect by waiting for a status line and continuing from its seq. A "Mock MCU" switch replaces USB with a fake 10 Hz status.
- NodeMCU-32S boards expose UART0 through a CP210x/CH340-style bridge, not CDC-ACM. usb-serial-for-android's default prober supports those chips, but `res/xml/device_filter.xml` only matches the Espressif VID, so attaching the board won't auto-launch the app. Untested on the real board. A phone-side deliberate marked-home reference action is also required after reconnect resets; the current reference workflow is the laptop CLI.
- `sensors/Orientation.kt` sends `TYPE_ROTATION_VECTOR` (device → ENU, the same frame Chrome's AbsoluteOrientationSensor used) at ~60 Hz.
- `FLAG_KEEP_SCREEN_ON` keeps the app awake in the foreground.
- `protocol/` is a Kotlin mirror of `packages/protocol`, which stays canonical.

**packages/protocol.** Every message shape, type guard, the serial encoder/decoder, CRC-8 and shared constants. Apps never redefine shapes.

**packages/kinematics.**
- A minimal URDF reader (single serial chain, revolute/fixed joints, principal axes) that runs in Node and the browser.
- `ArmIK` wraps closed-chain-ik's `Solver`.
- closed-chain-ik goals constrain all three rotations or none. To get position + 2 orientation DOF, an unlimited virtual joint about the sacrificed tool axis is appended before a full 6-DOF goal.
- `j5` is an independent gripper coordinate, not wrist yaw. URDF `role="gripper"` excludes it from tool-pose IK and twin link rotation; solving preserves its current angle. Four pose axes may only approximate the existing position + 2 orientation goal; unreachable targets use the nearest accepted bounded solution.

**packages/filters.** Scalar and quaternion One Euro filters.

**firmware/arm-controller (NodeMCU-32S / ESP-WROOM-32, ESP-IDF, C++17).**
- `Arm` (`arm.h/.cpp`) owns joint-space articulation and safety: HOMING → IDLE → ACTIVE ⇄ WATCHDOG, plus ESTOP. `setJointAngles(deg, seq, nowMs)` accepts targets; `update(nowMs, dtSec)` advances a fixed tick. Only `positionDeg()` should reach the output driver.
- `Arm` clamps position, velocity and acceleration using generated `arm_config.h`. It rejects non-finite angles and stale wrapping sequences; only accepted targets refresh the watchdog. It has no transport or hardware dependencies.
- `SerialController` adapts byte streams to arm targets and formats status. `protocol.cpp` mirrors the canonical TS wire format; both modules are framework-independent and covered by native tests.
- `CalibrationSession` gates normal commands until valid saved mapping and explicit marked-home reference. It owns a separate, user-acknowledged unloaded bench mode: isolated actuator-to-output-mask arming, bounded jogs and a 200 ms host keepalive lease. A servo-only scope initializes only the e-stop input, disabled EN and selected PWM channels, so wrist jogging works without TMC/encoder hardware. Complete generated-limit envelope validation is required before atomic NVS save.
- `board_config.h` owns pins, e-stop polarity and hard pulse windows in code; NVS stores only discovered mappings. `actuator_config` maps five logical coordinates to four servo pulses plus an elbow step target. Wrist A/B use a measured 2×2 roll/pitch matrix; no independent output clipping. Motor full steps, directions, current, Rsense and following tolerance remain saved mapping values; reduction lives in board config.
- `EspActuatorIO` supplies 50 Hz LEDC outputs only for the configured scope, scoped TMC2209 UART setup, scoped AS5047P SPI/parity/error checks and bounded GPTimer STEP/DIR pulses. The encoder is on the motor shaft: counts unwrap across revolutions only after manual generated-home alignment; following error or encoder faults disable outputs and clear reference. It does not correct missed steps.
- `SerialTransport` owns UART0 GPIO1/3 through the onboard USB bridge with bounded nonblocking partial-line writes. UART1 serves the TMC on configured pins. SDK console/log output is disabled to avoid interleaved frames.
- `app_main` composes these modules, retains calibration replies under TX backpressure, runs the fixed 100 Hz session tick and emits status at 10 Hz. Status reports measured elbow position when referenced; other axes report firmware setpoints. E-stop sense also cancels step pulses in the timer ISR. Long stalls resynchronize rather than burst through missed ticks.
- PlatformIO selects `framework = espidf`; no Arduino or ESP32Servo dependency. The pinned Nix flake provides an FHS development shell and noninteractive runner; see the root README.

**firmware/imu-wearable (stretch).** Two BNO085s (game rotation vector, no magnetometer) streaming `imu` JSON at ~100 Hz over a WebSocket server on :81. The Quest connects directly with `?imu=ws://…`.

**hardware/urdf/arm.urdf.** The single source of truth for geometry, limits and home pose (`<arm_mirror home acceleration>`). `npm run gen:arm-config` turns it into the firmware header.

**tools.** `gen-arm-config.ts`, and `serial-test`: a laptop CLI that drives the firmware without the phone. `apps/robot-android/tools/smoke.mjs` plays the operator against the phone app from a laptop.

## Frames and units

- Meters and radians internally; degrees only in `joints`/`status` and on the serial line.
- WebXR frame: +Y up, −Z forward. URDF/arm frame: +X forward, +Z up.
- Quaternions are `[x, y, z, w]`.
