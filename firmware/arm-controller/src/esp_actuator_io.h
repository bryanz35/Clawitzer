#pragma once

#include "actuator_io.h"
#include "step_pulse.h"
#include "driver/gptimer.h"
#include "driver/spi_master.h"
#include "freertos/FreeRTOS.h"
#include "freertos/portmacro.h"

namespace actuators {

// IO calls belong to one control task; only the GPTimer callback runs concurrently.
// Keep this object in internal RAM when CONFIG_GPTIMER_ISR_IRAM_SAFE is enabled.
class EspActuatorIO final : public IO {
 public:
  EspActuatorIO() = default;
  ~EspActuatorIO() override;
  EspActuatorIO(const EspActuatorIO&) = delete;
  EspActuatorIO& operator=(const EspActuatorIO&) = delete;

  bool configure(const Config& config, uint8_t outputMask) override;
  /** Independent camera servo: configures its own PWM timer and the shared e-stop input. */
  bool configureCamera(const Config& board);
  bool cameraPulse(float deg) override;
  bool cameraActive() const override;
  const char* error() const override;
  bool readEncoder(uint16_t& raw) override;
  bool servoPulse(uint8_t servo, int32_t microseconds) override;
  void stepTarget(int32_t steps, float maximumStepsPerSecond) override;
  int32_t stepPosition() const override;
  void zeroStepPosition() override;
  void enableStepper(bool enabled) override;
  bool estopActive() const override;
  void disableOutputs() override;

 private:
  static bool IRAM_ATTR alarm(gptimer_handle_t, const gptimer_alarm_event_data_t*, void* context);
  bool check(esp_err_t result, const char* operation);
  bool fault(const char* message);
  bool release();
  bool releaseCamera();
  bool setupUart();
  bool tmcRead(uint8_t reg, uint32_t& value);
  bool tmcWriteChecked(uint8_t reg, uint32_t value);
  bool spiFrame(uint16_t command, uint16_t& response);
  bool finishSpi();

  Config config_{};
  mutable portMUX_TYPE mux_ = portMUX_INITIALIZER_UNLOCKED;
  StepPulse pulse_;
  char error_[128] = {};
  gptimer_handle_t timer_ = nullptr;
  spi_device_handle_t encoder_ = nullptr;
  spi_transaction_t spiTransaction_{};
  uint8_t outputMask_ = 0, servoConfigured_ = 0, servoActive_ = 0;
  bool configured_ = false, enableReady_ = false, stepReady_ = false;
  bool directionReady_ = false, estopReady_ = false;
  bool uartInstalled_ = false, spiBusInstalled_ = false, spiPending_ = false;
  bool timerEnabled_ = false, timerRunning_ = false, pwmTimerReady_ = false;
  bool cameraConfigured_ = false, cameraActive_ = false;
  bool estopTripped_ = false;
};

}  // namespace actuators
