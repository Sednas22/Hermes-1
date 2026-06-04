#include <Arduino.h>
#include "DHT.h"
#include <WiFi.h>
#include <WiFiClient.h>
#include <PubSubClient.h>

#define DHTPIN     4
#define DHTTYPE    DHT22
#define PIN_O2     6
#define PIN_PRESSAO 7
#define PIN_LED    8
#define PIN_BUZZER 11

const float LIMITE_MIN_O2      = 19.5;
const float LIMITE_MIN_PRESSAO = 95.0;
const float LIMITE_MAX_TEMP    = 28.0;

const char* ssid     = "Wokwi-GUEST";
const char* password = "";

const char* mqtt_server = "broker.hivemq.com";
const int   mqtt_port   = 1883;
const char* mqtt_user   = "Sandes";
const char* mqtt_pass   = "Csb1234!";

const char* TOPIC_TELEMETRIA = "hermes1/telemetria";
const char* TOPIC_ALERTA     = "hermes1/alerta";

DHT dht(DHTPIN, DHTTYPE);
WiFiClient espClient;
PubSubClient client(espClient);

unsigned long lastMsg = 0;

float lerO2() {
  int raw = analogRead(PIN_O2);
  return map(raw, 0, 4095, 150, 250) / 10.0;
}

float lerPressao() {
  int raw = analogRead(PIN_PRESSAO);
  return map(raw, 0, 4095, 800, 1100) / 10.0;
}

void setup_wifi() {
  delay(10);
  Serial.println("\nConectando ao Wi-Fi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi conectado!");
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Tentando conexão MQTT...");

    String clientId = "Hermes1-";
    clientId += String(random(0xffff), HEX);

    if (client.connect(clientId.c_str(), mqtt_user, mqtt_pass)) {
      Serial.println("Conectado ao HiveMQ!");
    } else {
      Serial.print("Falhou, rc=");
      Serial.print(client.state());
      Serial.println(" tentando novamente em 5s");
      delay(5000);
    }
  }
}

void dispararAlerta(bool estado) {
  digitalWrite(PIN_LED, estado ? HIGH : LOW);
  if (estado) {
    tone(PIN_BUZZER, 1000, 300);
  } else {
    noTone(PIN_BUZZER);
  }
}

void setup() {
  Serial.begin(115200);
  dht.begin();

  pinMode(PIN_LED,     OUTPUT);
  pinMode(PIN_BUZZER,  OUTPUT);
  pinMode(PIN_O2,      INPUT);
  pinMode(PIN_PRESSAO, INPUT);

  Serial.println("=== HERMES-1 INICIANDO ===");

  setup_wifi();

  WiFiClient espClient;
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!client.connected()) reconnect();
  client.loop();

  float temperatura = dht.readTemperature();
  float o2          = lerO2();
  float pressao     = lerPressao();

  if (isnan(temperatura)) {
    Serial.println("[ERRO] Falha na leitura do DHT22!");
    delay(1000);
    return;
  }

  bool emAlerta = (o2          < LIMITE_MIN_O2      ||
                   pressao     < LIMITE_MIN_PRESSAO  ||
                   temperatura > LIMITE_MAX_TEMP);

  dispararAlerta(emAlerta);

  Serial.println("===== TELEMETRIA HERMES-1 =====");
  Serial.print("Temperatura: "); Serial.print(temperatura); Serial.println(" °C");
  Serial.print("O2: ");          Serial.print(o2);          Serial.println(" %");
  Serial.print("Pressao: ");     Serial.print(pressao);     Serial.println(" kPa");
  Serial.print("Status: ");      Serial.println(emAlerta ? "CRITICO" : "NOMINAL");
  Serial.println("-------------------------------");

  if (millis() - lastMsg > 5000) {
    lastMsg = millis();

    String payload = "{";
    payload += "\"missao\":\"Hermes-1\",";
    payload += "\"temperatura\":" + String(temperatura) + ",";
    payload += "\"o2\":"          + String(o2)          + ",";
    payload += "\"pressao\":"     + String(pressao)     + ",";
    payload += "\"alerta\":"      + String(emAlerta ? "true" : "false") + ",";
    payload += "\"status\":\""    + String(emAlerta ? "CRITICO" : "NOMINAL") + "\"";
    payload += "}";

    client.publish(TOPIC_TELEMETRIA, payload.c_str());
    Serial.print("Enviado MQTT: ");
    Serial.println(payload);

    if (emAlerta) {
      client.publish(TOPIC_ALERTA, "{\"status\":\"CRITICO\",\"missao\":\"Hermes-1\"}");
      Serial.println("[ALERTA] Parametro critico detectado!");
    }
  }
}