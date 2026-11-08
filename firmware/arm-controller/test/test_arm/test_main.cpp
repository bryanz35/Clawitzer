#include <math.h>
#include <unity.h>

#include "arm.h"

void setUp() {}
void tearDown() {}

static constexpr float kDt = 0.01f;

// Runs `ticks` 10 ms control ticks starting at `t` (ms); returns the time after the last tick.
static uint32_t run(Arm& s, uint32_t t, int ticks) {
  for (int i = 0; i < ticks; i++) s.update(t += 10, kDt);
  return t;
}

static void homeAt(Arm& s, float offsetDeg) {
  float start[ARM_NUM_JOINTS];
  for (int i = 0; i < ARM_NUM_JOINTS; i++) start[i] = ARM_PARK_DEG[i] + offsetDeg;
  s.begin(start, 0);
}

void test_homing_ignores_commands_and_moves_slowly() {
  Arm s;
  homeAt(s, 10.0f);
  float target[ARM_NUM_JOINTS] = {};
  TEST_ASSERT_FALSE(s.setJointAngles(target, 0, 0));
  const float before = s.positionDeg()[0];
  run(s, 0, 10);  // 100 ms
  const float moved = fabsf(s.positionDeg()[0] - before);
  TEST_ASSERT_TRUE(moved > 0.0f);
  TEST_ASSERT_TRUE(moved <= ARM_JOINT_MAX_VEL_DEG_S[0] * kHomingSpeedFraction * 0.1f + 1e-3f);
  TEST_ASSERT_EQUAL(ArmState::Homing, s.state());
  run(s, 100, 3000);
  TEST_ASSERT_EQUAL(ArmState::Idle, s.state());
}

void test_watchdog_holds_after_200ms() {
  Arm s;
  homeAt(s, 0.0f);
  uint32_t t = run(s, 0, 1);
  float target[ARM_NUM_JOINTS];
  for (int i = 0; i < ARM_NUM_JOINTS; i++) target[i] = ARM_JOINT_MAX_DEG[i];
  TEST_ASSERT_TRUE(s.setJointAngles(target, 1, t));
  TEST_ASSERT_EQUAL(ArmState::Active, s.state());
  t = run(s, t, 20);  // 200 ms: still within the window
  TEST_ASSERT_EQUAL(ArmState::Active, s.state());
  const float before = s.positionDeg()[0];
  t = run(s, t, 1);
  const float v = (s.positionDeg()[0] - before) / kDt;  // speed when commands stopped
  t = run(s, t, 1);
  TEST_ASSERT_EQUAL(ArmState::Watchdog, s.state());

  // Brakes within the accel limit: still moving on the next tick, stops within v²/2a (+1 tick).
  const float atWatchdog = s.positionDeg()[0];
  const float amax = ARM_JOINT_MAX_ACCEL_DEG_S2[0];
  t = run(s, t, 1);
  TEST_ASSERT_TRUE(s.positionDeg()[0] > atWatchdog);
  t = run(s, t, 100);
  const float held = s.positionDeg()[0];
  TEST_ASSERT_TRUE(held - atWatchdog <= v * v / (2.0f * amax) + v * kDt + 1e-3f);
  run(s, t, 50);
  TEST_ASSERT_EQUAL_FLOAT(held, s.positionDeg()[0]);
  TEST_ASSERT_EQUAL(ArmState::Watchdog, s.state());
}

void test_limits_clamp_position_and_velocity() {
  Arm s;
  homeAt(s, 0.0f);
  uint32_t t = run(s, 0, 1);
  float target[ARM_NUM_JOINTS];
  for (int i = 0; i < ARM_NUM_JOINTS; i++) target[i] = 1000.0f;  // way past the limit
  for (int k = 0; k < 1000; k++) {
    s.setJointAngles(target, static_cast<uint16_t>(k + 1), t);
    const float before = s.positionDeg()[0];
    s.update(t += 10, kDt);
    TEST_ASSERT_TRUE(fabsf(s.positionDeg()[0] - before) <= ARM_JOINT_MAX_VEL_DEG_S[0] * kDt + 1e-4f);
  }
  for (int i = 0; i < ARM_NUM_JOINTS; i++) TEST_ASSERT_EQUAL_FLOAT(ARM_JOINT_MAX_DEG[i], s.positionDeg()[i]);
}

void test_target_reversal_onto_a_moving_joint_stays_within_accel_limit() {
  Arm s;
  homeAt(s, 0.0f);
  uint32_t t = run(s, 0, 1);
  const int j = 1;  // elbow: the stepper loses steps on an instant stop
  const float amax = ARM_JOINT_MAX_ACCEL_DEG_S2[j];
  float target[ARM_NUM_JOINTS];
  for (int i = 0; i < ARM_NUM_JOINTS; i++) target[i] = ARM_PARK_DEG[i];
  target[j] = ARM_JOINT_MAX_DEG[j];
  float last = s.positionDeg()[j], lastVel = 0.0f;
  for (int k = 0; k < 400; k++) {
    if (k == 60) target[j] = s.positionDeg()[j];  // at full speed, the target lands on the joint
    TEST_ASSERT_TRUE(s.setJointAngles(target, static_cast<uint16_t>(k + 1), t));
    s.update(t += 10, kDt);
    const float vel = (s.positionDeg()[j] - last) / kDt;
    TEST_ASSERT_TRUE(fabsf(vel - lastVel) <= amax * kDt * 1.01f);
    last = s.positionDeg()[j];
    lastVel = vel;
  }
  TEST_ASSERT_EQUAL_FLOAT(target[j], s.positionDeg()[j]);  // overshoots, then settles back
}

void test_estop_holds_then_rehomes() {
  Arm s;
  homeAt(s, 0.0f);
  uint32_t t = run(s, 0, 1);
  s.setEstop(true, t);
  TEST_ASSERT_EQUAL(ArmState::Estop, s.state());
  float target[ARM_NUM_JOINTS] = {};
  TEST_ASSERT_FALSE(s.setJointAngles(target, 5, t));
  s.setEstop(false, t);
  TEST_ASSERT_EQUAL(ArmState::Homing, s.state());
}

void test_sequences_wrap_and_survive_estop_rehoming() {
  Arm arm;
  homeAt(arm, 0.0f);
  run(arm, 0, 1);
  float target[ARM_NUM_JOINTS] = {};
  TEST_ASSERT_TRUE(arm.setJointAngles(target, 65535, 20));
  TEST_ASSERT_TRUE(arm.setJointAngles(target, 0, 30));
  TEST_ASSERT_FALSE(arm.setJointAngles(target, 0, 40));
  TEST_ASSERT_FALSE(arm.setJointAngles(target, 65535, 50));
  TEST_ASSERT_FALSE(arm.setJointAngles(target, 0x8000, 60));
  TEST_ASSERT_TRUE(arm.setJointAngles(target, 1, 70));
  arm.setEstop(true, 80);
  TEST_ASSERT_FALSE(arm.setJointAngles(target, 2, 90));
  arm.setEstop(false, 100);
  TEST_ASSERT_EQUAL(ArmState::Homing, arm.state());
  TEST_ASSERT_FALSE(arm.setJointAngles(target, 2, 100));
  run(arm, 100, 1);
  TEST_ASSERT_EQUAL(ArmState::Idle, arm.state());
  TEST_ASSERT_EQUAL_UINT16(1, arm.lastSeq());
  TEST_ASSERT_FALSE(arm.setJointAngles(target, 1, 120));
  TEST_ASSERT_TRUE(arm.setJointAngles(target, 2, 120));
}

void test_invalid_target_does_not_consume_sequence_or_feed_watchdog() {
  Arm arm;
  homeAt(arm, 0.0f);
  run(arm, 0, 1);
  float target[ARM_NUM_JOINTS] = {};
  TEST_ASSERT_TRUE(arm.setJointAngles(target, 7, 20));
  target[ARM_NUM_JOINTS - 1] = NAN;
  TEST_ASSERT_FALSE(arm.setJointAngles(target, 8, 210));
  TEST_ASSERT_EQUAL_UINT16(7, arm.lastSeq());
  arm.update(221, kDt);
  TEST_ASSERT_EQUAL(ArmState::Watchdog, arm.state());
  for (int i = 0; i < ARM_NUM_JOINTS; i++) TEST_ASSERT_EQUAL_FLOAT(ARM_PARK_DEG[i], arm.positionDeg()[i]);
  target[ARM_NUM_JOINTS - 1] = INFINITY;
  TEST_ASSERT_FALSE(arm.setJointAngles(target, 8, 230));
  target[ARM_NUM_JOINTS - 1] = 0.0f;
  TEST_ASSERT_TRUE(arm.setJointAngles(target, 8, 240));
  TEST_ASSERT_EQUAL(ArmState::Active, arm.state());
}

void test_wrist_coupling_projects_roll_and_pitch_onto_the_diamond() {
  float target[ARM_NUM_JOINTS] = {};
  target[2] = 90.0f;  // j3 wrist pitch
  target[3] = 90.0f;  // j4 wrist roll

  Arm coupled;
  coupled.setWristCoupling(90.0f);
  homeAt(coupled, 0.0f);
  uint32_t t = run(coupled, 0, 1);
  for (int i = 0; i < 400; i++) {
    t += 10;
    TEST_ASSERT_TRUE(coupled.setJointAngles(target, static_cast<uint16_t>(i + 1), t));
    coupled.update(t, kDt);
  }
  TEST_ASSERT_FLOAT_WITHIN(0.5f, 45.0f, coupled.positionDeg()[2]);
  TEST_ASSERT_FLOAT_WITHIN(0.5f, 45.0f, coupled.positionDeg()[3]);

  // Without a saved calibration the same command is only hit by the per-joint limits.
  Arm uncoupled;
  homeAt(uncoupled, 0.0f);
  t = run(uncoupled, 0, 1);
  for (int i = 0; i < 400; i++) {
    t += 10;
    TEST_ASSERT_TRUE(uncoupled.setJointAngles(target, static_cast<uint16_t>(i + 1), t));
    uncoupled.update(t, kDt);
  }
  TEST_ASSERT_FLOAT_WITHIN(0.5f, 90.0f, uncoupled.positionDeg()[2]);
  TEST_ASSERT_FLOAT_WITHIN(0.5f, 90.0f, uncoupled.positionDeg()[3]);
}

int main() {
  UNITY_BEGIN();
  RUN_TEST(test_homing_ignores_commands_and_moves_slowly);
  RUN_TEST(test_watchdog_holds_after_200ms);
  RUN_TEST(test_limits_clamp_position_and_velocity);
  RUN_TEST(test_target_reversal_onto_a_moving_joint_stays_within_accel_limit);
  RUN_TEST(test_estop_holds_then_rehomes);
  RUN_TEST(test_sequences_wrap_and_survive_estop_rehoming);
  RUN_TEST(test_invalid_target_does_not_consume_sequence_or_feed_watchdog);
  RUN_TEST(test_wrist_coupling_projects_roll_and_pitch_onto_the_diamond);
  return UNITY_END();
}
