#include "serial_controller.h"
#include "calibration_session.h"

SerialController::Result SerialController::feed(char byte, uint32_t nowMs) {
  if (!reader_.feed(byte)) return Result::Incomplete;
  if (reader_.line()[0] == 'C') {
    return calibration_ && calibration_->execute(reader_.line(), reader_.length(), nowMs)
        ? Result::Calibration : Result::Malformed;
  }
  if (reader_.line()[0] == 'P') {
    proto::CameraCommand camera;
    switch (proto::parseCameraCommand(reader_.line(), reader_.length(), camera)) {
      case proto::ParseResult::BadCrc: return Result::BadCrc;
      case proto::ParseResult::Malformed: return Result::Malformed;
      case proto::ParseResult::Ok:
        return calibration_ && calibration_->setCamera(camera.deg, camera.seq, nowMs)
            ? Result::Accepted : Result::Ignored;
    }
    return Result::Malformed;
  }
  proto::JointCommand command;
  switch (proto::parseCommand(reader_.line(), reader_.length(), command)) {
    case proto::ParseResult::BadCrc: return Result::BadCrc;
    case proto::ParseResult::Malformed: return Result::Malformed;
    case proto::ParseResult::Ok:
      if (calibration_ && !calibration_->normalReady()) return Result::Ignored;
      return arm_.setJointAngles(command.deg, command.seq, nowMs) ? Result::Accepted : Result::Ignored;
  }
  return Result::Malformed;
}

size_t SerialController::formatStatus(char* buffer, size_t capacity) const {
  float position[ARM_NUM_JOINTS];
  if (calibration_) calibration_->reportedPosition(position);
  else for (int i = 0; i < ARM_NUM_JOINTS; ++i) position[i] = arm_.positionDeg()[i];
  return proto::formatStatus(buffer, capacity, arm_.lastSeq(), armStateName(arm_.state()), position);
}

size_t SerialController::formatCameraStatus(char* buffer, size_t capacity) const {
  if (!calibration_) return 0;
  return proto::formatCameraStatus(buffer, capacity, calibration_->cameraSeq(),
                                   calibration_->cameraDeg(), calibration_->cameraActive());
}
