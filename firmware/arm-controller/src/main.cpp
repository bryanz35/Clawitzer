// ESP-IDF composition root. Hardware remains disabled until calibration + manual reference.
#include <stdio.h>
#include <string.h>

#include "esp_timer.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"

#include "arm.h"
#include "calibration_session.h"
#include "calibration_store.h"
#include "esp_actuator_io.h"
#include "serial_controller.h"
#include "serial_transport.h"

#ifndef DEBUG
#define DEBUG 0
#endif

namespace {
constexpr uint64_t kTickUs = 10000;
constexpr uint32_t kStatusEveryTicks = 10;
constexpr uint32_t kCameraHeartbeatTicks = 100;  // 1 Hz V line
constexpr int kMaxBytesPerLoop = 256;
SerialTransport serial;
actuators::EspActuatorIO hardware;
actuators::NvsCalibrationStore storage;

void onStateChange(ArmState from, ArmState to) {
#if DEBUG
  char line[96];
  const int n = snprintf(line, sizeof line, "# state %s -> %s\n", armStateName(from), armStateName(to));
  if (n > 0 && static_cast<size_t>(n) < sizeof line) serial.write(line, static_cast<size_t>(n));
#else
  (void)from;
  (void)to;
#endif
}

Arm arm(onStateChange);
CalibrationSession session(arm, hardware, storage);
SerialController controller(arm, &session);
uint32_t millisNow() { return static_cast<uint32_t>(esp_timer_get_time() / 1000); }

void pollSerial(uint32_t nowMs) {
  // A calibration ACK is never discarded to make room for another command or status line.
  if (session.hasReply()) return;
  for (int budget = kMaxBytesPerLoop; budget > 0; --budget) {
    const int byte = serial.readChar();
    if (byte < 0) break;
    const auto result = controller.feed(static_cast<char>(byte), nowMs);
    if (session.hasReply()) break;
#if DEBUG
    const char* diagnostic = nullptr;
    switch (result) {
      case SerialController::Result::Ignored: diagnostic = "# command ignored: safety interlock\n"; break;
      case SerialController::Result::BadCrc: diagnostic = "# dropped line: bad crc\n"; break;
      case SerialController::Result::Malformed: diagnostic = "# dropped line: malformed\n"; break;
      default: break;
    }
    if (diagnostic) serial.write(diagnostic, strlen(diagnostic));
#else
    (void)result;
#endif
  }
}
}

extern "C" void app_main() {
  serial.begin();
  if (!hardware.configureCamera(actuators::boardConfig())) {
    constexpr char failure[] = "# camera servo unavailable; arm control continues\n";
    serial.write(failure, sizeof failure - 1);
  }
  if (!storage.begin()) {
    constexpr char failure[] = "# NVS unavailable; outputs remain disabled until calibration can be saved\n";
    serial.write(failure, sizeof failure - 1);
  }
  session.begin(millisNow());
  uint64_t lastTickUs = static_cast<uint64_t>(esp_timer_get_time());
  uint32_t tickCount = 0;
  bool statusDue = false;
  char status[proto::kMaxLineLen + 8];
  for (;;) {
    serial.flush();
    if (!session.hasReply() && session.cameraStatusPending()) {
      const size_t camera = controller.formatCameraStatus(status, sizeof status);
      if (camera > 0 && serial.write(status, camera)) session.consumeCameraStatus();
    }
    const uint32_t nowMs = millisNow();
    pollSerial(nowMs);
    if (session.hasReply() && serial.write(session.reply(), session.replyLength())) session.consumeReply();
    const uint64_t nowUs = static_cast<uint64_t>(esp_timer_get_time());
    if (nowUs - lastTickUs >= kTickUs) {
      lastTickUs += kTickUs;
      if (nowUs - lastTickUs > 5 * kTickUs) lastTickUs = nowUs;
      session.tick(millisNow(), kTickUs / 1e6f);
      if (++tickCount % kStatusEveryTicks == 0) statusDue = true;
      if (tickCount % kCameraHeartbeatTicks == 0) session.requestCameraStatus();
    }
    // Deferred, not dropped, while a reply or camera line holds the transport.
    if (statusDue && !session.hasReply()) {
      const size_t n = controller.formatStatus(status, sizeof status);
      if (n == 0 || serial.write(status, n)) statusDue = false;
    }
    vTaskDelay(1);
  }
}
