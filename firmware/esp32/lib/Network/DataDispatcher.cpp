#include "DataDispatcher.h"
#include <ArduinoJson.h>

DataDispatcher::DataDispatcher(SensorManager* manager, ApiConnection* apiConnection)
{
    this->manager = manager;
    this->apiConnection = apiConnection;
}

void DataDispatcher::update()
{
    Serial.println("DataDispatcher: Processing new sensor data...");

    // 256 o 512 bytes es más que suficiente ahora que es un objeto plano compacto
    StaticJsonDocument<512> doc;

    for (Sensor* sensor : this->manager->getSensors())
    {
        if (sensor->getSensorType() == "temperature")
            doc["temp"] = sensor->getValue();
        if (sensor->getSensorType() == "soilHumidity")
            doc["soilHum"] = sensor->getValue();
        if (sensor->getSensorType() == "airHumidity")
            doc["airHum"] = sensor->getValue();
        if (sensor->getSensorType() == "waterLevel")
            doc["waterLevel"] = sensor->getValue();
    }

    // Serialize JSON en un String
    String jsonOutput;
    serializeJson(doc, jsonOutput);

    Serial.println("Payload optimizado para NestJS (Alternativa 1):");
    Serial.println(jsonOutput);

    // 4. Delegamos el envío al componente ApiConnection
    this->apiConnection->sendPostRequest(jsonOutput);
}