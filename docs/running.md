# Running Clawitzer

Setup, the order of steps for a live session, testing without hardware, the desktop
joint panel and common problems. For what the system is and how it fits together, see the
[README](../README.md).

## Setup

Prerequisites: Node.js with npm, the Android SDK (`ANDROID_HOME` or
`apps/robot-android/local.properties`) and `adb`. For firmware you also need Nix with flakes
enabled.

```sh
npm install                 # all workspaces (.npmrc allows the closed-chain-ik GitHub dependency)
npm run gen:arm-config      # hardware/urdf/arm.urdf → firmware/arm-controller/include/arm_config.h + phone ArmConfig.kt
npm test                    # vitest across packages and the operator
npm run typecheck
npm run build               # operator → apps/robot-android/app/src/main/assets/web/operator
npm run android             # build + install the phone app via adb (phone or AVD)
(cd apps/robot-android && ./gradlew testDebugUnitTest)   # phone app JVM tests
```

Firmware (ESP-IDF via PlatformIO, inside the pinned Nix shell):

```sh
nix develop path:./firmware/arm-controller
pio test -d firmware/arm-controller -e native                  # C++17 host tests
pio run -d firmware/arm-controller -e nodemcu-32s -t upload
pio device monitor -d firmware/arm-controller -e nodemcu-32s   # 115200 baud
```

A fresh flash already carries the measured calibration, so normal motion needs only the
marked-home reference. Shell details, wiring diagnostics and the full calibration record
are in [`firmware/arm-controller/README.md`](../firmware/arm-controller/README.md).

## Running a session

1. **Power and safety.** Put the servo/motor supply on its own rail with a shared ground,
   and keep the physical e-stop within reach. Never power actuators from USB.
2. **Phone and board.** Plug the NodeMCU-32S into the phone with the OTG cable. Open the
   Clawitzer app and accept the USB prompt (or tap **Connect arm**). The arm state goes
   `Handshaking` → `Ready`.
3. **Reference the arm.** If the board reports `HOMING`, the arm ignores joint commands.
   - If the elbow encoder still reads the angle from the last reference (the arm was parked
     before power-off), the board re-references itself at boot.
   - Otherwise, align every axis to its home mark and tap **Reference arm** in the app.
   - Opening the USB port can reset the board, so expect to repeat this after reconnects.
4. **Network.** Put the Quest and the phone on the team router or the phone's hotspot. Venue
   Wi-Fi often blocks device-to-device traffic.
5. **Quest.** In `chrome://flags`, add `http://<phone-ip>:8080` (exact origin, with the port)
   to `unsafely-treat-insecure-origin-as-secure`, then restart the browser. Open
   `http://<phone-ip>:8080/operator/` and enter VR. The phone app shows the URL under
   **Status ▸ Operator**.
6. **Drive.**
   - Curl your middle, ring and little fingers into a fist to engage. The arm follows
     while you hold it.
   - Pinch your thumb and index finger to close the claw. Open them to open it.
   - Open your hand to release. The arm holds in place.
   - Turn your head to pan the camera.
7. **Finish.** Hold **Hold to return to home marks** in the phone app until the arm is parked,
   then power off. The next boot can then re-reference automatically.

In the phone app, **Hand tracking** picks the mapping:
- `hand` (default) moves the arm's hand by your hand's motion since you engaged.
- `elbow` copies your forearm directly, using Quest body tracking.

**Debug arm model in VR** shows a stick model of the commanded pose.

### Operator page options

| Query parameter | Effect |
|---|---|
| `emulate=1` | Installs IWER (Meta's WebXR emulator, Quest 3 preset) for desktop testing. |
| `mockRobot=1` | Runs without a phone; commands are echoed locally. |
| `signal=ws://<host>:8080/signal` | Signaling server, when the page isn't served by the phone (e.g. Vite on a laptop). |
| `hand=left` | Track the left hand (default right). |
| `track=elbow` | Start in forearm-copy mode. The phone's **Hand tracking** choice takes over once connected. |
| `debug=1` | Show the debug arm model without the phone switch. |
| `fov=<deg>` | Horizontal FOV of the video panel. |

## Developing without hardware

- **Operator on the desktop:** `npm run dev:operator`, then open
  `http://localhost:5173/operator/?emulate=1&mockRobot=1`.
- **Phone app on an emulator:** run it on the `Galaxy_S25_Ultra` AVD with **Status ▸ Mock MCU**
  on, `adb forward tcp:8080 tcp:8080`, then `node apps/robot-android/tools/smoke.mjs`. See the
  [phone app README](../apps/robot-android/README.md).
- **Operator against the phone app:** with the port forwarded, open
  `http://localhost:8080/operator/?emulate=1`. Desktop Chrome needs
  `--disable-features=WebRtcHideLocalIpsWithMdns` to reach the emulator.
- **Operator from the laptop against a real phone:** `npm run dev:operator`, then open
  `http://<laptop-ip>:5173/operator/?signal=ws://<phone-ip>:8080/signal` on the Quest.
- **Arm without the phone:** `npm run serial -w @arm-mirror/tools -- watch`
  (`list | watch | home | jog | sweep | calibrate`), or the desktop joint panel below.

### Desktop joint control panel

The laptop GUI at `apps/operator/control.html` controls the arm directly over
USB serial. It uses normal `J` commands, firmware limits and the 200 ms watchdog;
it never enters bench mode or arms individual actuators.

```sh
npm run dev:operator
```

Open <http://localhost:5173/operator/control.html> in desktop Chrome or Chromium.
Web Serial needs `localhost` (or another secure context); Quest Browser, the
Android app and other serial programs cannot share the port. Close the
calibration CLI before connecting.

The firmware ships with the measured calibration compiled in, so a fresh flash
already reports `Saved / valid`. **Reference is automatic at power-up** when the
motor-shaft encoder still reads the angle recorded at the last marked-home
reference (the arm parked where it always starts). Boot homing targets the
**park pose** — j2's is −75° (fully upright), while 0° remains straight — so
power-up does not drive the elbow to straight. Anything else — a stop
mid-motion, an e-stop or a fault that left the elbow elsewhere — keeps the
manual path: align every axis to its home mark, tick the acknowledgement and use
`Confirm reference & home`. The panel cannot create or save calibration; that is
only needed when re-measuring, through the bench console and NVS. `Connect` only
opens the port.

Hold `Shift` plus `A`/`D` (base left/right), `W`/`S` (elbow up/down),
`↑`/`↓` (wrist pitch up/down), `←`/`→` (wrist roll left/right) and `T`/`G`
(gripper open/close); or hold a `−`/`+` button with the mouse
(`Enter` works on a focused button). Releasing, pressing `Esc`, leaving the
window or losing telemetry requests a hold at the latest reported pose and stops
streaming. There is no automatic resume. The speed slider is a fraction of each
joint's URDF velocity; the client ramps and clamps, and the firmware remains
authoritative.

`Hold position` stops commanded motion without disabling outputs.
`Disable outputs` sends `halt`, which disables outputs, clears the reference and
may drop a supported load; a new marked-home reference is required before
motion. Neither is a substitute for the physical e-stop. The displayed joint
angles are firmware estimates, not measured feedback from every axis. USB
reopening may reset the board and clear its reference.

## Troubleshooting

- **Quest won't enter VR / page says insecure:** the dev flag needs the exact origin,
  including the port. Restart the browser after setting it.
- **Arm stops when pinching with the palm toward you:** that gesture opens the Quest system
  menu. The page stops sending and the firmware watchdog holds.
- **Phone can't claim the board:** another app or the system may hold the USB interface.
  `device_filter.xml` matches CP210x and CH340 bridges; the exact board's chip is unverified.
- **Arm back in `HOMING` after reconnecting:** opening the port can reset the board (DTR).
  Reference it again.
- **Video stutters or the app stops:** keep the app in the foreground (it holds the screen
  on), and expect thermal throttling.
- **Elbow stalls lifting a load:** known open item; see [`docs/STATUS.md`](STATUS.md).
