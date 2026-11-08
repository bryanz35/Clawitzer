## Inspiration

We kept seeing reels and news clips of AI models controlling robot arms and wanted to build
one ourselves. Remote surgical robots, where an operator in one place guides a precise arm in
another, were the other influence. We pictured an extra arm that could carry or clamp heavy
things, twist harder than a wrist can, or work somewhere the operator can't be. Running it
remotely means the operator has to see what the robot sees, so we put a camera next to the arm
and showed its feed in a VR headset.

## What it does

Clawitzer lets someone wearing a Meta Quest 3 control a robot arm with their own arm. The
robot is shaped like a human forearm and hand: an elbow on a turning base, a two-axis wrist
and a gripper. An Android phone on a pan stand beside the arm works as the robot's eye. When
the operator turns their head, the stand turns with them, and the phone's camera feed shows up
on a screen floating in front of them in VR.

To take control, the operator curls their middle, ring and little fingers. As long as they
hold that grip, the arm follows their hand, and pinching thumb and index finger together
closes the gripper. When they open their hand, the arm stops and holds where it is. A panel in
VR shows each joint's commanded and reported angle.

The tracking mode is picked on the phone. Hand mode, the default, moves the arm by however far
the operator's hand has moved since they took control, and it needs only hand tracking. Elbow
mode uses Quest body tracking to find the operator's elbow and copies their forearm and hand
straight onto the arm.

## How we built it

William handled the mechanical side, Derock the electronics and firmware, and Bryan the
software.

We 3D printed the arm's parts. At the elbow, a NEMA 17 stepper drives a 21:1 cycloidal drive
we designed ourselves, with a TMC2209 driver and an AS5047P magnetic encoder on the motor
shaft. A DS3235 servo, geared for ±180° of travel, turns the base. The wrist pairs two MS62
servos as a differential, so combining their motion gives both pitch and roll. One more MS62
runs the rack-and-pinion gripper, and a 25 kg servo pans the camera stand.

The controller is a NodeMCU-32S (ESP32). We moved the firmware off Arduino to ESP-IDF with
FreeRTOS to get enough performance headroom, and the ESP32's LEDC peripheral generates the
PWM, so it takes almost no CPU. A fixed 100 Hz control loop checks every command against each
joint's position, speed and acceleration limits before it moves a motor. Each serial line
carries a CRC-8 checksum and a sequence number, and if no valid command arrives for 200 ms the
arm holds and reports `WATCHDOG`. The motors run on their own supply, and a physical e-stop
cuts it.

The headset side is a WebXR page in the Quest's browser, written in TypeScript with Three.js.
Each frame it reads the hand joints, the body-tracked elbow and the head pose, smooths the
target with a One Euro filter, and hands it to the closed-chain-ik solver. With four pose
joints the arm can't match every hand pose, so the solver matches the hand's position and two
of its three rotation axes and lets the base's yaw handle left and right. It clamps every
solution to the joint limits and throws out any that jumps too far in one frame.

The phone runs a native Android app written in Kotlin with Jetpack Compose. A small Ktor
server on the phone serves the headset page and sets up the WebRTC connection. After that,
headset and phone talk directly over the local network with no cloud server involved. The
phone streams its widest back camera to the headset along with its own orientation, and the
headset shifts the picture by the difference between where the operator is looking and where
the phone points. Joint commands travel the other way and reach the ESP32 over USB serial.

One URDF file holds the arm's geometry and joint limits. The headset loads it directly, and a
script generates the firmware's limits header and the phone's parking pose from the same file,
so all three agree on the numbers. Message formats live in a shared TypeScript package, and
the phone keeps a Kotlin copy that is tested against the same vectors.

We had planned the architecture before the hackathon, so Bryan could scaffold the whole
codebase while parts were still being designed and the wiring wasn't final. We kept several AI
coding agents running in parallel on the headset app, phone app and firmware, and reviewed
their code often to catch firmware and software bugs. Meta's WebXR emulator stood in for the
headset and the Android emulator for the phone. A laptop serial tool and a browser control
panel let us drive and calibrate the arm without either.

## Challenges we ran into

With three people building an arm, custom firmware, a VR app and a phone app in one
hackathon, time was the biggest worry. A firm plan from the start and building against mocks
kept all three tracks moving at once.

Hand tracking took the most software effort. We originally planned a hybrid of the Quest's
camera tracking and wearable IMUs, but partway through we found the IMUs weren't practical and
switched to Quest tracking alone. Making that controllable took a lot of testing and tuning:

- The deadman gesture went through several versions before we settled on a three-finger curl,
  which leaves the thumb-index pinch free for the gripper. A half-curled reading or a dropout
  shorter than 500 ms changes nothing, so tracking noise doesn't knock the operator out of
  control.
- A straight, level hand was commanding the claw 42° upward, because the wrist joint's
  reported frame sits well above the real line of the hand. We now take pitch and yaw from the
  line between the wrist and the knuckles.
- Turning your palm toward your face during a pinch opens the Quest's system menu and stops
  the session. Aiming the claw 20° below the hand line means the operator flexes their wrist
  less and turns their palm toward their face less often.
- WebXR reports no per-joint confidence, and the Quest only tracks the elbow while its cameras
  can see it. Elbow mode therefore drops any frame where the measured forearm length is more
  than 20% off.

On the firmware side, most of the thought went into a solid communication protocol and into
making sure the ESP32 had headroom for everything. Turning each axis's real-world angle into
the right servo pulse width or stepper step count took many rounds of bench testing and
tuning. Wiring was mostly straightforward apart from breadboard mistakes and loose
connections.

Making 3D-printed parts fit together was hard, especially with preload and print tolerances in
play. Some parts had to be redesigned and reprinted. Luckily we could use friends' printers on
top of the one in our dorm.

The hardest mechanical problem was the cycloidal drive. It needs two disks set 180° apart to
cancel out the moments, but with 6 pins and 20 teeth that orientation could never be reached.
We fixed it with a second disk rotated 9° from the first.

None of us had used a Meta Quest 3, or any VR, before this, so there was a lot to learn.

## Accomplishments that we're proud of

- The full stack runs end to end on the real hardware. Quest hand tracking drives the arm
  through the phone and its USB link, and the phone's camera feed reaches the headset.
- We designed, printed and assembled a human-proportioned arm with a custom cycloidal elbow
  during the hackathon. Because its proportions match a human arm, mapping hand tracking onto
  it was much easier.
- The arm has several safety layers. The firmware enforces its own limits, a watchdog holds
  the arm when commands stop, the deadman gesture decides when it may move, and a physical
  e-stop cuts motor power. After a power cycle the arm won't move until its position is
  confirmed, and if it hasn't moved since it was parked, the elbow encoder confirms it
  automatically.
- Everything runs on a local network with the phone as the server, with no cloud and no laptop
  in the loop during operation.
- We built the headset app, phone app and firmware in parallel, much of it before the hardware
  existed.

## What we learned

- Hand and body tracking in VR has quirks you only find on the headset: gestures the system
  reserves, a wrist frame that doesn't line up with the hand, and an elbow that disappears
  when it leaves the cameras' view.
- Dropping the IMUs partway through freed up time to tune Quest tracking, which turned out to
  be good enough to run the arm on its own.
- For 3D printing, tolerances and preload have to be part of the design from the start. With
  a cycloidal drive, the pin and tooth counts decide whether the two disks can sit 180° apart.
- On the ESP32, handing PWM to the LEDC peripheral frees up the CPU, and it was worth spending
  real time on the serial protocol up front.
- Keeping the arm's geometry in one file and the message formats in one package kept three
  codebases in agreement. Running several AI agents at once worked because each had a clear
  spec and we reviewed their code often.

## What's next for Clawitzer

- Control over the internet instead of only the local network, so the operator can be in a
  different room or building.
- A tilt axis on the camera stand to go with the pan, and a sixth joint so the arm can match
  the full orientation of the operator's hand.
- Recording teleoperation sessions as training data for an AI policy, like the AI-controlled
  arms that got us started.
- More accurate tracking from small ESP32 modules worn on the operator's hand and elbow,
  located by triangulating against fixed reference points around the operator. Unlike the
  Quest's cameras, this would keep tracking the elbow when it's out of the headset's view, and
  we could fuse it with hand tracking to steady the arm's target.
