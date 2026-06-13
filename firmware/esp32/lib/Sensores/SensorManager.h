#ifndef SENSOR_MANAGER_H
#define SENSOR_MANAGER_H

#include <vector>
#include "Sensor.h"
#include "Observer.h"

class SensorManager {
private:
    // List of pointers to the generic Sensor interface
    std::vector<Sensor*> sensors;
    std::vector<Observer*> observers;

    //Metodo interno para notificar a los observers
    void notifyObservers();

public:
    // Default constructor
    SensorManager() = default;

    // Adds a sensor to the manager's list
    void addSensor(Sensor* sensor);
    void attachObserver(Observer* observer);

    // Return la lista de sensores para que el Dispatch pueda leerlo
    const std::vector<Sensor*>& getSensors() const;

    // Iterates through all sensors and triggers a read operation
    void readAll();
};

#endif // SENSOR_MANAGER_H