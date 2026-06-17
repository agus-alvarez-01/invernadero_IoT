#include <Arduino.h>
#include <unity.h>
#include "SoilMoistureSensor.h"

#define TEST_PIN 4

SoilMoistureSensor *soilSensor;

void setUp(void) {
    soilSensor = new SoilMoistureSensor(TEST_PIN);
}

void tearDown(void) {
    delete soilSensor;
}

void test_sensor_type(void) {
    TEST_ASSERT_EQUAL_STRING("soilHumidity", soilSensor->getSensorType().c_str());
}

void test_initial_value_is_zero(void) {
    TEST_ASSERT_EQUAL_FLOAT(0.0, soilSensor->getValue());
}

void setup() {
    UNITY_BEGIN();
    RUN_TEST(test_sensor_type);
    RUN_TEST(test_initial_value_is_zero);
    UNITY_END();
}

void loop() {

}