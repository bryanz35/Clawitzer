# Clawitzer

A Meta Quest 3 user teleoperates a human-like arm with four pose axes and an independent gripper. Head orientation drives a phone pan/tilt stand; forearm/hand tracking drives IK in the Quest browser. A native Android app on the phone hosts the operator page, streams wide-FOV WebRTC video and relays joint commands over USB serial. The NodeMCU-32S (ESP-WROOM-32, classic ESP32) arm controller enforces joint limits, a 200 ms watchdog and reference-gated soft-start homing. **Phone-to-board USB is untested on this board's USB bridge; see below.**

## Setup

Laptop:

```
npm install                 # all workspaces (.npmrc allows the closed-chain-ik GitHub dependency)
npm run gen:arm-config      # hardware/urdf/arm.urdf → firmware/arm-controller/include/arm_config.h
npm test                    # vitest across packages/
npm run typecheck
npm run build               # operator → apps/robot-android/app/src/main/assets/web/operator
npm run android             # build + install the phone app via adb (AVD or phone)
```

Develop without hardware:

- **Operator on the desktop:** run `npm run dev:operator`, then open `http://localhost:5173/operator/?emulate=1&mockRobot=1`. This uses IWER with the Quest 3 preset and echoes commands locally (no robot).
- **Phone app without hardware:** see [`apps/robot-android/README.md`](apps/robot-android/README.md). Run it on the `Galaxy_S25_Ultra` AVD with the "Mock MCU" switch, then `node apps/robot-android/tools/smoke.mjs`.
- **Operator against the phone app:** `adb forward tcp:8080 tcp:8080`, then open `http://localhost:8080/operator/?emulate=1`.

Firmware (ESP-IDF, Linux):

The arm controller uses **ESP-IDF, not Arduino or ESP32Servo**. Portable `Arm`
code owns safety and motion; the serial adapter retains the `J`/`S` wire format.
ESP-IDF LEDC drives the servos, and UART0 through the onboard USB-UART bridge carries
commands and status. This board has no native USB. The control loop runs at 100 Hz
and publishes status at 10 Hz.

**Phone USB compatibility:** the laptop serial CLI can use the onboard CP210x/CH340-style
bridge. The Android app uses usb-serial-for-android, whose default prober supports those
chips, but `apps/robot-android/app/src/main/res/xml/device_filter.xml` only matches the
Espressif VID, so attaching the board won't auto-launch the app (tap **Connect arm**).
An explicit phone-side marked-home reference action after reset/reconnect is still missing.
The exact bridge chip and Android USB claiming behavior need verification on hardware.

From the repository root, enter the pinned Nix shell:

```sh
nix develop path:./firmware/arm-controller
pio run -d firmware/arm-controller -e nodemcu-32s             # cross-build
pio test -d firmware/arm-controller -e native              # C++17 Unity host tests
pio run -d firmware/arm-controller -e nodemcu-32s -t upload
pio device monitor -d firmware/arm-controller -e nodemcu-32s   # 115200 baud
exit
```

For a noninteractive command (CI or scripting), use `nix run` rather than
`nix develop --command`; the FHS launcher forwards arguments to Bash:

```sh
nix run path:./firmware/arm-controller -- -c 'pio test -d firmware/arm-controller -e native'
```

The shell supplies PlatformIO, GCC/G++, Python, CMake, Ninja and supporting build
tools. `firmware/arm-controller/flake.lock` pins nixpkgs; PlatformIO downloads the
ESP-IDF framework, cross-toolchain and Unity dependencies specified by
`platformio.ini` on first use, so those commands initially need network access.
The FHS shell lets upstream toolchain binaries run on NixOS as well as other
Linux distributions. Nix must have `nix-command` and `flakes` enabled, and the
host must permit unprivileged user namespaces. USB upload/monitor also requires
host device permissions (serial group/udev rules); entering the shell does not
grant them. Add `--upload-port /dev/ttyUSB0` or `--port /dev/ttyUSB0` to the
upload or monitor command respectively if automatic device selection fails.

#### GPIO17 wiring diagnostic

To distinguish a UART configuration problem from a pin/probe connection problem,
the standalone `gpio17-probe` build drives GPIO17 continuously at **1 kHz, 50% duty**
(nominally 0–3.3 V, 500 µs HIGH / 500 µs LOW). **Disconnect the TMC2209 and turn
off all actuator supplies before flashing or running it.** Share analyzer/ESP32
ground and retain the external driver-EN pull-up required during reset.

From the repository root, inside the firmware development shell:

```sh
pio run -d firmware/arm-controller -e gpio17-probe -t upload --upload-port /dev/ttyUSB0
pio device monitor --port /dev/ttyUSB0 --baud 115200
```

The diagnostic holds driver EN HIGH, STEP/DIR LOW and all servo signals LOW.
It runs no arm control, calibration, TMC UART or encoder code, and does not modify
saved calibration. After successful GPIO/PWM initialization, it prints
`# GPIO17 probe: 1000 Hz, 50% duty; actuator outputs disabled` once per second.
The calibration CLI will not work with this build. Close the serial monitor before
uploading. The waveform starts automatically on every boot until normal firmware
is restored.

For UART isolation after confirming the PWM waveform, use the `uart17-probe`
environment instead:

```sh
pio run -d firmware/arm-controller -e uart17-probe -t upload --upload-port /dev/ttyUSB0
```

Keep the driver disconnected and actuator supplies OFF for this diagnostic too.
It calls the real `EspActuatorIO::configure` path for the stepper only, approximately
once per second, without ever calling `enableStepper(true)` or issuing a jog.
Provisional values (200 full steps/rev, 100 mA RMS, 0.11 Ω sense resistance) exist
only in this diagnostic; no saved calibration is loaded or changed. Board wiring,
microstepping, reduction and e-stop checks still come from the normal configuration.
With the driver disconnected and interlock healthy, each attempt sends the
address-0 IOIN request `05 00 06 6F` on GPIO17 at 115200 baud, 8N1, then reports
`TMC UART no verified reply`. Each request lasts about 347 µs.
UART0 prints `# TMC setup probe:` reports with GPIO17 edge count, driver EN pad
level, output route/expected route and the actual setup error. The disconnected
driver trial should show nonzero edges (normally 18 per full request), `EN=1`,
and `route=17 expected=17`; interrupt edge counting can miss transitions.
An active e-stop correctly blocks setup before UART transmission.

Restore normal firmware **before reconnecting the driver or actuator power**:

```sh
pio run -d firmware/arm-controller -e nodemcu-32s -t upload --upload-port /dev/ttyUSB0
```

Normal operation still requires a new marked-home reference after reset.

The laptop serial test CLI remains available outside the firmware shell:

```sh
npm run serial -w @arm-mirror/tools -- watch   # list | watch | home | jog | sweep
```

The CLI recognizes Espressif (VID `303a`), CP210x (`10c4`), CH340 (`1a86`) and
FTDI (`0403`) USB serial devices. It only auto-selects a single matching port;
multiple matches require an explicit `--port /dev/ttyUSB0` rather than guessing
which controller to open. Selection errors list the available ports. Use `list`
to inspect them; a vendor ID does not prove that a device is the arm controller.

Native tests do not verify physical servo timing, wiring, USB access or motion;
those still require real-hardware validation with the configured safety limits.

### Desktop joint control panel (normal mode)

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

Hold `Space` plus `Q`/`A`, `W`/`S`, `E`/`D`, `R`/`F`, `T`/`G` for base, elbow,
wrist pitch, wrist roll and gripper; or hold a `−`/`+` button with the mouse
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

The **j6 camera** slider is an independent 0–180° PWM servo on GPIO21. It is
not an arm joint, has no URDF/IK/calibration entry, and does not require saved
calibration or reference. It still uses the firmware e-stop input and is
disabled by `halt`/e-stop.

Measured convention (2026-11-07): **1:1**, 500–2500 µs over **180°**, so
**90° = looking forward** (1500 µs) and the scale is **+11.111 µs/degree**.
That is the opposite sign to the base (−5.5556 µs/degree): the camera is
mounted to turn the other way, so increasing camera angle and increasing `j1`
turn in opposite directions. The full 180° endpoints are the servo's own
travel and are still unmeasured mechanically — check for binding before using
0° or 180°. If the slider turns the wrong way on the bench, the convention is a
single sign flip in `board_config.h`, which requires reflashing.

### Mixed actuators and bench calibration

Joint order: `j1` base yaw (DS3235), `j2` elbow pitch (TMC2209 stepper),
`j3` wrist pitch + `j4` wrist roll (differential MS62 pair), `j5` gripper (MS62).
`j5` is **not wrist yaw**: its lower/upper generated limits mean closed/open.
Pose IK holds the independent gripper coordinate; it does not use grasp to solve orientation.

**NodeMCU-32S / ESP-WROOM-32 pinout:** `P<number>` means **GPIO<number>**,
not a physical header position. These are the firmware defaults in
`firmware/arm-controller/src/board_config.h`; they are code-owned and cannot be
changed over serial. They are not verified against physical wiring. Check the
exact board and module schematics before connecting power.

| Connection | ESP32 pin | Direction / note |
|---|---|---|
| DS3235 base signal (`j1`) | P13 | PWM output |
| MS62 differential wrist A signal (`j3`/`j4`) | P14 | PWM output |
| MS62 differential wrist B signal (`j3`/`j4`) | P32 | PWM output |
| MS62 gripper signal (`j5`) | P33 | PWM output |
| Camera servo signal (`j6`, optional) | P21 | PWM output; independent 0–180°, nominal 500–2500 µs. Not an arm joint, IK axis or calibrated mapping. |
| TMC2209 STEP | P18 | Output |
| TMC2209 DIR | P19 | Output |
| TMC2209 EN | P23 | Active-low output; external pull-up keeps driver disabled during reset |
| TMC2209 UART TX | P17 | Output through recommended series resistor to chip PDN_UART |
| TMC2209 UART RX | P16 | Input from that same chip PDN_UART line |
| AS5047P MOSI | P25 | Output to encoder |
| AS5047P MISO | P34 | Input only; no internal pull-up/down |
| AS5047P SCK | P26 | SPI clock output |
| AS5047P CS | P27 | Chip-select output |
| E-stop / motor-power interlock sense | P35 | Active LOW (`0`); mandatory external 10 kΩ pulldown to GND |
| Onboard USB-UART TX0 / RX0 | P1 / P3 | Reserved for host commands/status; do not reuse |
| Logic reference | GND | Common controller, driver, encoder and actuator-supply ground |

- All GPIO logic must be **3.3 V compatible**, never 5 V or motor/servo supply voltage.
  Supply the encoder and driver logic according to their verified module specifications.
  The onboard USB connector is a USB-to-UART bridge, not a native-USB GPIO connection.
- GPIO6–11 connect to module flash and are reserved. GPIO34–39 are input-only and have
  **no internal pull-up/down**; GPIO37/38 are not exposed on this module. The proposed
  map also avoids boot-strapping GPIO0/2/5/12/15. Expert pin edits must account for boot
  levels; firmware rejects unavailable/reserved pins and input-only pins used as outputs.
- The TMC module's **PDN versus USART labels are not identified**. A clear module photo
  or schematic is needed before wiring; do not assume those labels are interchangeable
  or assign module header pins by guesswork. At the TMC2209 **chip's shared PDN_UART**
  line, connect ESP32 RX directly and ESP32 TX through the module/datasheet-recommended
  series resistor (typically 1 kΩ). Verify any resistor already on the module and match
  the configured UART address straps. Add the external active-low EN pull-up.
- Motor and servo supplies are separate from USB, with a common logic ground. The physical
  e-stop cuts **all actuator power**. P35 only senses the safe power/interlock state;
  use a suitable 3.3 V interface/divider, never connect motor supply voltage directly.
- The suggested active-low P35 sense **requires an external 10 kΩ pulldown to GND**:
  the healthy external interlock circuit drives HIGH, while an open/disconnected wire
  reads LOW and stops motion. Internal pulls cannot provide this bias on classic ESP32
  GPIO34–39. If changing the active level/pin, provide an external bias toward **stop**.

#### Base mapping: DS3235-180 with 2× joint travel

Bench information supplied 2026-11-07: the base uses 500–2500 µs PWM, with
1500 µs pointing the arm straight forward. The stated 2:1 gearing means **joint
travel is twice servo travel** here (servo:joint angular travel = 1:2), not a
2:1 reduction. Assuming the 180° servo variant, shaft travel is ±90° about
neutral and base travel is ±180° about forward, 360° total.

The [DS3235 datasheet](https://hajim.rochester.edu/me/sites/kelley/me240/DS3235-270_datasheet.pdf)
specifies 1500 µs neutral and **180° or 270° variants** over 500–2500 µs; it
does not assign the arm's zero. A 0–180° servo label places neutral at 90°.
Our logical `j1=0°` is straight forward (mechanical's original 180° label).
The installed 180° variant and safe physical endpoints still need verification.
The user measured 1500 → 1000 µs as a 90° CCW rotation viewed from above
(12 o'clock → 9 o'clock), confirming negative PWM slope for positive `j1`.

Fresh firmware calibration defaults to `pulse_us = 1500 - j1_deg × (2000/360)`,
about **−5.555555 µs per joint degree**: +90° → 1000 µs matches that measurement,
and both −180° → 2500 µs and +180° → 500 µs are now bench-verified.

All measured mappings ship as code defaults in `board_config.h`: base, the 1:2
differential wrist, the gripper (970–2500 µs), 200 full steps/rev at **1/4
microstepping**, 21:1, motor/encoder directions +1, 1700 mA RMS, 0.11 Ω and a 2°
following tolerance. **A fresh flash is fully calibrated**, so normal motion
needs only the marked-home reference. A bench session remains for re-measuring,
and saved NVS values take precedence over the compiled defaults.

Saved NVS measurements override the default; reflashing does not overwrite them.
In an existing disarmed bench session, `set base 1500 -5.555555` applies the
measured center, scale and direction without resetting the other draft measurements.
Do not repeat
`enter` just to change the base: it discards unsaved draft measurements.
`measure base` can replace the nominal mapping with actual measured angles.
The existing generated ±180° limits and cable-wrap boundary are unchanged;
the two endpoint headings must never be treated as a wraparound shortcut.

After `npm install`, with linkage unloaded/disconnected and the physical e-stop available:

```sh
npm run serial -w @arm-mirror/tools -- calibrate --port /dev/ttyUSB0
```

```text
calibrate> wrist
<type the UNLOADED_ESTOP_READY acknowledgement once>
calibrate> a+
calibrate> a+ 100
calibrate> b- 250
```

`wrist` enters bench mode, arms **only** the two wrist PWM channels and prints the
current A/B pulses. Each `a+`/`a-`/`b+`/`b-` sends **one integer pulse step** — 5 µs
when no amount is given, or the explicit amount (`a+ 100`). After `arm base` or
`arm gripper`, `base+`/`base-` and `grip+`/`grip-` do the same for those channels.
Any nonzero step up to ±2000 µs is accepted, but the result must stay inside its
code-owned window: 500–2500 µs for base/wrist, 970–2500 µs for the gripper.
Otherwise the firmware rejects it and nothing moves.
A/B are raw channels, not assumed roll/pitch directions; find the differential pairs
empirically. There is no automatic sweep and no retry.

To move both wrist channels **together** (a tilt), give absolute pulse widths:

```text
calibrate> wrist 1600 1400
```

That validates both pulses before writing either, so a rejected tilt moves nothing.
`pose 1 1600 2 1400` does the same for any armed scope (base 0, A 1, B 2, gripper 3).

Wrist calibration (2026-11-07). Measured poses, with the arm viewed from elbow
toward gripper:

| Pose | A µs | B µs |
|---|---:|---:|
| Straight | 1500 | 1500 |
| Pitch down +90° | 500 | 2500 |
| Pitch up, mechanical stop | 2200 | 800 |
| Roll 90° CCW (−90°) | 2500 | 2500 |
| Roll 90° CW (+90°) | 500 | 500 |

Both roll directions agree on 1000 µs per 90°, and all five poses fit the
existing 1:2 differential model exactly:

```
A = 1500 − 11.1111 × (roll + pitch)
B = 1500 − 11.1111 × (roll − pitch)
```

```text
set wrist 1500 -11.111111 -11.111111 1500 -11.111111 11.111111
```

An earlier note in this file claimed a single affine pitch slope could not fit
both endpoints; that was wrong, because it assumed the up endpoint was −90°.
The servos are in fact not at their stops there: tilting past **−63°** collides,
so that is now j3's lower limit in `arm.urdf` (regenerated into `arm_config.h`),
while roll may still move at that pitch. Measured pitch travel is 153°.

The reachable wrist region is a **diamond, not a rectangle**: A and B are
limited to ±90° servo travel, so `|roll| + |pitch| ≤ 90`. Corners such as
(roll −90°, pitch +90°) would need 3500 µs and are impossible. Firmware now
enforces this coupling: `Arm` radially projects every commanded wrist pose onto
the diamond, and `save` validates the *diamond clipped by the j3/j4 limits*
instead of the unreachable rectangle corners (`wristTiltSumDeg()` returns the
coupled limit, 0 when the calibration is not a symmetric differential).
The projection keeps the commanded roll:pitch ratio.

There is no setup wizard. Pins, e-stop polarity and the hard pulse windows live in
`board_config.h`. Base/wrist defaults retain **500–2500 µs windows and 1500 µs
centers**; their combined mechanical clearance is not established by those windows.
The measured gripper window is **970–2500 µs**, with a **1735 µs center**.
Saved calibration can override centers. Arming can jump to the configured center:
inspect `get pulse INDEX` first, watch the mechanism and keep the e-stop reachable.

Wrist bench mode needs no TMC, encoder or stepper configuration. Once those are
wired, the optional `measure base|wrist|gripper|stepper` helpers are available,
and `save` still validates the full generated joint-limit envelope before committing
NVS. Only discovered mappings persist; code-owned hardware is never restored from NVS.

Gripper measurements (2026-11-07): **970 µs fully closed, 2500 µs fully open**.
Generated `j5` lower/upper limits (−90°/+90°) are logical closure coordinates,
not measured finger angles. The resulting affine mapping is
`pulse_us = 1735 + 8.5 × j5_deg`; logical home (`j5=0°`) maps to 1735 µs.
Fresh calibration uses these values; existing saved mappings take precedence.
To update the current bench draft without losing other measurements:

```text
disarm
set gripper 1735 8.5
```

This only updates the draft and does not move the gripper. The code-owned
970 µs hard minimum requires reflashing; an already running older firmware
still permits its previous raw window, so do not jog below the measured closed
position. `save` still requires a valid full-arm mapping; wrist calibration
support and stepper verification remain separate prerequisites.

The program starts at an interactive prompt; calibration does not begin automatically.
Bench mode deliberately reports `ESTOP` because normal joint motion is blocked.
Use `status` for the specific fault: `halted` means software-disabled, not proof of a
physical e-stop assertion. ESTOP/WATCHDOG warnings print once per state entry, not every
10 Hz frame; returning to either state prints a new warning.

Guided measurements use explicit integer pulse steps (no automatic sweep): two measured base
angles, three independent measured roll/pitch poses for the differential matrix, and actual
gripper closed/open positions. A separately confirmed short stepper jog compares emitted
microsteps to encoder motion to estimate effective steps/revolution and direction.

**Measured stepper trial (2026-11-07).** `set stepper 200 4 21 0 0 1700 0.11`
then `arm stepper`; accumulated `step 250/500/1000` moves to counter 3750.
Settled encoder samples went from raw 7519 to raw 2329 with unwrapped counts
7519 → 84249, i.e. **Δcounts = 76730 = 4.68323 motor revolutions**. The fitter
gives **200.18 effective full steps/rev** at 1/4 stepping, consistent with a
nominal 200-step motor, and the arm moved **downward**, so
**motor direction +1 / encoder direction +1** (positive `j2` is downward).

The engineer reconfirmed the **21:1** reduction. A bubble-level check agrees:
`step 500` at 1/4 stepping (0.625 motor revolutions) moved the elbow about
**10.5°**, against **10.71°** predicted here (−2%). The 90–100° eyeball estimate
was an overestimate; the completed 3750-microstep trial is **80.36°** at 21:1.
An 18.73:1 gearbox would have produced 12.01°, so the ratio is settled to a few
percent. Raw record is in `docs/questions.md`.

These values — `200 4 21 1 1 1700 0.11` plus `set following 2` — are compiled into
`board_config.h` as ship-ready defaults, so a fresh flash needs no bench session.
Only re-measure if the hardware changes; NVS then wins. 1700 mA is the recorded
stall-torque investigation value, retained by team decision.

**Encoder fault policy (2026-11-07).** Single bad samples no longer disable the arm:

- A shaft jump faster than any legal motion is **discarded**, not integrated, so it cannot silently shift the reference. (At 100 Hz the bound is ~600 counts, vs ~273 counts at full joint speed.)
- `following_error`, `encoder_joint_limit` and read failures latch only after **5 consecutive** bad samples (~50 ms).
- A bump up to **5° past a joint limit** is tolerated and is not also counted as following error; beyond that margin `encoder_joint_limit` latches.

A latched fault still disables outputs and clears the reference, so recovery is the marked-home reference (or the automatic one on the next boot if the shaft angle matches).


Raw `step N` accepts a nonzero signed 32-bit integer relative move at
1000 microsteps/s. The user-approved unloaded bench exception has **no fixed
microstep-count or motor-angle travel cap**. The delta and resulting counter
must fit signed 32-bit; overlapping moves remain rejected. Large values can
drive into a hard stop before an operator reacts: choose each finite move
from known physical clearance, never from the numeric representation limit.
For 1/4 microstepping, disarm, change only the second `set stepper` value to
`4`, and re-arm to program the TMC2209; retain the established current, sense
resistance and other mapping values. At 200 full steps/rev and 21:1 reduction,
this gives about 21.43°/s at the elbow; `step 1000` takes about 1 second and
moves about 21.43°. Microstepping does not increase maximum motor torque.
Normal generated joint limits, e-stop, the 200 ms lease and servo hard pulse
windows are unchanged.
After configuring verified electrical parameters and arming only the stepper,
start with separate `step 250` / `step -250` commands, inspect after each, then
use `measure stepper` for one explicitly confirmed larger trial. Keep linkage
unloaded, the work area clear and the physical power e-stop ready; no automatic
repeat or sweep.
The encoder must remain stable for at least 100 ms after the emitted target is reached.
Failure to finish/settle within nominal travel time plus 3 seconds (4 seconds for
1000 microsteps) aborts without retrying the move.
The 200 ms bench lease disables outputs if host keepalives stop. This isolated bench mode
is the only approved exception to normal homing/joint-angle enforcement.

`save` validates the full generated joint-limit envelope before committing NVS.
A differential wrist calibration is checked over its reachable diamond, so saving
fails only if a reachable extreme leaves a servo's code-configured window; it never
clips the two motors independently. The base/wrist 500–2500 µs
windows remain placeholders; the gripper uses measured 970–2500 µs endpoints.
Measure remaining safe travel and edit `board_config.h`, or ask the team to
review the URDF limits. The calibration console never edits generated joint limits and
cannot change hard windows over serial.

#### Full-arm calibration checklist

There is no single wizard. `save` succeeds only after all four mappings and the
stepper parameters are present — which the compiled defaults already satisfy, so
`save` on a fresh board just persists them. Re-measure only when hardware changes,
work unloaded/disconnected, with the physical power e-stop ready, and stop before
any binding.

1. Start the CLI, type `enter`, and give the exact `UNLOADED_ESTOP_READY` acknowledgement.
2. The ship-ready stepper values are `200 4 21 1 1 1700 0.11` with `set following 2`:
   200 full steps/rev, 1/4 microstepping, 21:1 gearing, positive motor/encoder
   directions, 1700 mA RMS, 0.11 Ω, 2° following tolerance. Set them only to change
   something; leaving directions at zero is no longer needed. Pins, e-stop polarity
   and per-servo hard pulse windows are read-only.
3. `measure stepper` — choose a short, explicit trial with known clearance. After it
   disarms, state whether positive steps moved toward positive `j2` (`+1`) or negative
   `j2` (`-1`) and type `ACCEPT` only if the encoder motion agrees. Repeat separate
   trials at different sizes/directions; the fitted full-steps/rev must agree before
   trusting it. This helper sets both directions.
4. Verify the nominal base center, scale and installed direction above, or use
   `measure base`: `+`/`-` to position, `measure` to sample, and enter actual
   protractor angles at two clearly separated poses.
5. `measure wrist` — use `a+`/`a-`/`b+`/`b-`, then `measure`, and enter the actual
   forearm-roll and wrist-pitch angles at three non-collinear poses (vary both axes).
6. Use the measured gripper mapping above, or remeasure with `measure gripper`:
   jog with `+`/`-`, then type `closed` at the physical closed pose and `open` at
   the physical open pose. Generated `j5` lower/upper map to those poses.
7. Inspect with `get KEY` or `export`; `apply` is an optional full-setup diagnostic.
8. `save` validates the reachable joint envelope. For a symmetric differential wrist
   that means the diamond clipped by the j3/j4 limits, not unreachable rectangle
   corners. It fails rather than clipping if a reachable extreme leaves a servo's
   code-owned window, if a mapping is missing/singular, or if a stored value is
   invalid. If it reports `joint envelope exceeds actuator travel` or `wrist limits
   exceed the coupled envelope`, measure the actual safe travel and edit
   `board_config.h` (or ask the team to review the URDF limits); serial cannot widen
   the hard windows.
9. `exit`, park all axes at the generated home marks, and `reference` (the GUI can do
   this after you reconnect). Normal motion remains blocked until reference succeeds.

The AS5047P is on the **motor shaft**. A single-turn reading cannot determine the absolute
elbow angle through reduction gearing. After **every boot, power loss, e-stop or fault**:
park all axes at their marked generated home positions, `exit` bench mode, and use
`reference` with the exact confirmation. Only then can normal joint commands run.
Encoder read/parity failures and excessive following error latch outputs off; there is
no automatic stall correction or retry.

The console also supports `help`, `wrist`, `a+`/`a-`/`b+`/`b-`,
`measure base|wrist|gripper|stepper`, `export`, `get`, `set`, `apply`, `arm`, `jog`,
`step`, `sample`, `disarm`, `save`, `exit`, `reference`, `quit`.
`get`/`export` can read pins, e-stop polarity and pulse windows, but `set` only accepts
mutable mapping values. `arm` prepares its selected actuator scope automatically;
`apply` is an optional full-setup diagnostic that neither arms nor is required for a
servo-only wrist jog. `exit` discards unsaved draft changes. Clean normal-mode quit
preserves an intentional reference; interruption/error halts. USB reopening may reset
the board and require reference again.


Demo day: see [`apps/robot-android/README.md`](apps/robot-android/README.md) (the phone app) and [`docs/`](docs/).

## Where things are

- [`CLAUDE.md`](CLAUDE.md): architecture, key decisions, **safety invariants**, conventions.
- [`docs/architecture.md`](docs/architecture.md), [`docs/protocol.md`](docs/protocol.md), [`docs/decisions.md`](docs/decisions.md).
- [`docs/STATUS.md`](docs/STATUS.md): build-order checklist and owners.
- [`hardware/urdf/arm.urdf`](hardware/urdf/arm.urdf): single source of truth for geometry and limits. Geometry, limits and home come from `docs/questions.md`; velocity/acceleration are still `TODO(open-item)` placeholders.
