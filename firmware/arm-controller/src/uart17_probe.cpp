// Real actuator-setup diagnostic. Driver disconnected, actuator supplies OFF.
#include "board_config.h"
#include "esp_actuator_io.h"
#include "serial_transport.h"

#include <atomic>
#include <stdio.h>

#include "driver/gpio.h"
#include "esp_err.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "soc/gpio_sig_map.h"
#include "soc/gpio_struct.h"

namespace {
std::atomic<uint32_t> txEdges{0};
static_assert(std::atomic<uint32_t>::is_always_lock_free);
void txEdge(void*) { txEdges.fetch_add(1, std::memory_order_relaxed); }
}

extern "C" void app_main() {
  actuators::Config board = actuators::boardConfig();
  ESP_ERROR_CHECK(gpio_set_level(static_cast<gpio_num_t>(board.pins.enable), 1));
  uint64_t disabledPins = 1ULL << board.pins.enable;
  for (int32_t pin : board.pins.servo) {
    ESP_ERROR_CHECK(gpio_set_level(static_cast<gpio_num_t>(pin), 0));
    disabledPins |= 1ULL << pin;
  }
  ESP_ERROR_CHECK(gpio_set_level(static_cast<gpio_num_t>(board.pins.step), 0));
  ESP_ERROR_CHECK(gpio_set_level(static_cast<gpio_num_t>(board.pins.direction), 0));
  disabledPins |= (1ULL << board.pins.step) | (1ULL << board.pins.direction);
  gpio_config_t outputs{};
  outputs.pin_bit_mask = disabledPins;
  outputs.mode = GPIO_MODE_OUTPUT;
  ESP_ERROR_CHECK(gpio_config(&outputs));

  SerialTransport serial;
  serial.begin();

  const auto tx = static_cast<gpio_num_t>(board.pins.uartTx);
  ESP_ERROR_CHECK(gpio_input_enable(tx));
  ESP_ERROR_CHECK(gpio_set_intr_type(tx, GPIO_INTR_ANYEDGE));
  ESP_ERROR_CHECK(gpio_install_isr_service(0));
  ESP_ERROR_CHECK(gpio_isr_handler_add(tx, txEdge, nullptr));
  ESP_ERROR_CHECK(gpio_intr_disable(tx));

  // Provisional bench values only; no saved calibration is loaded or written.
  // configure() keeps EN disabled, even if a driver happens to answer.
  board.motorStepsPerRev = 200;
  board.currentMa = 100;
  board.senseResistorOhm = 0.11f;
  actuators::EspActuatorIO hardware;
  for (;;) {
    txEdges.store(0, std::memory_order_relaxed);
    ESP_ERROR_CHECK(gpio_intr_enable(tx));
    const bool configured = hardware.configure(board, actuators::kStepperOutput);
    hardware.disableOutputs();
    ESP_ERROR_CHECK(gpio_intr_disable(tx));
    const uint32_t edges = txEdges.load(std::memory_order_relaxed);
    ESP_ERROR_CHECK(gpio_input_enable(static_cast<gpio_num_t>(board.pins.enable)));
    char line[192];
    const int n = snprintf(line, sizeof line,
        "# TMC setup probe: configured=%d edges=%lu EN=%d route=%u expected=%u error=%s\n",
        configured ? 1 : 0, static_cast<unsigned long>(edges),
        gpio_get_level(static_cast<gpio_num_t>(board.pins.enable)),
        static_cast<unsigned>(GPIO.func_out_sel_cfg[board.pins.uartTx].func_sel),
        static_cast<unsigned>(U1TXD_OUT_IDX), hardware.error());
    if (n > 0 && static_cast<size_t>(n) < sizeof line) serial.write(line, n);
    serial.flush();
    vTaskDelay(pdMS_TO_TICKS(1000));
  }
}
