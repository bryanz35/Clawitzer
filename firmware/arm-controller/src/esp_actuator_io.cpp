#include "esp_actuator_io.h"

#include <cmath>
#include <stdio.h>
#include <string.h>
#include "hardware_protocol.h"
#include "driver/gpio.h"
#include "driver/ledc.h"
#include "driver/uart.h"
#include "esp_rom_gpio.h"
#include "esp_rom_sys.h"
#include "esp_timer.h"
#include "freertos/task.h"
#include "hal/gpio_ll.h"
#include "soc/gpio_struct.h"
#include "soc/gpio_sig_map.h"

namespace actuators {
namespace {
constexpr uart_port_t kUart = UART_NUM_1;
constexpr spi_host_device_t kSpi = SPI2_HOST;
constexpr ledc_mode_t kPwmMode = LEDC_LOW_SPEED_MODE;
constexpr ledc_timer_t kPwmTimer = LEDC_TIMER_0;
constexpr uint32_t kPwmPeriodUs = 20000;
constexpr int64_t kSpiTimeoutUs = 1000;
constexpr int64_t kUartTimeoutUs = 25000;  // Setup only; never used in the control loop.

bool outputPin(int32_t pin) {
  return pin >= 0 && pin < GPIO_NUM_MAX && GPIO_IS_VALID_OUTPUT_GPIO(pin);
}
bool inputPin(int32_t pin) {
  return pin >= 0 && pin < GPIO_NUM_MAX && GPIO_IS_VALID_GPIO(pin);
}
gpio_num_t gpio(int32_t pin) { return static_cast<gpio_num_t>(pin); }
ledc_channel_t channel(unsigned index) { return static_cast<ledc_channel_t>(index); }
}  // namespace

EspActuatorIO::~EspActuatorIO() { release(); }

const char* EspActuatorIO::error() const {
  portENTER_CRITICAL(&mux_);
  const bool tripped = estopTripped_;
  portEXIT_CRITICAL(&mux_);
  return tripped ? "ESTOP" : error_;
}

bool EspActuatorIO::fault(const char* message) {
  if (!error_[0]) snprintf(error_, sizeof error_, "%s", message);
  disableOutputs();
  return false;
}

bool EspActuatorIO::check(esp_err_t result, const char* operation) {
  if (result == ESP_OK) return true;
  if (!error_[0]) snprintf(error_, sizeof error_, "%s: %s", operation, esp_err_to_name(result));
  disableOutputs();
  return false;
}

void EspActuatorIO::disableOutputs() {
  // The same mux guards the GPIO edges and ISR: after this returns there can
  // be no stale queued STEP edge, even if the timer itself remains running.
  portENTER_CRITICAL(&mux_);
  if (enableReady_) gpio_ll_set_level(&GPIO, config_.pins.enable, 1);
  pulse_.cancel();
  if (stepReady_) gpio_ll_set_level(&GPIO, config_.pins.step, 0);
  portEXIT_CRITICAL(&mux_);
  for (unsigned i = 0; i < kServoCount; ++i) {
    if (!(servoConfigured_ & (1u << i))) continue;
    const esp_err_t result = ledc_stop(kPwmMode, channel(i), 0);
    if (result != ESP_OK && !error_[0]) {
      snprintf(error_, sizeof error_, "PWM stop: %s", esp_err_to_name(result));
    }
    // Disconnect the peripheral as well, so even an SDK stop failure cannot
    // leave a live servo signal. servoPulse reconnects only after healthy setup.
    const esp_err_t level = gpio_set_level(gpio(config_.pins.servo[i]), 0);
    esp_rom_gpio_connect_out_signal(config_.pins.servo[i], SIG_GPIO_OUT_IDX, false, false);
    const esp_err_t direction = gpio_set_direction(gpio(config_.pins.servo[i]), GPIO_MODE_OUTPUT);
    if ((level != ESP_OK || direction != ESP_OK) && !error_[0]) {
      snprintf(error_, sizeof error_, "PWM GPIO disable failed");
    }
  }
  servoActive_ = 0;
}

bool EspActuatorIO::release() {
  disableOutputs();
  configured_ = false;
  outputMask_ = 0;
  if (timerRunning_) {
    if (!check(gptimer_stop(timer_), "timer stop")) return false;
    timerRunning_ = false;
  }
  if (timerEnabled_) {
    if (!check(gptimer_disable(timer_), "timer disable")) return false;
    timerEnabled_ = false;
  }
  if (timer_) {
    if (!check(gptimer_del_timer(timer_), "timer delete")) return false;
    timer_ = nullptr;
  }
  if (spiPending_ && !finishSpi()) return false;
  if (encoder_) {
    if (!check(spi_bus_remove_device(encoder_), "SPI remove")) return false;
    encoder_ = nullptr;
  }
  if (spiBusInstalled_) {
    if (!check(spi_bus_free(kSpi), "SPI free")) return false;
    spiBusInstalled_ = false;
  }
  if (uartInstalled_) {
    if (!check(uart_driver_delete(kUart), "UART delete")) return false;
    uartInstalled_ = false;
  }
  if (pwmTimerReady_) {
    if (!check(ledc_timer_pause(kPwmMode, kPwmTimer), "PWM timer pause")) return false;
    ledc_timer_config_t pwm{};
    pwm.speed_mode = kPwmMode;
    pwm.timer_num = kPwmTimer;
    pwm.deconfigure = true;
    if (!check(ledc_timer_config(&pwm), "PWM timer release")) return false;
    pwmTimerReady_ = false;
  }
  servoConfigured_ = 0;
  stepReady_ = directionReady_ = estopReady_ = false;
  // Leave old EN actively HIGH until the new setup takes ownership of its pins.
  return true;
}

bool EspActuatorIO::configure(const Config& config, uint8_t outputMask) {
  portENTER_CRITICAL(&mux_);
  const bool moving = pulse_.enabled;
  portEXIT_CRITICAL(&mux_);
  if (moving || servoActive_) return fault("configure requires disabled outputs");
  if (!release()) return false;
  error_[0] = '\0';
  portENTER_CRITICAL(&mux_);
  estopTripped_ = false;
  portEXIT_CRITICAL(&mux_);
  if (!validateBench(config, outputMask, error_, sizeof error_)) return false;
  const bool stepper = (outputMask & kStepperOutput) != 0;
  const uint8_t servos = outputMask & ((1u << kServoCount) - 1u);
  const Pins& p = config.pins;
  for (unsigned i = 0; i < kServoCount; ++i) {
    if ((servos & (1u << i)) && !outputPin(p.servo[i])) return fault("invalid servo output GPIO");
  }
  if (!outputPin(p.enable) || !inputPin(p.estop)) return fault("invalid safety GPIO");
  if (stepper && (!outputPin(p.step) || !outputPin(p.direction) ||
      !outputPin(p.uartTx) || !inputPin(p.uartRx) || !outputPin(p.spiMosi) ||
      !inputPin(p.spiMiso) || !outputPin(p.spiClock) || !outputPin(p.spiCs))) {
    return fault("invalid stepper GPIO");
  }

  // Remove the old enable ownership before switching config_, so partial init
  // never drives the new (not-yet-configured) pin through emergency disable.
  enableReady_ = false;
  config_ = config;
  if (!check(gpio_reset_pin(gpio(p.enable)), "EN reset") ||
      !check(gpio_set_level(gpio(p.enable), 1), "EN latch") ||
      !check(gpio_set_direction(gpio(p.enable), GPIO_MODE_OUTPUT), "EN output")) return false;
  enableReady_ = true;  // Active LOW: held HIGH before UART, PWM, SPI or timer init.
  // An external EN pull-up is also required to hold the driver off during reset.
  gpio_config_t estop{};
  estop.pin_bit_mask = 1ULL << p.estop;
  estop.mode = GPIO_MODE_INPUT;
  // Bias toward ACTIVE: disconnected wiring must not grant permission to move.
  // Classic ESP32 GPIO34..39 have NO internal pulls. These inputs require an
  // external fail-safe bias: pull-down for active LOW, pull-up for active HIGH,
  // with healthy wiring driving the opposite level. Never leave them floating.
  estop.pull_up_en = p.estop < 34 && p.estopActiveLevel
                         ? GPIO_PULLUP_ENABLE : GPIO_PULLUP_DISABLE;
  estop.pull_down_en = p.estop < 34 && !p.estopActiveLevel
                           ? GPIO_PULLDOWN_ENABLE : GPIO_PULLDOWN_DISABLE;
  if (!check(gpio_config(&estop), "e-stop input")) return false;
  estopReady_ = true;
  if (estopActive()) return fault("ESTOP");
  pulse_ = StepPulse{};

  if (stepper) {
    if (!check(gpio_reset_pin(gpio(p.step)), "STEP reset") ||
        !check(gpio_set_level(gpio(p.step), 0), "STEP latch") ||
        !check(gpio_set_direction(gpio(p.step), GPIO_MODE_OUTPUT), "STEP output")) { release(); return false; }
    stepReady_ = true;
    if (!check(gpio_reset_pin(gpio(p.direction)), "DIR reset") ||
        !check(gpio_set_level(gpio(p.direction), 1), "DIR latch") ||
        !check(gpio_set_direction(gpio(p.direction), GPIO_MODE_OUTPUT), "DIR output")) { release(); return false; }
    directionReady_ = true;
    if (!setupUart()) { release(); return false; }

    spi_bus_config_t bus{};
    bus.mosi_io_num = p.spiMosi;
    bus.miso_io_num = p.spiMiso;
    bus.sclk_io_num = p.spiClock;
    bus.quadwp_io_num = -1;
    bus.quadhd_io_num = -1;
    bus.max_transfer_sz = 4;
    if (!check(spi_bus_initialize(kSpi, &bus, SPI_DMA_DISABLED), "SPI bus")) { release(); return false; }
    spiBusInstalled_ = true;
    if (!check(gpio_reset_pin(gpio(p.spiCs)), "CS reset") ||
        !check(gpio_set_level(gpio(p.spiCs), 1), "CS latch") ||
        !check(gpio_set_direction(gpio(p.spiCs), GPIO_MODE_OUTPUT), "CS output")) { release(); return false; }
    spi_device_interface_config_t device{};
    device.mode = 1;
    device.clock_speed_hz = 1000000;
    device.spics_io_num = -1;  // Manual CS guarantees both setup and inter-frame gaps.
    device.queue_size = 1;
    if (!check(spi_bus_add_device(kSpi, &device, &encoder_), "encoder device")) { release(); return false; }
  }

  if (servos) {
    ledc_timer_config_t pwm{};
    pwm.speed_mode = kPwmMode;
    pwm.duty_resolution = LEDC_TIMER_14_BIT;
    pwm.timer_num = kPwmTimer;
    pwm.freq_hz = 50;
    pwm.clk_cfg = LEDC_AUTO_CLK;
    if (!check(ledc_timer_config(&pwm), "PWM timer")) { release(); return false; }
    pwmTimerReady_ = true;
    for (unsigned i = 0; i < kServoCount; ++i) {
      if (!(servos & (1u << i))) continue;
      ledc_channel_config_t servo{};
      servo.gpio_num = p.servo[i];
      servo.speed_mode = kPwmMode;
      servo.channel = channel(i);
      servo.intr_type = LEDC_INTR_DISABLE;
      servo.timer_sel = kPwmTimer;
      servo.duty = 0;
      if (!check(ledc_channel_config(&servo), "PWM channel")) { release(); return false; }
      servoConfigured_ |= 1u << i;
    }
  }
  disableOutputs();
  if (error_[0]) { release(); return false; }

  if (stepper) {
    gptimer_config_t timer{};
    timer.clk_src = GPTIMER_CLK_SRC_DEFAULT;
    timer.direction = GPTIMER_COUNT_UP;
    timer.resolution_hz = 1000000;
    if (!check(gptimer_new_timer(&timer, &timer_), "pulse timer")) { release(); return false; }
    gptimer_event_callbacks_t callbacks{};
    callbacks.on_alarm = alarm;
    gptimer_alarm_config_t alarmConfig{};
    alarmConfig.alarm_count = 1000000 / StepPulse::kTickHz;
    alarmConfig.flags.auto_reload_on_alarm = true;
    if (!check(gptimer_register_event_callbacks(timer_, &callbacks, this), "pulse callback") ||
        !check(gptimer_set_alarm_action(timer_, &alarmConfig), "pulse alarm") ||
        !check(gptimer_enable(timer_), "pulse timer enable")) { release(); return false; }
    timerEnabled_ = true;
    if (!check(gptimer_start(timer_), "pulse timer start")) { release(); return false; }
    timerRunning_ = true;
  }
  outputMask_ = outputMask;
  configured_ = true;
  // An e-stop may have arrived during setup.
  if (error()[0] || estopActive()) { fault("ESTOP"); release(); return false; }
  return true;
}

bool EspActuatorIO::setupUart() {
  // TMC2209 datasheet sections4/5/9/13; accessible manufacturer-datasheet mirror:
  // https://components101.com/sites/default/files/component_datasheet/TMC2209.pdf
  // HARDWARE single-wire UART: TX -> ~1kohm series resistor -> PDN_UART,
  // RX -> same PDN_UART node. Common ground, correct VIO. No software UART.
  uart_config_t uart{};
  uart.baud_rate = 115200;
  uart.data_bits = UART_DATA_8_BITS;
  uart.parity = UART_PARITY_DISABLE;
  uart.stop_bits = UART_STOP_BITS_1;
  uart.flow_ctrl = UART_HW_FLOWCTRL_DISABLE;
  uart.source_clk = UART_SCLK_DEFAULT;
  if (!check(uart_param_config(kUart, &uart), "TMC UART config") ||
      !check(uart_set_pin(kUart, config_.pins.uartTx, config_.pins.uartRx,
                          UART_PIN_NO_CHANGE, UART_PIN_NO_CHANGE), "TMC UART pins") ||
      !check(uart_driver_install(kUart, 256, 0, 0, nullptr, 0), "TMC UART install")) return false;
  uartInstalled_ = true;
  uint32_t ioin = 0;
  if (!tmcRead(0x06, ioin)) return false;
  if ((ioin >> 24) != 0x21) return fault("TMC2209 version/contact mismatch");
  uint8_t cs = 0;
  bool lowSense = false;
  if (!tmcCurrent(config_.currentMa, config_.senseResistorOhm, cs, lowSense)) return fault("unrepresentable TMC current");
  uint32_t mres = 0;
  for (uint32_t steps = 256; steps > config_.microsteps; steps >>= 1) ++mres;
  // External sense, digital current, PDN disabled, register-selected microsteps.
  // SpreadCycle avoids StealthChop's motion-dependent auto-tuning and minimum
  // IRUN=8 restriction; the configured current range includes lower settings.
  constexpr uint32_t gconf = (1u << 2) | (1u << 6) | (1u << 7) | (1u << 8);
  // Datasheet reset chopper timing, with explicit MRES, VSENSE and single-edge STEP.
  const uint32_t chop = (0x10000053u & ~((15u << 24) | (1u << 17))) |
                        (mres << 24) | (lowSense ? (1u << 17) : 0);
  // Holding and running current never exceed the configured RMS current.
  const uint32_t current = cs | (static_cast<uint32_t>(cs) << 8) | (1u << 16);
  if (!tmcWriteChecked(0x00, gconf) || !tmcWriteChecked(0x6c, chop) ||
      !tmcWriteChecked(0x10, current) || !tmcWriteChecked(0x22, 0)) return false;
  uint32_t actual = 0;
  if (!tmcRead(0x00, actual)) return false;
  if ((actual & 0x3ff) != gconf) return fault("TMC GCONF readback mismatch");
  if (!tmcRead(0x6c, actual)) return false;
  if (actual != chop) return fault("TMC CHOPCONF readback mismatch");
  // IHOLD_IRUN is write-only: its successful write is verified by IFCNT, not
  // invented register readback. No UART register reads occur after configure().
  return true;
}

bool EspActuatorIO::tmcRead(uint8_t reg, uint32_t& value) {
  if (!uartInstalled_) return fault("TMC UART not installed");
  uint8_t request[4] = {0x05, static_cast<uint8_t>(config_.uartAddress), reg, 0};
  request[3] = tmcCrc(request, 3);
  if (!check(uart_flush_input(kUart), "TMC RX flush")) return false;
  if (uart_tx_chars(kUart, reinterpret_cast<const char*>(request), sizeof request) != static_cast<int>(sizeof request)) return fault("TMC UART TX full");
  if (!check(uart_wait_tx_done(kUart, pdMS_TO_TICKS(20) + 1), "TMC UART TX timeout")) return false;
  uint8_t window[8] = {};
  unsigned received = 0;
  const int64_t deadline = esp_timer_get_time() + kUartTimeoutUs;
  while (esp_timer_get_time() < deadline) {
    uint8_t byte = 0;
    const int count = uart_read_bytes(kUart, &byte, 1, 0);
    if (count < 0) return fault("TMC UART RX error");
    if (!count) { vTaskDelay(1); continue; }
    memmove(window, window + 1, sizeof window - 1);
    window[7] = byte;
    if (received < sizeof window) ++received;
    // Discard the echoed 4-byte request; only slave replies use master address FF.
    if (received == sizeof window && window[0] == 0x05 && window[1] == 0xff && window[2] == reg) {
      if (tmcCrc(window, 7) != window[7]) return fault("TMC UART reply CRC");
      value = (static_cast<uint32_t>(window[3]) << 24) |
              (static_cast<uint32_t>(window[4]) << 16) |
              (static_cast<uint32_t>(window[5]) << 8) | window[6];
      return true;
    }
  }
  return fault("TMC UART no verified reply");
}

bool EspActuatorIO::tmcWriteChecked(uint8_t reg, uint32_t value) {
  uint32_t before = 0, after = 0;
  if (!tmcRead(0x02, before)) return false;
  uint8_t packet[8] = {0x05, static_cast<uint8_t>(config_.uartAddress),
      static_cast<uint8_t>(reg | 0x80), static_cast<uint8_t>(value >> 24),
      static_cast<uint8_t>(value >> 16), static_cast<uint8_t>(value >> 8), static_cast<uint8_t>(value), 0};
  packet[7] = tmcCrc(packet, 7);
  if (!check(uart_flush_input(kUart), "TMC write flush")) return false;
  if (uart_tx_chars(kUart, reinterpret_cast<const char*>(packet), sizeof packet) != static_cast<int>(sizeof packet)) return fault("TMC write TX full");
  if (!check(uart_wait_tx_done(kUart, pdMS_TO_TICKS(20) + 1), "TMC write timeout") || !tmcRead(0x02, after)) return false;
  if (static_cast<uint8_t>(after) != static_cast<uint8_t>(before + 1)) return fault("TMC IFCNT did not acknowledge write");
  return true;
}

bool EspActuatorIO::finishSpi() {
  if (!spiPending_) return true;
  spi_transaction_t* completed = nullptr;
  const int64_t deadline = esp_timer_get_time() + kSpiTimeoutUs;
  do {
    const esp_err_t result = spi_device_get_trans_result(encoder_, &completed, 0);
    if (result == ESP_OK) {
      spiPending_ = false;
      gpio_set_level(gpio(config_.pins.spiCs), 1);
      esp_rom_delay_us(1);  // AS5047P tCSn >=350ns.
      if (completed != &spiTransaction_) return fault("SPI descriptor mismatch");
      return true;
    }
    if (result != ESP_ERR_TIMEOUT) return check(result, "encoder SPI completion");
  } while (esp_timer_get_time() < deadline);
  // Keep both the descriptor and installed device alive on timeout; release()
  // drains it before deletion/reconfigure. Never leave a queued stack descriptor.
  return fault("encoder SPI timeout");
}

bool EspActuatorIO::spiFrame(uint16_t command, uint16_t& response) {
  if (!encoder_ || spiPending_) return fault("encoder SPI unavailable");
  spiTransaction_ = {};
  spiTransaction_.flags = SPI_TRANS_USE_TXDATA | SPI_TRANS_USE_RXDATA;
  spiTransaction_.length = 16;
  spiTransaction_.tx_data[0] = static_cast<uint8_t>(command >> 8);
  spiTransaction_.tx_data[1] = static_cast<uint8_t>(command);
  if (!check(gpio_set_level(gpio(config_.pins.spiCs), 0), "encoder CS")) return false;
  esp_rom_delay_us(1);  // AS5047P tL >=350ns, independent of IRQ scheduling.
  const esp_err_t result = spi_device_queue_trans(encoder_, &spiTransaction_, 0);
  if (result != ESP_OK) {
    gpio_set_level(gpio(config_.pins.spiCs), 1);
    return check(result, "encoder SPI queue");
  }
  spiPending_ = true;
  if (!finishSpi()) return false;
  response = (static_cast<uint16_t>(spiTransaction_.rx_data[0]) << 8) | spiTransaction_.rx_data[1];
  return true;
}

bool EspActuatorIO::readEncoder(uint16_t& raw) {
  if (!configured_ || !(outputMask_ & kStepperOutput) || !encoder_ || error()[0]) {
    return fault("encoder not configured/healthy");
  }
  // AS5047P v2-00 figures11-15: mode1, MSB-first, even parity;
  // response belongs to the PREVIOUS command, separated by rising CS.
  // https://www.infineon.com/assets/row/public/documents/24/49/infineon-as5047p-datasheet-en.pdf
  uint16_t previous = 0, response = 0;
  if (!spiFrame(as5047ReadCommand(0x3fff), previous) ||
      !spiFrame(0x0000, response)) return false;  // NOP clocks out ANGLECOM.
  // First return is stale by design; the requested angle alone is authoritative.
  if (!as5047Decode(response, raw)) return fault("AS5047P parity/error flag");
  return true;
}

bool EspActuatorIO::servoPulse(uint8_t servo, int32_t microseconds) {
  if (!configured_ || error()[0]) return fault("PWM not configured/healthy");
  if (estopActive()) return fault("ESTOP");
  if (servo >= kServoCount || !(servoConfigured_ & (1u << servo))) {
    return fault("PWM output not configured");
  }
  if (microseconds < config_.servo[servo].minUs ||
      microseconds > config_.servo[servo].maxUs || microseconds <= 0 ||
      microseconds >= static_cast<int32_t>(kPwmPeriodUs)) return fault("PWM pulse outside calibrated window");
  const uint32_t duty = (static_cast<uint32_t>(microseconds) * (1u << 14) + kPwmPeriodUs / 2) / kPwmPeriodUs;
  if (!(servoActive_ & (1u << servo))) {
    // disableOutputs disconnects GPIO matrix. Reconnect at duty zero, never a
    // remembered pulse; write the requested pulse only after successful routing.
    if (!check(ledc_set_duty(kPwmMode, channel(servo), 0), "PWM reset duty") ||
        !check(ledc_update_duty(kPwmMode, channel(servo)), "PWM reset update") ||
        !check(ledc_set_pin(config_.pins.servo[servo], kPwmMode, channel(servo)), "PWM reconnect")) return false;
  }
  if (!check(ledc_set_duty(kPwmMode, channel(servo), duty), "PWM duty") ||
      !check(ledc_update_duty(kPwmMode, channel(servo)), "PWM update")) return false;
  servoActive_ |= 1u << servo;
  return true;
}

void EspActuatorIO::stepTarget(int32_t steps, float maximumStepsPerSecond) {
  if (!configured_ || !(outputMask_ & kStepperOutput) || !timerRunning_ ||
      !stepReady_ || !directionReady_ || !enableReady_ || error()[0]) {
    fault("stepper not configured/healthy"); return;
  }
  if (!std::isfinite(maximumStepsPerSecond) || maximumStepsPerSecond < 0 || maximumStepsPerSecond > 20000) {
    fault("step rate outside [0,20000]"); return;
  }
  if (estopActive()) { fault("ESTOP"); return; }
  const uint32_t increment = static_cast<uint32_t>(static_cast<double>(maximumStepsPerSecond) * StepPulse::kOne / StepPulse::kTickHz);
  if (maximumStepsPerSecond > 0 && !increment) { fault("step rate below timer resolution"); return; }
  portENTER_CRITICAL(&mux_);
  const bool enabled = pulse_.enabled;
  const bool zeroRateMove = !increment && steps != pulse_.position;
  if (enabled && !zeroRateMove) {
    pulse_.target = steps;
    pulse_.increment = increment;
    if (!increment) pulse_.phase = 0;
  }
  portEXIT_CRITICAL(&mux_);
  if (!enabled) fault("stepper target while disabled");
  else if (zeroRateMove) fault("zero rate for nonzero move");
}

int32_t EspActuatorIO::stepPosition() const {
  portENTER_CRITICAL(&mux_);
  const int32_t position = pulse_.position;
  portEXIT_CRITICAL(&mux_);
  return position;
}

void EspActuatorIO::zeroStepPosition() {
  portENTER_CRITICAL(&mux_);
  const bool enabled = pulse_.enabled;
  if (!enabled) { pulse_.position = 0; pulse_.target = 0; pulse_.phase = 0; }
  portEXIT_CRITICAL(&mux_);
  if (enabled) fault("zero requires disabled stepper");
}

void EspActuatorIO::enableStepper(bool enabled) {
  if (!enabled) {
    portENTER_CRITICAL(&mux_);
    if (enableReady_) gpio_ll_set_level(&GPIO, config_.pins.enable, 1);
    pulse_.cancel();
    if (stepReady_) gpio_ll_set_level(&GPIO, config_.pins.step, 0);
    portEXIT_CRITICAL(&mux_);
    return;
  }
  if (!configured_ || !(outputMask_ & kStepperOutput) || !timerRunning_ ||
      !stepReady_ || !directionReady_ || !enableReady_ || !encoder_ ||
      !uartInstalled_ || error()[0] || estopActive()) {
    fault("stepper enable denied"); return;
  }
  portENTER_CRITICAL(&mux_);
  // Check the live input under the edge lock too; the ISR handles later changes.
  if (!estopTripped_ && gpio_ll_get_level(&GPIO, config_.pins.estop) != config_.pins.estopActiveLevel) {
    if (!pulse_.enabled) {
      pulse_.target = pulse_.position;
      pulse_.phase = 0;
      pulse_.increment = 0;
      pulse_.lastDirectionUs = esp_timer_get_time();
      pulse_.enabled = true;
      gpio_ll_set_level(&GPIO, config_.pins.enable, 0);
    }
  }
  const bool didEnable = pulse_.enabled;
  portEXIT_CRITICAL(&mux_);
  if (!didEnable) fault("stepper enable interrupted by ESTOP");
}

bool EspActuatorIO::estopActive() const {
  return !estopReady_ || gpio_get_level(gpio(config_.pins.estop)) == config_.pins.estopActiveLevel;
}

bool IRAM_ATTR EspActuatorIO::alarm(gptimer_handle_t, const gptimer_alarm_event_data_t*, void* context) {
  auto* self = static_cast<EspActuatorIO*>(context);
  portENTER_CRITICAL_ISR(&self->mux_);
  const Pins& pins = self->config_.pins;
  if (gpio_ll_get_level(&GPIO, pins.estop) == pins.estopActiveLevel) {
    self->estopTripped_ = true;
    gpio_ll_set_level(&GPIO, pins.enable, 1);
    self->pulse_.cancel();
    gpio_ll_set_level(&GPIO, pins.step, 0);
  } else {
    const uint8_t edge = self->pulse_.tick(esp_timer_get_time());
    if (edge & StepPulse::Rise) gpio_ll_set_level(&GPIO, pins.step, 1);
    if (edge & StepPulse::Fall) gpio_ll_set_level(&GPIO, pins.step, 0);
    if (edge & StepPulse::DirHigh) gpio_ll_set_level(&GPIO, pins.direction, 1);
    if (edge & StepPulse::DirLow) gpio_ll_set_level(&GPIO, pins.direction, 0);
  }
  portEXIT_CRITICAL_ISR(&self->mux_);
  return false;
}

}  // namespace actuators
