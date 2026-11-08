# arm-controller firmware

Safety rules (from the root `CLAUDE.md`; stop and ask before weakening any):

- **Firmware enforces limits.** Position, velocity and acceleration are clamped here, every tick. Client clamping is extra.
- **Limits come only from `arm_config.h`.** It is generated from `hardware/urdf/arm.urdf` by `npm run gen:arm-config`. Never edit it by hand and never hard-code a limit elsewhere.
- **Watchdog:** no valid command for 200 ms → hold position and report `WATCHDOG`.
- **Soft start:** boot with outputs disabled. Saved valid calibration and explicit marked-home reference are required before safe homing; reject normal commands until homing completes. Never infer absolute elbow position from the motor-shaft encoder.
- **Bad input:** drop lines with a bad CRC or a non-increasing (uint16, wrapping) seq.
- **E-stop** cuts servo power in hardware. Tolerate sudden power loss; re-home afterwards.
- **Servo power** is a separate supply with a shared ground. Never assume USB powers the servos.

Code rules:

- C++17. **No dynamic allocation in the loop** (no `String`, `new`, `std::vector` growth).
- Fixed-rate 100 Hz control loop, 10 Hz status line.
- ESP-IDF on NodeMCU-32S (ESP-WROOM-32), no Arduino or ESP32Servo. `Arm`, actuator math, calibration session and wire adapters remain framework-independent for `pio test -e native`.
- State changes are logged behind `-DDEBUG=1`, as lines starting with `#`.
- The serial format is canonical in `packages/protocol/src/serial.ts`. Keep `protocol.cpp` in sync, and keep the shared test vector (`J,42,…*F6`) in both test suites.
- `Arm` owns safe articulation. `CalibrationSession` maps its safe logical angles through validated mappings: DS3235 base, TMC2209 elbow with configurable gearing and AS5047P motor encoder, differential MS62 wrist pair, MS62 gripper. Generated limits come from `arm.urdf`; j3's lower limit is the measured −63° collision stop.
- **Pins, e-stop polarity and hard pulse windows are code-owned in `board_config.h`.** NVS stores only discovered mappings. Never accept or restore hardware wiring/windows over serial. Base/wrist 500–2500 µs / 1500 µs-center windows remain placeholders. The user-measured gripper window is 970–2500 µs, with 1735 µs logical center. All measured mappings (base, wrist, gripper, 200 steps/rev at 1/4 microstepping, 21:1, directions, 1700 mA, 0.11 Ω, 2° following) are compiled defaults, so a fresh flash validates without a bench session; NVS overrides them for re-measurement.
- User-approved bench exception: unloaded/disconnected linkage, physical power e-stop ready, exact acknowledgement, one isolated actuator/pair, explicit bounded jogs and 200 ms host lease. No automatic sweeps or normal J commands in bench mode. A servo-only scope must work without TMC/encoder hardware. Saving validates the entire generated joint envelope without independent PWM clipping. The differential wrist pair is a symmetric 1:2 mix, so its reachable set is the diamond `|j3| + |j4| <= wristTiltSumDeg()`; `Arm` projects every pose onto it and `validate()` checks that clipped diamond rather than unreachable rectangle corners. j3's −63° stop is a collision limit, not a servo end.
- Every boot, power loss, e-stop or encoder/following fault clears reference and disables outputs. Reference is restored automatically only when the motor-shaft encoder still reads the angle recorded at the last marked-home reference (the arm parked at its start pose); any other reading requires manual marked-home confirmation. Encoder faults are debounced, not latched on one sample: an implausible jump (faster than any legal motion) is discarded without touching the count, and following/limit faults need 5 consecutive bad samples (~50 ms). A bump up to 5° past a joint limit is tolerated and does not count as following error; only past that margin does `encoder_joint_limit` latch. Encoder feedback monitors following error; it never automatically corrects lost steps.
- `SerialTransport` exclusively owns UART0 GPIO1/3 through the onboard USB bridge. Keep SDK console/logging disabled; route `#` diagnostics through the bounded nonblocking transport. UART1 is reserved for configured TMC pins.
- GPIO6..11 are flash; GPIO1/3 are host serial. GPIO34/35/36/39 are input-only with no internal pulls; e-stop sense there requires an external bias toward its active/stop level.

DTR reset: opening the host port may reset the board. Re-handshake from status `seq` + 1, and repeat manual reference after every reset. Canonical calibration C/K commands live in `packages/protocol/src/calibration.ts`, separate from J sequencing; bad CRC/stale calibration commands never refresh motion leases.

Not verifiable from here: anything touching real servos, pins, USB enumeration or the e-stop sense line.
