#include <stdio.h>
#include <string.h>
#include <unity.h>

#include "protocol.h"

using proto::JointCommand;
using proto::ParseResult;

void setUp() {}
void tearDown() {}

static ParseResult parse(const char* line, JointCommand& out) {
  return proto::parseCommand(line, strlen(line), out);
}

static ParseResult parseCamera(const char* line, proto::CameraCommand& out) {
  return proto::parseCameraCommand(line, strlen(line), out);
}

void test_crc_check_vector() {
  const char* s = "123456789";
  TEST_ASSERT_EQUAL_HEX8(0xF4, proto::crc8(reinterpret_cast<const uint8_t*>(s), strlen(s)));
}

void test_valid_line() {
  // Same line packages/protocol asserts for encodeJoints(42, [10, -20.5, 0, 45, -45]).
  JointCommand cmd{};
  TEST_ASSERT_EQUAL(ParseResult::Ok, parse("J,42,10.0,-20.5,0.0,45.0,-45.0*F6", cmd));
  TEST_ASSERT_EQUAL_UINT16(42, cmd.seq);
  TEST_ASSERT_EQUAL_FLOAT(10.0f, cmd.deg[0]);
  TEST_ASSERT_EQUAL_FLOAT(-20.5f, cmd.deg[1]);
  TEST_ASSERT_EQUAL_FLOAT(0.0f, cmd.deg[2]);
  TEST_ASSERT_EQUAL_FLOAT(45.0f, cmd.deg[3]);
  TEST_ASSERT_EQUAL_FLOAT(-45.0f, cmd.deg[4]);
  TEST_ASSERT_EQUAL(ParseResult::Ok, parse("J,42,10.0,-20.5,0.0,45.0,-45.0*f6\r", cmd));
}

void test_bad_crc() {
  JointCommand cmd{};
  TEST_ASSERT_EQUAL(ParseResult::BadCrc, parse("J,42,10.0,-20.5,0.0,45.0,-45.0*F7", cmd));
  TEST_ASSERT_EQUAL(ParseResult::BadCrc, parse("J,42,11.0,-20.5,0.0,45.0,-45.0*F6", cmd));
}

void test_camera_command_and_status() {
  const char* payload = ",7,123.4";
  char line[64];
  snprintf(line, sizeof line, "P%s*%02X", payload,
           proto::crc8(reinterpret_cast<const uint8_t*>(payload), strlen(payload)));
  proto::CameraCommand camera{};
  TEST_ASSERT_EQUAL(ParseResult::Ok, parseCamera(line, camera));
  TEST_ASSERT_EQUAL_UINT16(7, camera.seq);
  TEST_ASSERT_EQUAL_FLOAT(123.4f, camera.deg);

  const char* outside = ",7,181.0";
  snprintf(line, sizeof line, "P%s*%02X", outside,
           proto::crc8(reinterpret_cast<const uint8_t*>(outside), strlen(outside)));
  TEST_ASSERT_EQUAL(ParseResult::Malformed, parseCamera(line, camera));

  char status[proto::kMaxLineLen];
  const size_t n = proto::formatCameraStatus(status, sizeof status, 7, 123.4f, true);
  TEST_ASSERT_GREATER_THAN(0, n);
  TEST_ASSERT_EQUAL_STRING_LEN("V,7,123.4,1*", status, n - 3);
  TEST_ASSERT_EQUAL_CHAR('\n', status[n - 1]);
}

void test_malformed() {
  JointCommand cmd{};
  TEST_ASSERT_EQUAL(ParseResult::Malformed, parse("", cmd));
  TEST_ASSERT_EQUAL(ParseResult::Malformed, parse("garbage", cmd));
  TEST_ASSERT_EQUAL(ParseResult::Malformed, parse("S,42,10.0,-20.5,0.0,45.0,-45.0*F6", cmd));
  TEST_ASSERT_EQUAL(ParseResult::Malformed, parse("J,42,10.0,-20.5,0.0,45.0,-45.0*G6", cmd));
}

void test_status_line_format() {
  const float deg[ARM_NUM_JOINTS] = {1, 2, 3, 4, -0.01f};
  char buf[proto::kMaxLineLen];
  const size_t n = proto::formatStatus(buf, sizeof buf, 7, "IDLE", deg);
  TEST_ASSERT_GREATER_THAN(0, n);
  TEST_ASSERT_EQUAL_STRING_LEN("S,7,IDLE,1.0,2.0,3.0,4.0,0.0*", buf, n - 3);
  TEST_ASSERT_EQUAL_CHAR('\n', buf[n - 1]);
}

void test_line_reader_drops_overlong_lines() {
  proto::LineReader r;
  for (size_t i = 0; i < proto::kMaxLineLen + 10; i++) TEST_ASSERT_FALSE(r.feed('x'));
  TEST_ASSERT_FALSE(r.feed('\n'));
  const char* ok = "J,1\n";
  bool done = false;
  for (const char* p = ok; *p; p++) done = r.feed(*p);
  TEST_ASSERT_TRUE(done);
  TEST_ASSERT_EQUAL_STRING("J,1", r.line());
}

int main() {
  UNITY_BEGIN();
  RUN_TEST(test_crc_check_vector);
  RUN_TEST(test_valid_line);
  RUN_TEST(test_bad_crc);
  RUN_TEST(test_camera_command_and_status);
  RUN_TEST(test_malformed);
  RUN_TEST(test_status_line_format);
  RUN_TEST(test_line_reader_drops_overlong_lines);
  return UNITY_END();
}
