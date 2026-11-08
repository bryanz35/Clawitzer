#include <math.h>
#include <stdint.h>
#include <unity.h>

#include "actuator_config.h"
#include "board_config.h"
#include "../support/calibrated_config.h"

using namespace actuators;

void setUp() {}
void tearDown() {}

using testsupport::calibrated;

static void assertSetupRejected(const Config& config) {
  char error[96] = {};
  TEST_ASSERT_FALSE(validateSetup(config, error, sizeof(error)));
  TEST_ASSERT_NOT_EQUAL('\0', error[0]);
}

void test_missing_setup_never_becomes_default_wiring() {
  Config missing;
  assertSetupRejected(missing);
  TEST_ASSERT_FALSE(validate(missing, nullptr, 0));
  Config config = calibrated();
  TEST_ASSERT_TRUE(validate(config, nullptr, 0));
  config.motorDirection = config.encoderDirection = 0;
  config.followingErrorDeg = 0;
  config.servo[Base].usPerDeg = config.servo[Gripper].usPerDeg = 0;
  for (size_t i = 0; i < 2; ++i) config.wristRollUsPerDeg[i] = config.wristPitchUsPerDeg[i] = 0;
  TEST_ASSERT_TRUE(validateSetup(config, nullptr, 0));
  TEST_ASSERT_FALSE(validate(config, nullptr, 0));
}

void test_gpio_rejects_reserved_invalid_duplicates_and_input_only_outputs() {
  const int32_t forbidden[] = {
    -1, 1, 3, 6, 7, 8, 9, 10, 11, 20, 24, 28, 29, 30, 31, 37, 38, 40, 48, INT32_MAX
  };
  Config invalid = calibrated();
  int32_t* pins[] = {
    &invalid.pins.servo[0], &invalid.pins.servo[1], &invalid.pins.servo[2], &invalid.pins.servo[3],
    &invalid.pins.step, &invalid.pins.direction, &invalid.pins.enable, &invalid.pins.uartTx,
    &invalid.pins.uartRx, &invalid.pins.spiMosi, &invalid.pins.spiMiso, &invalid.pins.spiClock,
    &invalid.pins.spiCs, &invalid.pins.estop
  };
  for (int32_t pin : forbidden) {
    for (int32_t* field : pins) {
      const int32_t saved = *field;
      *field = pin;
      assertSetupRejected(invalid);
      *field = saved;
    }
  }
  const int32_t inputOnly[] = {34, 35, 36, 39};
  for (int32_t pin : inputOnly) {
    for (size_t i = 0; i < sizeof(pins) / sizeof(pins[0]); ++i) {
      if (i == 8 || i == 10 || i == 13) continue;
      const int32_t saved = *pins[i];
      int32_t* occupied = nullptr;
      for (int32_t* other : pins) {
        if (*other == pin) {
          occupied = other;
          *other = saved;
          break;
        }
      }
      *pins[i] = pin;
      assertSetupRejected(invalid);
      *pins[i] = saved;
      if (occupied) *occupied = pin;
    }
  }
  Config config = calibrated();
  config.pins.step = config.pins.direction;
  assertSetupRejected(config);
  config = calibrated();
  config.pins.spiMiso = config.pins.estop;
  assertSetupRejected(config);
  config = calibrated();
  config.pins.estopActiveLevel = 2;
  assertSetupRejected(config);
}

void test_gpio_accepts_exposed_outputs_and_input_only_consumers() {
  const int32_t outputs[] = {
    0, 2, 4, 5, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 23, 25, 26, 27, 32, 33
  };
  for (int32_t pin : outputs) {
    Config config = calibrated();
    // Swap an occupied GPIO rather than accidentally testing duplicate rejection.
    int32_t* otherPins[] = {
      &config.pins.servo[0], &config.pins.servo[1], &config.pins.servo[2], &config.pins.servo[3],
      &config.pins.direction, &config.pins.enable, &config.pins.uartTx, &config.pins.uartRx,
      &config.pins.spiMosi, &config.pins.spiMiso, &config.pins.spiClock, &config.pins.spiCs,
      &config.pins.estop
    };
    for (int32_t* other : otherPins) {
      if (*other == pin) *other = config.pins.step;
    }
    config.pins.step = pin;
    TEST_ASSERT_TRUE(validateSetup(config, nullptr, 0));
  }
  const int32_t inputOnly[] = {34, 35, 36, 39};
  for (int32_t pin : inputOnly) {
    for (size_t consumer = 0; consumer < 3; ++consumer) {
      Config config = calibrated();
      int32_t* inputs[] = {&config.pins.uartRx, &config.pins.spiMiso, &config.pins.estop};
      const int32_t saved = *inputs[consumer];
      for (int32_t* other : inputs) {
        if (*other == pin) *other = saved;
      }
      *inputs[consumer] = pin;
      TEST_ASSERT_TRUE(validateSetup(config, nullptr, 0));
    }
  }
}

void test_setup_rejects_nonfinite_and_electrically_unsafe_parameters() {
  Config config = calibrated();
  float* fields[] = {&config.servo[0].centerUs, &config.servo[0].usPerDeg,
                    &config.wristRollUsPerDeg[0], &config.wristPitchUsPerDeg[1],
                    &config.motorStepsPerRev, &config.gearRatio, &config.currentMa,
                    &config.senseResistorOhm, &config.followingErrorDeg};
  for (float* field : fields) {
    const float saved = *field;
    *field = NAN;
    assertSetupRejected(config);
    *field = INFINITY;
    assertSetupRejected(config);
    *field = saved;
  }
  config.servo[0].minUs = 499;
  assertSetupRejected(config);
  config = calibrated();
  config.servo[0].maxUs = 2501;
  assertSetupRejected(config);
  config = calibrated();
  config.servo[0].centerUs = 999;
  assertSetupRejected(config);
  config = calibrated();
  config.servo[0].minUs = config.servo[0].maxUs;
  assertSetupRejected(config);
  config = calibrated();
  config.currentMa = 0;
  assertSetupRejected(config);
  config.currentMa = 2001;
  assertSetupRejected(config);
  config.currentMa = 1;  // Below the minimum CS setting, not silently rounded up.
  assertSetupRejected(config);
  config = calibrated();
  config.senseResistorOhm = 0;
  assertSetupRejected(config);
  config.senseResistorOhm = 1.01f;
  assertSetupRejected(config);
  config.senseResistorOhm = 1;
  assertSetupRejected(config);  // 600mA exceeds CS31 for this resistor.
  config = calibrated();
  config.uartAddress = 4;
  assertSetupRejected(config);
  config = calibrated();
  config.version = kConfigVersion + 1;
  assertSetupRejected(config);
}

void test_stepper_scaling_is_measured_gearing_not_a_fixed_ratio() {
  Config config = calibrated();
  const uint32_t invalidMicrosteps[] = {0, 3, 6, 255, 257, UINT32_MAX};
  for (uint32_t microsteps : invalidMicrosteps) {
    config.microsteps = microsteps;
    assertSetupRejected(config);
  }
  for (uint32_t microsteps = 1; microsteps <= 256; microsteps *= 2) {
    config = calibrated();
    config.gearRatio = 1;
    config.microsteps = microsteps;
    TEST_ASSERT_TRUE(validate(config, nullptr, 0));
  }
  config = calibrated();
  float deg[ARM_NUM_JOINTS] = {};
  deg[ElbowPitch] = ARM_HOME_DEG[ElbowPitch] + 9;
  Targets target;
  TEST_ASSERT_TRUE(map(config, deg, target));
  TEST_ASSERT_EQUAL_INT32(680, target.steps);
  TEST_ASSERT_FLOAT_WITHIN(0.0001f, 200.0f * 8 * 17 / 360, stepsPerJointDegree(config));
  config.gearRatio = 13;
  TEST_ASSERT_TRUE(map(config, deg, target));
  TEST_ASSERT_EQUAL_INT32(520, target.steps);
  config.motorDirection = -1;
  TEST_ASSERT_TRUE(map(config, deg, target));
  TEST_ASSERT_EQUAL_INT32(-520, target.steps);
  config.motorStepsPerRev = 400;
  TEST_ASSERT_TRUE(map(config, deg, target));
  TEST_ASSERT_EQUAL_INT32(-1040, target.steps);
  TEST_ASSERT_TRUE(map(config, ARM_HOME_DEG, target));
  TEST_ASSERT_EQUAL_INT32(0, target.steps);
  config.gearRatio = 1000;
  assertSetupRejected(config);  // Generated elbow velocity would require >20k steps/s.
  config.gearRatio = 1e30f;
  assertSetupRejected(config);  // Also exceeds signed position capacity.
  config = calibrated();
  config.motorStepsPerRev = 0;
  assertSetupRejected(config);
  config = calibrated();
  config.gearRatio = -1;
  assertSetupRejected(config);
}

void test_differential_mixes_both_inputs_and_maps_every_generated_corner() {
  const Config config = calibrated();
  TEST_ASSERT_TRUE(validate(config, nullptr, 0));
  float deg[ARM_NUM_JOINTS] = {};
  deg[WristRoll] = 10;
  deg[WristPitch] = -5;
  Targets target;
  TEST_ASSERT_TRUE(map(config, deg, target));
  TEST_ASSERT_EQUAL_INT32(1510, target.pulseUs[WristA]);
  TEST_ASSERT_EQUAL_INT32(1470, target.pulseUs[WristB]);
  for (unsigned corner = 0; corner < (1u << ARM_NUM_JOINTS); ++corner) {
    for (size_t joint = 0; joint < ARM_NUM_JOINTS; ++joint)
      deg[joint] = corner & (1u << joint) ? ARM_JOINT_MAX_DEG[joint] : ARM_JOINT_MIN_DEG[joint];
    TEST_ASSERT_TRUE(map(config, deg, target));
    TEST_ASSERT_EQUAL_INT32(lroundf(1500 + 2 * deg[BaseYaw]), target.pulseUs[Base]);
    TEST_ASSERT_EQUAL_INT32(lroundf(1500 + 2 * deg[WristRoll] + 2 * deg[WristPitch]), target.pulseUs[WristA]);
    TEST_ASSERT_EQUAL_INT32(lroundf(1500 - 2 * deg[WristRoll] + 2 * deg[WristPitch]), target.pulseUs[WristB]);
    TEST_ASSERT_EQUAL_INT32(lroundf(1500 - 3 * deg[Grip]), target.pulseUs[Gripper]);
  }
}

void test_envelope_rejects_coupled_corner_without_clipping_or_partial_targets() {
  Config config = calibrated();
  config.wristRollUsPerDeg[0] = config.wristPitchUsPerDeg[0] = 4;
  TEST_ASSERT_FALSE(validate(config, nullptr, 0));  // Each isolated axis fits; their combined corner does not.
  float deg[ARM_NUM_JOINTS] = {};
  Targets target;
  target.steps = 123;
  for (size_t i = 0; i < kServoCount; ++i) target.pulseUs[i] = 987;
  deg[WristRoll] = ARM_JOINT_MAX_DEG[WristRoll];
  deg[WristPitch] = ARM_JOINT_MAX_DEG[WristPitch];
  TEST_ASSERT_FALSE(map(config, deg, target));
  TEST_ASSERT_EQUAL_INT32(123, target.steps);
  for (size_t i = 0; i < kServoCount; ++i) TEST_ASSERT_EQUAL_INT32(987, target.pulseUs[i]);
  config = calibrated();
  config.wristRollUsPerDeg[1] = config.wristRollUsPerDeg[0];
  config.wristPitchUsPerDeg[1] = config.wristPitchUsPerDeg[0];
  TEST_ASSERT_FALSE(validate(config, nullptr, 0));
  config = calibrated();
  config.servo[Base].usPerDeg = 0;
  TEST_ASSERT_FALSE(validate(config, nullptr, 0));
  config = calibrated();
  config.servo[Gripper].usPerDeg = 0;
  TEST_ASSERT_FALSE(validate(config, nullptr, 0));
  config = calibrated();
  config.followingErrorDeg = 0;
  TEST_ASSERT_FALSE(validate(config, nullptr, 0));
  config.followingErrorDeg = ARM_JOINT_MAX_DEG[ElbowPitch] - ARM_JOINT_MIN_DEG[ElbowPitch] + 1;
  TEST_ASSERT_FALSE(validate(config, nullptr, 0));
  config = calibrated();
  config.motorDirection = 0;
  TEST_ASSERT_FALSE(validate(config, nullptr, 0));
  config = calibrated();
  config.encoderDirection = -2;
  TEST_ASSERT_FALSE(validate(config, nullptr, 0));
}

void test_map_rejects_each_invalid_logical_input() {
  const Config config = calibrated();
  float deg[ARM_NUM_JOINTS];
  Targets target;
  TEST_ASSERT_FALSE(map(config, nullptr, target));
  for (size_t i = 0; i < ARM_NUM_JOINTS; ++i) {
    for (size_t j = 0; j < ARM_NUM_JOINTS; ++j) deg[j] = ARM_HOME_DEG[j];
    deg[i] = NAN;
    TEST_ASSERT_FALSE(map(config, deg, target));
    deg[i] = INFINITY;
    TEST_ASSERT_FALSE(map(config, deg, target));
    deg[i] = ARM_JOINT_MIN_DEG[i] - 0.01f;
    TEST_ASSERT_FALSE(map(config, deg, target));
    deg[i] = ARM_JOINT_MAX_DEG[i] + 0.01f;
    TEST_ASSERT_FALSE(map(config, deg, target));
  }
}

void test_encoder_requires_reference_and_unwraps_both_directions() {
  Config config = calibrated();
  EncoderTracker encoder;
  TEST_ASSERT_FALSE(encoder.referenced());
  TEST_ASSERT_TRUE(isnan(encoder.jointDeg(config)));
  encoder.reference(ARM_HOME_DEG[ElbowPitch], config);
  TEST_ASSERT_FALSE(encoder.referenced());
  TEST_ASSERT_TRUE(encoder.update(16380));
  TEST_ASSERT_EQUAL_INT64(16380, encoder.counts());
  TEST_ASSERT_TRUE(isnan(encoder.jointDeg(config)));
  encoder.reference(ARM_HOME_DEG[ElbowPitch], config);
  TEST_ASSERT_TRUE(encoder.referenced());
  TEST_ASSERT_TRUE(encoder.update(4));
  TEST_ASSERT_EQUAL_INT64(16388, encoder.counts());
  TEST_ASSERT_FLOAT_WITHIN(0.000001f, ARM_HOME_DEG[ElbowPitch] + 8.0f * 360 / (16384 * 17), encoder.jointDeg(config));
  TEST_ASSERT_TRUE(encoder.update(16380));
  TEST_ASSERT_EQUAL_INT64(16380, encoder.counts());
  TEST_ASSERT_TRUE(encoder.update(16370));
  TEST_ASSERT_EQUAL_INT64(16370, encoder.counts());
  TEST_ASSERT_FLOAT_WITHIN(0.000001f, ARM_HOME_DEG[ElbowPitch] - 10.0f * 360 / (16384 * 17), encoder.jointDeg(config));
  encoder.reset();
  TEST_ASSERT_FALSE(encoder.referenced());
  TEST_ASSERT_TRUE(isnan(encoder.jointDeg(config)));
}

void test_encoder_tracks_multiple_revolutions_and_configured_output_gearing() {
  Config config = calibrated();
  EncoderTracker encoder;
  TEST_ASSERT_TRUE(encoder.update(100));
  encoder.reference(7, config);
  for (int i = 0; i < 12; ++i) TEST_ASSERT_TRUE(encoder.update(static_cast<uint16_t>((100 + (i + 1) * 4096) % 16384)));
  TEST_ASSERT_EQUAL_INT64(100 + 3 * 16384, encoder.counts());
  TEST_ASSERT_FLOAT_WITHIN(0.00001f, 7 + 3.0f * 360 / 17, encoder.jointDeg(config));
  config.gearRatio = 29;
  config.encoderDirection = -1;
  TEST_ASSERT_FLOAT_WITHIN(0.00001f, 7 - 3.0f * 360 / 29, encoder.jointDeg(config));
  encoder.reference(-5, config);
  TEST_ASSERT_FLOAT_WITHIN(0.00001f, -5, encoder.jointDeg(config));
  for (int i = 0; i < 16; ++i) {
    const int raw = (100 - (i + 1) * 4096) % 16384;
    TEST_ASSERT_TRUE(encoder.update(static_cast<uint16_t>(raw < 0 ? raw + 16384 : raw)));
  }
  TEST_ASSERT_EQUAL_INT64(100 - 16384, encoder.counts());
  TEST_ASSERT_FLOAT_WITHIN(0.00001f, -5 + 4.0f * 360 / 29, encoder.jointDeg(config));
}

void test_encoder_rejects_invalid_and_half_turn_samples_without_mutation() {
  const Config config = calibrated();
  EncoderTracker encoder;
  TEST_ASSERT_FALSE(encoder.update(16384));
  TEST_ASSERT_FALSE(encoder.update(UINT16_MAX));
  encoder.reference(0, config);
  TEST_ASSERT_FALSE(encoder.referenced());
  TEST_ASSERT_TRUE(encoder.update(100));
  encoder.reference(0, config);
  TEST_ASSERT_FALSE(encoder.update(8292));
  TEST_ASSERT_EQUAL_UINT16(100, encoder.raw());
  TEST_ASSERT_EQUAL_INT64(100, encoder.counts());
  TEST_ASSERT_TRUE(encoder.update(8100));
  TEST_ASSERT_FALSE(encoder.update(16292));
  TEST_ASSERT_EQUAL_UINT16(8100, encoder.raw());
  TEST_ASSERT_TRUE(encoder.update(8292));
  TEST_ASSERT_FALSE(encoder.update(100));  // The negative half-turn is equally ambiguous.
  TEST_ASSERT_EQUAL_INT64(8292, encoder.counts());
  encoder.reference(NAN, config);
  TEST_ASSERT_FALSE(encoder.referenced());
  TEST_ASSERT_TRUE(isnan(encoder.jointDeg(config)));
}

void test_compiled_board_ships_calibrated_and_raw_bench_ignores_mapping() {
  Config config = boardConfig();
  TEST_ASSERT_TRUE(validateBench(config, 6, nullptr, 0));
  TEST_ASSERT_TRUE(validateSetup(config, nullptr, 0));
  TEST_ASSERT_TRUE(validate(config, nullptr, 0));  // Ships ready: no bench save required.
  TEST_ASSERT_EQUAL_FLOAT(21, config.gearRatio);
  TEST_ASSERT_EQUAL_UINT32(4, config.microsteps);
  TEST_ASSERT_EQUAL_FLOAT(200, config.motorStepsPerRev);
  TEST_ASSERT_EQUAL_INT32(1, config.motorDirection);
  TEST_ASSERT_EQUAL_INT32(1, config.encoderDirection);
  TEST_ASSERT_EQUAL_FLOAT(1700, config.currentMa);
  TEST_ASSERT_EQUAL_FLOAT(0.11f, config.senseResistorOhm);
  TEST_ASSERT_EQUAL_FLOAT(2, config.followingErrorDeg);
  TEST_ASSERT_EQUAL_INT32(970, config.servo[Gripper].minUs);
  TEST_ASSERT_EQUAL_FLOAT(1735, config.servo[Gripper].centerUs);
  // Raw PWM bench work must not need any mapping or motor measurement.
  config.motorStepsPerRev = config.currentMa = config.senseResistorOhm = NAN;
  config.followingErrorDeg = config.gearRatio = NAN;
  config.servo[Base].centerUs = NAN;
  config.wristRollUsPerDeg[0] = NAN;  // Raw PWM does not use angle coefficients.
  TEST_ASSERT_TRUE(validateBench(config, 6, nullptr, 0));
  TEST_ASSERT_FALSE(validateBench(config, kStepperOutput, nullptr, 0));
  config.servo[WristA].minUs = 499;
  TEST_ASSERT_FALSE(validateBench(config, 6, nullptr, 0));
  config.servo[WristA].minUs = 500;
  config.servo[WristB].maxUs = 2501;
  TEST_ASSERT_FALSE(validateBench(config, 6, nullptr, 0));
  config.servo[WristB].maxUs = 2500;
  config.servo[WristB].centerUs = 2501;
  TEST_ASSERT_FALSE(validateBench(config, 6, nullptr, 0));
  config.servo[WristB].centerUs = 500;
  TEST_ASSERT_TRUE(validateBench(config, 6, nullptr, 0));
  config.servo[WristB].centerUs = 2500;
  TEST_ASSERT_TRUE(validateBench(config, 6, nullptr, 0));
  TEST_ASSERT_FALSE(validateBench(config, 0, nullptr, 0));
  TEST_ASSERT_FALSE(validateBench(config, 0x80, nullptr, 0));
  config.pins.estop = config.pins.servo[WristA];
  TEST_ASSERT_FALSE(validateBench(config, 6, nullptr, 0));
}

void test_geared_base_maps_full_travel_about_forward_without_wrapping() {
  const Config board = boardConfig();
  TEST_ASSERT_TRUE(validate(board, nullptr, 0));  // The compiled board is fully calibrated.
  Config config = calibrated();
  config.servo[Base] = board.servo[Base];
  const float degrees[] = {-180, -90, 0, 90, 180};
  const int32_t pulses[] = {2500, 2000, 1500, 1000, 500};
  for (int direction = -1; direction <= 1; direction += 2) {
    config.servo[Base].usPerDeg = board.servo[Base].usPerDeg * direction;
    TEST_ASSERT_TRUE(validate(config, nullptr, 0));  // Includes every envelope corner.
    for (size_t i = 0; i < 5; ++i) {
      float deg[ARM_NUM_JOINTS] = {};
      deg[BaseYaw] = degrees[i];
      Targets target;
      TEST_ASSERT_TRUE(map(config, deg, target));
      TEST_ASSERT_EQUAL_INT32(pulses[direction == 1 ? i : 4 - i], target.pulseUs[Base]);
    }
    float deg[ARM_NUM_JOINTS] = {};
    Targets target;
    deg[BaseYaw] = -180.01f;
    TEST_ASSERT_FALSE(map(config, deg, target));
    deg[BaseYaw] = 180.01f;
    TEST_ASSERT_FALSE(map(config, deg, target));
  }
}

void test_measured_gripper_maps_closed_midpoint_and_open_without_overtravel() {
  Config config = calibrated();
  config.servo[Gripper] = boardConfig().servo[Gripper];
  TEST_ASSERT_TRUE(validate(config, nullptr, 0));
  const float angles[] = {-90, 0, 90};
  const int32_t pulses[] = {970, 1735, 2500};
  for (size_t i = 0; i < 3; ++i) {
    float deg[ARM_NUM_JOINTS] = {};
    deg[Grip] = angles[i];
    Targets target;
    TEST_ASSERT_TRUE(map(config, deg, target));
    TEST_ASSERT_EQUAL_INT32(pulses[i], target.pulseUs[Gripper]);
  }
}

void test_symmetric_differential_wrist_uses_coupled_diamond() {
  Config config = boardConfig();
  TEST_ASSERT_FLOAT_WITHIN(0.01f, 90.0f, wristTiltSumDeg(config));
  TEST_ASSERT_TRUE(validate(config, nullptr, 0));
  float deg[ARM_NUM_JOINTS] = {};
  Targets target;
  deg[WristRoll] = 45;
  deg[WristPitch] = 45;
  TEST_ASSERT_TRUE(map(config, deg, target));  // On the diamond boundary.
  TEST_ASSERT_EQUAL_INT32(500, target.pulseUs[WristA]);
  TEST_ASSERT_EQUAL_INT32(1500, target.pulseUs[WristB]);
  deg[WristRoll] = 90;
  deg[WristPitch] = 90;
  TEST_ASSERT_FALSE(map(config, deg, target));  // Unreachable rectangle corner.
  deg[WristRoll] = -27;
  deg[WristPitch] = ARM_JOINT_MIN_DEG[WristPitch];  // Roll survives at the collision stop.
  TEST_ASSERT_TRUE(map(config, deg, target));
  TEST_ASSERT_EQUAL_INT32(2500, target.pulseUs[WristA]);
  TEST_ASSERT_EQUAL_INT32(1100, target.pulseUs[WristB]);
  Config asymmetric = config;
  asymmetric.wristPitchUsPerDeg[0] = -4;
  TEST_ASSERT_EQUAL_FLOAT(0, wristTiltSumDeg(asymmetric));  // Falls back to rectangles.
}

void test_persisted_values_cannot_restore_old_board_pins_or_hard_windows() {
  Config old = calibrated();
  old.pins.servo[WristA] = 6;
  old.pins.estopActiveLevel = 1;
  old.servo[WristA].minUs = 1499;
  old.servo[WristA].maxUs = 1501;
  old.servo[WristA].centerUs = 1510;
  const CalibrationValues record = calibrationValues(old);
  Config reflashed = boardConfig();
  reflashed.pins.servo[Base] = 14;
  reflashed.pins.servo[WristA] = 13;
  reflashed.servo[WristA].minUs = 700;
  reflashed.servo[WristA].maxUs = 2300;
  applyCalibrationValues(reflashed, record);
  TEST_ASSERT_EQUAL_INT32(13, reflashed.pins.servo[WristA]);
  TEST_ASSERT_EQUAL_INT32(35, reflashed.pins.estop);
  TEST_ASSERT_EQUAL_INT32(0, reflashed.pins.estopActiveLevel);
  TEST_ASSERT_EQUAL_INT32(700, reflashed.servo[WristA].minUs);
  TEST_ASSERT_EQUAL_INT32(2300, reflashed.servo[WristA].maxUs);
  TEST_ASSERT_EQUAL_FLOAT(1510, reflashed.servo[WristA].centerUs);
  TEST_ASSERT_EQUAL_FLOAT(old.gearRatio, reflashed.gearRatio);
  TEST_ASSERT_EQUAL_FLOAT(old.currentMa, reflashed.currentMa);
  TEST_ASSERT_EQUAL_FLOAT(old.wristRollUsPerDeg[1], reflashed.wristRollUsPerDeg[1]);
  TEST_ASSERT_TRUE(validate(reflashed, nullptr, 0));
}

int main() {
  UNITY_BEGIN();
  RUN_TEST(test_missing_setup_never_becomes_default_wiring);
  RUN_TEST(test_gpio_rejects_reserved_invalid_duplicates_and_input_only_outputs);
  RUN_TEST(test_gpio_accepts_exposed_outputs_and_input_only_consumers);
  RUN_TEST(test_setup_rejects_nonfinite_and_electrically_unsafe_parameters);
  RUN_TEST(test_stepper_scaling_is_measured_gearing_not_a_fixed_ratio);
  RUN_TEST(test_differential_mixes_both_inputs_and_maps_every_generated_corner);
  RUN_TEST(test_envelope_rejects_coupled_corner_without_clipping_or_partial_targets);
  RUN_TEST(test_map_rejects_each_invalid_logical_input);
  RUN_TEST(test_encoder_requires_reference_and_unwraps_both_directions);
  RUN_TEST(test_encoder_tracks_multiple_revolutions_and_configured_output_gearing);
  RUN_TEST(test_encoder_rejects_invalid_and_half_turn_samples_without_mutation);
  RUN_TEST(test_compiled_board_ships_calibrated_and_raw_bench_ignores_mapping);
  RUN_TEST(test_geared_base_maps_full_travel_about_forward_without_wrapping);
  RUN_TEST(test_measured_gripper_maps_closed_midpoint_and_open_without_overtravel);
  RUN_TEST(test_symmetric_differential_wrist_uses_coupled_diamond);
  RUN_TEST(test_persisted_values_cannot_restore_old_board_pins_or_hard_windows);
  return UNITY_END();
}
