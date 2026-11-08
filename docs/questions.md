# Arm specs: questions for mechanical

Fill in the blanks and send back, or edit this file directly. **Millimeters and degrees are fine**; software converts.
The answers below are adopted (see `docs/decisions.md`, 2026-11-07); unchecked items are still open. They live in:

- `hardware/urdf/arm.urdf`: geometry, joint limits, home pose (single source of truth; firmware limits are generated from it)
- `firmware/arm-controller/src/board_config.h`: pins, pulse windows, measured actuator mappings
- `hardware/bom.md`: part numbers
---

## 1. Joints

Four total relevant movement joints, one extra DOF for claw actuation.

Current setup:

| joint |  meaning |  |
|---|---|---|
| j1 | base yaw (rotate left/right about vertical) | |
| j2 | elbow pitch (forearm up/down) | |
| j3 | wrist pitch | |
| j4 | wrist roll | |
| j5 | claw actuation | |

- [ ] Is it 5 joints? Is this order right, base → tip?

The arm only has 4 relevant degrees of freedom, and 2 of the degrees exist at the same point, which is the wrist differential.

- [ ] "Human-like with a fixed elbow at its base": which joints are at the base/elbow, and is anything before j1 (a shoulder, a fixed angle, a riser)?

J1 is imagined as the elbow, while the rotation of J1 would be about the z-axis, where positive z-axis is upwards, positive x is forwards, and positive y is to the left. 

J2 is the cycloidal drive pivot, which is 100 mm length at upwards 40 degrees from J1 on the x-axis. J2 controls upward and downward movement of the "forearm" and has positive y orientation. 

J3 is 270mm from J2 parallel to the x-axis. J3 controls upward and downward movement of the wrist and has positive y orientation.

J4 has positive x orientation originating from the same point as J4. 

J5 has a linear range of motion, opening and closing linearly in the y direction

## 2. Zero pose and directions

"Zero pose" = every joint at 0°. Placeholder: forearm horizontal and pointing straight forward, hand flat, palm down.

- [ ] What does the arm look like at zero? (A photo or sketch helps most.)

Refer to previous picture labeled: 0 pos

- [ ] For each joint, which way is **positive**? (e.g. "j2 positive = forearm lifts up")


| joint | positive direction |
|---|---|
| j1 | turning left(counterclockwise) is positive |
| j2 | Forearm moving down is positive |
| j3 | wrist moving down is positive |
| j4 | wrist rotating counterclockwise is positive |
| j5 | wrist rotating counterclockwise is positive |

## 3. Dimensions

Distances between **joint axes** (not part outer edges), measured at the zero pose.

| from → to | placeholder | your answer (mm) |
|---|---|---|
| mounting surface → j1 axis | 50 | 35.5mm in positive z direction |
| j1 axis → j2 axis | 30 (straight up) | 100mm in the positive x direction, 40 degrees from x-axis |
| j2 axis → j3 (along forearm) | 250 | x |
| j3 → j4 axis | 20 | 270mm in the positive x direction |
| j4 → j5 axis | 0 (they intersect) | 0 (they intersect) |
| j5 → tool point | 80 | 110mm in the positive x direction |

- [ ] Any sideways or vertical offsets between axes (axes that don't intersect)? Give the offset and its direction.

None

- [ ] Where is the arm base on the table, relative to the pan/tilt stand? (distance + direction)

0

## 4. Joint limits

The firmware refuses to go past these. Placeholder: ±45° on every joint.

| joint | hard stop min / max (°) | safe working min / max (°) | why (cable wrap, collision, servo travel…) |
|---|---|---|---|
| j1 | 0/360 | 0/360 | Cable wrap |
| j2 | -30/130 (from x axis) | -20/90  | Human arm doesn't go over 90 degrees |
| j3 | 0/180 | 0/180 | Cable warp |
| j4 | 0/180 | 0/180 | Cable warp |
| j5 | -90/90  | -90/90 |Servo limitation |

- [ ] Are there **combinations** that collide even when each joint is inside its own limits? (e.g. "j2 below −30° and j4 below −60° hits the base") The firmware checks joints one at a time, so we need to know these.

## 5. Speed and acceleration

Placeholder: 29°/s max speed, 57°/s² max acceleration on every joint. Slow and safe by design; we can raise it after first tests.

- [ ] Max safe speed per joint (°/s)? Should any joint be slower (heavy load, fragile part)?
- [ ] Does anything wobble or whip if it starts or stops fast?

## 6. Home pose

On power-up the arm moves slowly to home, then waits for commands. Placeholder: all joints at 0°.

- [ ] Angle of each joint at home:

J1: 180 degrees
J2: 0 degrees
J3: 90 degrees
J4: 90 degrees

- [ ] Is home a safe resting pose if servo power drops (e-stop)? Will the arm sag or fall?

No safe resting pose, but cycloidal drive has enough torque to hold up the arm

- [ ] Hobby servos can't report their position, so the first move on power-up can jump. Can the arm be parked at home before power-on?



## 7. End of the arm

- [ ] Gripper: yes / no? If yes, what actuates it (6th servo?), and open/close range.

5th servo, cycloidal drive is powered by a NEMA 17 59 N*cm

- [ ] **Tool point**: the exact point the arm should place where the operator's hand is (fingertip, gripper center, palm center?). Distance from j5:

110mm in the direction of J4

- [ ] A 5-joint arm can't match every hand orientation, so one rotation is dropped. Which matters least for your design: **twisting** about the hand's forward axis (placeholder), **tilting** up/down, or **swinging** left/right?

We are essentially getting rid of everything past the elbow, except for forearm direction(left/right)

## 8. Servos (one row per joint)

| joint | servo model | travel (°, e.g. 180/270) | pulse range (µs) | gear/belt ratio servo:joint | ESP32 pin | horn mounted so servo center = joint angle ___° |
|---|---|---|---|---|---|---|
| j1 | DSSERVO DS3235 | 180 assumed; verify variant | 500–2500 | 1:2 angular travel (joint = 2× servo) | GPIO13 | 1500 µs = straight forward = logical j1 0° (original 180°) |
| j2 | Nema 17 | infinite | | 21:1 (design value; reconfirmed by engineer 2026-11-07) | | |
| j3 | 25kg Hobby | 180 | | 1:1 | | |
| j4 | 25kg Hobby | 180 | | 1:1 | | |
| j5 | MS62 | 180 nominal servo travel | 970 closed / 2500 open (measured) | Rack and pinion system | GPIO33 | Logical j5 0° maps to 1735 µs, not 1500 µs |

Base update (2026-11-07): user reports 1500 µs straight forward and 2×
joint travel, giving ±180° base travel from ±90° servo travel. User measured
1500 → 1000 µs as +90° CCW viewed from above (12 o'clock → 9 o'clock),
establishing the base mapping 1500 µs − 5.555555 µs/degree × logical j1.
The implied **11.111 µs per servo degree** already pins the 180° servo variant
(a 270° unit would be ~7.41), and the user has now bench-tested the full ±180°
travel at both 500 and 2500 µs ends. See the calibration notes in `firmware/arm-controller/README.md`.

Gripper update (2026-11-07): user reports 970 µs fully closed and 2500 µs
fully open. Generated j5 −90°/+90° encode closed/open, not actual finger angles.
The mapping is 1735 µs + 8.5 µs/degree × logical j5; logical home is 1735 µs.
`board_config.h` now narrows the gripper hard window to 970–2500 µs and supplies
this measured mapping for fresh calibration. Saved measured mappings still win.
In an existing disarmed bench draft use `set gripper 1735 8.5`; the tightened
hard window takes effect only after reflashing.

Camera servo (j6, 2026-11-07): user reports **1:1**, 180° of travel over
500–2500 µs, so **90° looks straight forward** (1500 µs) and the scale is
**+11.111 µs/degree**. It is mounted to turn the opposite way from the base
(CW where the base turns CCW), which is the opposite sign to the base's
−5.5556 µs/degree. The firmware's existing 0–180° → 500–2500 µs mapping already
matches this; only the convention is recorded. The 0°/180° ends are the servo's
own travel and are not mechanically verified.

Stepper bench record (2026-11-07): command configuration was
`200 4 21 0 0 1700 0.11` (full steps/rev, microsteps, assumed ratio,
motor direction, encoder direction, mA RMS, Rsense Ω). These are the settings
used, not independent verification of motor/driver electrical ratings.
Start: raw/counts 7519, step counter 0. Final settled sample:
raw 2329, unwrapped counts 84249, step counter 3750.
Thus Δcounts = 76730, corresponding to 4.683227539 motor revolutions.
The existing fitter gives 200.182458 effective full steps/rev at 1/4 stepping,
consistent overall with nominal 200. User observed downward elbow motion,
establishing motor direction +1 and encoder direction +1 under the existing
positive-down convention. **Encoder sign corrected later the same day (-1):** with the arm
parked at the top the firmware reported +10.6 deg, and jogging up pushed the reading past
the +20 deg limit, so counts rise as the elbow moves UP. The motor sign stands at +1
(pressing the panel's "-" moves the forearm up, as the convention requires).

The mechanical engineer reconfirmed **21:1** on 2026-11-07, and a bubble-level
check agrees. `step 500` at 1/4 stepping (0.625 motor revolutions) moved the
elbow about **10.5°**; 21:1 predicts **10.714°** (−2%), while 18.73:1 and
16.86:1 would predict 12.01° and 13.35°. The implied ratio from 10.5° is
21.43:1, and a ±0.5° reading error spans 20.45:1–22.50:1, so **21:1 stands**.
The earlier rough 90–100° estimate was an overestimate: the completed
3750-microstep trial is **80.36°** at 21:1. Total gearing is therefore settled
to within a few percent; the encoder count check already confirmed the motor
side (200 full steps/rev, 1/4 microstepping) to 0.09%.

- [ ] Any servo with position feedback (4th wire / serial bus servo)?
- [ ] Is any servo mounted mirrored (turns opposite to the joint's positive direction)?

J3 and J4 are in a differential setup, so the two servos both control pitch and roll

Wrist observations supplied 2026-11-07 (A = GPIO14, B = GPIO32):

| Pose | A (µs) | B (µs) | Observed angle |
|---|---|---|---|
| Straight, aligned with forearm | 1500 | 1500 | Pitch 0°, roll 0° |
| Full pitch down, zero roll | 500 | 2500 | Pitch +90°, roll 0° |
| Full pitch up, zero roll (collision stop) | 2200 | 800 | Pitch −63°, roll 0° |
| Counterclockwise viewed from elbow toward gripper, no pitch change | 2500 | 2500 | Pitch 0°, logical roll −90° |
| Clockwise viewed from elbow toward gripper, no pitch change | 500 | 500 | Pitch 0°, logical roll +90° |

User observes CCW from elbow looking toward the gripper, which is negative roll
under the existing right-hand convention about +X; (500,500) is 90° CW, logical
roll +90°. Both roll directions agree exactly: 1000 µs per 90°, i.e.
**11.1111 µs per degree**.

All five poses fit the existing affine (1:2 differential) model exactly:

```
A_us = 1500 − 11.1111 × (roll + pitch)
B_us = 1500 − 11.1111 × (roll − pitch)
```

Equivalently `set wrist 1500 -11.111111 -11.111111 1500 -11.111111 11.111111`.
Differential PWM changes pitch; equal PWM changes roll. There is no need for a
piecewise or non-linear model. An earlier note claiming the pitch slopes could
not both be affine was wrong: it assumed the up endpoint was −90°.

The servos are NOT at their own stops there; the user reports a collision, and
that rotating one servo disproportionately (i.e. rolling) is still safe. So
−63° is a collision limit on pitch only, independent of roll, and is now j3's
lower limit in `arm.urdf`. Total measured pitch travel is 153° (not 180°).

The real joint envelope is a **diamond**, not a rectangle. With A and B limited
to ±90 servo degrees, A = −(roll+pitch) and B = pitch−roll imply
**|roll| + |pitch| ≤ 90**. Rectangular corners such as (roll −90, pitch +90)
would need B = 180° → 3500 µs, outside the window. Decided 2026-11-07: enforce
the coupled diamond instead of shrinking the limits to fit.

Implemented: `actuators::wristTiltSumDeg()` derives the diamond radius (90°)
from the calibrated coefficients and pulse windows, `Arm` radially projects
every commanded/settled wrist pose onto it, and `validate()` checks the diamond
clipped by the j3/j4 limits rather than unreachable rectangle corners. Fresh
firmware defaults now carry the measured wrist mapping. Save still requires
valid stepper electrical parameters.

## 9. Power and e-stop

- [ ] Servo supply voltage and max current:
- [ ] E-stop part, and does it cut servo power only (it should; the ESP32 stays on USB)?
- [ ] Can we add a sense wire (voltage divider from the servo rail to an ESP32 pin) so firmware knows the e-stop is pressed? Pin and polarity:

## 10. Pan/tilt stand (holds the phone)

- [ ] Servo models, and what drives them (same ESP32 as the arm, or separate)?

25kg Hobby, same ESP32 

- [ ] Pan range and tilt range (°):

Pan: 180
Tilt: 0

- [ ] Phone mounted portrait or landscape? Camera facing which way at zero?

Landscape, camera facing downward at a slight angle(~10 degrees) pointing in the positive x direction

- [ ] Camera lens position relative to the pan and tilt axes (mm):

Lens position: 0 mm from pan
Tilt not possible

## 11. Optional (not needed: the debug arm model draws plain bars from the URDF chain)

- [ ] Rough outer size of each link as a box or cylinder (mm). STL export is fine too.
