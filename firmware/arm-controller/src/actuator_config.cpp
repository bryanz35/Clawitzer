#include "actuator_config.h"

#include <limits.h>
#include <math.h>
#include <stdio.h>

#include "hardware_protocol.h"

namespace actuators {
namespace {

bool fail(char* error, size_t capacity, const char* message) {
  if (error && capacity) snprintf(error, capacity, "%s", message);
  return false;
}

bool directionValid(int32_t direction) { return direction == -1 || direction == 1; }

bool usablePin(int32_t pin, bool output) {
  // NodeMCU-32S / ESP-WROOM-32: UART0 belongs to the host transport and
  // GPIO6..11 belong to module flash. GPIO34..39 are input-only; 37/38
  // are not exposed on this module. Bootstrap pins require careful wiring.
  return pin >= 0 && pin <= 39 && pin != 1 && pin != 3 &&
         !(pin >= 6 && pin <= 11) && pin != 20 && pin != 24 &&
         !(pin >= 28 && pin <= 31) && pin != 37 && pin != 38 &&
         (!output || pin < 34);
}

double stepScale(const Config& config) {
  return static_cast<double>(config.motorStepsPerRev) * config.microsteps * config.gearRatio / 360.0;
}

bool stepRangeValid(const Config& config) {
  const double scale = stepScale(config);
  if (!isfinite(scale) || scale <= 0 ||
      scale * ARM_JOINT_MAX_VEL_DEG_S[ElbowPitch] > 20000.0) return false;
  const float limits[] = {ARM_JOINT_MIN_DEG[ElbowPitch], ARM_JOINT_MAX_DEG[ElbowPitch],
                          ARM_HOME_DEG[ElbowPitch]};
  for (float limit : limits) {
    const double magnitude = fabs((static_cast<double>(limit) - ARM_HOME_DEG[ElbowPitch]) * scale);
    // Both motor directions must remain representable, including rounding to a microstep.
    if (!isfinite(magnitude) || magnitude > static_cast<double>(INT32_MAX) - 0.5) return false;
  }
  return true;
}

bool mappingValid(const Config& config) {
  if (!isfinite(config.servo[Base].usPerDeg) || config.servo[Base].usPerDeg == 0 ||
      !isfinite(config.servo[Gripper].usPerDeg) || config.servo[Gripper].usPerDeg == 0 ||
      !directionValid(config.motorDirection) || !directionValid(config.encoderDirection)) return false;
  const double determinant = static_cast<double>(config.wristRollUsPerDeg[0]) * config.wristPitchUsPerDeg[1] -
                             static_cast<double>(config.wristRollUsPerDeg[1]) * config.wristPitchUsPerDeg[0];
  return isfinite(determinant) && determinant != 0 &&
         isfinite(config.followingErrorDeg) && config.followingErrorDeg > 0 &&
         config.followingErrorDeg <= ARM_JOINT_MAX_DEG[ElbowPitch] - ARM_JOINT_MIN_DEG[ElbowPitch];
}

bool mapChecked(const Config& config, const float* deg, Targets& result) {
  if (!deg) return false;
  for (size_t i = 0; i < ARM_NUM_JOINTS; ++i) {
    if (!isfinite(deg[i]) || deg[i] < ARM_JOINT_MIN_DEG[i] || deg[i] > ARM_JOINT_MAX_DEG[i]) return false;
  }
  const double pulse[kServoCount] = {
    config.servo[Base].centerUs + static_cast<double>(config.servo[Base].usPerDeg) * deg[BaseYaw],
    config.servo[WristA].centerUs + static_cast<double>(config.wristRollUsPerDeg[0]) * deg[ForearmRoll] +
      static_cast<double>(config.wristPitchUsPerDeg[0]) * deg[WristPitch],
    config.servo[WristB].centerUs + static_cast<double>(config.wristRollUsPerDeg[1]) * deg[ForearmRoll] +
      static_cast<double>(config.wristPitchUsPerDeg[1]) * deg[WristPitch],
    config.servo[Gripper].centerUs + static_cast<double>(config.servo[Gripper].usPerDeg) * deg[Grip]
  };
  Targets next;
  for (size_t i = 0; i < kServoCount; ++i) {
    // Reject the coupled pose as a whole; independently clipping a wrist servo changes its kinematics.
    if (!isfinite(pulse[i]) || pulse[i] < config.servo[i].minUs || pulse[i] > config.servo[i].maxUs) return false;
    next.pulseUs[i] = static_cast<int32_t>(round(pulse[i]));
  }
  const double steps = (static_cast<double>(deg[ElbowPitch]) - ARM_HOME_DEG[ElbowPitch]) *
                       stepScale(config) * config.motorDirection;
  if (!isfinite(steps)) return false;
  const double rounded = round(steps);
  if (rounded < INT32_MIN || rounded > INT32_MAX) return false;
  next.steps = static_cast<int32_t>(rounded);
  result = next;
  return true;
}

}  // namespace

CalibrationValues calibrationValues(const Config& config) {
  CalibrationValues values{};
  for (size_t i = 0; i < kServoCount; ++i) {
    values.centerUs[i] = config.servo[i].centerUs;
    values.usPerDeg[i] = config.servo[i].usPerDeg;
  }
  for (size_t i = 0; i < 2; ++i) {
    values.wristRollUsPerDeg[i] = config.wristRollUsPerDeg[i];
    values.wristPitchUsPerDeg[i] = config.wristPitchUsPerDeg[i];
  }
  values.motorStepsPerRev = config.motorStepsPerRev;
  values.microsteps = config.microsteps;
  values.gearRatio = config.gearRatio;
  values.motorDirection = config.motorDirection;
  values.encoderDirection = config.encoderDirection;
  values.currentMa = config.currentMa;
  values.senseResistorOhm = config.senseResistorOhm;
  values.followingErrorDeg = config.followingErrorDeg;
  values.uartAddress = config.uartAddress;
  return values;
}

void applyCalibrationValues(Config& config, const CalibrationValues& values) {
  for (size_t i = 0; i < kServoCount; ++i) {
    config.servo[i].centerUs = values.centerUs[i];
    config.servo[i].usPerDeg = values.usPerDeg[i];
  }
  for (size_t i = 0; i < 2; ++i) {
    config.wristRollUsPerDeg[i] = values.wristRollUsPerDeg[i];
    config.wristPitchUsPerDeg[i] = values.wristPitchUsPerDeg[i];
  }
  config.motorStepsPerRev = values.motorStepsPerRev;
  config.microsteps = values.microsteps;
  config.gearRatio = values.gearRatio;
  config.motorDirection = values.motorDirection;
  config.encoderDirection = values.encoderDirection;
  config.currentMa = values.currentMa;
  config.senseResistorOhm = values.senseResistorOhm;
  config.followingErrorDeg = values.followingErrorDeg;
  config.uartAddress = values.uartAddress;
}

bool validateBench(const Config& config, uint8_t outputMask, char* error, size_t capacity) {
  if (error && capacity) error[0] = '\0';
  if (config.version != kConfigVersion) return fail(error, capacity, "configuration version");
  if (!outputMask || (outputMask & ~kAllOutputs)) return fail(error, capacity, "output mask");
  const int32_t pins[] = {
    config.pins.servo[0], config.pins.servo[1], config.pins.servo[2], config.pins.servo[3],
    config.pins.step, config.pins.direction, config.pins.enable, config.pins.uartTx,
    config.pins.uartRx, config.pins.spiMosi, config.pins.spiMiso, config.pins.spiClock,
    config.pins.spiCs, config.pins.estop
  };
  for (size_t i = 0; i < sizeof(pins) / sizeof(pins[0]); ++i) {
    const bool output = i != 8 && i != 10 && i != 13;
    if (!usablePin(pins[i], output)) return fail(error, capacity, "unusable GPIO");
    for (size_t j = 0; j < i; ++j) {
      if (pins[i] == pins[j]) return fail(error, capacity, "duplicate GPIO");
    }
  }
  if (config.pins.estopActiveLevel != 0 && config.pins.estopActiveLevel != 1)
    return fail(error, capacity, "e-stop active level");
  for (size_t i = 0; i < kServoCount; ++i) {
    if (!(outputMask & (1u << i))) continue;
    const auto& servo = config.servo[i];
    if (servo.minUs < 500 || servo.maxUs > 2500 || servo.minUs >= servo.maxUs ||
        !isfinite(servo.centerUs) || servo.centerUs < servo.minUs || servo.centerUs > servo.maxUs)
      return fail(error, capacity, "servo pulse window");
  }
  if (!(outputMask & kStepperOutput)) return true;
  if (!isfinite(config.motorStepsPerRev) || config.motorStepsPerRev <= 0 ||
      !isfinite(config.gearRatio) || config.gearRatio <= 0 || config.microsteps == 0 ||
      config.microsteps > 256 || (config.microsteps & (config.microsteps - 1)) != 0)
    return fail(error, capacity, "stepper gearing or microsteps");
  if ((config.motorDirection != 0 && !directionValid(config.motorDirection)) ||
      (config.encoderDirection != 0 && !directionValid(config.encoderDirection)) ||
      !isfinite(config.followingErrorDeg) || config.followingErrorDeg < 0)
    return fail(error, capacity, "direction or following error");
  if (config.uartAddress > 3) return fail(error, capacity, "TMC UART address");
  uint8_t currentScale = 0;
  bool lowSense = false;
  if (!tmcCurrent(config.currentMa, config.senseResistorOhm, currentScale, lowSense))
    return fail(error, capacity, "unsupported TMC current or sense resistor");
  if (!stepRangeValid(config)) return fail(error, capacity, "step rate or position exceeds capacity");
  return true;
}

bool validateSetup(const Config& config, char* error, size_t capacity) {
  if (!validateBench(config, kAllOutputs, error, capacity)) return false;
  for (const auto& servo : config.servo)
    if (!isfinite(servo.usPerDeg)) return fail(error, capacity, "servo coefficients");
  for (size_t i = 0; i < 2; ++i) {
    if (!isfinite(config.wristRollUsPerDeg[i]) || !isfinite(config.wristPitchUsPerDeg[i]))
      return fail(error, capacity, "wrist coefficients");
  }
  return true;
}

bool validate(const Config& config, char* error, size_t capacity) {
  if (!validateSetup(config, error, capacity)) return false;
  if (!mappingValid(config)) return fail(error, capacity, "incomplete or singular angle calibration");
  Targets targets;
  if (!mapChecked(config, ARM_HOME_DEG, targets)) return fail(error, capacity, "home outside actuator envelope");
  // An affine map attains its extrema at the corners, including both coupled-wrist inputs.
  for (unsigned corner = 0; corner < (1u << ARM_NUM_JOINTS); ++corner) {
    float deg[ARM_NUM_JOINTS];
    for (size_t i = 0; i < ARM_NUM_JOINTS; ++i)
      deg[i] = corner & (1u << i) ? ARM_JOINT_MAX_DEG[i] : ARM_JOINT_MIN_DEG[i];
    if (!mapChecked(config, deg, targets)) return fail(error, capacity, "joint envelope exceeds actuator travel");
  }
  return true;
}

bool map(const Config& config, const float deg[ARM_NUM_JOINTS], Targets& targets) {
  // Wiring/current/envelope are validated when accepting calibration, never per control tick.
  return mappingValid(config) && mapChecked(config, deg, targets);
}

float stepsPerJointDegree(const Config& config) {
  if (!isfinite(config.motorStepsPerRev) || config.motorStepsPerRev <= 0 ||
      !isfinite(config.gearRatio) || config.gearRatio <= 0 || config.microsteps == 0 ||
      config.microsteps > 256 || (config.microsteps & (config.microsteps - 1)) != 0 ||
      !stepRangeValid(config)) return NAN;
  return static_cast<float>(stepScale(config));
}

void EncoderTracker::reset() {
  raw_ = 0;
  counts_ = referenceCounts_ = 0;
  referenceDeg_ = 0;
  haveSample_ = referenced_ = false;
}

bool EncoderTracker::update(uint16_t raw) {
  if (raw >= 16384) return false;
  if (!haveSample_) {
    raw_ = raw;
    counts_ = raw;
    haveSample_ = true;
    return true;
  }
  int32_t delta = static_cast<int32_t>(raw) - raw_;
  if (delta == 8192 || delta == -8192) return false;
  if (delta > 8192) delta -= 16384;
  if (delta < -8192) delta += 16384;
  if ((delta > 0 && counts_ > INT64_MAX - delta) ||
      (delta < 0 && counts_ < INT64_MIN - delta)) return false;
  counts_ += delta;
  raw_ = raw;
  return true;
}

void EncoderTracker::reference(float jointDeg, const Config& config) {
  referenced_ = false;
  if (!haveSample_ || !isfinite(jointDeg) || jointDeg < ARM_JOINT_MIN_DEG[ElbowPitch] ||
      jointDeg > ARM_JOINT_MAX_DEG[ElbowPitch] || !isfinite(config.gearRatio) ||
      config.gearRatio <= 0 || !directionValid(config.encoderDirection)) return;
  referenceCounts_ = counts_;
  referenceDeg_ = jointDeg;
  referenced_ = true;
}

float EncoderTracker::jointDeg(const Config& config) const {
  if (!referenced_ || !isfinite(config.gearRatio) || config.gearRatio <= 0 ||
      !directionValid(config.encoderDirection)) return NAN;
  // Widen before subtraction so even int64 lifetime counter extrema cannot overflow.
  const long double delta = static_cast<long double>(counts_) - static_cast<long double>(referenceCounts_);
  return static_cast<float>(referenceDeg_ + delta * 360.0L * config.encoderDirection /
                            (16384.0L * config.gearRatio));
}

}  // namespace actuators
