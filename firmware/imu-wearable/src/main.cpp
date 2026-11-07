// IMU wearable: two BNO085s (forearm, hand) → WebSocket server on :81, ~100 Hz.
// Message (canonical shape in packages/protocol ImuMsg):
//   {"t":"imu","seq":N,"forearm":[x,y,z,w],"hand":[x,y,z,w]}
// Uses the GAME rotation vector (no magnetometer): servos distort magnetic readings.
// Quaternions are in each sensor's own frame; the Quest maps them to WebXR.
#include <Adafruit_BNO08x.h>
#include <WebSocketsServer.h>
#include <WiFi.h>
#include <Wire.h>

#if __has_include("secrets.h")
#include "secrets.h"
#else
#error "Copy include/secrets.example.h to include/secrets.h and set WIFI_SSID / WIFI_PASS"
#endif

namespace {

// TODO(open-item): I2C pins for the wearable board.
constexpr int kSdaPin = 8;
constexpr int kSclPin = 9;
constexpr uint8_t kForearmAddr = 0x4A;
constexpr uint8_t kHandAddr = 0x4B;  // second BNO085 with its address pin pulled high
constexpr uint32_t kReportIntervalUs = 10000;  // 100 Hz
constexpr uint32_t kSendIntervalMs = 10;

struct Imu {
  const char* name;
  uint8_t addr;
  Adafruit_BNO08x bno{-1};
  float q[4] = {0, 0, 0, 1};  // [x, y, z, w]
  bool ok = false;
};

Imu forearm{"forearm", kForearmAddr};
Imu hand{"hand", kHandAddr};
WebSocketsServer ws(81);
uint32_t seq = 0;
uint32_t lastSendMs = 0;
char msg[192];

bool startImu(Imu& imu) {
  if (!imu.bno.begin_I2C(imu.addr, &Wire)) {
    Serial.printf("BNO085 %s not found at 0x%02X\n", imu.name, imu.addr);
    return false;
  }
  if (!imu.bno.enableReport(SH2_GAME_ROTATION_VECTOR, kReportIntervalUs)) {
    Serial.printf("BNO085 %s: could not enable game rotation vector\n", imu.name);
    return false;
  }
  return true;
}

void pollImu(Imu& imu) {
  if (!imu.ok) return;
  if (imu.bno.wasReset()) imu.ok = startImu(imu);  // reports are lost on sensor reset
  sh2_SensorValue_t v;
  while (imu.ok && imu.bno.getSensorEvent(&v)) {
    if (v.sensorId != SH2_GAME_ROTATION_VECTOR) continue;
    imu.q[0] = v.un.gameRotationVector.i;
    imu.q[1] = v.un.gameRotationVector.j;
    imu.q[2] = v.un.gameRotationVector.k;
    imu.q[3] = v.un.gameRotationVector.real;
  }
}

}  // namespace

void setup() {
  Serial.begin(115200);
  Wire.begin(kSdaPin, kSclPin);
  Wire.setClock(400000);
  forearm.ok = startImu(forearm);
  hand.ok = startImu(hand);

  WiFi.mode(WIFI_STA);
  WiFi.setSleep(false);  // modem sleep adds 100+ ms of latency
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED) {
    delay(250);
    Serial.print('.');
  }
  Serial.printf("\nIMU wearable at ws://%s:81\n", WiFi.localIP().toString().c_str());
  ws.begin();
}

void loop() {
  ws.loop();
  pollImu(forearm);
  pollImu(hand);

  const uint32_t now = millis();
  if (now - lastSendMs < kSendIntervalMs) return;
  lastSendMs = now;
  // TODO: if a sensor isn't ok, its quaternion is stale/identity. Add a validity flag to ImuMsg
  // in packages/protocol (the canonical shape) before relying on the fallback.
  const int n = snprintf(msg, sizeof msg,
                         "{\"t\":\"imu\",\"seq\":%lu,\"forearm\":[%.4f,%.4f,%.4f,%.4f],\"hand\":[%.4f,%.4f,%.4f,%.4f]}",
                         static_cast<unsigned long>(seq++), forearm.q[0], forearm.q[1], forearm.q[2], forearm.q[3],
                         hand.q[0], hand.q[1], hand.q[2], hand.q[3]);
  if (n > 0 && static_cast<size_t>(n) < sizeof msg) ws.broadcastTXT(msg, n);
}
