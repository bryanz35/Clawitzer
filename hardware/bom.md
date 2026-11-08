# Bill of materials

| part | qty | notes |
|---|---|---|
| Meta Quest 3 | 1 | Operator headset. Hand + body tracking. |
| Android phone | 1 | Galaxy S25 Ultra (dev target). Needs an ultrawide camera, USB host (OTG), Android 12+ for the app. TODO(open-item): confirm the ultrawide is reachable through Camera2. |
| NodeMCU-32S / ESP-WROOM-32 (arm + pan controller) | 1 | UART0 through the onboard USB-UART bridge (CP210x/CH340-style). See [`firmware/arm-controller/README.md`](../firmware/arm-controller/README.md) before wiring. |
| Base servo (j1) | 1 | 35 kg hobby servo (DS3235 in firmware), 1:2 servo:joint. |
| Elbow motor (j2) | 1 | NEMA 17, 59 N·cm, 21:1 cycloidal drive, TMC2209 + AS5047P. Holds the arm when unpowered (per mechanical). |
| Wrist + gripper servos (j3/j4 differential, j5) | 3 | 25 kg hobby servo, 180° travel, no position feedback. Gripper is rack and pinion. TODO: firmware/docs say MS62; confirm the model with mechanical. |
| Pan stand servo | 1 | 25 kg hobby servo on the arm ESP32. Pan 180°, no tilt. Phone landscape, ~10° down, lens on the pan axis. |
| Servo power supply | 1 | TODO: voltage/current. Separate from USB; shared ground. |
| Physical e-stop (latching, cuts servo power) | 1 | TODO: part. Optional sense line to a GPIO (see firmware `kEstopSensePin`). |
| USB-C OTG cable (phone ↔ ESP32) | 1 | TODO |
| Wi-Fi router (or phone hotspot) | 1 | Venue Wi-Fi often blocks device-to-device traffic. |
| Gripper | 1 | Yes: j5, rack and pinion on a 25 kg hobby servo. |
| Structural parts / fasteners | — | TODO: from CAD. |
