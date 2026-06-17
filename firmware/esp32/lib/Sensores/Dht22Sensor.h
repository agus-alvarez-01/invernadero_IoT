#ifdef ARDUINO
#ifndef DHT22SENSOR_H
#define DHT22SENSOR_H

#include "Sensor.h"
#include <DHT.h>

class Dht22Sensor : public Sensor {
    private:
        float currentValue; //Valor actual del sensor
        bool readTemperature; //Indica si el sensor es de temperatura o humedad
        DHT* dht; //Instancia de la libreria DHT

    public:
        // Constructor
        Dht22Sensor(int pin, bool isTemperature);

        // Destructor
        ~Dht22Sensor() override;

        // Implementacion de los metodos virtuales
        void readData() override;
        String getSensorType() override;
        float getValue() override;
};

#endif // DHT22SENSOR:H
#endif // ARDUINO