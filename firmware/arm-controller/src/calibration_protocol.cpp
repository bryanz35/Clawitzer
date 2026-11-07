#include "calibration_protocol.h"

#include <stdio.h>
#include <string.h>

namespace calibration {
namespace {
int hex(char c) {
  if (c >= '0' && c <= '9') return c - '0';
  if (c >= 'A' && c <= 'F') return c - 'A' + 10;
  if (c >= 'a' && c <= 'f') return c - 'a' + 10;
  return -1;
}
bool token(const char*& cursor, const char* end, char* out, size_t capacity) {
  size_t n = 0;
  while (cursor < end && *cursor != ',') {
    const unsigned char byte = static_cast<unsigned char>(*cursor++);
    if (byte <= 32 || byte >= 127 || byte == '*' || n + 1 >= capacity) return false;
    out[n++] = static_cast<char>(byte);
  }
  out[n] = '\0';
  return n > 0;
}
}

proto::ParseResult parse(const char* line, size_t length, Command& command) {
  if (length && line[length - 1] == '\r') --length;
  if (length < 9 || length > proto::kMaxLineLen || line[0] != 'C' || line[1] != ',' ||
      line[length - 3] != '*') return proto::ParseResult::Malformed;
  const int hi = hex(line[length - 2]), lo = hex(line[length - 1]);
  if (hi < 0 || lo < 0) return proto::ParseResult::Malformed;
  if (proto::crc8(reinterpret_cast<const uint8_t*>(line + 1), length - 4) != (hi * 16 + lo)) {
    return proto::ParseResult::BadCrc;
  }
  const char* cursor = line + 2;
  const char* end = line + length - 3;
  uint32_t seq = 0;
  size_t digits = 0;
  while (cursor < end && *cursor >= '0' && *cursor <= '9') {
    seq = seq * 10 + static_cast<unsigned>(*cursor++ - '0');
    if (++digits > 5 || seq > 65535) return proto::ParseResult::Malformed;
  }
  if (!digits || cursor == end || *cursor++ != ',') return proto::ParseResult::Malformed;
  Command parsed;
  parsed.seq = static_cast<uint16_t>(seq);
  if (!token(cursor, end, parsed.verb, sizeof parsed.verb)) return proto::ParseResult::Malformed;
  while (cursor < end) {
    if (*cursor++ != ',' || parsed.argc == kMaxArgs ||
        !token(cursor, end, parsed.args[parsed.argc], kTokenSize)) return proto::ParseResult::Malformed;
    ++parsed.argc;
  }
  command = parsed;
  return proto::ParseResult::Ok;
}

size_t formatReply(char* buffer, size_t capacity, uint16_t seq, bool ok, const char* fields) {
  char payload[proto::kMaxLineLen];
  const int n = snprintf(payload, sizeof payload, ",%u,%s%s%s", static_cast<unsigned>(seq),
                         ok ? "OK" : "ERR", fields && *fields ? "," : "", fields ? fields : "");
  if (n <= 0 || static_cast<size_t>(n) >= sizeof payload) return 0;
  const uint8_t crc = proto::crc8(reinterpret_cast<const uint8_t*>(payload), static_cast<size_t>(n));
  const int total = snprintf(buffer, capacity, "K%s*%02X\n", payload, crc);
  return total > 0 && static_cast<size_t>(total) < capacity ? static_cast<size_t>(total) : 0;
}
}
