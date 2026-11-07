#include "serial_transport.h"

#include <cstring>

#include "driver/uart.h"
#include "esp_err.h"

namespace {
constexpr uart_port_t kUart = UART_NUM_0;
}

void SerialTransport::begin() {
  uart_config_t config{};
  config.baud_rate = 115200;
  config.data_bits = UART_DATA_8_BITS;
  config.parity = UART_PARITY_DISABLE;
  config.stop_bits = UART_STOP_BITS_1;
  config.flow_ctrl = UART_HW_FLOWCTRL_DISABLE;
  config.source_clk = UART_SCLK_DEFAULT;
  ESP_ERROR_CHECK(uart_param_config(kUart, &config));
  ESP_ERROR_CHECK(uart_set_pin(kUart, 1, 3, UART_PIN_NO_CHANGE, UART_PIN_NO_CHANGE));
  // Allocate only the RX ring once. A zero-size TX ring permits nonblocking
  // uart_tx_chars; the fixed local line buffer owns all pending output.
  ESP_ERROR_CHECK(uart_driver_install(kUart, 512, 0, 0, nullptr, 0));
}

int SerialTransport::readChar() {
  unsigned char byte = 0;
  const int count = uart_read_bytes(kUart, &byte, 1, 0);
  ESP_ERROR_CHECK(count == 0 || count == 1 ? ESP_OK : ESP_FAIL);
  return count == 1 ? static_cast<int>(byte) : -1;
}

bool SerialTransport::write(const char* data, size_t length) {
  if (pendingLength_ != 0 || data == nullptr || length == 0 ||
      length > kTxCapacity || data[length - 1] != '\n') {
    return false;
  }
  // Reject batches and incomplete lines: a skipped write must not truncate a frame.
  if (std::memchr(data, '\n', length - 1) != nullptr) return false;
  std::memcpy(pending_, data, length);
  pendingLength_ = length;
  pendingOffset_ = 0;
  return true;
}

void SerialTransport::flush() {
  if (pendingLength_ == 0) return;

  const size_t remaining = pendingLength_ - pendingOffset_;
  const int count = uart_tx_chars(kUart, pending_ + pendingOffset_, remaining);
  // A full hardware FIFO is backpressure (zero), not an error.
  ESP_ERROR_CHECK(count >= 0 && static_cast<size_t>(count) <= remaining ? ESP_OK : ESP_FAIL);
  pendingOffset_ += static_cast<size_t>(count);
  if (pendingOffset_ == pendingLength_) {
    pendingLength_ = 0;
    pendingOffset_ = 0;
  }
  // Never discard an unsent suffix. Subsequent lines are skipped until it drains
  // into the UART FIFO, so messages cannot be interleaved. A USB bridge cannot
  // report host readiness; queued UART bytes do not imply host delivery.
}
