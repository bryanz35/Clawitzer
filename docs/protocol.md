# Protocol

**Canonical definitions live in [`packages/protocol`](../packages/protocol/src).** This page is a readable summary. If it disagrees with the code, the code wins; fix this page. The firmware mirror is `firmware/arm-controller/src/protocol.cpp`.

## Serial: phone → MCU

- 115200 baud, ASCII, `\n`-terminated lines (a trailing `\r` is tolerated).
- **Command, 50 Hz:** `J,<seq>,<j1>,<j2>,<j3>,<j4>,<j5>*<crc8>`
- **Status, MCU → phone, 10 Hz:** `S,<seq>,<state>,<j1>,…,<j5>*<crc8>`
  - `state` ∈ `HOMING | IDLE | ACTIVE | WATCHDOG | ESTOP`.
- Angles are degrees with 1 decimal (`-0.0` is never sent).
- Joint order: base yaw, elbow pitch, wrist pitch, wrist roll, gripper. Roll/pitch are logical coordinates mixed into two wrist servos; j5 is not wrist yaw.
- Once referenced, status j2 is measured from the unwrapped motor-shaft encoder and saved reduction; the other joint angles are firmware setpoints, not measured feedback.
- **`seq`** is a uint16 that wraps at 65536. "Newer" uses serial-number arithmetic: `0` is newer than `65535`. The MCU drops a non-increasing seq.
  - In a status line, `seq` is the **last command seq the MCU accepted**. That is the handshake: after opening the port, wait for a status line and continue from `seq + 1`. The MCU forgets its seq on reboot, so the first command after boot may carry any seq.
- **`crc8`:** CRC-8, poly 0x07, init 0x00, no reflection, no final XOR.
  - It covers the bytes strictly between the leading letter and `*`, so it includes the first comma.
  - It is written as 2 hex digits (uppercase when sent; either case accepted).
  - Check value: `crc8("123456789") = 0xF4`.
- Test vector, shared by both test suites: `encodeJoints(42, [10, -20.5, 0, 45, -45])` = `J,42,10.0,-20.5,0.0,45.0,-45.0*F6`.
- Lines starting with `#` are firmware debug output (`-DDEBUG=1`). Parsers ignore them.
- The board may reset when the port opens (DTR). Outputs remain disabled until saved calibration is valid and all axes are manually aligned to generated home marks, followed by explicit `reference`. `HOMING` also represents this blocked/unreferenced state; receiving status is not permission to move.

## Serial calibration: laptop ↔ MCU

Canonical command/reply types, arities and strict parsers are in [`calibration.ts`](../packages/protocol/src/calibration.ts). `tools/serial-test/calibrate.ts` supplies the direct `wrist` jog workflow plus a maintenance console.

- Commands: `C,<seq>,<verb>[,<args>...]*<crc8>`.
- Replies: `K,<seq>,OK[,<fields>...]*<crc8>` or `K,<seq>,ERR,<reason>*<crc8>`. Reasons are single ASCII tokens.
- CRC and uint16 wrapping rules match J/S. Maximum line payload is 192 bytes. C has its own sequence window; J ordering is independent. Corrupt/stale commands never refresh either motion watchdog. Query `status` is read-only, may use seq 0 and does not consume sequence numbers.
- `status` returns labeled `mode,configured,referenced,lastseq,haveseq,fault,lastjointseq` pairs. Hosts resynchronize C from `lastseq/haveseq` and J from `lastjointseq` or S.
- `enter,UNLOADED_ESTOP_READY` acknowledges unloaded/disconnected linkage and a physical power e-stop. All outputs start disabled. J motion is rejected throughout bench mode.
- `set,<key>,<values...>` changes only a disarmed draft; mutable keys are `base`, `wrist`, `gripper`, `stepper`, `following`, `address`. `pins`, `estop` and `pulse` windows are read-only because they come from firmware `board_config.h`; `get` still reads them (`get,pulse,<index>`).
- `arm,base|wrist|gripper|stepper` disarms, validates that scope, configures only those outputs and centers them. A servo-only scope needs no TMC, encoder or stepper mapping. `apply` is an optional full-setup diagnostic, never a prerequisite for arming.
- `jog,<index>,<deltaUs>` is a nonzero integer step of at most ±2000 µs, no faster than 20 ms, and must land inside the code-owned hard window. `pose,<index>,<us>[,…]` sets up to four armed channels atomically: every pulse is validated before any write, so a rejected pose moves nothing. `step,<microsteps>` allows one non-overlapping relative jog at 1000 microsteps/s. Under the explicitly user-approved unloaded bench exception, there is no fixed count or motor-angle travel cap: both the nonzero integer delta and resulting counter must fit signed 32-bit. Large moves can hit mechanical stops; the host must choose each finite move from known clearance. Normal generated joint limits and all servo hard windows remain unchanged. `sample` returns four last pulse values plus encoder/counter fields that are `NA,NA,NA` when no stepper scope is prepared.
- `keep` refreshes only the bench lease; no keepalive for 200 ms disables outputs and latches a bench fault, including during a long jog. It never re-arms after expiry. The optional stepper helper waits for the target and at least 100 ms of stable encoder counts before fitting motor constants. The CLI completion deadline is nominal travel time at 1000 microsteps/s plus 3 seconds for settling/communication (4 seconds for 1000 microsteps), without movement retries.
- `disarm` disables outputs. `save` disables, validates every generated joint-limit corner and commits only discovered mappings to NVS; code-owned pins/polarity/windows are never stored. Failed validation/save retains the previous record. `exit` discards unsaved changes and never automatically references.
- In normal mode, `reference,HOME_MARK_CONFIRMED` requires saved valid calibration and physical alignment of **all** axes to generated home marks. It re-handshakes hardware, references the ambiguous geared motor encoder, zeros the step counter and starts safe homing. Every reset, e-stop, power loss or encoder/following fault requires a new confirmation. `halt` disables outputs and clears reference. No automatic stall correction.

## Serial camera servo: laptop ↔ MCU

The camera is an independent 0–180° PWM servo, not a sixth arm joint. It is not in the
URDF, IK, joint limits or calibration/NVS. It shares the firmware e-stop input and is
disabled by `halt`, e-stop or a detected servo-output fault; otherwise it works even when
the arm is uncalibrated or unreferenced.

- Command: `P,<seq>,<deg>*<crc8>`, exactly one angle in `[0,180]` with one decimal.
- Status: `V,<seq>,<deg>,<active>*<crc8>`, where `active` is `0` or `1`.
- `seq` is a separate uint16 stream; duplicate/older commands and out-of-range or fractional
  values are rejected without changing the pulse. There is no automatic retry.
- Default code-owned wiring is **GPIO21**, 50 Hz, nominal 500–2500 µs (`0°`→500 µs,
  `90°`→1500 µs, `180°`→2500 µs). These endpoints are not measured; verify the actual
  servo for binding before relying on the extremes. Pins/pulse limits are changed only in
  `board_config.h` and require reflashing.

## WebRTC data channel `control` (Quest ↔ phone)

JSON with a `t` discriminator. The channel is unordered with `maxRetransmits: 0`, so receivers drop stale messages by `seq`.

| `t` | direction | fields |
|---|---|---|
| `joints` | Quest → phone | `seq`, `deg[5]`, `engaged`. The phone forwards to serial only when `engaged`. |
| `camOrient` | phone → Quest | `q` (phone orientation, `[x,y,z,w]`, device frame relative to Earth ENU), `ts` (sender epoch ms; clocks are not synced) |
| `status` | phone → Quest | `seq`, `state`, `deg[5]`: the serial status line as JSON |
| `debug` | phone → Quest | `on`: the app's debug switch (show the in-VR arm model). Resent every second, since the channel drops. |

## Signaling: `ws://<phone>:8080/signal?role=operator`

The phone app's embedded hub relays operator messages to its in-process robot peer and back. Only `role=operator` is accepted over the network. A newer operator connection replaces the older one (close code 4000).

| `t` | from | fields |
|---|---|---|
| `offer` | operator | `sdp` |
| `answer` | robot | `sdp` |
| `ice` | either | `candidate {candidate, sdpMid, sdpMLineIndex, usernameFragment?}` |
| `peer` | server | `role`, `present`. Sent when the other role connects or leaves; the operator (re)offers on `robot present`. |

## IMU wearable: `ws://<wearable-ip>:81`, ~100 Hz

`{t:"imu", seq, forearm:[x,y,z,w], hand:[x,y,z,w]}`. These are BNO085 **game rotation vectors** (no magnetometer), each in its own sensor frame. The Quest maps them to WebXR after a calibration that is still TODO.
