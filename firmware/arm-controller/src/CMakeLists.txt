idf_component_register(
    SRCS "main.cpp" "arm.cpp" "protocol.cpp" "serial_controller.cpp" "serial_transport.cpp"
         "actuator_config.cpp" "calibration_protocol.cpp" "calibration_session.cpp"
         "calibration_store.cpp" "esp_actuator_io.cpp"
    INCLUDE_DIRS "." "../include"
    REQUIRES esp_timer nvs_flash esp_driver_gpio esp_driver_ledc esp_driver_uart
             esp_driver_spi esp_driver_gptimer esp_rom
)
target_compile_features(${COMPONENT_LIB} PUBLIC cxx_std_17)
