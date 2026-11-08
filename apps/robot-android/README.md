# Clawitzer phone app (`apps/robot-android`)

Native Android app that runs on the phone on the pan/tilt stand. It replaces the old phone web page and the Termux server.

- Serves the operator page on `http://<phone-ip>:8080/operator/` and the signaling WebSocket on `/signal?role=operator`.
- Answers the operator's WebRTC offer and sends the camera plus `camOrient` (~60 Hz) and `status` (10 Hz).
- Relays `joints` to the NodeMCU-32S over USB serial (CP210x/CH340 bridge), **only while `engaged`**. The firmware watchdog holds the arm otherwise.
- Relays `pan` (head yaw minus base j1) as serial `P` lines to the camera servo; not deadman-gated.
- **Reference arm** (shown while the MCU reports `HOMING`): after the user confirms every axis is on its home mark, sends the calibration `status` + `reference,HOME_MARK_CONFIRMED` requests. Required after every boot, reset or e-stop before the arm accepts joints.
- **Hold to return to home marks** (shown once referenced: `IDLE`/`ACTIVE`/`WATCHDOG`): hold-to-run like the laptop jogs. While held, the phone sends the park pose (`generated/ArmConfig.kt`, from the URDF) at 50 Hz and mutes the VR relay; the firmware ramps there under its own limits. Release stops the stream and the firmware watchdog brakes. Park the arm this way before powering off so the next boot can auto-reference. It cannot move an unreferenced (`HOMING`) arm.

Kotlin + Jetpack Compose, minSdk 31. Wire formats mirror `packages/protocol`, which stays canonical.

## Build and install

```
npm run build                        # operator bundle → app/src/main/assets/web/operator (required: the APK serves it)
cd apps/robot-android
./gradlew testDebugUnitTest          # JVM tests: protocol vectors, relay, serial handshake, hub routing/signaling
./gradlew installDebug               # to the connected phone or running AVD
```

`npm run android` does the build and install in one step. The SDK comes from `ANDROID_HOME` or `local.properties`.

## Use

1. Open the app. It asks for the camera permission, then the back camera with the shortest focal length fills the screen. The sheet on the right (**Status · Joints · Log**) shows the operator URL for each network interface under **Status ▸ Operator**; × folds it into a pill.
2. Other cameras appear as lens buttons in the **Status** tab.
3. Plug in the board (OTG). Accept "open Clawitzer", or tap **Connect arm**. The arm state goes `Handshaking` → `Ready` on the first status line; **Reset** drops the link.
4. **Mock MCU** (bottom of **Status**) replaces USB with a fake MCU: IDLE, then ACTIVE while commands arrive, WATCHDOG after 200 ms of silence. Encoded `J` lines go to the **Log** tab.
5. On the Quest, set the dev flag `unsafely-treat-insecure-origin-as-secure` to `http://<phone-ip>:8080`, restart the browser, then open `http://<phone-ip>:8080/operator/`.

Keep the app in the foreground; the screen stays on.

Developing the operator on the laptop against the phone: `npm run dev:operator`, then open `http://<laptop-ip>:5173/operator/?signal=ws://<phone-ip>:8080/signal`.

## Test without hardware (AVD `Galaxy_S25_Ultra`)

```
npm run android
adb forward tcp:8080 tcp:8080
# in the app: allow the camera, Status ▸ Mock MCU on
node apps/robot-android/tools/smoke.mjs
```

The smoke test runs headless Chromium as the operator. It checks that the data channel opens, a disengaged command is not relayed, engaged commands drive the mock to ACTIVE, silence gives WATCHDOG, and `camOrient` and video frames arrive.

- **mDNS:** desktop Chrome hides host IPs behind `.local` names that the emulator can't resolve. The smoke test disables that (`--disable-features=WebRtcHideLocalIpsWithMdns`). Use the same flag to open `http://localhost:8080/operator/?emulate=1` by hand.
- **Orientation:** move the phone in Extended controls → Virtual sensors to change `camOrient`.
- **Camera:** the AVD's back camera is the virtual scene.

## Not testable on the AVD

- USB serial to the real ESP32-S3: permission, CDC-ACM claim, DTR reset behavior.
- Which S25 Ultra camera IDs Camera2 exposes. The ultrawide may only be reachable through the logical camera's zoom, which this capturer can't set.
- Thermal throttling at 1920×1080@30.
- Quest ↔ phone over the team router.
