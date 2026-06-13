#include "ApiConnection.h"

ApiConnection::ApiConnection(const char* ssid, const char* password, const char* endpointUrl)
{
    this->ssid = ssid;
    this->password = password;
    this->endpointUrl = endpointUrl;
}

void ApiConnection::connectWiFi()
{
    Serial.print("Connecting to WiFi: ");
    Serial.println(this->ssid);

    WiFi.begin(this->ssid, this->password);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println("\nWifi connected.");
    Serial.println("IP Address: ");
    Serial.println(WiFi.localIP());
}

bool ApiConnection::sendPostRequest(const String& jsonPayload)
{
    if (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("Error: WiFi disconected. Cannot send data");
        return false;
    }

    HTTPClient http;
    http.begin(this->endpointUrl);
    http.addHeader("Content-Type", "application/json");

    int httpResponseCode = http.POST(jsonPayload);

    if (httpResponseCode > 0)
    {
        Serial.print("HTTP Response code: ");
        Serial.println(httpResponseCode);
        http.end();
        return true;
    }
    else
    {
        Serial.print("Error code: ");
        Serial.println(httpResponseCode);
        http.end();
        return false;
    }
}