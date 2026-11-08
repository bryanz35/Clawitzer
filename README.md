# Clawitzer

Clawitzer lets someone wearing a Meta Quest 3 control a robot arm with their own arm. The
robot is built like a human arm, with the elbow fixed at its base, four joints that pose the
hand and a separate gripper. An Android phone on a pan stand next to it is the robot's eye.
When the operator turns their head the stand turns with them, and the phone's camera feed
appears on a screen floating in front of them in VR.

The operator makes a fist to take control. While they hold it, the arm follows their hand,
and pinching thumb and index finger together closes the gripper. Opening the hand hands
control back and the arm holds still.

We built it in a hackathon as a team of three covering mechanical, electrical and
software work. The full stack, from the Quest through the phone to the arm, runs end to end
on the real hardware.

## How it works

```
Quest Browser (apps/operator)                Android app (apps/robot-android)            NodeMCU-32S (firmware/arm-controller)
 hand/body tracking → filter → IK ──WebRTC data──► relay joint cmds ──USB serial──►  limits, watchdog, servos
 world-locked video panel + crop  ◄──WebRTC video── camera + phone orientation
The app also embeds an HTTP + WebSocket server on :8080: serves the operator page + signaling only (no business logic)
```

The headset reads the operator's body and does all of the math. The phone carries video to
the headset and arm commands to the arm. The controller board on the arm checks every
command against its own limits before it moves a motor.

### Headset app (`apps/operator`)

A web page that runs in the Quest's browser, built with WebXR and Three.js. Every frame it
reads the hand joints from Quest hand tracking, the elbow from body tracking and the head
pose.

A deadman check decides whether the arm may move. It engages after the middle, ring and
little fingers have stayed curled for 150 ms. It releases only when they clearly open or
when tracking has been lost for more than 500 ms, so a half-curled reading or a brief
dropout changes nothing.

While engaged, the page turns the hand into a target pose for the arm's hand. The operator
picks one of two mappings on the phone:

- Hand mode, the default, moves the arm's hand by however far the operator's hand has moved
  since they made the fist, measured relative to the way they were facing. It needs only
  hand tracking.
- Elbow mode copies the operator's forearm and hand straight onto the arm using the
  body-tracked elbow. It blends in over 1.5 seconds from where the arm was, and it skips any
  frame where the measured forearm length is more than 20% off.

A One Euro filter smooths the target, and the closed-chain-ik library solves it for joint
angles. Four pose joints can't match every hand pose, so the solver matches the hand's
position and two of its three rotation axes; `arm.urdf` records which axis it gives up. It
clamps every solution to the joint limits and rejects any that jumps too far in one frame.
The gap between the thumb and index fingertips sets the gripper on its own.

The page also draws the video panel and a status panel showing each joint's commanded and
reported angle. Head yaw, minus the base rotation the stand rides on, becomes the camera
stand's pan angle, whether or not the fist is held.

### Phone app (`apps/robot-android`)

A native Android app written in Kotlin with Jetpack Compose, running on the phone mounted
on the pan stand.

It hosts the headset page. A small Ktor web server on port 8080 serves the page and a
WebSocket that the headset uses once to set up its WebRTC connection. After that the
headset and phone talk directly over the local network, with no cloud server in between.

It streams the camera. The app picks the back camera with the widest view and sends it to
the headset over WebRTC. It also sends the phone's orientation from its motion sensors about
60 times a second. Because the phone rides the pan stand, that orientation is the camera's,
and the headset shifts the picture by the difference between where the operator is looking
and where the phone points.

It relays arm commands. The app discards joint commands that arrive out of order and
forwards the rest over USB to the controller board, but only while the headset reports
that the fist is held. It re-handshakes with the board whenever the USB link reconnects.
Two buttons on the phone screen confirm the arm's home position after a reset and drive the
arm back to its parking pose before power-off.

### Arm controller (`firmware/arm-controller`)

C++17 firmware for a NodeMCU-32S (ESP32) board, built on ESP-IDF. The headset already clamps
its commands, and the firmware enforces joint position, speed and acceleration limits again
on every command it accepts.

The board reads command lines from the phone over its USB serial port, checks each line's
checksum and sequence number, and runs a fixed 100 Hz control loop. A state machine moves
between HOMING, IDLE, ACTIVE, WATCHDOG and ESTOP. If no valid command arrives for 200 ms the
arm holds position and reports WATCHDOG. A status line goes back to the phone ten times a
second.

The base, wrist and gripper are hobby servos driven with PWM pulses. The two wrist servos
work as a differential pair, so both pitch and roll come from combining the two motors. The
elbow is a stepper motor with a TMC2209 driver and a 21:1 gearbox, watched by an AS5047P
magnetic encoder on the motor shaft. If the elbow falls too far behind its commanded
position, the firmware turns the outputs off.

After every power-up or e-stop the arm has to be told where it is. If the elbow encoder
still reads the angle it recorded when the arm was last parked, the board does this on its
own. Otherwise someone lines each joint up with its marked home position and confirms it
from the phone. The team measured each motor's mapping with a bench calibration console,
and those measurements are compiled into the firmware.

### Shared code and the arm's description

`packages/protocol` defines every message format and the serial checksum in TypeScript. The
phone app keeps a Kotlin copy that is tested against the same vectors. `packages/kinematics`
loads the arm's geometry and wraps the IK solver, and `packages/filters` holds the One Euro
filter.

The arm's geometry, joint limits and home pose live in one file,
[`hardware/urdf/arm.urdf`](hardware/urdf/arm.urdf). The headset loads it directly, and a
script generates the firmware's limits header and the phone app's parking pose from it, so
all three work from the same numbers.

### Laptop tools

A serial command-line tool and a desktop browser page (`control.html`, using Web Serial)
drive the arm over USB without the phone or headset. The team used them for bench tests and
calibration.

## How the parts communicate

| Link | Transport | What it carries |
|---|---|---|
| Headset → phone | WebRTC data channel (`control`), JSON | `joints`: five angles and an engaged flag, 50 times a second. `pan`: camera stand angle. |
| Phone → headset | WebRTC video track and data channel | Camera video, `camOrient` (phone orientation), `status` (arm state and angles), and the `debug` and `track` settings from the phone screen |
| Headset ↔ phone, setup | WebSocket at `:8080/signal` | WebRTC connection setup, once per connection |
| Phone → board | USB serial at 115200 baud, text lines | `J,<seq>,<j1>,…,<j5>*<crc8>` joint commands at 50 Hz, and `P` lines for the camera pan |
| Board → phone | USB serial | `S,<seq>,<state>,<j1>,…,<j5>*<crc8>` status at 10 Hz |

Angles on the serial line are degrees with one decimal place, and the checksum is CRC-8 over
the line. [`docs/protocol.md`](docs/protocol.md) has the full formats.

## Hardware

| Joint | Motion | Actuator | Limits (deg) |
|---|---|---|---|
| `j1` | Base yaw | DS3235 servo, 1:2 servo:joint travel | −180 … +180 |
| `j2` | Elbow pitch (+ is down) | NEMA 17 + 21:1 cycloidal, TMC2209 driver, AS5047P motor-shaft encoder | −80 … +30 (parks at −75, upright) |
| `j3` | Wrist pitch | MS62 differential pair (shared with `j4`) | −63 … +90 |
| `j4` | Wrist roll | MS62 differential pair (shared with `j3`) | −90 … +90, and `\|j3\| + \|j4\| ≤ 90` |
| `j5` | Gripper (closed to open) | MS62, rack and pinion | −90 … +90 (logical, not finger angles) |
| `j6` | Camera pan stand | 25 kg servo on GPIO21, not an arm joint | 0 … 180 (90 = forward) |

The rest of the kit is a Meta Quest 3, an Android phone with an ultrawide camera and USB host
support (we use a Galaxy S25 Ultra), a USB OTG cable, a separate motor supply with a latching
e-stop, and a Wi-Fi router or phone hotspot. [`hardware/bom.md`](hardware/bom.md) has the
full list, and [`firmware/arm-controller/README.md`](firmware/arm-controller/README.md) has the
wiring.

## Safety

These rules hold across the code; [`CLAUDE.md`](CLAUDE.md#safety-invariants-must-hold-stop-and-ask-before-weakening-any)
has the full list.

- The firmware enforces position, speed and acceleration limits. Clamping in the headset is
  an extra layer on top.
- If no valid command arrives for 200 ms, the arm holds and reports WATCHDOG.
- The arm moves only while the fist is held. When tracking drops out, it holds the last good
  pose and never interpolates from zero.
- The firmware drops commands with a bad checksum or an old sequence number.
- After any boot, power loss, e-stop or fault, the arm ignores commands until its position
  has been confirmed.
- A physical e-stop cuts power to every motor. The motors run on their own supply, never
  from USB.

## Status

The full stack has run end to end on the real hardware and works: Quest hand tracking drives
the arm through the phone app and its USB link, and the phone's camera feed reaches the
headset. [`docs/STATUS.md`](docs/STATUS.md) has the build log, the bench measurements and the
remaining open items.

## Running it

```sh
npm install && npm test        # TypeScript workspaces and tests
npm run android                # build the headset page into the phone app and install it via adb
nix develop path:./firmware/arm-controller
pio run -d firmware/arm-controller -e nodemcu-32s -t upload
```

On the Quest, open `http://<phone-ip>:8080/operator/` after allowing that origin under
`chrome://flags/#unsafely-treat-insecure-origin-as-secure`. For desktop testing, open the
page with `?emulate=1` to use Meta's WebXR emulator. [`docs/running.md`](docs/running.md)
covers setup, a full session from power-on to parking, testing without hardware and
troubleshooting.

## Repository layout

| Path | What it is |
|---|---|
| [`apps/operator`](apps/operator) | Quest WebXR page (Vite, TypeScript, Three.js): tracking, deadman, gripper, IK, status panel and video. Also `control.html`, the desktop joint panel. |
| [`apps/robot-android`](apps/robot-android) | Native phone app (Kotlin, Compose): web server, WebRTC, camera, orientation and USB relay. [README](apps/robot-android/README.md) |
| [`firmware/arm-controller`](firmware/arm-controller) | ESP-IDF C++17 firmware: serial parser, limits, watchdog, e-stop, actuators and calibration. [README](firmware/arm-controller/README.md) |
| [`packages/protocol`](packages/protocol) | Every message type, the serial encoder and decoder, and CRC-8. The phone app's Kotlin copy mirrors it. |
| [`packages/kinematics`](packages/kinematics) | URDF loading, the IK wrapper around closed-chain-ik, and limit clamping. |
| [`packages/filters`](packages/filters) | One Euro filters for smoothing tracking data. |
| [`tools`](tools) | `gen-arm-config.ts` (URDF to firmware and phone config) and `serial-test`, a laptop CLI for driving and calibrating the arm. |
| [`hardware`](hardware) | `urdf/arm.urdf` and the bill of materials. |
| [`docs`](docs) | Architecture, protocol, decisions, status, run guide and raw bench notes. |

## More documentation

- [`docs/architecture.md`](docs/architecture.md): one control frame, step by step, and each component in detail.
- [`docs/protocol.md`](docs/protocol.md): serial, data channel and signaling formats.
- [`docs/decisions.md`](docs/decisions.md): why we chose WebXR, plain HTTP, a native phone app and the rest.
- [`docs/running.md`](docs/running.md): setup, running a session, testing without hardware, troubleshooting.
- [`firmware/arm-controller/README.md`](firmware/arm-controller/README.md): wiring, build shell, diagnostics and calibration.
- [`apps/robot-android/README.md`](apps/robot-android/README.md): building, using and testing the phone app.
- [`CLAUDE.md`](CLAUDE.md): key decisions, safety invariants and conventions for contributors.
