// Wire-format adapter. Arm knows only joint targets, not serial frames or CRCs.
#pragma once

#include "arm.h"
#include "protocol.h"

class CalibrationSession;

class SerialController {
 public:
  enum class Result { Incomplete, Accepted, Ignored, Malformed, BadCrc, Calibration };

  explicit SerialController(Arm& arm, CalibrationSession* calibration = nullptr)
      : arm_(arm), calibration_(calibration) {}

  // Feed one received byte. Rejected frames never refresh the arm's watchdog.
  Result feed(char byte, uint32_t nowMs);
  size_t formatStatus(char* buffer, size_t capacity) const;

 private:
  Arm& arm_;
  CalibrationSession* calibration_;
  proto::LineReader reader_;
};
