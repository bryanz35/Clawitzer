// Portable arm articulation and safety. No transport, PWM, or framework dependencies.
//
//   boot ──► HOMING ──(at home)──► IDLE ──(valid cmd)──► ACTIVE ──(no cmd 200 ms)──► WATCHDOG
//                                                          ▲                            │
//                                                          └──────(valid cmd)───────────┘
//   any state ──(e-stop)──► ESTOP ──(released)──► HOMING
//
// Commands are ignored in HOMING and ESTOP. Every setpoint is clamped to the position,
// velocity and acceleration limits in arm_config.h. On WATCHDOG the arm brakes at the
// acceleration limit (coasting at most v²/2a) and then holds. Portable C++17: time is passed in.
#pragma once

#include <stdint.h>

#include "arm_config.h"

enum class ArmState : uint8_t { Homing, Idle, Active, Watchdog, Estop };

// Matches the `state` names in the status line.
const char* armStateName(ArmState s);

constexpr uint32_t kWatchdogMs = 200;
// Soft start: homing moves at this fraction of each joint's velocity limit.
constexpr float kHomingSpeedFraction = 0.25f;
// Homing is complete when every joint is within this of home.
constexpr float kHomeToleranceDeg = 0.5f;

class Arm {
 public:
  using StateChangeFn = void (*)(ArmState from, ArmState to);

  explicit Arm(StateChangeFn onChange = nullptr) : onChange_(onChange) {}

  // Starts soft-start homing from `startDeg`, the best estimate of where the joints are now.
  // Forgets the last sequence number (the first command after boot may carry any seq).
  void begin(const float startDeg[ARM_NUM_JOINTS], uint32_t nowMs);

  // Re-home from a confirmed position without forgetting the live command sequence.
  void rehome(const float startDeg[ARM_NUM_JOINTS], uint32_t nowMs);

  // Joint-space target in degrees, with a wrapping uint16 command sequence.
  // Rejects non-finite angles, stale sequences, and commands during homing/e-stop.
  // Only accepted targets refresh the watchdog; all targets are limit-clamped.
  bool setJointAngles(const float deg[ARM_NUM_JOINTS], uint16_t seq, uint32_t nowMs);

  // E-stop level, true while servo power is cut. Entering → ESTOP (hold); releasing → re-home.
  void setEstop(bool active, uint32_t nowMs);

  // One fixed-rate control tick.
  void update(uint32_t nowMs, float dtSec);

  const float* positionDeg() const { return pos_; }
  ArmState state() const { return state_; }
  // Last accepted command seq (0 before any). Reported in the status line so the phone can resync.
  uint16_t lastSeq() const { return lastSeq_; }

 private:
  void transition(ArmState to);
  // Watchdog: stop at the acceleration limit, then hold.
  void brake();
  // E-stop: freeze the setpoint now (servo power is already cut).
  void hold();
  static float clampf(float v, float lo, float hi) { return v < lo ? lo : (v > hi ? hi : v); }

  StateChangeFn onChange_;
  ArmState state_ = ArmState::Homing;
  float pos_[ARM_NUM_JOINTS] = {};
  float vel_[ARM_NUM_JOINTS] = {};
  float target_[ARM_NUM_JOINTS] = {};
  uint16_t lastSeq_ = 0;
  bool haveSeq_ = false;
  bool estop_ = false;
  uint32_t lastCmdMs_ = 0;
};
