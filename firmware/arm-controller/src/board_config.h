#pragma once

#include "actuator_config.h"

namespace actuators {

// Independent camera-servo output. This is not an arm joint, IK axis or calibrated mapping.
// 0–180° maps linearly to the nominal 500–2500 µs window; verify the actual servo before
// installing it, because many hobby servos bind before one or both nominal endpoints.
inline constexpr int32_t kCameraServoPin = 21;
inline constexpr int32_t kCameraMinUs = 500;
inline constexpr int32_t kCameraMaxUs = 2500;
inline constexpr float kCameraMinDeg = 0.0f;
inline constexpr float kCameraMaxDeg = 180.0f;

// NodeMCU-32S wiring and hard travel windows are code-owned, never restored from NVS.
inline Config boardConfig() {
  Config config;
  const int32_t servoPins[kServoCount] = {13, 14, 32, 33};
  for (size_t i = 0; i < kServoCount; ++i) {
    config.pins.servo[i] = servoPins[i];
    // Assumed full PWM range, not a measured joint-angle calibration.
    config.servo[i].minUs = 500;
    config.servo[i].maxUs = 2500;
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
  config.pins.estopActiveLevel = 0;
  config.gearRatio = 21;
  config.microsteps = 16;
  // Full steps/rev, current, Rsense, directions, following error and angle
  // coefficients remain unverified (zero) until explicitly supplied.
  return config;
}

inline void applyBoardHardware(Config& config, const Config& board) {
  config.version = board.version;
  config.pins = board.pins;
  for (size_t i = 0; i < kServoCount; ++i) {
    config.servo[i].minUs = board.servo[i].minUs;
    config.servo[i].maxUs = board.servo[i].maxUs;
  }
}

}  // namespace actuators
