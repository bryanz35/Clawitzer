#include <limits.h>
#include <limits>
#include <unity.h>
#include "hardware_protocol.h"
#include "step_pulse.h"

void setUp() {}
void tearDown() {}

static void test_tmc_wire_crc() {
  // TMC UART bit order is NOT the ASCII protocol bit order.
  const uint8_t gconfRead[] = {0x05, 0x00, 0x00};
  const uint8_t ifcntRead[] = {0x05, 0x00, 0x02};
  TEST_ASSERT_EQUAL_HEX8(0x48, actuators::tmcCrc(gconfRead, sizeof gconfRead));
  TEST_ASSERT_EQUAL_HEX8(0x8f, actuators::tmcCrc(ifcntRead, sizeof ifcntRead));
}

static void test_as5047_command_and_response() {
  TEST_ASSERT_EQUAL_HEX16(0xffff, actuators::as5047ReadCommand(0x3fff));
  TEST_ASSERT_EQUAL_HEX16(0x4001, actuators::as5047ReadCommand(1));
  uint16_t raw = 42;
  TEST_ASSERT_TRUE(actuators::as5047Decode(0x0000, raw));
  TEST_ASSERT_EQUAL_UINT16(0, raw);
  TEST_ASSERT_TRUE(actuators::as5047Decode(0x3fff, raw));
  TEST_ASSERT_EQUAL_UINT16(16383, raw);
  TEST_ASSERT_FALSE(actuators::as5047Decode(0x0001, raw));  // Bad parity.
  TEST_ASSERT_FALSE(actuators::as5047Decode(0xc000, raw));  // Valid parity, EF set.
  TEST_ASSERT_EQUAL_UINT16(16383, raw);  // Invalid samples do not replace last good.
  for (uint32_t address = 0; address < 16384; ++address) {
    TEST_ASSERT_TRUE(actuators::as5047EvenParity(actuators::as5047ReadCommand(address)));
  }
}

static void test_current_is_configured_and_conservative() {
  uint8_t cs = 0;
  bool low = false;
  TEST_ASSERT_TRUE(actuators::tmcCurrent(500, 0.11f, cs, low));
  TEST_ASSERT_TRUE(low);
  TEST_ASSERT_EQUAL_UINT8(15, cs);
  TEST_ASSERT_TRUE(actuators::tmcCurrent(1000, 0.11f, cs, low));
  TEST_ASSERT_FALSE(low);
  TEST_ASSERT_EQUAL_UINT8(17, cs);
  // Every accepted result must stay at or below requested RMS current.
  for (int ma = 1; ma <= 2000; ++ma) {
    if (!actuators::tmcCurrent(static_cast<float>(ma), 0.11f, cs, low)) continue;
    const double actualMa = (cs + 1) / 32.0 * (low ? 0.180 : 0.325) /
                            (static_cast<double>(0.11f) + 0.020) / 1.4142135623730951 * 1000;
    TEST_ASSERT_TRUE(actualMa <= ma);
  }
  TEST_ASSERT_FALSE(actuators::tmcCurrent(1, 0.11f, cs, low));
  TEST_ASSERT_FALSE(actuators::tmcCurrent(2001, 0.11f, cs, low));
  TEST_ASSERT_FALSE(actuators::tmcCurrent(1000, 0, cs, low));
  TEST_ASSERT_FALSE(actuators::tmcCurrent(1000, -0.11f, cs, low));
  TEST_ASSERT_FALSE(actuators::tmcCurrent(std::numeric_limits<float>::quiet_NaN(), 0.11f, cs, low));
}

static uint32_t rate(unsigned perSecond) {
  return static_cast<uint32_t>(static_cast<uint64_t>(perSecond) * actuators::StepPulse::kOne /
                               actuators::StepPulse::kTickHz);
}

static void test_exact_target_and_disable_cancel() {
  actuators::StepPulse p;
  p.enabled = true;
  p.target = 64;
  p.increment = rate(200);
  unsigned rises = 0;
  for (int64_t us = 20; us <= 400000; us += 20) {
    if (p.tick(us) & actuators::StepPulse::Rise) ++rises;
  }
  TEST_ASSERT_EQUAL_UINT32(64, rises);
  TEST_ASSERT_EQUAL_INT32(64, p.position);
  TEST_ASSERT_FALSE(p.high);
  p.target = 128;
  p.cancel();
  for (int64_t us = 400020; us < 500000; us += 20) TEST_ASSERT_EQUAL(0, p.tick(us));
  TEST_ASSERT_EQUAL_INT32(64, p.position);
  TEST_ASSERT_EQUAL_INT32(64, p.target);
  p.enabled = true;  // Re-enable alone must not resume a canceled jog.
  for (int64_t us = 500020; us < 600000; us += 20) TEST_ASSERT_EQUAL(0, p.tick(us));
}

static void test_reversal_updates_and_direction_timing() {
  actuators::StepPulse p;
  p.enabled = true;
  p.increment = rate(20000);
  p.target = 100;
  int64_t us = 20;
  for (; p.position < 3; us += 20) p.tick(us);
  TEST_ASSERT_TRUE(p.high);
  p.target = -3;  // Update while STEP high: finish high before changing DIR.
  TEST_ASSERT_EQUAL(actuators::StepPulse::Fall, p.tick(us));
  TEST_ASSERT_EQUAL(actuators::StepPulse::None, p.tick(us));
  TEST_ASSERT_EQUAL(actuators::StepPulse::DirLow, p.tick(us + 20));
  TEST_ASSERT_EQUAL(actuators::StepPulse::None, p.tick(us + 20));
  for (us += 40; us < 10000; us += 20) p.tick(us);
  TEST_ASSERT_EQUAL_INT32(-3, p.position);
  TEST_ASSERT_FALSE(p.high);
  TEST_ASSERT_FALSE(p.direction);
  p.target = 2;
  for (; us < 20000; us += 20) p.tick(us);
  TEST_ASSERT_EQUAL_INT32(2, p.position);
  TEST_ASSERT_TRUE(p.direction);
}

static void test_step_integer_boundaries() {
  actuators::StepPulse p;
  p.enabled = true;
  p.increment = rate(20000);
  p.position = INT32_MAX - 1;
  p.target = INT32_MAX;
  for (int64_t us = 20; us < 1000; us += 20) p.tick(us);
  TEST_ASSERT_EQUAL_INT32(INT32_MAX, p.position);
  p.position = INT32_MIN + 1;
  p.target = INT32_MIN;
  for (int64_t us = 1000; us < 2000; us += 20) p.tick(us);
  TEST_ASSERT_EQUAL_INT32(INT32_MIN, p.position);
}

int main() {
  UNITY_BEGIN();
  RUN_TEST(test_tmc_wire_crc);
  RUN_TEST(test_as5047_command_and_response);
  RUN_TEST(test_current_is_configured_and_conservative);
  RUN_TEST(test_exact_target_and_disable_cancel);
  RUN_TEST(test_reversal_updates_and_direction_timing);
  RUN_TEST(test_step_integer_boundaries);
  return UNITY_END();
}
