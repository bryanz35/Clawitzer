#include "protocol.h"

#include <stdio.h>

namespace proto {

uint8_t crc8(const uint8_t* data, size_t len) {
  uint8_t crc = 0;
  for (size_t i = 0; i < len; i++) {
    crc ^= data[i];
    for (int b = 0; b < 8; b++) {
      crc = (crc & 0x80) ? static_cast<uint8_t>((crc << 1) ^ 0x07) : static_cast<uint8_t>(crc << 1);
    }
  }
  return crc;
}

namespace {

int hexValue(char c) {
  if (c >= '0' && c <= '9') return c - '0';
  if (c >= 'A' && c <= 'F') return c - 'A' + 10;
  if (c >= 'a' && c <= 'f') return c - 'a' + 10;
  return -1;
}

bool isDigit(char c) { return c >= '0' && c <= '9'; }

// Parses 1–5 decimal digits ending at `end` or ','. Advances `p`.
bool parseSeq(const char*& p, const char* end, uint16_t& out) {
  uint32_t v = 0;
  int digits = 0;
  while (p < end && isDigit(*p)) {
    if (++digits > 5) return false;
    v = v * 10 + static_cast<uint32_t>(*p - '0');
    p++;
  }
  if (digits == 0 || v > 0xFFFF) return false;
  out = static_cast<uint16_t>(v);
  return true;
}

// Parses -?\d+(\.\d+)? strictly (no exponent, no locale). Advances `p`.
bool parseDeg(const char*& p, const char* end, float& out) {
  bool neg = false;
  if (p < end && *p == '-') {
    neg = true;
    p++;
  }
  int intDigits = 0;
  float v = 0.0f;
  while (p < end && isDigit(*p)) {
    if (++intDigits > 4) return false;  // |angle| < 10000°, rejects absurd values early
    v = v * 10.0f + static_cast<float>(*p - '0');
    p++;
  }
  if (intDigits == 0) return false;
  if (p < end && *p == '.') {
    p++;
    float scale = 0.1f;
    int fracDigits = 0;
    while (p < end && isDigit(*p)) {
      if (++fracDigits > 3) return false;
      v += scale * static_cast<float>(*p - '0');
      scale *= 0.1f;
      p++;
    }
    if (fracDigits == 0) return false;
  }
  out = neg ? -v : v;
  return true;
}

}  // namespace

ParseResult parseCommand(const char* line, size_t len, JointCommand& out) {
  if (len > 0 && line[len - 1] == '\r') len--;
  // Shortest valid line: "J,0,0,0,0,0,0*XX".
  if (len < 4 || line[0] != 'J' || line[len - 3] != '*') return ParseResult::Malformed;
  const int hi = hexValue(line[len - 2]);
  const int lo = hexValue(line[len - 1]);
  if (hi < 0 || lo < 0) return ParseResult::Malformed;

  const char* payload = line + 1;
  const char* end = line + len - 3;  // points at '*'
  const uint8_t expected = static_cast<uint8_t>((hi << 4) | lo);
  if (crc8(reinterpret_cast<const uint8_t*>(payload), static_cast<size_t>(end - payload)) != expected) {
    return ParseResult::BadCrc;
  }

  JointCommand cmd{};
  const char* p = payload;
  if (p >= end || *p++ != ',') return ParseResult::Malformed;
  if (!parseSeq(p, end, cmd.seq)) return ParseResult::Malformed;
  for (int i = 0; i < ARM_NUM_JOINTS; i++) {
    if (p >= end || *p++ != ',') return ParseResult::Malformed;
    if (!parseDeg(p, end, cmd.deg[i])) return ParseResult::Malformed;
  }
  if (p != end) return ParseResult::Malformed;  // trailing fields
  out = cmd;
  return ParseResult::Ok;
}

ParseResult parseCameraCommand(const char* line, size_t len, CameraCommand& out) {
  if (len > 0 && line[len - 1] == '\r') len--;
  if (len < 4 || line[0] != 'P' || line[len - 3] != '*') return ParseResult::Malformed;
  const int hi = hexValue(line[len - 2]);
  const int lo = hexValue(line[len - 1]);
  if (hi < 0 || lo < 0) return ParseResult::Malformed;
  const char* payload = line + 1;
  const char* end = line + len - 3;
  const uint8_t expected = static_cast<uint8_t>((hi << 4) | lo);
  if (crc8(reinterpret_cast<const uint8_t*>(payload), static_cast<size_t>(end - payload)) != expected) {
    return ParseResult::BadCrc;
  }
  CameraCommand cmd{};
  const char* p = payload;
  if (p >= end || *p++ != ',') return ParseResult::Malformed;
  if (!parseSeq(p, end, cmd.seq)) return ParseResult::Malformed;
  if (p >= end || *p++ != ',') return ParseResult::Malformed;
  if (!parseDeg(p, end, cmd.deg)) return ParseResult::Malformed;
  if (p != end || cmd.deg < kCameraMinDeg || cmd.deg > kCameraMaxDeg) return ParseResult::Malformed;
  out = cmd;
  return ParseResult::Ok;
}

size_t formatCameraStatus(char* buf, size_t cap, uint16_t seq, float deg, bool active) {
  char payload[kMaxLineLen];
  const int n = snprintf(payload, sizeof payload, ",%u,%.1f,%u", static_cast<unsigned>(seq),
                         static_cast<double>(deg), active ? 1u : 0u);
  if (n <= 0 || static_cast<size_t>(n) >= sizeof payload) return 0;
  const uint8_t crc = crc8(reinterpret_cast<const uint8_t*>(payload), static_cast<size_t>(n));
  const int total = snprintf(buf, cap, "V%s*%02X\n", payload, crc);
  if (total <= 0 || static_cast<size_t>(total) >= cap) return 0;
  return static_cast<size_t>(total);
}

size_t formatStatus(char* buf, size_t cap, uint16_t seq, const char* state, const float deg[ARM_NUM_JOINTS]) {
  // Payload first (it is what the CRC covers), then the framing.
  char payload[kMaxLineLen];
  int n = snprintf(payload, sizeof payload, ",%u,%s", static_cast<unsigned>(seq), state);
  for (int i = 0; i < ARM_NUM_JOINTS && n > 0 && static_cast<size_t>(n) < sizeof payload; i++) {
    float d = deg[i];
    if (d > -0.05f && d < 0.05f) d = 0.0f;  // never emit "-0.0"
    n += snprintf(payload + n, sizeof payload - static_cast<size_t>(n), ",%.1f", static_cast<double>(d));
  }
  if (n <= 0 || static_cast<size_t>(n) >= sizeof payload) return 0;
  const uint8_t crc = crc8(reinterpret_cast<const uint8_t*>(payload), static_cast<size_t>(n));
  const int total = snprintf(buf, cap, "S%s*%02X\n", payload, crc);
  if (total <= 0 || static_cast<size_t>(total) >= cap) return 0;
  return static_cast<size_t>(total);
}

bool LineReader::feed(char c) {
  if (complete_) {
    len_ = 0;
    complete_ = false;
  }
  if (c == '\n') {
    const bool ok = !overflow_ && len_ > 0;
    overflow_ = false;
    buf_[len_] = '\0';
    if (!ok) {
      len_ = 0;
      return false;
    }
    complete_ = true;
    return true;
  }
  if (len_ >= kMaxLineLen) {
    overflow_ = true;
    len_ = 0;
    return false;
  }
  buf_[len_++] = c;
  return false;
}

}  // namespace proto
