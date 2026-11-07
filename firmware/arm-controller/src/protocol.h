// Serial line protocol, phone → MCU. Mirrors packages/protocol/src/serial.ts (the canonical spec).
//   command  J,<seq>,<j1>,…,<j5>*<crc8>\n
//   status   S,<seq>,<state>,<j1>,…,<j5>*<crc8>\n
//   camera   P,<seq>,<deg>*<crc8>\n          (0–180°, independent of arm joints)
//   camera   V,<seq>,<deg>,<active>*<crc8>\n (status, active 0/1)
// crc8: poly 0x07, init 0x00, no reflection, no final XOR, over the bytes between the letter and '*'.
// Portable C++17, no Arduino headers, no dynamic allocation.
#pragma once

#include <stddef.h>
#include <stdint.h>

#include "arm_config.h"

namespace proto {

constexpr uint32_t kSerialBaud = 115200;
constexpr size_t kMaxLineLen = 192;
constexpr float kCameraMinDeg = 0.0f;
constexpr float kCameraMaxDeg = 180.0f;

uint8_t crc8(const uint8_t* data, size_t len);

struct JointCommand {
  uint16_t seq;
  float deg[ARM_NUM_JOINTS];
};

/** Independent camera servo target; not an arm joint and not part of the IK model. */
struct CameraCommand {
  uint16_t seq;
  float deg;
};

enum class ParseResult : uint8_t { Ok, Malformed, BadCrc };

// Parses one command line, without its '\n' (a trailing '\r' is tolerated).
// `out` is only written on Ok.
ParseResult parseCommand(const char* line, size_t len, JointCommand& out);
ParseResult parseCameraCommand(const char* line, size_t len, CameraCommand& out);

// Writes a full status line including '\n'. Returns its length, or 0 if `cap` is too small.
size_t formatStatus(char* buf, size_t cap, uint16_t seq, const char* state, const float deg[ARM_NUM_JOINTS]);
size_t formatCameraStatus(char* buf, size_t cap, uint16_t seq, float deg, bool active);

// Accumulates bytes into lines in a fixed buffer. Over-long lines are dropped whole.
class LineReader {
 public:
  // Returns true when `c` completes a line; read it with line()/length() before the next feed().
  bool feed(char c);
  const char* line() const { return buf_; }
  size_t length() const { return len_; }

 private:
  char buf_[kMaxLineLen + 1] = {};
  size_t len_ = 0;
  bool overflow_ = false;
  bool complete_ = false;
};

}  // namespace proto
