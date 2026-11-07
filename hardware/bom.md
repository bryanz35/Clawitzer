# Bill of materials

| part | qty | notes |
|---|---|---|
| Meta Quest 3 | 1 | Operator headset. Hand + body tracking. |
| Android phone | 1 | Galaxy S25 Ultra (dev target). Needs an ultrawide camera, USB host (OTG), Android 12+ for the app. TODO(open-item): confirm the ultrawide is reachable through Camera2. |
| ESP32-S3 dev board (arm controller) | 1 | TODO: confirm board. Native USB CDC must enumerate as CDC-ACM on Android (Espressif VID 0x303a). |
| Arm servos | 5 | TODO(open-item): servo models (torque, feedback?). |
| Pan/tilt stand servos | 2 | TODO(open-item): models and which controller drives them. |
| Servo power supply | 1 | TODO: voltage/current. Separate from USB; shared ground. |
| Physical e-stop (latching, cuts servo power) | 1 | TODO: part. Optional sense line to a GPIO (see firmware `kEstopSensePin`). |
| USB-C OTG cable (phone ↔ ESP32) | 1 | TODO |
| ESP32 (IMU wearable) | 1 | TODO(open-item): board. Stretch goal. |
| BNO085 breakout | 2 | Forearm + hand, I2C 0x4A / 0x4B. Stretch goal. |
| Wi-Fi router (or phone hotspot) | 1 | Venue Wi-Fi often blocks device-to-device traffic. |
| Gripper | 0–1 | TODO(open-item): gripper or not. |
| Structural parts / fasteners | — | TODO: from CAD (`hardware/cad/`). |
