#include "SoilMoistureSensor.h"

// Constructor
SoilMoistureSensor::SoilMoistureSensor(int pin)
{
    this->pin = pin;
    this->currentValue = 0.0;
}

void SoilMoistureSensor::readData()
{
    // Leemos el valor del sensor crudo
    int rawValue = analogRead(this->pin);

    // Mapeamos el valor en un porcentaje
    this->currentValue = map(rawValue, 0, 4095, 0, 100); // Asumiendo un ADC de 12 bits
}

String SoilMoistureSensor::getSensorType()
{
    return "soilHumidity";
}

float SoilMoistureSensor::getValue()
{
    return this->currentValue;
}
