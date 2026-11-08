#include "calibration_store.h"
#include "board_config.h"

#include <stdio.h>
#include <type_traits>

#include "esp_err.h"
#include "nvs.h"
#include "nvs_flash.h"

namespace actuators {
namespace {

constexpr uint32_t kRecordMagic = 0x41435452;  // ACTR
// v3 adds the marked-home encoder angle used for guarded auto-reference. Older blobs
// fail the size check, so they are rejected rather than misinterpreted.
constexpr uint32_t kRecordVersion = 3;
constexpr const char* kNamespace = "arm_cal";
// Leave the old full-Config "actuators" blob untouched for rollback firmware.
constexpr const char* kKey = "mapping_v2";

struct Record {
  uint32_t magic;
  uint32_t version;
  uint32_t valuesSize;
  CalibrationValues values;
};

static_assert(std::is_trivially_copyable<CalibrationValues>::value, "NVS calibration must be a value record");
static_assert(sizeof(nvs_handle_t) == sizeof(uint32_t), "NVS handle storage must match IDF");

}  // namespace

NvsCalibrationStore::~NvsCalibrationStore() {
  if (ready_) nvs_close(static_cast<nvs_handle_t>(handle_));
}

bool NvsCalibrationStore::fail(const char* operation, int32_t code) {
  snprintf(error_, sizeof(error_), "%s: %s", operation, esp_err_to_name(code));
  return false;
}

bool NvsCalibrationStore::begin() {
  error_[0] = '\0';
  if (ready_) return true;
  // In particular, never erase on NO_FREE_PAGES or NEW_VERSION_FOUND: this partition
  // can hold unrelated user data, and deleting a bad calibration is not a safe fallback.
  esp_err_t result = nvs_flash_init();
  if (result != ESP_OK) return fail("NVS initialization", result);
  nvs_handle_t handle;
  result = nvs_open(kNamespace, NVS_READWRITE, &handle);
  if (result != ESP_OK) return fail("NVS namespace", result);
  handle_ = handle;
  ready_ = true;
  return true;
}

bool NvsCalibrationStore::load(Config& config) {
  error_[0] = '\0';
  if (!ready_) return fail("NVS not initialized", ESP_ERR_INVALID_STATE);
  size_t size = 0;
  esp_err_t result = nvs_get_blob(static_cast<nvs_handle_t>(handle_), kKey, nullptr, &size);
  if (result != ESP_OK) return fail("Read calibration size", result);
  if (size != sizeof(Record)) {
    snprintf(error_, sizeof(error_), "Calibration record size mismatch");
    return false;
  }
  Record record{};
  result = nvs_get_blob(static_cast<nvs_handle_t>(handle_), kKey, &record, &size);
  if (result != ESP_OK) return fail("Read calibration", result);
  if (size != sizeof(record) || record.magic != kRecordMagic || record.version != kRecordVersion ||
      record.valuesSize != sizeof(CalibrationValues)) {
    snprintf(error_, sizeof(error_), "Calibration record format/version mismatch");
    return false;
  }
  Config loaded = boardConfig();
  applyCalibrationValues(loaded, record.values);
  if (!validate(loaded, error_, sizeof(error_))) return false;
  config = loaded;
  return true;
}

bool NvsCalibrationStore::save(const Config& config) {
  error_[0] = '\0';
  if (!ready_) return fail("NVS not initialized", ESP_ERR_INVALID_STATE);
  if (!validate(config, error_, sizeof(error_))) return false;
  Record record{};
  record.magic = kRecordMagic;
  record.version = kRecordVersion;
  record.valuesSize = sizeof(CalibrationValues);
  record.values = calibrationValues(config);
  // One mapping blob is the entire transaction; no code-owned hardware is stored.
  // Only an explicit successful commit reports success.
  esp_err_t result = nvs_set_blob(static_cast<nvs_handle_t>(handle_), kKey, &record, sizeof(record));
  if (result != ESP_OK) return fail("Write calibration", result);
  result = nvs_commit(static_cast<nvs_handle_t>(handle_));
  if (result != ESP_OK) return fail("Commit calibration", result);
  return true;
}

}  // namespace actuators
