#ifndef SOILMOISTURESENSOR_H
#define SOILMOISTURESENSOR_H

#include "Sensor.h"

class SoilMoistureSensor : public Sensor {
    private:
        int pin; //Pin de conexion del sensor
        float currentValue; //Valor actual del sensor

    public:
        // Constructor
        SoilMoistureSensor(int pin);

        // Implementacion de los metodos virtuales
        void readData() override;
        String getSensorType() override;
        float getValue() override;
};

#endif // SOILMOISTURESENSOR_H
