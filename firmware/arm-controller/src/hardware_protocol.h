#pragma once

#include <cmath>
#include <stddef.h>
#include <stdint.h>

namespace actuators {

// TMC2209 datasheet sections 4.1/4.2: polynomial 0x07,
// bytes fed least-significant bit first (unlike the host serial CRC).
inline uint8_t tmcCrc(const uint8_t* bytes, size_t size) {
  uint8_t crc = 0;
  for (size_t i = 0; i < size; ++i) {
    uint8_t byte = bytes[i];
    for (unsigned bit = 0; bit < 8; ++bit) {
      const bool feedback = ((crc >> 7) ^ byte) & 1;
      crc = static_cast<uint8_t>(crc << 1);
      if (feedback) crc ^= 0x07;
      byte >>= 1;
    }
  }
  return crc;
}

// RMS current, external sense resistor. Section 9: include the internal
// 20 milliohm resistance. Round DOWN: nominal current never exceeds the request.
inline bool tmcCurrent(float currentMa, float senseResistorOhm,
                       uint8_t& cs, bool& lowSense) {
  if (!std::isfinite(currentMa) || !std::isfinite(senseResistorOhm) ||
      currentMa <= 0 || currentMa > 2000 ||
      senseResistorOhm <= 0 || senseResistorOhm > 1) return false;
  const double scaled = static_cast<double>(currentMa) * 0.001 * 32.0 *
                        1.4142135623730951 * (static_cast<double>(senseResistorOhm) + 0.020);
  if (scaled < 0.180 || scaled > 32.0 * 0.325) return false;
  lowSense = scaled <= 32.0 * 0.180;
  const double setting = std::floor(scaled / (lowSense ? 0.180 : 0.325)) - 1.0;
  if (setting < 0 || setting > 31) return false;
  cs = static_cast<uint8_t>(setting);
  return true;
}

// AS5047P datasheet v2-00 figures13/14: bit15 makes the whole frame even.
inline bool as5047EvenParity(uint16_t word) {
  word ^= word >> 8;
  word ^= word >> 4;
  word ^= word >> 2;
  word ^= word >> 1;
  return !(word & 1);
}
inline uint16_t as5047ReadCommand(uint16_t address) {
  uint16_t command = (address & 0x3fff) | 0x4000;
  if (!as5047EvenParity(command)) command |= 0x8000;
  return command;
}
inline bool as5047Decode(uint16_t frame, uint16_t& raw) {
  if (!as5047EvenParity(frame) || (frame & 0x4000)) return false;
  raw = frame & 0x3fff;
  return true;
}

}  // namespace actuators
