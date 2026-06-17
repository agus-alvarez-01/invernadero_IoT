#include <Arduino.h>
#include <unity.h>
#include <ArduinoJson.h>
#include "DataDispatcher.h"

#define DEFAULT_TIMESTAMP "1775080000000"

// MOCK OBJECTS

class MockApiConnection : public ApiConnection {
    public:
        String capturedPayload = "";
        bool sendPostCalled = false;
        bool returnStatus = true;

        MockApiConnection() : ApiConnection("dummy_ssid", "dummy_pass", "http://dummy.url") {}

        bool sendPostRequest(const String& jsonPayload) override {
            sendPostCalled = true;
            capturedPayload = jsonPayload;
            return returnStatus;
        }
    
};

class MockSensor : public Sensor {
    private: 
        String type;
        float value;
    public:
        MockSensor(String t, float v) : type(t), value(v) {}
        void readData() override {}
        String getSensorType() override { return type; }
        float getValue() override { return value; }
};

// TEST CASES

SensorManager* manager;
MockApiConnection* mockApi;
DataDispatcher* dispatcher;

void setUp(void) {
    manager = new SensorManager();
    mockApi = new MockApiConnection();
    dispatcher = new DataDispatcher(manager, mockApi);
}

void tearDown(void) {
    delete dispatcher;
    delete mockApi;
    delete manager;
}

void test_dispatcher_empty_sensors(void) {

    dispatcher->update();

    TEST_ASSERT_TRUE(mockApi->sendPostCalled);

   
    TEST_ASSERT_EQUAL_STRING("null", mockApi->capturedPayload.c_str());
}

void test_dispatcher_single_sensor(void) {

    MockSensor* tempSensor = new MockSensor("temperature", 22.50);
    manager->addSensor(tempSensor);

    dispatcher->update();

    TEST_ASSERT_TRUE(mockApi->sendPostCalled);

    StaticJsonDocument<200> doc;
    DeserializationError error = deserializeJson(doc, mockApi->capturedPayload);
    TEST_ASSERT_EQUAL_INT(DeserializationError::Ok, error.code());


    TEST_ASSERT_TRUE(doc.containsKey("temp"));
    TEST_ASSERT_EQUAL_FLOAT(22.50, doc["temp"].as<float>());
    

}

void test_dispatcher_multiple_sensor(void) {

    MockSensor* tempSensor = new MockSensor("temperature", 23.50);
    MockSensor* humiditySensor = new MockSensor("airHumidity", 60.00);
    manager->addSensor(tempSensor);
    manager->addSensor(humiditySensor);

    dispatcher->update();

    TEST_ASSERT_TRUE(mockApi->sendPostCalled);

    StaticJsonDocument<500> doc;
    DeserializationError error = deserializeJson(doc, mockApi->capturedPayload);
    TEST_ASSERT_EQUAL_INT(DeserializationError::Ok, error.code());


    TEST_ASSERT_EQUAL_FLOAT(23.50, doc["temp"].as<float>());
    TEST_ASSERT_EQUAL_FLOAT(60.00, doc["airHum"].as<float>());


    TEST_ASSERT_FALSE(doc.containsKey("soilHum"));

}

void setup() {
    delay(2000);

    UNITY_BEGIN();

    RUN_TEST(test_dispatcher_empty_sensors);
    RUN_TEST(test_dispatcher_single_sensor);
    RUN_TEST(test_dispatcher_multiple_sensor);

    UNITY_END();
}

void loop() {

}