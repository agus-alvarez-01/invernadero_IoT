#include "Dht22Sensor.h"

Dht22Sensor::Dht22Sensor(int pin, bool isTemperature)
{
    this->readTemperature = isTemperature;
    // Inicializamos la instancia de DHT
    this->dht = new DHT(pin, DHT22);
    this->dht->begin();
    this->currentValue = 0.0;
}

Dht22Sensor::~Dht22Sensor()
{
    delete this->dht;
}

void Dht22Sensor::readData()
{
    if (this->readTemperature)
    {
        this->currentValue = this->dht->readTemperature();
    }
    else
    {
        this->currentValue = this->dht->readHumidity();
    }
}

String Dht22Sensor::getSensorType()
{
    if (this->readTemperature)
    {
        return "temperature";
    }
    else
    {
        return "airHumidity";
    }
}

float Dht22Sensor::getValue()
{
    return this->currentValue;
}
