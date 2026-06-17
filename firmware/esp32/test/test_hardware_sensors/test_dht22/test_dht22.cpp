#include <Arduino.h>
#include <unity.h>
#include "Dht22Sensor.h"

#define TEST_PIN 4

Dht22Sensor *tempSensor;
Dht22Sensor *humiditySensor;

void setUp(void) {
    tempSensor = new Dht22Sensor(TEST_PIN, true);
    humiditySensor = new Dht22Sensor(TEST_PIN, false);
}

void tearDown(void) {
    delete tempSensor;
    delete humiditySensor;
}

void test_sensor_type_temperature(void) {
    TEST_ASSERT_EQUAL_STRING("temperature", tempSensor->getSensorType().c_str());
}

void test_sensor_type_humidity(void) {
    TEST_ASSERT_EQUAL_STRING("airHumidity", humiditySensor->getSensorType().c_str());
}

void test_initial_value_is_zero(void) {
    TEST_ASSERT_EQUAL_FLOAT(0.0, tempSensor->getValue());
    TEST_ASSERT_EQUAL_FLOAT(0.0, humiditySensor->getValue());
}

void setup() {
    UNITY_BEGIN();
    RUN_TEST(test_sensor_type_temperature);
    RUN_TEST(test_sensor_type_humidity);
    RUN_TEST(test_initial_value_is_zero);
    UNITY_END();
}

void loop() {

}