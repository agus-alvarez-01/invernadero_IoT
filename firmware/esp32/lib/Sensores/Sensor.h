#ifndef SENSOR_H
#define SENSOR_H

#include <Arduino.h>
#include <string.h>

class Sensor {
    public:
        // Destructor
        virtual ~Sensor() = default;

        // Metodos a implementar en cada sensor
        virtual void readData() = 0;
        virtual String getSensorType() = 0;
        virtual float getValue() = 0;
};

#endif // SENSOR_H
