#pragma once

#include <stdint.h>
#ifdef ESP_PLATFORM
#include "esp_attr.h"
#define ACTUATOR_INLINE inline __attribute__((always_inline))
#else
#define ACTUATOR_INLINE inline
#endif

namespace actuators {

// Caller holds the same portMUX for commands and ticks. No allocation or float
// work in tick(). Tick cadence is 50kHz; high/low are normally >=20us, with an
// independent real-time 2us guard against interrupt catch-up. TMC2209 section13
// requires STEP high/low >=100ns and DIR setup/hold >=20ns.
struct StepPulse {
  static constexpr uint32_t kTickHz = 50000;
  static constexpr uint64_t kOne = uint64_t{1} << 32;
  enum Edge : uint8_t { None = 0, Rise = 1, Fall = 2, DirHigh = 4, DirLow = 8 };
  int32_t position = 0, target = 0;
  uint32_t increment = 0;
  uint64_t phase = 0;
  int64_t lastRiseUs = 0, lastFallUs = 0, lastDirectionUs = 0;
  bool enabled = false, high = false, direction = true;

  ACTUATOR_INLINE void cancel() {
    enabled = false;
    high = false;
    target = position;
    phase = 0;
    increment = 0;
  }

  ACTUATOR_INLINE uint8_t tick(int64_t nowUs) {
    if (!enabled) return None;
    // Accumulate while both high and low to preserve requested average rate.
    // Saturation prevents pulse bursts after a long DIR/setup pause.
    if (phase < kOne) phase += increment;
    if (high) {
      if (nowUs - lastRiseUs < 2) return None;
      high = false;
      lastFallUs = nowUs;
      return Fall;
    }
    if (target == position) {
      phase = 0;
      return None;
    }
    const bool desiredDirection = target > position;
    if (desiredDirection != direction) {
      if (nowUs - lastRiseUs < 2 || nowUs - lastFallUs < 2) return None;
      direction = desiredDirection;
      lastDirectionUs = nowUs;
      return direction ? DirHigh : DirLow;
    }
    if (phase < kOne || nowUs - lastDirectionUs < 2 || nowUs - lastFallUs < 2) return None;
    phase -= kOne;
    high = true;
    lastRiseUs = nowUs;
    position += direction ? 1 : -1;
    return Rise;
  }
};

}  // namespace actuators
#undef ACTUATOR_INLINE
