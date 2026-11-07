# Arm specs: questions for mechanical

Fill in the blanks and send back, or edit this file directly. **Millimeters and degrees are fine**; software converts.
Every number in the code right now is a placeholder. Your answers replace them in:

- `hardware/urdf/arm.urdf`: geometry, joint limits, home pose (single source of truth; firmware limits are generated from it)
- `firmware/arm-controller/src/servos.cpp`: servo pins, pulse ranges, directions, offsets
- `hardware/bom.md`: part numbers

A **sketch or CAD screenshot** of the arm at its zero pose, with each joint axis drawn and labeled j1…j5, answers half of this at once.

![0 pos](Armdrawing.jpg)
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
| j1 | 35kg Hobby | | 1:2 | | | |
| j2 | Nema 17 | infinite | | 21:1 | | |
| j3 | 25kg Hobby | 180 | | 1:1 | | |
| j4 | 25kg Hobby | 180 | | 1:1 | | |
| j5 | 25kg Hobby | 180 | | Rack and pinion system | | |

- [ ] Any servo with position feedback (4th wire / serial bus servo)?
- [ ] Is any servo mounted mirrored (turns opposite to the joint's positive direction)?

J3 and J4 are in a differential setup, so the two servos both control pitch and roll

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

## 11. Optional (no longer needed: the in-VR 3D arm copy was dropped)

- [ ] Rough outer size of each link as a box or cylinder (mm). STL export is fine too.
