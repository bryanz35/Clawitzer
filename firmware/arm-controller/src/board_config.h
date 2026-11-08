#pragma once

#include "actuator_config.h"

namespace actuators {

// Independent camera-servo output. This is not an arm joint, IK axis or calibrated mapping.
// Measured 2026-11-07: 1:1 gearing, 180 deg of travel over 500-2500 us, so 90 deg (1500 us)
// looks straight forward and the scale is +11.111 us/deg. That is the opposite sense to the
// base (-5.5556 us/deg): the mount turns the other way, so increasing camera angle and
// increasing j1 rotate in opposite directions. Endpoints are the servo's own travel and are
// not independently measured; check for binding before using 0 or 180 deg.
inline constexpr int32_t kCameraServoPin = 21;
inline constexpr int32_t kCameraMinUs = 500;
inline constexpr int32_t kCameraMaxUs = 2500;
// The degree range is proto::kCameraMinDeg/kCameraMaxDeg, shared with the serial parser.

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
  // Nominal DS3235-180 base: 180° servo travel drives 360° joint travel.
  // 1500 µs is straight forward (j1=0), not an absolute servo-angle label.
  // Measured: 1500→1000 µs turns +90° CCW viewed from above. Saved NVS values win.
  config.servo[Base].usPerDeg = (500.0f - 2500.0f) / (180.0f * 2.0f);
  // Measured gripper endpoints: generated lower = closed, upper = open.
  config.servo[Gripper].minUs = 970;
  config.servo[Gripper].usPerDeg =
      static_cast<float>(config.servo[Gripper].maxUs - config.servo[Gripper].minUs) /
      (ARM_JOINT_MAX_DEG[Grip] - ARM_JOINT_MIN_DEG[Grip]);
  config.servo[Gripper].centerUs =
      config.servo[Gripper].minUs - config.servo[Gripper].usPerDeg * ARM_JOINT_MIN_DEG[Grip];
  // Measured 1:2 differential wrist (2026-11-07): A = 1500 - k(roll + pitch),
  // B = 1500 - k(roll - pitch), k = 2000 us / 180 deg. Its reachable set is the diamond
  // |roll| + |pitch| <= 90 deg, which Arm enforces and validate() checks. Saved NVS wins.
  const float wristUsPerDeg = (2500.0f - 500.0f) / 180.0f;
  config.servo[WristA].centerUs = 1500;
  config.servo[WristB].centerUs = 1500;
  config.wristRollUsPerDeg[0] = config.wristPitchUsPerDeg[0] = -wristUsPerDeg;
  config.wristRollUsPerDeg[1] = -wristUsPerDeg;
  config.wristPitchUsPerDeg[1] = wristUsPerDeg;
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
  // 21:1 design reduction, reconfirmed by the mechanical engineer 2026-11-07.
  // Bench check with a bubble level: step 500 (0.625 motor rev) moved the elbow
  // about 10.5 deg; this ratio predicts 10.71 deg.
  config.gearRatio = 21;
  // Measured 2026-11-07 (bench trial, encoder-verified): 200 full steps/rev at 1/4
  // microstepping, +3750 microsteps -> 4.683 motor revs with the elbow moving DOWN,
  // so both directions are +1. 1700 mA / 0.11 ohm accepted by the team.
  config.motorStepsPerRev = 200;
  config.microsteps = 4;
  config.motorDirection = 1;
  // The AS5047P counts increase when the forearm moves UP, i.e. towards negative j2
  // (positive j2 is DOWN per arm.urdf). Observed 2026-11-07: arm at the top reported
  // +10.6 deg, and jogging up drove the reading past the +20 deg limit. The motor sign
  // is separately confirmed correct (positive steps move the forearm down).
  config.encoderDirection = -1;
  config.currentMa = 1700;
  config.senseResistorOhm = 0.11f;
  config.followingErrorDeg = 2;
  // These are ship-ready measured defaults, not placeholders: a fresh flash validates
  // without a bench session, and normal motion then needs only the marked-home reference
  // (the motor-shaft encoder cannot resolve absolute elbow position). Saved NVS values
  // still win, so re-measuring stays possible. UART address stays 0.
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
