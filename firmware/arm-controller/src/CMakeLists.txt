if(ARM_UART17_PROBE)
    idf_component_register(
        SRCS "uart17_probe.cpp" "serial_transport.cpp" "actuator_config.cpp" "esp_actuator_io.cpp"
        INCLUDE_DIRS "." "../include"
        REQUIRES esp_driver_gpio esp_driver_uart esp_timer esp_driver_ledc
                 esp_driver_spi esp_driver_gptimer esp_rom
    )
elseif(ARM_GPIO17_PROBE)
    idf_component_register(
        SRCS "gpio17_probe.cpp" "serial_transport.cpp"
        INCLUDE_DIRS "." "../include"
        REQUIRES esp_driver_gpio esp_driver_ledc esp_driver_uart
    )
else()
idf_component_register(
    SRCS "main.cpp" "arm.cpp" "protocol.cpp" "serial_controller.cpp" "serial_transport.cpp"
         "actuator_config.cpp" "calibration_protocol.cpp" "calibration_session.cpp"
         "calibration_store.cpp" "esp_actuator_io.cpp"
    INCLUDE_DIRS "." "../include"
    REQUIRES esp_timer nvs_flash esp_driver_gpio esp_driver_ledc esp_driver_uart
             esp_driver_spi esp_driver_gptimer esp_rom
)
endif()
target_compile_features(${COMPONENT_LIB} PUBLIC cxx_std_17)
