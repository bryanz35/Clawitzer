#include "arm.h"

#include <math.h>

// Canonical joint order from arm_config.h: j1 base, j2 elbow, j3 wrist pitch, j4 wrist roll.
static constexpr int kWristPitchJoint = 2;
static constexpr int kWristRollJoint = 3;

const char* armStateName(ArmState s) {
  switch (s) {
    case ArmState::Homing: return "HOMING";
    case ArmState::Idle: return "IDLE";
    case ArmState::Active: return "ACTIVE";
    case ArmState::Watchdog: return "WATCHDOG";
    case ArmState::Estop: return "ESTOP";
  }
  return "ESTOP";
}

void Arm::begin(const float startDeg[ARM_NUM_JOINTS], uint32_t nowMs) {
  for (int i = 0; i < ARM_NUM_JOINTS; i++) {
    pos_[i] = clampf(startDeg[i], ARM_JOINT_MIN_DEG[i], ARM_JOINT_MAX_DEG[i]);
    vel_[i] = 0.0f;
    target_[i] = clampf(ARM_HOME_DEG[i], ARM_JOINT_MIN_DEG[i], ARM_JOINT_MAX_DEG[i]);
  }
  clampWrist(pos_);
  clampWrist(target_);
  haveSeq_ = false;
  lastSeq_ = 0;
  lastCmdMs_ = nowMs;
  transition(ArmState::Homing);
}

void Arm::rehome(const float startDeg[ARM_NUM_JOINTS], uint32_t nowMs) {
  const uint16_t seq = lastSeq_;
  const bool haveSeq = haveSeq_;
  begin(startDeg, nowMs);
  lastSeq_ = seq;
  haveSeq_ = haveSeq;
}

bool Arm::setJointAngles(const float deg[ARM_NUM_JOINTS], uint16_t seq, uint32_t nowMs) {
  if (state_ == ArmState::Homing || state_ == ArmState::Estop) return false;
  const uint16_t delta = static_cast<uint16_t>(seq - lastSeq_);
  if (haveSeq_ && (delta == 0 || delta >= 0x8000)) return false;

  bool finite = true;
  for (int i = 0; i < ARM_NUM_JOINTS; i++) finite = finite && isfinite(deg[i]);
  if (!finite) return false;

  haveSeq_ = true;
  lastSeq_ = seq;
  lastCmdMs_ = nowMs;
  for (int i = 0; i < ARM_NUM_JOINTS; i++) {
    target_[i] = clampf(deg[i], ARM_JOINT_MIN_DEG[i], ARM_JOINT_MAX_DEG[i]);
  }
  clampWrist(target_);
  if (state_ != ArmState::Active) transition(ArmState::Active);
  return true;
}

void Arm::setEstop(bool active, uint32_t nowMs) {
  if (active == estop_) return;
  estop_ = active;
  if (active) {
    hold();
    transition(ArmState::Estop);
  } else {
    // Hardware callers must supply a fresh reference when geared feedback is ambiguous.
    rehome(pos_, nowMs);
  }
}

void Arm::update(uint32_t nowMs, float dtSec) {
  if (state_ == ArmState::Estop) return;

  if (state_ == ArmState::Active && static_cast<uint32_t>(nowMs - lastCmdMs_) > kWatchdogMs) {
    brake();
    transition(ArmState::Watchdog);
  }

  const float speedScale = state_ == ArmState::Homing ? kHomingSpeedFraction : 1.0f;
  bool atHome = true;
  for (int i = 0; i < ARM_NUM_JOINTS; i++) {
    const float vmax = ARM_JOINT_MAX_VEL_DEG_S[i] * speedScale;
    const float amax = ARM_JOINT_MAX_ACCEL_DEG_S2[i];
    const float err = target_[i] - pos_[i];

    // Fastest velocity that can still stop at the target under amax, capped at vmax.
    const float vdes = copysignf(fminf(vmax, sqrtf(2.0f * amax * fabsf(err))), err);
    vel_[i] += clampf(vdes - vel_[i], -amax * dtSec, amax * dtSec);
    vel_[i] = clampf(vel_[i], -vmax, vmax);

    const float step = vel_[i] * dtSec;
    if ((err >= 0.0f) == (step >= 0.0f) && fabsf(step) >= fabsf(err)) {
      pos_[i] = target_[i];
      vel_[i] = 0.0f;
    } else {
      pos_[i] += step;
    }
    pos_[i] = clampf(pos_[i], ARM_JOINT_MIN_DEG[i], ARM_JOINT_MAX_DEG[i]);

    if (fabsf(pos_[i] - ARM_HOME_DEG[i]) > kHomeToleranceDeg) atHome = false;
  }
  clampWrist(pos_);

  if (state_ == ArmState::Homing && atHome) transition(ArmState::Idle);
}

void Arm::clampWrist(float pose[ARM_NUM_JOINTS]) const {
  if (!(wristSumMaxDeg_ > 0.0f)) return;
  const float sum = fabsf(pose[kWristPitchJoint]) + fabsf(pose[kWristRollJoint]);
  if (!(sum > wristSumMaxDeg_)) return;
  // Radial projection keeps the commanded roll:pitch ratio. Both joint limits contain zero,
  // so scaling toward the origin cannot leave them.
  const float scale = wristSumMaxDeg_ / sum;
  pose[kWristPitchJoint] *= scale;
  pose[kWristRollJoint] *= scale;
}

void Arm::brake() {
  // Target the stopping point v·|v|/(2a): update() then decelerates within the accel limit.
  for (int i = 0; i < ARM_NUM_JOINTS; i++) {
    const float stop = vel_[i] * fabsf(vel_[i]) / (2.0f * ARM_JOINT_MAX_ACCEL_DEG_S2[i]);
    target_[i] = clampf(pos_[i] + stop, ARM_JOINT_MIN_DEG[i], ARM_JOINT_MAX_DEG[i]);
  }
  clampWrist(target_);
}

void Arm::hold() {
  for (int i = 0; i < ARM_NUM_JOINTS; i++) {
    target_[i] = pos_[i];
    vel_[i] = 0.0f;
  }
  clampWrist(target_);
}

void Arm::transition(ArmState to) {
  if (to == state_ && to != ArmState::Homing) return;
  const ArmState from = state_;
  state_ = to;
  if (onChange_) onChange_(from, to);
}
