#ifndef MOCK_SENSOR_ADAPTER_H
#define MOCK_SENSOR_ADAPTER_H

#include "Sensor.h"
#include "mock_sensor_model.hpp"
#include <Arduino.h>

// Adaptador para la Temperatura simulada
class MockTemperatureAdapter : public Sensor {
private:
    float currentValue = 0.0f;

public:
    // 1. Cumplimos con getSensorType()
    String getSensorType() override { return "temperature"; }
    
    // 2. Cumplimos con readData() (Acá actualizamos el valor)
    void readData() override {
        float elapsedSeconds = millis() / 1000.0f;
        currentValue = sensors::MockSensorModel::sampleAt(elapsedSeconds).temperature;
    }

    // 3. Cumplimos con getValue() (Acá devolvemos el valor guardado)
    float getValue() override {
        return currentValue;
    }
};

// Adaptador para la Humedad simulada
class MockHumidityAdapter : public Sensor {
private:
    float currentValue = 0.0f;

public:
    String getSensorType() override { return "humidity"; }
    
    void readData() override {
        float elapsedSeconds = millis() / 1000.0f;
        currentValue = sensors::MockSensorModel::sampleAt(elapsedSeconds).humidity;
    }

    float getValue() override {
        return currentValue;
    }
};

#endif