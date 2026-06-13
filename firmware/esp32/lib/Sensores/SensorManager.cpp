#include "SensorManager.h"

void SensorManager::addSensor(Sensor* sensor)
{
    this->sensors.push_back(sensor);
}

void SensorManager::attachObserver(Observer* observer)
{
    this->observers.push_back(observer);
}

const std::vector<Sensor*>& SensorManager::getSensors() const
{
    return this->sensors;
}

void SensorManager::notifyObservers()
{
    for (Observer* obs : this->observers)
    {
        obs->update();
    }
}

void SensorManager::readAll()
{
    // Iterate over all registered sensors
    for (Sensor* sensor : this->sensors)
    {
        // Polymorphism: each sensor knows how to read its own data
        sensor->readData();
    }
    this->notifyObservers();
}