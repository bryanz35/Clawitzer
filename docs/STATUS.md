# Status

Build order from the root `CLAUDE.md`. "Scaffolded" means stubs/first-cut code exist that compile and pass unit tests. **Nothing has run on real hardware yet.**

| # | milestone | owner | state |
|---|---|---|---|
| 1 | Arm firmware: serial parser, limits, watchdog, e-stop handling. Tested from a laptop with the serial test CLI. | | ESP-IDF NodeMCU-32S controller: DS3235 base, encoder-monitored TMC2209 elbow, differential MS62 wrist, MS62 gripper; code-owned pins/windows plus mapping-only NVS and UART0 host transport. Actual-target cross-build and native tests pass. Live PTY smoke ran the real CLI against the portable firmware core with absent TMC/encoder: one-consent `wrist`, A/B jogs, NA samples, lease expiry, e-stop abort and restart re-arm. Flashed to the NodeMCU-32S; post-flash status streaming verified. A desktop normal-mode Web Serial panel (`/operator/control.html`) was exercised in desktop Chromium against a protocol-level fake firmware, including reference/homing gates, held keyboard and mouse jogging, release hold, stale telemetry, and explicit output disable. Real homing, loaded joint motion, pulse timing, current, e-stop and NVS power-loss behavior remain untested. An independent 0–180° camera servo channel was added on GPIO21 with `P`/`V` serial messages and no arm calibration coupling; its native protocol tests and desktop slider passed against simulated firmware, but the physical servo and nominal 500–2500 µs endpoints remain unverified. |
| 2 | The phone app serves the operator page; the Quest connects; head pose drives the pan/tilt stand. | | Native Android app (`apps/robot-android`) replaces the phone page + Termux server. JVM tests pass. On the `Galaxy_S25_Ultra` AVD, the hub, WebRTC answer, video, `camOrient` and the mock-MCU relay passed `tools/smoke.mjs` from laptop Chromium. **Not run on the real S25 Ultra, the Quest, or the NodeMCU-32S over USB.** **Pan stand (pan only) has no protocol message or controller yet**: TODO(open-item). |
| 3 | Quest hand tracking → IK → arm, with the deadman gesture. (In-VR 3D arm copy dropped 2026-11-07.) | | IK preserves the independent gripper and excludes it from tool pose; FK/IK regression tests pass. Operator scene rendered in desktop Chromium with IWER and entered emulated VR without page errors. Hand/body conventions and real-device behavior remain unverified. |
| 4 | Video stream with wide-FOV crop. | | Scaffolded. Crop math is linear in angle. Phone mount known (landscape, ~10° down, lens on the pan axis; no tilt, so head pitch is crop-only). FOV is TODO(open-item). |
| 5 | Stretch: IMU fallback, IOBT elbow fusion, polish. | | Wearable firmware + Quest client scaffolded; fusion not started. |

## Open items (blockers marked TODO(open-item) in code)

- [x] Joint list, limits, link lengths, home pose: `hardware/urdf/arm.urdf` (from `docs/questions.md`). Still open: velocity/acceleration limits, joint-combination collisions, servo pulse ranges, e-stop/power (§5, §4, §8, §9).
- [x] Sacrificed IK axis: hand swing about tool Z (`freeAxis: "z"`), recorded in `arm.urdf`
- [x] Actuator identities: DS3235 base; TMC2209 + motor-shaft AS5047P elbow; differential MS62 wrist; MS62 gripper.
- [ ] Measure real safe servo travel and edit hard windows in `board_config.h`; run optional base/grip/differential measurements and confirm motor steps, current/Rsense, directions and following tolerance before normal motion. Only mappings persist in NVS. Current 500–2500 µs windows are placeholders.
- [ ] TMC2209 elbow torque under load: loaded upward motion stalls at 1700 mA RMS on 12 V, including 1/4 microstepping. Stationary holding was not the reported failure. Investigate the abrupt 75 RPM start (no acceleration ramp), motor-supply sag, coil/wiring pairing, driver heating and required load torque before increasing current or saving a calibration. The desktop panel does not change current or microstepping.
- [ ] Wire/verify external fail-safe e-stop/power sense (suggested P35 with external active-LOW pulldown) and TMC EN pull-up; identify the module's PDN/USART labels from its actual schematic.
- [ ] Phone USB: verify the Android app claims the board's actual bridge chip (CP210x/CH340) and add its VID to `device_filter.xml`; add a deliberate phone-side marked-home reference action before phone-controlled motion.
- [ ] Phone: Galaxy S25 Ultra chosen. Still open: whether Camera2 exposes the ultrawide as its own ID, camera FOV, mount orientation, capture resolution (`apps/robot-android/.../rtc/RobotPeer.kt`)
- [ ] Pan stand: pan only (180°, no tilt), one 25 kg servo on the arm ESP32. Still TODO: pin, a `packages/protocol` message, firmware output.
- [ ] Wearable board and I2C pins: `firmware/imu-wearable/src/main.cpp`
