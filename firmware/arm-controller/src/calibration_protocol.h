#pragma once

#include "protocol.h"

namespace calibration {

constexpr size_t kMaxArgs = 15;  // set,pins carries a key plus fourteen GPIO values.
constexpr size_t kTokenSize = 32;
// Raw bench jog policy; canonical values live in packages/protocol/src/calibration.ts.
constexpr float kStepRate = 1000.0f;
struct Command {
  uint16_t seq = 0;
  char verb[16] = {};
  char args[kMaxArgs][kTokenSize] = {};
  size_t argc = 0;
};

proto::ParseResult parse(const char* line, size_t length, Command& command);
size_t formatReply(char* buffer, size_t capacity, uint16_t seq, bool ok, const char* fields);

}  // namespace calibration
