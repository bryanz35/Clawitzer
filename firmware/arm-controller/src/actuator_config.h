#pragma once

#include <stddef.h>
#include <stdint.h>
#include "arm_config.h"

namespace actuators {

constexpr size_t kServoCount = 4;
constexpr uint8_t kStepperOutput = 1u << 4;
constexpr uint8_t kAllOutputs = 0x1f;
enum ServoIndex : uint8_t { Base = 0, WristA = 1, WristB = 2, Gripper = 3 };
enum JointIndex : uint8_t { BaseYaw = 0, ElbowPitch = 1, WristPitch = 2, WristRoll = 3, Grip = 4 };
constexpr uint32_t kConfigVersion = 2;  // NodeMCU-32S wiring; reject earlier ESP32-S3 records.

struct Pins {
  int32_t servo[kServoCount] = {-1, -1, -1, -1};
  int32_t step = -1, direction = -1, enable = -1;
  int32_t uartTx = -1, uartRx = -1;
  int32_t spiMosi = -1, spiMiso = -1, spiClock = -1, spiCs = -1;
  int32_t estop = -1, estopActiveLevel = 0;
};

struct ServoCalibration {
  int32_t minUs = 0, maxUs = 0;
  float centerUs = 0;
  float usPerDeg = 0;  // Used by base and gripper; wrist uses the coupled matrix below.
};

struct Config {
  uint32_t version = kConfigVersion;
  Pins pins;
  ServoCalibration servo[kServoCount];
  float wristRollUsPerDeg[2] = {};
  float wristPitchUsPerDeg[2] = {};
  float motorStepsPerRev = 0;
  uint32_t microsteps = 0;
  float gearRatio = 0;  // Motor revolutions per elbow revolution.
  int32_t motorDirection = 0, encoderDirection = 0;
  float currentMa = 0, senseResistorOhm = 0;
  float followingErrorDeg = 0;
  uint32_t uartAddress = 0;
  // Encoder counts at the last marked-home reference (-1 = none). Persisted by Store::saveHomeRaw.
  int32_t homeRaw = -1;
};

// Persist only tunable values. Wiring, e-stop polarity and hard PWM windows
// deliberately have no representation in this record.
struct CalibrationValues {
  float centerUs[kServoCount], usPerDeg[kServoCount];
  float wristRollUsPerDeg[2], wristPitchUsPerDeg[2];
  float motorStepsPerRev, gearRatio, currentMa, senseResistorOhm, followingErrorDeg;
  uint32_t microsteps, uartAddress;
  int32_t motorDirection, encoderDirection;
  // Legacy slot, kept so existing v3 records still load. Ignored at boot: the live
  // marked-home angle has its own key (Store::loadHomeRaw).
  int32_t homeRaw;
};
CalibrationValues calibrationValues(const Config& config);
void applyCalibrationValues(Config& config, const CalibrationValues& values);

struct Targets {
  int32_t pulseUs[kServoCount] = {};
  int32_t steps = 0;
};

// Raw bench motion needs only the selected outputs, their bounds, and the e-stop.
bool validateBench(const Config& config, uint8_t outputMask, char* error, size_t capacity);
// Full hardware setup permits unmapped axes, but requires the stepper electrical parameters.
bool validateSetup(const Config& config, char* error, size_t capacity);
// Full validation requires every generated joint-limit corner to fit the calibrated actuator envelope.
bool validate(const Config& config, char* error, size_t capacity);
bool map(const Config& config, const float deg[ARM_NUM_JOINTS], Targets& targets);
float stepsPerJointDegree(const Config& config);
// Symmetric 1:2 differential wrist: the reachable roll/pitch set is the diamond
// |roll| + |pitch| <= the returned degrees. Returns 0 when the calibrated coefficients
// are not that shape, so validation must fall back to the rectangular limit corners.
float wristTiltSumDeg(const Config& config);

// Single-turn motor encoder, unwrapped only while continuously observed. A marked home reference
// is mandatory after boot/power loss because reduction gearing makes a raw angle ambiguous.
class EncoderTracker {
 public:
  void reset();
  bool update(uint16_t raw);
  // Same unwrap, but rejects a jump larger than `maxDelta` counts without mutating state.
  // A one-sample glitch must never be integrated, or the reference shifts silently.
  bool update(uint16_t raw, int32_t maxDelta);
  void reference(float jointDeg, const Config& config);
  bool referenced() const { return referenced_; }
  uint16_t raw() const { return raw_; }
  int64_t counts() const { return counts_; }
  float jointDeg(const Config& config) const;
 private:
  uint16_t raw_ = 0;
  int64_t counts_ = 0, referenceCounts_ = 0;
  float referenceDeg_ = 0;
  bool haveSample_ = false, referenced_ = false;
};

class Store {
 public:
  virtual ~Store() = default;
  virtual bool load(Config& config) = 0;
  virtual bool save(const Config& config) = 0;
  // Marked-home motor-shaft angle, -1 when none. Kept apart from the mapping record so a
  // reference never freezes compiled defaults into NVS, where they would override later firmware.
  virtual int32_t loadHomeRaw() = 0;
  virtual bool saveHomeRaw(int32_t raw) = 0;
};

}  // namespace actuators
