#ifndef APICONNECTION_H
#define APICONNECTION_H

#include <Arduino.h>
#include <WiFi.h> //La F es mayuscula si no no la toma ! 
#include <HTTPClient.h>

class ApiConnection{
    private:
        const char* ssid;
        const char* password;
        const char* endpointUrl;

    public:
        ApiConnection(const char* ssid, const char* password, const char* endpointUrl);

        //Metodo de conecion a wifi
        void connectWiFi();

        //Envia datos json al backend
        virtual bool sendPostRequest(const String& jsonPayload);

};
#endif