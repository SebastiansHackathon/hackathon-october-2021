#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "FASTWEB-2ZKAUU";
const char* password = "Y62PL5EGP7";

//Your Domain name with URL path or IP address with path
const char* serverName = "http://192.168.0.127:3000/sensor/update";

// the following variables are unsigned longs because the time, measured in
// milliseconds, will quickly become a bigger number than can be stored in an int.
unsigned long lastTime = 0;
// Timer set to 10 minutes (600000)
//unsigned long timerDelay = 600000;
// Set timer to 5 seconds (5000)
unsigned long timerDelay = 5000;

int pirPin = 25;

void setup() {
  Serial.begin(115200);

  //init pir
  pinMode(pirPin, INPUT);   

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  Serial.println("Timer set to 5 seconds (timerDelay variable), it will take 5 seconds before publishing the first reading.");
}

void loop() {
  //Send an HTTP POST request every 10 minutes
  if ((millis() - lastTime) > timerDelay) {
    //Check WiFi connection status
    if(WiFi.status()== WL_CONNECTED){
      WiFiClient client;
      HTTPClient http;

      int pir_value = readPir();
      String pir_status = String(pir_value);
    
      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName);
      
     //If you need an HTTP request with a content type: application/json, use the following:
      http.addHeader("Content-Type", "application/json");
      int httpResponseCode = http.POST("{\"sensor\":\"0001\",\"type\":\"PIR\",\"status\":\"" + pir_status + "\"}");
     
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
        
      // Free resources
      http.end();
    }
    else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}

int readPir(){
  int test = 1;
  return test;
  //return digitalRead(pirPin);
}
