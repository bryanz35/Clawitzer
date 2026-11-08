#pragma once

#include "actuator_config.h"

namespace actuators {

class IO {
 public:
  virtual ~IO() = default;
  // Reconfiguration is allowed only with outputs disabled. No control-loop allocation.
  virtual bool configure(const Config& config, uint8_t outputMask) = 0;
  virtual const char* error() const = 0;
  virtual bool readEncoder(uint16_t& raw) = 0;
  virtual bool servoPulse(uint8_t servo, int32_t microseconds) = 0;
  // Independent camera servo; not an arm joint. Default: unsupported.
  virtual bool cameraPulse(float) { return false; }
  virtual bool cameraActive() const { return false; }
  virtual void stepTarget(int32_t steps, float maximumStepsPerSecond) = 0;
  virtual int32_t stepPosition() const = 0;
  virtual void zeroStepPosition() = 0;
  virtual void enableStepper(bool enabled) = 0;
  virtual bool estopActive() const = 0;
  // Stops pulses, deasserts driver enable, and disables all PWM outputs.
  virtual void disableOutputs() = 0;
};

}  // namespace actuators
