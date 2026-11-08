#include "calibration_session.h"

#include <errno.h>
#include <limits.h>
#include <math.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

namespace {
// Boot-time auto-reference accepts only a shaft angle this close to the recorded home
// sample: 256 of 16384 counts is ~0.27 deg of elbow travel at 21:1.
constexpr int32_t kAutoReferenceTolerance = 256;
// Joint speed is 28.6 deg/s, i.e. ~27.4k counts/s at 21:1. Anything faster is corruption.
constexpr int32_t kEncoderMaxCountsPerSecond = 60000;
constexpr uint32_t kEncoderDtMinMs = 10, kEncoderDtMaxMs = 500;
// Consecutive bad samples (~5 x 10 ms) before an encoder fault latches, so a single
// glitched read never disables the arm.
constexpr uint8_t kFaultDebounceSamples = 5;
// A small bump past a limit is tolerated; only a real excursion latches encoder_joint_limit.
constexpr float kEncoderLimitMarginDeg = 5.0f;
bool is(const char* a, const char* b) { return strcmp(a, b) == 0; }
bool integral(double value) { return isfinite(value) && value >= INT32_MIN && value <= INT32_MAX && trunc(value) == value; }
bool numbers(const calibration::Command& command, size_t start, double* out, size_t count, double maximumMagnitude = 1e9) {
  if (command.argc != start + count) return false;
  for (size_t i = 0; i < count; ++i) {
    errno = 0;
    char* end = nullptr;
    out[i] = strtod(command.args[start + i], &end);
    if (errno || end == command.args[start + i] || *end || !isfinite(out[i]) || fabs(out[i]) > maximumMagnitude) return false;
  }
  return true;
}
// Copies `in` as one reply token: anything outside [A-Za-z0-9_.+-] becomes '_'. Returns its length.
size_t token(char* out, size_t capacity, const char* in) {
  size_t i = 0;
  for (; in[i] && i + 1 < capacity; ++i) {
    const char c = in[i];
    out[i] = (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') ||
             (c >= '0' && c <= '9') || c == '_' || c == '-' || c == '.' || c == '+' ? c : '_';
  }
  out[i] = '\0';
  return i;
}
bool error(char* fields, size_t capacity, const char* code) {
  snprintf(fields, capacity, "%s", code);
  return false;
}
}

void CalibrationSession::begin(uint32_t nowMs) {
  io_.disableOutputs();
  arm_.begin(ARM_PARK_DEG, nowMs);
  config_ = board_;
  actuators::Config loaded = board_;
  if (store_.load(loaded)) {
    actuators::applyBoardHardware(loaded, board_);
    config_ = loaded;
  }
  config_.homeRaw = store_.loadHomeRaw();
  draft_ = config_;
  char reason[128];
  validConfig_ = actuators::validate(config_, reason, sizeof reason);
  arm_.setWristCoupling(validConfig_ ? actuators::wristTiltSumDeg(config_) : 0.0f);
  preparedMask_ = 0;
  setFault(validConfig_ ? "reference_required" : "uncalibrated");
  // Guarded auto-reference: only the recorded marked-home shaft angle proves the elbow is
  // still at home. Anything else (for example a stop mid-motion) needs a manual reference.
  if (validConfig_ && config_.homeRaw >= 0 && config_.homeRaw < 16384) tryAutoReference(nowMs);
}

void CalibrationSession::tryAutoReference(uint32_t nowMs) {
  // Reading the shaft angle needs SPI and the e-stop input only; the driver stays disabled.
  if (io_.estopActive() || !io_.configure(config_, actuators::kStepperOutput)) {
    io_.disableOutputs();
    return;
  }
  uint16_t raw = 0;
  if (!io_.readEncoder(raw)) {
    io_.disableOutputs();
    return;
  }
  int32_t delta = static_cast<int32_t>(raw) - config_.homeRaw;
  if (delta > 8192) delta -= 16384;
  if (delta < -8192) delta += 16384;
  // 256 counts is ~0.27 deg of elbow travel at 21:1; a whole motor turn is 16384 and is not
  // distinguishable, so this remains a guard, not a measurement.
  if (abs(delta) > kAutoReferenceTolerance) {
    io_.disableOutputs();
    return;
  }
  if (!configure(config_, actuators::kAllOutputs, nowMs) || io_.estopActive()) {
    io_.disableOutputs();
    return;
  }
  encoder_.reset();
  encoderTimed_ = false;
  if (!readEncoderSample(nowMs)) {
    io_.disableOutputs();
    return;
  }
  encoder_.reference(ARM_PARK_DEG[actuators::ElbowPitch], config_);
  if (!encoder_.referenced()) {
    io_.disableOutputs();
    return;
  }
  io_.zeroStepPosition();
  faulted_ = false;
  setFault("none");
  arm_.setEstop(false, nowMs);
  arm_.rehome(ARM_PARK_DEG, nowMs);
  referenced_ = true;
  io_.enableStepper(true);
  if (*io_.error()) fail("stepper_enable", nowMs);
}

bool CalibrationSession::setCamera(float deg, uint16_t seq, uint32_t nowMs) {
  (void)nowMs;
  if (!isfinite(deg) || deg < proto::kCameraMinDeg || deg > proto::kCameraMaxDeg) return false;
  const uint16_t delta = static_cast<uint16_t>(seq - lastCameraSequence_);
  if (haveCameraSequence_ && (delta == 0 || delta >= 0x8000)) return false;
  if (!io_.cameraPulse(deg)) return false;
  lastCameraSequence_ = seq;
  haveCameraSequence_ = true;
  cameraDeg_ = deg;
  cameraStatusPending_ = true;
  return true;
}

void CalibrationSession::disarm() {
  io_.disableOutputs();
  cameraStatusPending_ = true;
  armedMask_ = 0;
  jogPending_ = false;
  referenced_ = false;
}

void CalibrationSession::setFault(const char* reason) { token(fault_, sizeof fault_, reason); }

void CalibrationSession::fail(const char* reason, uint32_t nowMs) {
  disarm();
  faulted_ = true;
  setFault(reason);
  arm_.setEstop(true, nowMs);
}

bool CalibrationSession::configure(const actuators::Config& config, uint8_t outputMask, uint32_t nowMs) {
  disarm();
  preparedMask_ = 0;
  encoder_.reset();
  encoderTimed_ = false;  // The first sample only establishes the raw angle.
  sampleFaults_ = followingFaults_ = limitFaults_ = 0;
  if (!io_.configure(config, outputMask)) { fail(*io_.error() ? io_.error() : "hardware_setup", nowMs); return false; }
  if (io_.estopActive()) { fail("estop", nowMs); return false; }
  if (outputMask & actuators::kStepperOutput) {
    if (!readEncoderSample(nowMs)) { fail("encoder", nowMs); return false; }
  }
  preparedMask_ = outputMask;
  faulted_ = false;
  setFault("none");
  return true;
}

bool CalibrationSession::readEncoderSample(uint32_t nowMs) {
  uint16_t raw;
  if (!io_.readEncoder(raw)) return false;
  int32_t maxDelta = kEncoderMaxCountsPerSecond;
  if (encoderTimed_) {
    uint32_t dt = nowMs - encoderMs_;
    if (dt < kEncoderDtMinMs) dt = kEncoderDtMinMs;
    if (dt > kEncoderDtMaxMs) dt = kEncoderDtMaxMs;
    maxDelta = static_cast<int32_t>(static_cast<int64_t>(kEncoderMaxCountsPerSecond) * dt / 1000);
  }
  if (!encoder_.update(raw, maxDelta)) return false;
  encoderMs_ = nowMs;
  encoderTimed_ = true;
  return true;
}

void CalibrationSession::tick(uint32_t nowMs, float dtSec) {
  if (!preparedMask_) return;
  if (io_.estopActive()) {
    // Fail once: outputs are already off, and repeating would queue a camera status every tick.
    if (!faulted_) fail("estop", nowMs);
    return;
  }
  if (faulted_) return;  // Recovery always requires an explicit arm, apply or marked-home reference.
  if (preparedMask_ & actuators::kStepperOutput) {
    if (readEncoderSample(nowMs)) sampleFaults_ = 0;
    else if (++sampleFaults_ >= kFaultDebounceSamples) { fail("encoder", nowMs); return; }
  }
  if (calibrating_) {
    if (armedMask_ && static_cast<uint32_t>(nowMs - leaseMs_) > kWatchdogMs) fail("calibration_timeout", nowMs);
    return;
  }
  if (!referenced_) return;
  const float measured = encoder_.jointDeg(config_);
  const float low = ARM_JOINT_MIN_DEG[actuators::ElbowPitch];
  const float high = ARM_JOINT_MAX_DEG[actuators::ElbowPitch];
  const float overshoot = measured < low ? low - measured : (measured > high ? measured - high : 0.0f);
  // Overshoot is not also counted as following error, so one bump cannot latch two faults.
  const float following = fabsf(measured - arm_.positionDeg()[actuators::ElbowPitch]) - overshoot;
  const bool followingBad = !isfinite(measured) || following > config_.followingErrorDeg;
  const bool limitBad = !isfinite(measured) || overshoot > kEncoderLimitMarginDeg;
  // Debounce: a single glitched sample (or a momentary bump) must not disable the arm.
  followingFaults_ = followingBad ? static_cast<uint8_t>(followingFaults_ + 1) : 0;
  limitFaults_ = limitBad ? static_cast<uint8_t>(limitFaults_ + 1) : 0;
  if (followingFaults_ >= kFaultDebounceSamples) { fail("following_error", nowMs); return; }
  if (limitFaults_ >= kFaultDebounceSamples) { fail("encoder_joint_limit", nowMs); return; }
  arm_.update(nowMs, dtSec);
  actuators::Targets targets;
  if (!actuators::map(config_, arm_.positionDeg(), targets)) { fail("actuator_envelope", nowMs); return; }
  const float maxRate = actuators::stepsPerJointDegree(config_) * ARM_JOINT_MAX_VEL_DEG_S[actuators::ElbowPitch];
  const double delta = static_cast<double>(targets.steps) - io_.stepPosition();
  const float rate = fminf(maxRate, static_cast<float>(fabs(delta) / dtSec));
  io_.stepTarget(targets.steps, rate);
  for (size_t i = 0; i < actuators::kServoCount; ++i) {
    if (!io_.servoPulse(static_cast<uint8_t>(i), targets.pulseUs[i])) { fail("servo_output", nowMs); return; }
    pulses_[i] = targets.pulseUs[i];
  }
}

void CalibrationSession::reportedPosition(float out[ARM_NUM_JOINTS]) const {
  for (int i = 0; i < ARM_NUM_JOINTS; ++i) out[i] = arm_.positionDeg()[i];
  if (referenced_ && encoder_.referenced()) out[actuators::ElbowPitch] = encoder_.jointDeg(config_);
}

bool CalibrationSession::set(const calibration::Command& command) {
  if (command.argc < 2 || armedMask_) return false;
  double n[14];
  const char* key = command.args[0];
  actuators::Config next = draft_;
  if (is(key, "address")) {
    if (!numbers(command, 1, n, 1) || !integral(n[0]) || n[0] < 0) return false;
    next.uartAddress = static_cast<uint32_t>(n[0]);
  } else if (is(key, "base") || is(key, "gripper")) {
    if (!numbers(command, 1, n, 2)) return false;
    auto& servo = next.servo[is(key, "base") ? actuators::Base : actuators::Gripper];
    servo.centerUs = static_cast<float>(n[0]); servo.usPerDeg = static_cast<float>(n[1]);
  } else if (is(key, "wrist")) {
    if (!numbers(command, 1, n, 6)) return false;
    for (size_t i = 0; i < 2; ++i) {
      next.servo[actuators::WristA + i].centerUs = static_cast<float>(n[3 * i]);
      next.wristRollUsPerDeg[i] = static_cast<float>(n[3 * i + 1]);
      next.wristPitchUsPerDeg[i] = static_cast<float>(n[3 * i + 2]);
    }
  } else if (is(key, "stepper")) {
    if (!numbers(command, 1, n, 7) || !integral(n[1]) || n[1] < 0 || !integral(n[3]) || !integral(n[4])) return false;
    next.motorStepsPerRev = static_cast<float>(n[0]); next.microsteps = static_cast<uint32_t>(n[1]);
    next.gearRatio = static_cast<float>(n[2]); next.motorDirection = static_cast<int32_t>(n[3]);
    next.encoderDirection = static_cast<int32_t>(n[4]); next.currentMa = static_cast<float>(n[5]);
    next.senseResistorOhm = static_cast<float>(n[6]);
  } else if (is(key, "following")) {
    if (!numbers(command, 1, n, 1)) return false;
    next.followingErrorDeg = static_cast<float>(n[0]);
  } else return false;
  draft_ = next;
  preparedMask_ = 0;
  return true;
}

bool CalibrationSession::get(const calibration::Command& command, char* fields, size_t capacity) const {
  if (command.argc < 1) return false;
  const auto& c = activeConfig();
  const char* key = command.args[0];
  int length = -1;
  if (is(key, "pulse")) {
    double n[1];
    if (!numbers(command, 1, n, 1) || !integral(n[0]) || n[0] < 0 || n[0] >= 4) return false;
    const auto& s = c.servo[static_cast<size_t>(n[0])];
    length = snprintf(fields, capacity, "pulse,%d,%d,%d,%.9g", static_cast<int>(n[0]),
        static_cast<int>(s.minUs), static_cast<int>(s.maxUs), static_cast<double>(s.centerUs));
  } else if (command.argc != 1) return false;
  else if (is(key, "pins")) {
    const auto& p = c.pins;
    length = snprintf(fields, capacity, "pins,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d,%d",
        static_cast<int>(p.servo[0]), static_cast<int>(p.servo[1]), static_cast<int>(p.servo[2]), static_cast<int>(p.servo[3]),
        static_cast<int>(p.step), static_cast<int>(p.direction), static_cast<int>(p.enable),
        static_cast<int>(p.uartTx), static_cast<int>(p.uartRx), static_cast<int>(p.spiMosi),
        static_cast<int>(p.spiMiso), static_cast<int>(p.spiClock), static_cast<int>(p.spiCs), static_cast<int>(p.estop));
  } else if (is(key, "estop")) length = snprintf(fields, capacity, "estop,%d", static_cast<int>(c.pins.estopActiveLevel));
  else if (is(key, "address")) length = snprintf(fields, capacity, "address,%u", static_cast<unsigned>(c.uartAddress));
  else if (is(key, "following")) length = snprintf(fields, capacity, "following,%.9g", static_cast<double>(c.followingErrorDeg));
  else if (is(key, "base") || is(key, "gripper")) {
    const auto& s = c.servo[is(key, "base") ? actuators::Base : actuators::Gripper];
    length = snprintf(fields, capacity, "%s,%.9g,%.9g", key, static_cast<double>(s.centerUs), static_cast<double>(s.usPerDeg));
  } else if (is(key, "wrist")) {
    length = snprintf(fields, capacity, "wrist,%.9g,%.9g,%.9g,%.9g,%.9g,%.9g",
        static_cast<double>(c.servo[actuators::WristA].centerUs), static_cast<double>(c.wristRollUsPerDeg[0]), static_cast<double>(c.wristPitchUsPerDeg[0]),
        static_cast<double>(c.servo[actuators::WristB].centerUs), static_cast<double>(c.wristRollUsPerDeg[1]), static_cast<double>(c.wristPitchUsPerDeg[1]));
  } else if (is(key, "stepper")) {
    length = snprintf(fields, capacity, "stepper,%.9g,%u,%.9g,%d,%d,%.9g,%.9g", static_cast<double>(c.motorStepsPerRev),
        static_cast<unsigned>(c.microsteps), static_cast<double>(c.gearRatio),
        static_cast<int>(c.motorDirection), static_cast<int>(c.encoderDirection),
        static_cast<double>(c.currentMa), static_cast<double>(c.senseResistorOhm));
  }
  return length >= 0 && static_cast<size_t>(length) < capacity;
}

bool CalibrationSession::dispatch(const calibration::Command& cmd, uint32_t nowMs, char* fields, size_t capacity) {
  const char* verb = cmd.verb;
  const bool noArgs = cmd.argc == 0;
  if (is(verb, "status") && noArgs) {
    snprintf(fields, capacity, "mode,%s,configured,%d,referenced,%d,lastseq,%u,haveseq,%d,fault,%s,lastjointseq,%u",
        calibrating_ ? "calibration" : "normal", validConfig_ ? 1 : 0, referenced_ ? 1 : 0,
        static_cast<unsigned>(lastSequence_), haveSequence_ ? 1 : 0, fault_, static_cast<unsigned>(arm_.lastSeq()));
    return true;
  }
  if (is(verb, "get")) return get(cmd, fields, capacity) || error(fields, capacity, "bad_get");
  if (is(verb, "halt") && noArgs) { fail("halted", nowMs); return true; }
  if (is(verb, "enter") && cmd.argc == 1 && is(cmd.args[0], "UNLOADED_ESTOP_READY")) {
    disarm();
    arm_.setEstop(true, nowMs);
    calibrating_ = true;
    draft_ = config_;
    preparedMask_ = 0;
    faulted_ = false;
    setFault("none");
    return true;
  }
  if (is(verb, "reference") && cmd.argc == 1 && is(cmd.args[0], "HOME_MARK_CONFIRMED")) {
    if (calibrating_ || !validConfig_) return error(fields, capacity, "saved_calibration_required");
    if (referenced_) return error(fields, capacity, "halt_before_new_reference");
    // Explicit reference also re-handshakes the TMC after power loss and clears driver fault latches.
    if (!configure(config_, actuators::kAllOutputs, nowMs)) return error(fields, capacity, *io_.error() ? io_.error() : "hardware_setup");
    if (io_.estopActive()) return error(fields, capacity, "estop");
    disarm();
    encoder_.reset();
    encoderTimed_ = false;
    if (!readEncoderSample(nowMs)) { fail("encoder", nowMs); return error(fields, capacity, "encoder"); }
    encoder_.reference(ARM_PARK_DEG[actuators::ElbowPitch], config_);
    if (!encoder_.referenced()) return error(fields, capacity, "encoder_reference");
    io_.zeroStepPosition();
    faulted_ = false;
    setFault("none");
    arm_.setEstop(false, nowMs);
    arm_.rehome(ARM_PARK_DEG, nowMs);
    referenced_ = true;
    io_.enableStepper(true);
    if (*io_.error()) { fail("stepper_enable", nowMs); return error(fields, capacity, io_.error()); }
    // Remember the shaft angle of this marked home so a later boot can prove it is still
    // there. Best effort: a failed write only means the next boot needs a manual reference.
    // Only the angle is written: saving the mapping here would freeze compiled defaults in NVS.
    config_.homeRaw = static_cast<int32_t>(encoder_.raw());
    (void)store_.saveHomeRaw(config_.homeRaw);
    return true;
  }
  if (!calibrating_) return error(fields, capacity, "bench_mode_required");
  if (is(verb, "disarm") && noArgs) { disarm(); return true; }
  if (is(verb, "set")) return set(cmd) || error(fields, capacity, "bad_set_or_armed");
  if (is(verb, "apply") && noArgs) {
    disarm();
    preparedMask_ = 0;
    if (!actuators::validateSetup(draft_, fields, capacity)) return false;
    if (!configure(draft_, actuators::kAllOutputs, nowMs)) return error(fields, capacity, *io_.error() ? io_.error() : "hardware_setup");
    fields[0] = '\0';
    return true;
  }
  if (is(verb, "save") && noArgs) {
    disarm();
    if (!actuators::validate(draft_, fields, capacity)) return false;
    if (!store_.save(draft_)) return error(fields, capacity, "nvs_save");
    config_ = draft_;
    validConfig_ = true;
    arm_.setWristCoupling(actuators::wristTiltSumDeg(config_));
    fields[0] = '\0';
    return true;
  }
  if (is(verb, "exit") && noArgs) {
    disarm();
    calibrating_ = false;
    preparedMask_ = 0;
    return true;
  }
  if (is(verb, "arm") && cmd.argc == 1) {
    disarm();
    preparedMask_ = 0;
    const char* axis = cmd.args[0];
    uint8_t selected = 0;
    if (is(axis, "base")) selected = 1u << actuators::Base;
    else if (is(axis, "wrist")) selected = (1u << actuators::WristA) | (1u << actuators::WristB);
    else if (is(axis, "gripper")) selected = 1u << actuators::Gripper;
    else if (is(axis, "stepper")) selected = actuators::kStepperOutput;
    else return error(fields, capacity, "unknown_axis");
    if (!actuators::validateBench(draft_, selected, fields, capacity)) return false;
    if (!configure(draft_, selected, nowMs)) return error(fields, capacity, fault_);
    armedMask_ = selected;
    for (size_t i = 0; i < actuators::kServoCount; ++i) {
      if (!(armedMask_ & (1u << i))) continue;
      const int32_t pulse = static_cast<int32_t>(lroundf(draft_.servo[i].centerUs));
      if (!io_.servoPulse(static_cast<uint8_t>(i), pulse)) { fail("servo_output", nowMs); return error(fields, capacity, "servo_output"); }
      pulses_[i] = pulse;
    }
    if (armedMask_ & actuators::kStepperOutput) io_.enableStepper(true);
    if (*io_.error()) { fail("actuator_enable", nowMs); return error(fields, capacity, io_.error()); }
    leaseMs_ = nowMs;
    lastJogMs_ = nowMs - 20;
    return true;
  }
  if (!preparedMask_) return error(fields, capacity, "arm_required");
  if (io_.estopActive()) { fail("estop", nowMs); return error(fields, capacity, "estop"); }
  if (armedMask_ && static_cast<uint32_t>(nowMs - leaseMs_) > kWatchdogMs) {
    fail("calibration_timeout", nowMs);
    return error(fields, capacity, "calibration_timeout");
  }
  if (is(verb, "sample") && noArgs) {
    if (faulted_) return error(fields, capacity, fault_);
    char encoderFields[96];
    if (preparedMask_ & actuators::kStepperOutput) {
      // Snapshot the counter before reading the encoder: an ISR can advance it during SPI.
      const int32_t steps = io_.stepPosition();
      if (!readEncoderSample(nowMs)) { fail("encoder", nowMs); return error(fields, capacity, "encoder"); }
      snprintf(encoderFields, sizeof encoderFields, "raw,%u,counts,%lld,steps,%d",
          static_cast<unsigned>(encoder_.raw()), static_cast<long long>(encoder_.counts()), static_cast<int>(steps));
    } else {
      snprintf(encoderFields, sizeof encoderFields, "raw,NA,counts,NA,steps,NA");
    }
    snprintf(fields, capacity, "%s,pulse0,%d,pulse1,%d,pulse2,%d,pulse3,%d", encoderFields,
        static_cast<int>(pulses_[0]), static_cast<int>(pulses_[1]), static_cast<int>(pulses_[2]), static_cast<int>(pulses_[3]));
    return true;
  }
  if (is(verb, "keep") && noArgs) { leaseMs_ = nowMs; return true; }
  if (faulted_) return error(fields, capacity, fault_);
  if (is(verb, "pose")) {
    if (cmd.argc < 2 || cmd.argc > 2 * actuators::kServoCount || (cmd.argc & 1u)) return error(fields, capacity, "pose_args");
    double n[2 * actuators::kServoCount];
    if (!numbers(cmd, 0, n, cmd.argc)) return error(fields, capacity, "pose_bounds");
    bool seen[actuators::kServoCount] = {};
    int32_t next[actuators::kServoCount] = {};
    for (size_t i = 0; i < cmd.argc; i += 2) {
      if (!integral(n[i]) || n[i] < 0 || n[i] >= static_cast<double>(actuators::kServoCount)) return error(fields, capacity, "pose_index");
      const size_t index = static_cast<size_t>(n[i]);
      if (seen[index]) return error(fields, capacity, "pose_duplicate");
      if (!(armedMask_ & (1U << index))) return error(fields, capacity, "not_armed");
      if (!integral(n[i + 1])) return error(fields, capacity, "pose_bounds");
      const int32_t microseconds = static_cast<int32_t>(n[i + 1]);
      if (microseconds < draft_.servo[index].minUs || microseconds > draft_.servo[index].maxUs) return error(fields, capacity, "pulse_window");
      seen[index] = true;
      next[index] = microseconds;
    }
    if (static_cast<uint32_t>(nowMs - lastJogMs_) < 20) return error(fields, capacity, "jog_rate");
    // Every pulse is validated before the first write, so a rejected pose never moves one servo.
    for (size_t i = 0; i < actuators::kServoCount; ++i) {
      if (!seen[i]) continue;
      if (!io_.servoPulse(static_cast<uint8_t>(i), next[i])) { fail("servo_output", nowMs); return error(fields, capacity, "servo_output"); }
      pulses_[i] = next[i];
    }
    leaseMs_ = nowMs;
    lastJogMs_ = nowMs;
    return true;
  }
  double n[2];
  if (is(verb, "jog")) {
    if (!numbers(cmd, 0, n, 2) || !integral(n[0]) || n[0] < 0 || n[0] >= 4 || !integral(n[1]) || fabs(n[1]) > 2000 || n[1] == 0) return error(fields, capacity, "jog_bounds");
    const size_t index = static_cast<size_t>(n[0]);
    if (!(armedMask_ & (1U << index))) return error(fields, capacity, "not_armed");
    if (static_cast<uint32_t>(nowMs - lastJogMs_) < 20) return error(fields, capacity, "jog_rate");
    const int32_t next = pulses_[index] + static_cast<int32_t>(n[1]);
    if (next < draft_.servo[index].minUs || next > draft_.servo[index].maxUs) return error(fields, capacity, "pulse_window");
    if (!io_.servoPulse(static_cast<uint8_t>(index), next)) { fail("servo_output", nowMs); return error(fields, capacity, "servo_output"); }
    pulses_[index] = next;
    leaseMs_ = nowMs;
    lastJogMs_ = nowMs;
    snprintf(fields, capacity, "pulse,%u,%d", static_cast<unsigned>(index), static_cast<int>(next));
    return true;
  }
  if (is(verb, "step")) {
    if (!numbers(cmd, 0, n, 1, 2147483648.0) || !integral(n[0]) || n[0] == 0) return error(fields, capacity, "step_bounds");
    if (!(armedMask_ & actuators::kStepperOutput)) return error(fields, capacity, "not_armed");
    // Bench jogs stay bounded: one move may not exceed the generated elbow range (draft gearing).
    const double maxSteps = static_cast<double>(actuators::stepsPerJointDegree(draft_)) *
        (ARM_JOINT_MAX_DEG[actuators::ElbowPitch] - ARM_JOINT_MIN_DEG[actuators::ElbowPitch]);
    if (!(fabs(n[0]) <= maxSteps)) return error(fields, capacity, "step_bounds");
    if (jogPending_ && io_.stepPosition() != jogTarget_) return error(fields, capacity, "step_busy");
    // A zero rate cancels the target on disable; the IO counter is the source of truth.
    const int32_t position = io_.stepPosition();
    if ((n[0] > 0 && position > INT32_MAX - n[0]) || (n[0] < 0 && position < INT32_MIN - n[0])) return error(fields, capacity, "step_overflow");
    const int32_t target = position + static_cast<int32_t>(n[0]);
    io_.stepTarget(target, calibration::kFullStepRate * static_cast<float>(draft_.microsteps));
    if (*io_.error()) { fail("step_output", nowMs); return error(fields, capacity, io_.error()); }
    jogPending_ = true;
    jogTarget_ = target;
    leaseMs_ = nowMs;
    snprintf(fields, capacity, "target,%d", static_cast<int>(target));
    return true;
  }
  return error(fields, capacity, "unknown_command");
}

void CalibrationSession::makeReply(uint16_t sequence, bool ok, const char* fields) {
  char code[proto::kMaxLineLen] = {};
  if (!ok) {
    // ERR carries one ASCII token; preserve validation diagnostics as readable error codes.
    if (!token(code, sizeof code, fields)) snprintf(code, sizeof code, "calibration_error");
  }
  replyLength_ = calibration::formatReply(reply_, sizeof reply_, sequence, ok, ok ? fields : code);
  if (!replyLength_) replyLength_ = calibration::formatReply(reply_, sizeof reply_, sequence, false, "response_overflow");
}

bool CalibrationSession::execute(const char* line, size_t length, uint32_t nowMs) {
  if (hasReply()) return false;
  calibration::Command command;
  if (calibration::parse(line, length, command) != proto::ParseResult::Ok) return false;
  const bool status = is(command.verb, "status") && command.argc == 0;
  const uint16_t delta = static_cast<uint16_t>(command.seq - lastSequence_);
  if (!status && haveSequence_ && (delta == 0 || delta >= 0x8000)) { makeReply(command.seq, false, "stale_sequence"); return true; }
  if (!status) { haveSequence_ = true; lastSequence_ = command.seq; }
  char fields[proto::kMaxLineLen - 16] = {};
  const bool ok = dispatch(command, nowMs, fields, sizeof fields);
  makeReply(command.seq, ok, fields);
  return true;
}
