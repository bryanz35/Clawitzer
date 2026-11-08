#pragma once
#include "actuator_config.h"

namespace testsupport {
// Explicit test bench measurements, never defaults supplied to real hardware.
// Scaled so the generated envelope (j1 ±180°, wrist ±90° coupled) fits the 1000–2000 µs window.
inline actuators::Config calibrated() {
  using namespace actuators;
  Config config;
  const int32_t servoPins[] = {13, 14, 32, 33};
  for (size_t i = 0; i < kServoCount; ++i) {
    config.pins.servo[i] = servoPins[i];
    config.servo[i].minUs = 1000;
    config.servo[i].maxUs = 2000;
    config.servo[i].centerUs = 1500;
  }
  config.pins.step = 18;
  config.pins.direction = 19;
  config.pins.enable = 23;
  config.pins.uartTx = 17;
  config.pins.uartRx = 16;
  config.pins.spiMosi = 25;
  config.pins.spiMiso = 34;
  config.pins.spiClock = 26;
  config.pins.spiCs = 27;
  config.pins.estop = 35;
  config.servo[Base].usPerDeg = 2;
  config.servo[Gripper].usPerDeg = -3;
  config.wristRollUsPerDeg[0] = 2;
  config.wristPitchUsPerDeg[0] = 2;
  config.wristRollUsPerDeg[1] = -2;
  config.wristPitchUsPerDeg[1] = 2;
  config.motorStepsPerRev = 200;
  config.microsteps = 8;
  config.gearRatio = 17;
  config.motorDirection = 1;
  config.encoderDirection = 1;
  config.currentMa = 600;
  config.senseResistorOhm = 0.11f;
  config.followingErrorDeg = 2;
  return config;
}
}
