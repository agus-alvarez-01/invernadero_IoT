#ifdef ARDUINO
#include "UltrasonicSensor.h"

UltrasonicSensor::UltrasonicSensor(int triggerPin, int echoPin, int maxDistance)
{
    this->maxDistance = maxDistance;

    this->currentDistance = 0.0;
    this->sonar = new NewPing(triggerPin, echoPin, maxDistance);
}

UltrasonicSensor::~UltrasonicSensor()
{
    delete this->sonar;
}

void UltrasonicSensor::readData()
{
    // Leemos la distancia en cm usando la libreria NewPing
    this->currentDistance = this->sonar->ping_cm();
}

String UltrasonicSensor::getSensorType()
{
    return "waterLevel";
}

float UltrasonicSensor::getValue()
{
    return this->currentDistance;
}

#endif 