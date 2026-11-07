#pragma once

#include <stddef.h>

// Single-task UART0 transport through the NodeMCU-32S onboard USB/UART bridge.
// GPIO1 TX / GPIO3 RX, 115200 baud, 8N1; no native USB on classic ESP32.
// Disable the application console; all status/debug output must use this owner.
class SerialTransport {
 public:
  void begin();
  int readChar();
  // Accept exactly one newline-terminated line, or skip it in full when busy.
  // Success means queued locally, not received by the host.
  bool write(const char* data, size_t length);
  // Never waits for host readiness; preserves any unsent suffix for the next call.
  void flush();

 private:
  static constexpr size_t kTxCapacity = 256;
  char pending_[kTxCapacity] = {};
  size_t pendingLength_ = 0;
  size_t pendingOffset_ = 0;
};
