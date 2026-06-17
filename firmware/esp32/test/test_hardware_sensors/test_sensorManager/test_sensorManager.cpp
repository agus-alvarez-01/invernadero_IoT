#include <Arduino.h>
#include <unity.h>
#include "SensorManager.h"



class MockSensor : public Sensor {
    public:
        bool readDataCalled = false;

        void readData() override {
            readDataCalled = true;
        }
        String getSensorType() override { return "mock_sensor"; }
        float getValue() override{ return 42.0; }

};


class MockObserver : public Observer {
    public:
        bool updateCalled = false;
        int notificationCount = 0;

        void update() {
            updateCalled = true;
            notificationCount++;
        }
};



SensorManager* manager;
MockSensor* mockSensor1;
MockSensor* mockSensor2;
MockObserver* mockObserver;


void setUp(void) {
    manager = new SensorManager();
    mockSensor1 = new MockSensor();
    mockSensor2 = new MockSensor();
    mockObserver = new MockObserver();
}

void tearDown(void) {
    delete manager;
    delete mockSensor1;
    delete mockSensor2;
    delete mockObserver;
}

void test_add_sensor_increases_count(void) {

    TEST_ASSERT_EQUAL_INT(0, manager->getSensors().size());

    manager->addSensor(mockSensor1);
    TEST_ASSERT_EQUAL_INT(1, manager->getSensors().size());

    manager->addSensor(mockSensor2);
    TEST_ASSERT_EQUAL_INT(2, manager->getSensors().size());
}

void test_get_sensors_returns_correct_pointers(void) {
    manager->addSensor(mockSensor1);
    manager->addSensor(mockSensor2);

    const std::vector<Sensor*>& sensors = manager->getSensors();

    TEST_ASSERT_EQUAL_PTR(mockSensor1, sensors[0]);
    TEST_ASSERT_EQUAL_PTR(mockSensor2, sensors[1]);

}

void test_read_all_triggers_sensors_read_data(void) {
    manager->addSensor(mockSensor1);
    manager->addSensor(mockSensor2);

    TEST_ASSERT_FALSE(mockSensor1->readDataCalled);
    TEST_ASSERT_FALSE(mockSensor2->readDataCalled);

    manager->readAll();

    TEST_ASSERT_TRUE(mockSensor1->readDataCalled);
    TEST_ASSERT_TRUE(mockSensor2->readDataCalled);
    
}

void test_read_all_notifies_observers(void) {

    manager->attachObserver(mockObserver);

    TEST_ASSERT_FALSE(mockObserver->updateCalled);

    manager->readAll();

    TEST_ASSERT_TRUE(mockObserver->updateCalled);
    TEST_ASSERT_EQUAL_INT(1, mockObserver->notificationCount);
}


void setup() {
    delay(2000);

    UNITY_BEGIN();

    RUN_TEST(test_add_sensor_increases_count);
    RUN_TEST(test_get_sensors_returns_correct_pointers);
    RUN_TEST(test_read_all_triggers_sensors_read_data);
    RUN_TEST(test_read_all_notifies_observers);

    UNITY_END();
}

void loop() {

}
