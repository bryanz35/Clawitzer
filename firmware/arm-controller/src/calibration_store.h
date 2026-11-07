#pragma once

#include "actuator_config.h"

namespace actuators {

// IDF-only implementation; the portable Store interface remains usable in native tests.
// Missing/corrupt records leave compiled bench hardware available, never erase NVS.
class NvsCalibrationStore final : public Store {
 public:
  NvsCalibrationStore() = default;
  ~NvsCalibrationStore() override;
  NvsCalibrationStore(const NvsCalibrationStore&) = delete;
  NvsCalibrationStore& operator=(const NvsCalibrationStore&) = delete;

  bool begin();
  bool load(Config& config) override;
  bool save(const Config& config) override;
  const char* error() const { return error_; }

 private:
  bool fail(const char* operation, int32_t code);
  uint32_t handle_ = 0;
  bool ready_ = false;
  char error_[128] = {};
};

}  // namespace actuators
