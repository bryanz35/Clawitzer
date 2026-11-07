#include <string.h>
#include <unity.h>

#include "serial_controller.h"

void setUp() {}
void tearDown() {}

static SerialController::Result feed(SerialController& controller, const char* line, uint32_t nowMs) {
  SerialController::Result result = SerialController::Result::Incomplete;
  while (*line) result = controller.feed(*line++, nowMs);
  return result;
}

void test_corrupt_and_replayed_frames_cannot_keep_arm_active() {
  Arm arm;
  float start[ARM_NUM_JOINTS] = {};
  arm.begin(start, 0);
  arm.update(10, 0.01f);
  SerialController controller(arm);
  const char* valid = "J,42,10.0,-20.5,0.0,45.0,-45.0*F6\n";
  TEST_ASSERT_EQUAL(SerialController::Result::Accepted, feed(controller, valid, 10));
  arm.update(20, 0.01f);
  TEST_ASSERT_TRUE(arm.positionDeg()[0] > start[0]);
  TEST_ASSERT_TRUE(arm.positionDeg()[1] < start[1]);
  TEST_ASSERT_EQUAL(SerialController::Result::BadCrc,
                    feed(controller, "J,42,11.0,-20.5,0.0,45.0,-45.0*F6\n", 190));
  TEST_ASSERT_EQUAL(SerialController::Result::Ignored, feed(controller, valid, 200));
  arm.update(210, 0.01f);
  TEST_ASSERT_EQUAL(ArmState::Active, arm.state());
  arm.update(220, 0.01f);
  TEST_ASSERT_EQUAL(ArmState::Watchdog, arm.state());
  TEST_ASSERT_EQUAL_UINT16(42, arm.lastSeq());

  char status[proto::kMaxLineLen + 8];
  const size_t length = controller.formatStatus(status, sizeof status);
  TEST_ASSERT_EQUAL_STRING_LEN("S,42,WATCHDOG,", status, strlen("S,42,WATCHDOG,"));
  TEST_ASSERT_EQUAL_CHAR('\n', status[length - 1]);
}

int main() {
  UNITY_BEGIN();
  RUN_TEST(test_corrupt_and_replayed_frames_cannot_keep_arm_active);
  return UNITY_END();
}
