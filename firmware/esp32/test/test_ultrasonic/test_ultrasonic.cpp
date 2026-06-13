#include <Arduino.h>
#include <unity.h>
#include "UltrasonicSensor.h"

#define TEST_PIN 4
#define TEST_ECHO_PIN 5
#define TEST_MAX_DISTANCE 50

UltrasonicSensor *ultrasonicSensor;

void setUp(void) {
    ultrasonicSensor = new UltrasonicSensor(TEST_PIN, TEST_ECHO_PIN);
}

void tearDown(void) {
    delete ultrasonicSensor;
}

void test_sensor_type(void) {
    TEST_ASSERT_EQUAL_STRING("waterLevel", ultrasonicSensor->getSensorType().c_str());
}

void test_initial_value_is_zero(void) {
    TEST_ASSERT_EQUAL_FLOAT(0.0, ultrasonicSensor->getValue());
}

void setup() {
    UNITY_BEGIN();
    RUN_TEST(test_sensor_type);
    RUN_TEST(test_initial_value_is_zero);
    UNITY_END();
}

void loop() {

}