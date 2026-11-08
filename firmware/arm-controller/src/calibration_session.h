#pragma once

#include "actuator_io.h"
#include "arm.h"
#include "calibration_protocol.h"
#include "board_config.h"

// Owns the safety boundary between normal joint control and explicitly approved, isolated
// bench calibration. No raw actuator command is reachable through the normal J protocol.
class CalibrationSession {
 public:
  CalibrationSession(Arm& arm, actuators::IO& io, actuators::Store& store,
                     const actuators::Config& board = actuators::boardConfig())
      : arm_(arm), io_(io), store_(store), board_(board) {}
  void begin(uint32_t nowMs);
  void tick(uint32_t nowMs, float dtSec);
  bool execute(const char* line, size_t length, uint32_t nowMs);
  /** Independent camera servo; works without calibration/reference, but respects e-stop. */
  bool setCamera(float deg, uint16_t seq, uint32_t nowMs);
  uint16_t cameraSeq() const { return lastCameraSequence_; }
  float cameraDeg() const { return cameraDeg_; }
  bool cameraActive() const { return io_.cameraActive(); }
  bool cameraStatusPending() const { return cameraStatusPending_; }
  void consumeCameraStatus() { cameraStatusPending_ = false; }
  /** Periodic V heartbeat, so a reconnecting host learns the camera seq without moving it. */
  void requestCameraStatus() { cameraStatusPending_ = true; }
  bool normalReady() const {
    return !calibrating_ && validConfig_ && referenced_ &&
           preparedMask_ == actuators::kAllOutputs && !faulted_;
  }
  bool calibrating() const { return calibrating_; }
  bool hasReply() const { return replyLength_ != 0; }
  const char* reply() const { return reply_; }
  size_t replyLength() const { return replyLength_; }
  void consumeReply() { replyLength_ = 0; }
  void reportedPosition(float out[ARM_NUM_JOINTS]) const;

 private:
  void fail(const char* reason, uint32_t nowMs);
  void disarm();
  // Boot-time reference when the motor shaft still reads the angle recorded at the last
  // marked-home reference. Any other reading is left to a manual reference.
  void tryAutoReference(uint32_t nowMs);
  bool configure(const actuators::Config& config, uint8_t outputMask, uint32_t nowMs);
  // Reads the shaft angle and integrates it only when the step is physically plausible.
  bool readEncoderSample(uint32_t nowMs);
  bool set(const calibration::Command& command);
  bool get(const calibration::Command& command, char* fields, size_t capacity) const;
  bool dispatch(const calibration::Command& command, uint32_t nowMs, char* fields, size_t capacity);
  void makeReply(uint16_t sequence, bool ok, const char* fields);
  const actuators::Config& activeConfig() const { return calibrating_ ? draft_ : config_; }

  Arm& arm_;
  actuators::IO& io_;
  actuators::Store& store_;
  const actuators::Config board_;
  actuators::Config config_, draft_;
  actuators::EncoderTracker encoder_;
  bool validConfig_ = false, calibrating_ = false;
  uint8_t preparedMask_ = 0;
  bool referenced_ = false, faulted_ = false;
  const char* fault_ = "none";
  bool haveSequence_ = false;
  uint16_t lastSequence_ = 0;
  bool haveCameraSequence_ = false;
  uint16_t lastCameraSequence_ = 0;
  float cameraDeg_ = (proto::kCameraMinDeg + proto::kCameraMaxDeg) / 2.0f;
  bool cameraStatusPending_ = true;
  uint32_t leaseMs_ = 0;
  uint32_t lastJogMs_ = 0;
  uint8_t armedMask_ = 0;
  bool jogPending_ = false;
  int32_t jogTarget_ = 0;
  // Encoder plausibility window and fault debounce: one bad sample must not latch a fault.
  uint32_t encoderMs_ = 0;
  bool encoderTimed_ = false;
  uint8_t followingFaults_ = 0, limitFaults_ = 0, sampleFaults_ = 0;
  int32_t pulses_[actuators::kServoCount] = {};
  char reply_[proto::kMaxLineLen + 8] = {};
  size_t replyLength_ = 0;
};
