#ifndef ULTRASONICSENSOR_H
#define ULTRASONICSENSOR_H

#include "Sensor.h"
#include <NewPing.h>

class UltrasonicSensor : public Sensor {
    private: 
        float currentDistance; //Valor actual del sensor
        NewPing* sonar; //Instancia de la libreria NewPing
        int maxDistance; //Distancia maxima a medir (en cm)

    public:
        // Constructor
        UltrasonicSensor(int triggerPin, int echoPin, int maxDistance = 200);
        ~UltrasonicSensor() override;

        // Implementacion de los metodos virtuales
        void readData() override;
        String getSensorType() override;
        float getValue() override;
};

#endif // ULTRASONICSENSOR_H
