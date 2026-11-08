#include <stdio.h>
#include <string.h>
#include <unity.h>

#include "calibration_session.h"
#include "serial_controller.h"
#include "../support/calibrated_config.h"

using namespace actuators;

class BenchIO final : public IO {
 public:
  bool configured = false, stopped = true, estop = false, encoderOk = true;
  bool enabled = false, stepperOk = true, ioFault = false;
  bool stepDuringRead = false;
  unsigned configureCalls = 0, encoderReads = 0;
  mutable unsigned stepPositionReads = 0;
  uint8_t configuredMask = 0;
  Config configuredConfig;
  uint16_t raw = 100;
  int32_t position = 0, target = 0;
  uint8_t servoMask = 0;
  int32_t pulse[4] = {};
  bool cameraOn = false;
  float cameraDeg = -1;
  bool configure(const Config& config, uint8_t outputMask) override {
    disableOutputs();
    ++configureCalls;
    configuredMask = outputMask;
    configuredConfig = config;
    ioFault = (outputMask & kStepperOutput) && !stepperOk;
    configured = !ioFault;
    return configured;
  }
  const char* faultText = "bench_fault";
  const char* error() const override { return ioFault ? faultText : ""; }
  bool readEncoder(uint16_t& value) override {
    ++encoderReads;
    if (!(configuredMask & kStepperOutput) || !encoderOk) { ioFault = true; return false; }
    value = raw;
    if (stepDuringRead) ++position;
    return true;
  }
  bool servoPulse(uint8_t index, int32_t value) override {
    if (!(configuredMask & (1u << index))) { ioFault = true; return false; }
    stopped = false; servoMask |= 1u << index; pulse[index] = value; return true;
  }
  float rate = 0;
  void stepTarget(int32_t value, float stepsPerSecond) override { target = value; rate = stepsPerSecond; }
  int32_t stepPosition() const override { ++stepPositionReads; return position; }
  void zeroStepPosition() override { position = target = 0; }
  void enableStepper(bool value) override { enabled = value; stopped = !value && !servoMask; }
  bool cameraPulse(float deg) override {
    if (estop) return false;
    cameraOn = true;
    cameraDeg = deg;
    return true;
  }
  bool cameraActive() const override { return cameraOn; }
  bool estopActive() const override { return estop; }
  void disableOutputs() override {
    enabled = false;
    servoMask = 0;
    cameraOn = false;
    target = position;
    stopped = true;
  }
};

class MemoryStore final : public Store {
 public:
  Config saved = testsupport::calibrated();
  bool present = true;
  int saves = 0;
  bool load(Config& config) override { if (!present) return false; config = saved; return true; }
  bool save(const Config& config) override { saved = config; present = true; ++saves; return true; }
};

void setUp() {}
void tearDown() {}

static bool command(CalibrationSession& session, uint16_t seq, const char* body, uint32_t nowMs,
                    const char* expectedFields = nullptr) {
  char payload[192], line[200];
  const int length = snprintf(payload, sizeof payload, ",%u,%s", static_cast<unsigned>(seq), body);
  snprintf(line, sizeof line, "C%s*%02X", payload, proto::crc8(reinterpret_cast<const uint8_t*>(payload), length));
  TEST_ASSERT_TRUE(session.execute(line, strlen(line), nowMs));
  char prefix[32];
  snprintf(prefix, sizeof prefix, "K,%u,OK", static_cast<unsigned>(seq));
  const bool ok = strncmp(session.reply(), prefix, strlen(prefix)) == 0;
  if (expectedFields) TEST_ASSERT_NOT_NULL(strstr(session.reply(), expectedFields));
  session.consumeReply();
  return ok;
}

static SerialController::Result joints(SerialController& serial, uint32_t nowMs) {
  const char* line = "J,42,10.0,-20.5,0.0,45.0,-45.0*F6\n";
  SerialController::Result result = SerialController::Result::Incomplete;
  while (*line) result = serial.feed(*line++, nowMs);
  return result;
}

static SerialController::Result cameraCommand(SerialController& serial, uint16_t seq, const char* deg,
                                              uint32_t nowMs) {
  char payload[64], line[80];
  const int length = snprintf(payload, sizeof payload, ",%u,%s", static_cast<unsigned>(seq), deg);
  snprintf(line, sizeof line, "P%s*%02X\n", payload,
           proto::crc8(reinterpret_cast<const uint8_t*>(payload), length));
  SerialController::Result result = SerialController::Result::Incomplete;
  for (const char* p = line; *p; p++) result = serial.feed(*p, nowMs);
  return result;
}

void test_guarded_auto_reference_needs_the_recorded_home_angle() {
  Config recorded = boardConfig();
  recorded.homeRaw = 1234;

  Arm matchedArm; BenchIO matchedIO; MemoryStore matchedStore;
  matchedStore.saved = recorded;
  matchedIO.raw = 1234;
  CalibrationSession matched(matchedArm, matchedIO, matchedStore);
  matched.begin(0);
  TEST_ASSERT_TRUE(matched.normalReady());
  // The encoder and step zero are taken at park, so the arm must start there too.
  TEST_ASSERT_EQUAL_FLOAT(ARM_PARK_DEG[ElbowPitch], matchedArm.positionDeg()[ElbowPitch]);

  // Powered down, then stopped somewhere else: the guard must refuse to assume home.
  Arm movedArm; BenchIO movedIO; MemoryStore movedStore;
  movedStore.saved = recorded;
  movedIO.raw = static_cast<uint16_t>(1234 + 2000);
  CalibrationSession moved(movedArm, movedIO, movedStore);
  moved.begin(0);
  TEST_ASSERT_FALSE(moved.normalReady());
  TEST_ASSERT_TRUE(movedIO.stopped);
}

void test_reference_records_home_angle_for_the_next_boot() {
  Arm arm; BenchIO io; MemoryStore store; store.present = false;
  io.raw = 4321;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_FALSE(session.normalReady());
  TEST_ASSERT_TRUE(command(session, 1, "reference,HOME_MARK_CONFIRMED", 10));
  TEST_ASSERT_TRUE(session.normalReady());
  TEST_ASSERT_EQUAL_INT(4321, store.saved.homeRaw);

  // Same shaft angle at the next boot is enough: no console or panel needed.
  Arm rebootArm; BenchIO rebootIO;
  rebootIO.raw = 4321;
  CalibrationSession reboot(rebootArm, rebootIO, store);
  reboot.begin(20);
  TEST_ASSERT_TRUE(reboot.normalReady());
}

void test_camera_is_independent_and_still_obeys_estop() {
  Arm arm; BenchIO io; MemoryStore store; store.present = false;
  CalibrationSession session(arm, io, store); SerialController serial(arm, &session);
  session.begin(0);

  TEST_ASSERT_EQUAL(SerialController::Result::Accepted, cameraCommand(serial, 1, "0.0", 10));
  TEST_ASSERT_TRUE(io.cameraActive());
  TEST_ASSERT_EQUAL_FLOAT(0.0f, io.cameraDeg);
  TEST_ASSERT_FALSE(session.normalReady());

  TEST_ASSERT_EQUAL(SerialController::Result::Ignored, cameraCommand(serial, 1, "90.0", 20));
  TEST_ASSERT_EQUAL(SerialController::Result::Malformed, cameraCommand(serial, 2, "181.0", 30));
  TEST_ASSERT_EQUAL_FLOAT(0.0f, io.cameraDeg);

  io.estop = true;
  TEST_ASSERT_EQUAL(SerialController::Result::Ignored, cameraCommand(serial, 2, "90.0", 40));
  io.estop = false;
  TEST_ASSERT_EQUAL(SerialController::Result::Accepted, cameraCommand(serial, 2, "180.0", 50));
  TEST_ASSERT_EQUAL_FLOAT(180.0f, io.cameraDeg);

  TEST_ASSERT_TRUE(command(session, 3, "enter,UNLOADED_ESTOP_READY", 60));
  TEST_ASSERT_FALSE(io.cameraActive());
}

void test_fresh_boot_needs_only_marked_reference() {
  Arm arm; BenchIO io; MemoryStore store; store.present = false;
  CalibrationSession session(arm, io, store); SerialController serial(arm, &session);
  session.begin(0);
  session.tick(100, 0.01f);
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_FALSE(io.configured);  // Boot never drives outputs.
  TEST_ASSERT_EQUAL(SerialController::Result::Ignored, joints(serial, 100));
  TEST_ASSERT_EQUAL_UINT16(0, arm.lastSeq());
  TEST_ASSERT_FALSE(command(session, 1, "enter,yes", 100));
  TEST_ASSERT_FALSE(session.calibrating());
  // Shipped measured defaults are already a valid calibration, so a fresh board needs the
  // marked-home reference and nothing else.
  TEST_ASSERT_TRUE(command(session, 2, "reference,HOME_MARK_CONFIRMED", 110));
  TEST_ASSERT_TRUE(session.normalReady());
}

void test_bench_jogs_are_exclusive_bounded_and_lease_protected() {
  Arm arm; BenchIO io; MemoryStore store;
  CalibrationSession session(arm, io, store); SerialController serial(arm, &session);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 10));
  TEST_ASSERT_TRUE(command(session, 2, "apply", 20));
  TEST_ASSERT_TRUE(command(session, 3, "arm,wrist", 30));
  TEST_ASSERT_EQUAL_UINT8((1U << WristA) | (1U << WristB), io.servoMask);
  TEST_ASSERT_FALSE(io.enabled);
  TEST_ASSERT_TRUE(command(session, 4, "jog,1,5", 40));
  TEST_ASSERT_EQUAL_INT32(1505, io.pulse[WristA]);
  TEST_ASSERT_EQUAL_INT32(1500, io.pulse[WristB]);
  TEST_ASSERT_FALSE(command(session, 5, "jog,1,2001", 50));
  TEST_ASSERT_FALSE(command(session, 6, "jog,0,5", 60));
  TEST_ASSERT_FALSE(command(session, 7, "set,base,1500,7", 70));
  TEST_ASSERT_EQUAL(SerialController::Result::Ignored, joints(serial, 80));
  TEST_ASSERT_TRUE(command(session, 8, "keep", 100));
  TEST_ASSERT_FALSE(command(session, 8, "jog,1,5", 290));
  session.tick(300, 0.01f);
  TEST_ASSERT_FALSE(io.stopped);
  session.tick(310, 0.01f);
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_EQUAL(ArmState::Estop, arm.state());
  TEST_ASSERT_TRUE(command(session, 9, "keep", 320));
  TEST_ASSERT_TRUE(io.stopped);  // A keepalive cannot re-arm an expired lease.
  TEST_ASSERT_FALSE(command(session, 10, "jog,1,5", 330));
  TEST_ASSERT_EQUAL_INT32(1505, io.pulse[WristA]);
  TEST_ASSERT_TRUE(command(session, 11, "arm,base", 340));
  TEST_ASSERT_EQUAL_UINT8(1U << Base, io.servoMask);
  TEST_ASSERT_TRUE(command(session, 12, "sample", 350,
      "OK,raw,NA,counts,NA,steps,NA,pulse0,1500,pulse1,1505,pulse2,1500,pulse3,0"));
}

void test_arbitrary_jog_amounts_stay_inside_the_hard_window() {
  Arm arm; BenchIO io; MemoryStore store;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 10));
  TEST_ASSERT_TRUE(command(session, 2, "arm,wrist", 20));
  TEST_ASSERT_TRUE(command(session, 3, "jog,1,100", 30));
  TEST_ASSERT_EQUAL_INT32(1600, io.pulse[WristA]);
  TEST_ASSERT_TRUE(command(session, 4, "jog,2,-250", 50));
  TEST_ASSERT_EQUAL_INT32(1250, io.pulse[WristB]);
  TEST_ASSERT_TRUE(command(session, 5, "jog,1,-100", 70));
  TEST_ASSERT_EQUAL_INT32(1500, io.pulse[WristA]);
  TEST_ASSERT_FALSE(command(session, 6, "jog,1,1001", 90));   // 2501us exceeds the hard window.
  TEST_ASSERT_EQUAL_INT32(1500, io.pulse[WristA]);
  TEST_ASSERT_FALSE(command(session, 7, "jog,1,-1001", 110)); // 499us exceeds the hard window.
  TEST_ASSERT_TRUE(command(session, 8, "jog,1,-1000", 130));
  TEST_ASSERT_EQUAL_INT32(500, io.pulse[WristA]);
  TEST_ASSERT_TRUE(command(session, 9, "jog,1,2000", 150));
  TEST_ASSERT_EQUAL_INT32(2500, io.pulse[WristA]);
  TEST_ASSERT_FALSE(command(session, 10, "jog,1,1", 170));
  TEST_ASSERT_EQUAL_INT32(2500, io.pulse[WristA]);
}

void test_pose_moves_armed_channels_atomically() {
  Arm arm; BenchIO io; MemoryStore store;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 10));
  TEST_ASSERT_TRUE(command(session, 2, "arm,wrist", 20));
  TEST_ASSERT_TRUE(command(session, 3, "pose,1,1600,2,1400", 30));
  TEST_ASSERT_EQUAL_INT32(1600, io.pulse[WristA]);
  TEST_ASSERT_EQUAL_INT32(1400, io.pulse[WristB]);
  // One out-of-window pulse rejects the whole pose: the valid first channel must not move.
  TEST_ASSERT_FALSE(command(session, 4, "pose,1,1700,2,2600", 50));
  TEST_ASSERT_EQUAL_INT32(1600, io.pulse[WristA]);
  TEST_ASSERT_EQUAL_INT32(1400, io.pulse[WristB]);
  TEST_ASSERT_FALSE(command(session, 5, "pose,1,1600,1,1500", 70));
  TEST_ASSERT_FALSE(command(session, 6, "pose,3,1500", 90));
  TEST_ASSERT_TRUE(command(session, 7, "pose,1,1500,2,1500", 110));
  TEST_ASSERT_EQUAL_INT32(1500, io.pulse[WristA]);
  TEST_ASSERT_EQUAL_INT32(1500, io.pulse[WristB]);
}

void test_step_jogs_cannot_overlap_and_timeout_cancels_pending_motion() {
  Arm arm; BenchIO io; MemoryStore store;
  store.saved.microsteps = 16;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 10));
  TEST_ASSERT_TRUE(command(session, 2, "apply", 20));
  TEST_ASSERT_TRUE(command(session, 3, "arm,stepper", 30));
  TEST_ASSERT_TRUE(command(session, 4, "step,1000", 40));
  TEST_ASSERT_EQUAL_INT32(1000, io.target);
  TEST_ASSERT_FALSE(command(session, 5, "step,1", 50, "ERR,step_busy"));
  TEST_ASSERT_EQUAL_INT32(1000, io.target);
  TEST_ASSERT_FALSE(command(session, 6, "step,1001", 60, "ERR,step_busy"));
  session.tick(250, 0.01f);
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_EQUAL_INT32(io.position, io.target);
}

void test_step_jogs_are_bounded_by_elbow_range_and_reject_invalid_and_overflowing_counts() {
  Arm arm; BenchIO io; MemoryStore store;
  store.saved.microsteps = 4;  // 200 * 4 * 17 / 360 = 37.8 microsteps/deg; 110 deg range = 4155 microsteps.
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 10));
  TEST_ASSERT_TRUE(command(session, 2, "arm,stepper", 20));
  TEST_ASSERT_FALSE(command(session, 3, "step,0", 30, "ERR,step_bounds"));
  TEST_ASSERT_FALSE(command(session, 4, "step,1.5", 40, "ERR,step_bounds"));
  TEST_ASSERT_FALSE(command(session, 5, "step,2147483648", 50, "ERR,step_bounds"));
  TEST_ASSERT_FALSE(command(session, 6, "step,-2147483649", 60, "ERR,step_bounds"));
  TEST_ASSERT_FALSE(command(session, 7, "step,4156", 70, "ERR,step_bounds"));
  TEST_ASSERT_FALSE(command(session, 8, "step,-100000", 80, "ERR,step_bounds"));
  TEST_ASSERT_EQUAL_INT32(0, io.target);
  TEST_ASSERT_TRUE(command(session, 9, "step,4155", 90));
  TEST_ASSERT_EQUAL_INT32(4155, io.target);
  // Rate is a fixed motor speed: 62.5 full steps/s at 1/4 microstepping.
  TEST_ASSERT_EQUAL_FLOAT(250.0f, io.rate);
  io.position = io.target;
  TEST_ASSERT_TRUE(command(session, 10, "step,-4000", 100));
  TEST_ASSERT_EQUAL_INT32(155, io.target);
  // Re-arm with the counter near each int32 end: a bounded jog must still not overflow it.
  io.position = 2147483647 - 100;
  TEST_ASSERT_TRUE(command(session, 11, "arm,stepper", 110));
  TEST_ASSERT_FALSE(command(session, 12, "step,4000", 120, "ERR,step_overflow"));
  io.position = -2147483647 - 1 + 100;
  TEST_ASSERT_TRUE(command(session, 13, "arm,stepper", 130));
  TEST_ASSERT_FALSE(command(session, 14, "step,-4000", 140, "ERR,step_overflow"));
  TEST_ASSERT_EQUAL_INT32(io.position, io.target);
}

void test_long_step_requires_keepalives_and_estop_still_disables_it() {
  Arm arm; BenchIO io; MemoryStore store;
  store.saved.microsteps = 4;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 10));
  TEST_ASSERT_TRUE(command(session, 2, "arm,stepper", 20));
  TEST_ASSERT_TRUE(command(session, 3, "step,4000", 30));
  uint16_t seq = 4;
  for (uint32_t now = 130; now <= 5030; now += 100) {
    TEST_ASSERT_TRUE(command(session, seq++, "keep", now));
    session.tick(now, 0.01f);
    TEST_ASSERT_TRUE(io.enabled);
    TEST_ASSERT_EQUAL_INT32(4000, io.target);
  }
  io.estop = true;
  session.tick(5040, 0.01f);
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_FALSE(io.enabled);
  TEST_ASSERT_EQUAL_INT32(io.position, io.target);
}

void test_held_estop_faults_once_instead_of_every_tick() {
  Arm arm; BenchIO io; MemoryStore store;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "reference,HOME_MARK_CONFIRMED", 10));
  session.tick(20, 0.01f);
  io.estop = true;
  session.tick(30, 0.01f);
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_EQUAL(ArmState::Estop, arm.state());
  session.consumeCameraStatus();
  for (uint32_t now = 40; now <= 200; now += 10) session.tick(now, 0.01f);
  TEST_ASSERT_FALSE(session.cameraStatusPending());  // No V line per tick while the e-stop is held.
  TEST_ASSERT_TRUE(io.stopped);
}

void test_save_is_validated_atomic_and_gear_is_persistent_not_fixed() {
  Arm arm; BenchIO io; MemoryStore store;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 10));
  TEST_ASSERT_TRUE(command(session, 2, "set,wrist,1500,0,0,1500,0,0", 20));
  TEST_ASSERT_FALSE(command(session, 3, "save", 30));
  TEST_ASSERT_EQUAL_INT(0, store.saves);
  TEST_ASSERT_EQUAL_FLOAT(2, store.saved.wristRollUsPerDeg[0]);
  TEST_ASSERT_TRUE(command(session, 4, "set,wrist,1500,2,2,1500,-2,2", 40));
  TEST_ASSERT_TRUE(command(session, 5, "set,stepper,200,8,19,-1,-1,600,0.11", 50));
  TEST_ASSERT_TRUE(command(session, 6, "save", 60));
  TEST_ASSERT_EQUAL_INT(1, store.saves);
  TEST_ASSERT_EQUAL_FLOAT(19, store.saved.gearRatio);
  TEST_ASSERT_TRUE(command(session, 7, "exit", 70));
  TEST_ASSERT_FALSE(session.normalReady());
  TEST_ASSERT_TRUE(io.stopped);
  Arm rebootArm; BenchIO rebootIO;
  CalibrationSession reboot(rebootArm, rebootIO, store);
  reboot.begin(80);
  TEST_ASSERT_FALSE(rebootIO.configured);  // Boot never probes motor hardware.
  TEST_ASSERT_TRUE(rebootIO.stopped);
  TEST_ASSERT_FALSE(reboot.normalReady());
  TEST_ASSERT_TRUE(command(reboot, 1, "reference,HOME_MARK_CONFIRMED", 90));
  TEST_ASSERT_TRUE(reboot.normalReady());
}

void test_power_loss_requires_new_marked_reference_and_preserves_joint_sequence() {
  Arm arm; BenchIO io; MemoryStore store;
  CalibrationSession session(arm, io, store); SerialController serial(arm, &session);
  session.begin(0);
  TEST_ASSERT_EQUAL(SerialController::Result::Ignored, joints(serial, 10));
  TEST_ASSERT_FALSE(command(session, 1, "reference,yes", 10));
  TEST_ASSERT_TRUE(command(session, 2, "reference,HOME_MARK_CONFIRMED", 20));
  session.tick(30, 0.01f);
  TEST_ASSERT_EQUAL(SerialController::Result::Accepted, joints(serial, 40));
  TEST_ASSERT_EQUAL_UINT16(42, arm.lastSeq());
  io.estop = true;
  session.tick(50, 0.01f);
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_FALSE(session.normalReady());
  io.estop = false;
  session.tick(60, 0.01f);
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_FALSE(session.normalReady());
  TEST_ASSERT_TRUE(command(session, 3, "reference,HOME_MARK_CONFIRMED", 70));
  session.tick(80, 0.01f);
  TEST_ASSERT_EQUAL_UINT16(42, arm.lastSeq());
  TEST_ASSERT_EQUAL(SerialController::Result::Ignored, joints(serial, 90));
}

void test_single_encoder_glitch_is_ignored_without_shifting_the_reference() {
  Arm arm; BenchIO io; MemoryStore store;
  CalibrationSession session(arm, io, store); SerialController serial(arm, &session);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "reference,HOME_MARK_CONFIRMED", 10));
  session.tick(20, 0.01f);
  // 2000 counts in 10 ms is far faster than any legal motion: a corrupt sample.
  io.raw = 2100;
  session.tick(30, 0.01f);
  TEST_ASSERT_TRUE(session.normalReady());
  TEST_ASSERT_FALSE(io.stopped);
  io.raw = 100;
  session.tick(40, 0.01f);
  TEST_ASSERT_TRUE(session.normalReady());
  float reported[ARM_NUM_JOINTS] = {};
  session.reportedPosition(reported);
  TEST_ASSERT_FLOAT_WITHIN(0.05f, ARM_PARK_DEG[ElbowPitch], reported[ElbowPitch]);  // Not integrated.
  TEST_ASSERT_EQUAL(SerialController::Result::Accepted, joints(serial, 50));
}

void test_sustained_encoder_read_faults_still_latch_after_debounce() {
  Arm arm; BenchIO io; MemoryStore store;
  CalibrationSession session(arm, io, store); SerialController serial(arm, &session);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "reference,HOME_MARK_CONFIRMED", 10));
  io.encoderOk = false;
  for (int i = 0; i < 4; i++) session.tick(20 + i * 10, 0.01f);
  TEST_ASSERT_TRUE(session.normalReady());  // A short burst is absorbed.
  session.tick(60, 0.01f);
  TEST_ASSERT_FALSE(session.normalReady());
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_EQUAL(ArmState::Estop, arm.state());
  TEST_ASSERT_EQUAL(SerialController::Result::Ignored, joints(serial, 70));
  io.encoderOk = true;
  TEST_ASSERT_TRUE(command(session, 2, "reference,HOME_MARK_CONFIRMED", 80));
}

void test_encoder_tolerates_a_small_limit_overshoot_but_latches_a_real_one() {
  Arm arm; BenchIO io; MemoryStore store; store.present = false;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "reference,HOME_MARK_CONFIRMED", 10));
  const float degPerCount = 360.0f / (16384.0f * 21.0f);
  // The AS5047P counts DOWN as the elbow angle rises and the reference sits at the park
  // pose, so raw = 100 when measured == park.
  const auto shaft = [&](float extraDeg) {
    const int64_t counts = 100 + lround((ARM_PARK_DEG[ElbowPitch] - arm.positionDeg()[ElbowPitch] - extraDeg) / degPerCount);
    return static_cast<uint16_t>(((counts % 16384) + 16384) % 16384);
  };
  float target[ARM_NUM_JOINTS] = {};
  target[ElbowPitch] = ARM_JOINT_MAX_DEG[ElbowPitch];
  uint16_t seq = 2;
  uint32_t now = 20;
  float extra = 0.0f;
  session.tick(now, 0.01f);  // Finish reference homing before commands are accepted.
  // Reach the limit with the encoder tracking the command exactly.
  for (int i = 0; i < 450; i++) {  // park -75 to +30 is 105 deg, ~0.29 deg per tick.
    now += 10;
    TEST_ASSERT_TRUE(arm.setJointAngles(target, seq++, now));
    io.raw = shaft(0.0f);
    session.tick(now, 0.01f);
  }
  TEST_ASSERT_TRUE(session.normalReady());
  // Bumped ~3 deg past the limit: inside the margin, so no fault.
  for (int i = 0; i < 10; i++) {
    now += 10;
    extra += 0.28f;
    TEST_ASSERT_TRUE(arm.setJointAngles(target, seq++, now));
    io.raw = shaft(extra);
    session.tick(now, 0.01f);
  }
  TEST_ASSERT_TRUE(session.normalReady());
  // Keep going past the margin: a real excursion still latches after the debounce.
  for (int i = 0; i < 25 && session.normalReady(); i++) {
    now += 10;
    extra += 0.4f;
    TEST_ASSERT_TRUE(arm.setJointAngles(target, seq++, now));
    io.raw = shaft(extra);
    session.tick(now, 0.01f);
  }
  TEST_ASSERT_FALSE(session.normalReady());
  TEST_ASSERT_TRUE(io.stopped);
}

void test_calibration_sample_is_fresh_and_cannot_report_a_later_completed_step() {
  Arm arm; BenchIO io; MemoryStore store;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 10));
  TEST_ASSERT_TRUE(command(session, 2, "apply", 20));
  TEST_ASSERT_TRUE(command(session, 3, "arm,stepper", 30));
  io.raw = 428;  // Motor advanced since the last control tick.
  io.position = 31;
  io.stepDuringRead = true;  // ISR may finish a pulse during the SPI transaction.
  const char* payload = ",4,sample";
  char line[64];
  snprintf(line, sizeof line, "C%s*%02X", payload,
      proto::crc8(reinterpret_cast<const uint8_t*>(payload), strlen(payload)));
  TEST_ASSERT_TRUE(session.execute(line, strlen(line), 40));
  TEST_ASSERT_NOT_NULL(strstr(session.reply(), "OK,raw,428,counts,428,steps,31,"));
  session.consumeReply();
  io.encoderOk = false;
  TEST_ASSERT_FALSE(command(session, 5, "sample", 50));
  TEST_ASSERT_TRUE(io.stopped);
}

void test_fresh_flash_wrist_needs_no_motor_hardware_or_apply() {
  Arm arm; BenchIO io; MemoryStore store; store.present = false;
  io.encoderOk = false;
  io.stepperOk = false;
  CalibrationSession session(arm, io, store);
  SerialController serial(arm, &session);
  session.begin(0);
  TEST_ASSERT_EQUAL_UINT(0, io.configureCalls);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 10));
  TEST_ASSERT_EQUAL_UINT(0, io.configureCalls);
  TEST_ASSERT_TRUE(command(session, 2, "arm,wrist", 20));
  TEST_ASSERT_EQUAL_UINT8(6, io.configuredMask);
  TEST_ASSERT_EQUAL_UINT8(6, io.servoMask);
  TEST_ASSERT_FALSE(io.enabled);
  TEST_ASSERT_EQUAL_INT32(14, io.configuredConfig.pins.servo[WristA]);
  TEST_ASSERT_EQUAL_INT32(32, io.configuredConfig.pins.servo[WristB]);
  TEST_ASSERT_EQUAL_INT32(500, io.configuredConfig.servo[WristA].minUs);
  TEST_ASSERT_EQUAL_INT32(2500, io.configuredConfig.servo[WristA].maxUs);
  TEST_ASSERT_TRUE(command(session, 3, "jog,1,5", 20));
  TEST_ASSERT_FALSE(command(session, 4, "jog,2,-5", 39));
  TEST_ASSERT_TRUE(command(session, 5, "jog,2,-5", 40));
  session.tick(50, 0.01f);
  TEST_ASSERT_TRUE(command(session, 6, "sample", 50,
      "OK,raw,NA,counts,NA,steps,NA,pulse0,0,pulse1,1505,pulse2,1495,pulse3,0"));
  TEST_ASSERT_EQUAL_UINT(0, io.encoderReads);
  TEST_ASSERT_EQUAL_UINT(0, io.stepPositionReads);
  TEST_ASSERT_FALSE(session.normalReady());
  TEST_ASSERT_EQUAL(SerialController::Result::Ignored, joints(serial, 60));
  // Shipped defaults already validate, so a bench save now persists them; motion still
  // requires the marked-home reference and working motor hardware.
  TEST_ASSERT_TRUE(command(session, 7, "save", 60));
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_TRUE(command(session, 8, "exit", 70));
  TEST_ASSERT_EQUAL_UINT(1, io.configureCalls);
  TEST_ASSERT_FALSE(command(session, 9, "reference,HOME_MARK_CONFIRMED", 80));
}

void test_compiled_hardware_overrides_loaded_hardware_and_rejects_serial_edits() {
  Arm arm; BenchIO io; MemoryStore store;
  store.saved.pins.servo[WristA] = 6;
  store.saved.pins.estop = 1;
  store.saved.pins.estopActiveLevel = 1;
  store.saved.servo[WristA].minUs = 1499;
  store.saved.servo[WristA].maxUs = 1501;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 10));
  TEST_ASSERT_FALSE(command(session, 2, "set,pins,13,14,32,33,18,19,23,17,16,25,34,26,27,35", 20));
  TEST_ASSERT_FALSE(command(session, 3, "set,estop,1", 30));
  TEST_ASSERT_FALSE(command(session, 4, "set,pulse,1,1000,2000,1500", 40));
  TEST_ASSERT_TRUE(command(session, 5, "get,pins", 50,
      "OK,pins,13,14,32,33,18,19,23,17,16,25,34,26,27,35"));
  TEST_ASSERT_TRUE(command(session, 6, "get,estop", 60, "OK,estop,0"));
  TEST_ASSERT_TRUE(command(session, 7, "get,pulse,1", 70, "OK,pulse,1,500,2500,1500"));
  TEST_ASSERT_TRUE(command(session, 8, "arm,wrist", 80));
  TEST_ASSERT_TRUE(command(session, 9, "jog,1,5", 80));
  TEST_ASSERT_EQUAL_INT32(1505, io.pulse[WristA]);
  TEST_ASSERT_TRUE(command(session, 10, "disarm", 90));

  // Simulate a reflash changing the code-owned wiring, polarity and travel windows.
  Config board = boardConfig();
  board.pins.servo[Base] = 14;
  board.pins.servo[WristA] = 13;
  board.pins.estopActiveLevel = 1;
  board.servo[WristA].minUs = 700;
  board.servo[WristA].maxUs = 2300;
  Arm reflashedArm; BenchIO reflashedIO;
  CalibrationSession reflashed(reflashedArm, reflashedIO, store, board);
  reflashed.begin(100);
  TEST_ASSERT_TRUE(command(reflashed, 1, "get,pulse,1", 110, "OK,pulse,1,700,2300,1500"));
  TEST_ASSERT_TRUE(command(reflashed, 2, "get,estop", 120, "OK,estop,1"));
  TEST_ASSERT_TRUE(command(reflashed, 3, "enter,UNLOADED_ESTOP_READY", 130));
  TEST_ASSERT_TRUE(command(reflashed, 4, "arm,wrist", 140));
  TEST_ASSERT_EQUAL_INT32(13, reflashedIO.configuredConfig.pins.servo[WristA]);
}

void test_full_assumed_pwm_boundaries_are_inclusive_and_cannot_be_extended() {
  Arm arm; BenchIO io; MemoryStore store; store.present = false;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  uint16_t seq = 1;
  uint32_t now = 0;
  TEST_ASSERT_TRUE(command(session, seq++, "enter,UNLOADED_ESTOP_READY", now));
  TEST_ASSERT_TRUE(command(session, seq++, "arm,wrist", now));
  for (unsigned i = 0; i < 200; ++i) {
    now += 20;
    TEST_ASSERT_TRUE(command(session, seq++, "jog,1,-5", now));
  }
  TEST_ASSERT_EQUAL_INT32(500, io.pulse[WristA]);
  TEST_ASSERT_FALSE(command(session, seq++, "jog,1,-1", now + 20));
  for (unsigned i = 0; i < 400; ++i) {
    now += 20;
    TEST_ASSERT_TRUE(command(session, seq++, "jog,1,5", now));
  }
  TEST_ASSERT_EQUAL_INT32(2500, io.pulse[WristA]);
  TEST_ASSERT_FALSE(command(session, seq++, "jog,1,1", now + 20));
  TEST_ASSERT_EQUAL_INT32(1500, io.pulse[WristB]);
  TEST_ASSERT_EQUAL_UINT8(6, io.servoMask);
}

void test_servo_only_timeout_estop_and_explicit_recovery_do_not_read_encoder() {
  Arm arm; BenchIO io; MemoryStore store; store.present = false;
  io.encoderOk = io.stepperOk = false;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 0));
  TEST_ASSERT_TRUE(command(session, 2, "arm,wrist", 10));
  session.tick(210, 0.01f);
  TEST_ASSERT_FALSE(io.stopped);
  session.tick(211, 0.01f);
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_TRUE(command(session, 3, "keep", 220));
  session.tick(221, 0.01f);
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_FALSE(command(session, 4, "jog,1,5", 230));
  TEST_ASSERT_TRUE(command(session, 5, "arm,wrist", 240));
  io.estop = true;
  session.tick(250, 0.01f);
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_FALSE(command(session, 6, "arm,wrist", 260));
  io.estop = false;
  session.tick(270, 0.01f);
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_TRUE(command(session, 7, "arm,wrist", 280));
  TEST_ASSERT_TRUE(command(session, 8, "jog,2,5", 280));
  // A command arriving after the lease must stop, even without an intervening tick.
  TEST_ASSERT_FALSE(command(session, 9, "jog,2,5", 481));
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_EQUAL_UINT(0, io.encoderReads);
  TEST_ASSERT_EQUAL_UINT(0, io.stepPositionReads);
}

void test_explicit_wrist_arm_recovers_from_a_failed_full_encoder_setup() {
  Arm arm; BenchIO io; MemoryStore store;
  io.encoderOk = false;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 10));
  TEST_ASSERT_FALSE(command(session, 2, "apply", 20));
  TEST_ASSERT_TRUE(io.stopped);
  TEST_ASSERT_EQUAL_UINT(1, io.encoderReads);
  TEST_ASSERT_TRUE(command(session, 3, "arm,wrist", 30));
  TEST_ASSERT_EQUAL_UINT8(6, io.configuredMask);
  TEST_ASSERT_TRUE(command(session, 4, "jog,1,5", 30));
  session.tick(40, 0.01f);
  TEST_ASSERT_TRUE(command(session, 5, "sample", 50, "OK,raw,NA,counts,NA,steps,NA,"));
  TEST_ASSERT_EQUAL_UINT(1, io.encoderReads);
  TEST_ASSERT_FALSE(io.stopped);
  TEST_ASSERT_FALSE(session.normalReady());
}

void test_status_fault_is_an_owned_reply_token() {
  Arm arm; BenchIO io; MemoryStore store;
  io.stepperOk = false;
  io.faultText = "TMC UART config: ESP_ERR_INVALID_STATE";
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 10));
  TEST_ASSERT_FALSE(command(session, 2, "apply", 20));
  // The IO clears its error on the next setup; the reported fault must not change or go empty.
  io.ioFault = false;
  TEST_ASSERT_TRUE(command(session, 3, "status", 30, ",fault,TMC_UART_config__ESP_ERR_INVALID_STATE,"));
}

void test_gripper_bench_rejects_pulses_past_measured_closed_and_open() {
  Arm arm; BenchIO io; MemoryStore store; store.present = false;
  io.encoderOk = io.stepperOk = false;
  CalibrationSession session(arm, io, store);
  session.begin(0);
  TEST_ASSERT_TRUE(command(session, 1, "enter,UNLOADED_ESTOP_READY", 10));
  TEST_ASSERT_TRUE(command(session, 2, "arm,gripper", 20));
  TEST_ASSERT_EQUAL_INT32(1735, io.pulse[Gripper]);
  TEST_ASSERT_TRUE(command(session, 3, "pose,3,970", 40));
  TEST_ASSERT_EQUAL_INT32(970, io.pulse[Gripper]);
  TEST_ASSERT_FALSE(command(session, 4, "jog,3,-1", 60));
  TEST_ASSERT_EQUAL_INT32(970, io.pulse[Gripper]);
  TEST_ASSERT_FALSE(command(session, 5, "pose,3,969", 80));
  TEST_ASSERT_EQUAL_INT32(970, io.pulse[Gripper]);
  TEST_ASSERT_TRUE(command(session, 6, "pose,3,2500", 100));
  TEST_ASSERT_EQUAL_INT32(2500, io.pulse[Gripper]);
  TEST_ASSERT_FALSE(command(session, 7, "jog,3,1", 120));
  TEST_ASSERT_FALSE(command(session, 8, "pose,3,2501", 140));
  TEST_ASSERT_EQUAL_INT32(2500, io.pulse[Gripper]);
  TEST_ASSERT_FALSE(session.normalReady());
}

int main() {
  UNITY_BEGIN();
  RUN_TEST(test_fresh_boot_needs_only_marked_reference);
  RUN_TEST(test_guarded_auto_reference_needs_the_recorded_home_angle);
  RUN_TEST(test_reference_records_home_angle_for_the_next_boot);
  RUN_TEST(test_gripper_bench_rejects_pulses_past_measured_closed_and_open);
  RUN_TEST(test_status_fault_is_an_owned_reply_token);
  RUN_TEST(test_camera_is_independent_and_still_obeys_estop);
  RUN_TEST(test_bench_jogs_are_exclusive_bounded_and_lease_protected);
  RUN_TEST(test_arbitrary_jog_amounts_stay_inside_the_hard_window);
  RUN_TEST(test_pose_moves_armed_channels_atomically);
  RUN_TEST(test_step_jogs_cannot_overlap_and_timeout_cancels_pending_motion);
  RUN_TEST(test_step_jogs_are_bounded_by_elbow_range_and_reject_invalid_and_overflowing_counts);
  RUN_TEST(test_held_estop_faults_once_instead_of_every_tick);
  RUN_TEST(test_long_step_requires_keepalives_and_estop_still_disables_it);
  RUN_TEST(test_save_is_validated_atomic_and_gear_is_persistent_not_fixed);
  RUN_TEST(test_power_loss_requires_new_marked_reference_and_preserves_joint_sequence);
  RUN_TEST(test_single_encoder_glitch_is_ignored_without_shifting_the_reference);
  RUN_TEST(test_sustained_encoder_read_faults_still_latch_after_debounce);
  RUN_TEST(test_encoder_tolerates_a_small_limit_overshoot_but_latches_a_real_one);
  RUN_TEST(test_calibration_sample_is_fresh_and_cannot_report_a_later_completed_step);
  RUN_TEST(test_fresh_flash_wrist_needs_no_motor_hardware_or_apply);
  RUN_TEST(test_compiled_hardware_overrides_loaded_hardware_and_rejects_serial_edits);
  RUN_TEST(test_full_assumed_pwm_boundaries_are_inclusive_and_cannot_be_extended);
  RUN_TEST(test_servo_only_timeout_estop_and_explicit_recovery_do_not_read_encoder);
  RUN_TEST(test_explicit_wrist_arm_recovers_from_a_failed_full_encoder_setup);
  return UNITY_END();
}
