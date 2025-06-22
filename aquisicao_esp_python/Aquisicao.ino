#include <WiFi.h> 
#include <FirebaseESP32.h>
#include "time.h" 

#define WIFI_SSID "AP 20" 
#define WIFI_PASSWORD "20252024" 


#define FIREBASE_HOST "https://projetocertificadora2-default-rtdb.firebaseio.com"
#define FIREBASE_API_KEY "AIzaSyB7dqK2lKg9Tn4mwIhQ2WJF3tBD1exscJQ"

FirebaseData firebaseData;      
FirebaseAuth firebaseAuth;      
FirebaseConfig firebaseConfig; 

unsigned long sendDataPrevMillis = 0;
const int sendInterval = 10000; 


const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = -10800; 
const int   daylightOffset_sec = 0; 

void setup() {
  Serial.begin(115200); 
  Serial.println("\n");

  Serial.print("Conectando-se ao Wi-Fi: ");
  Serial.println(WIFI_SSID);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWi-Fi Conectado!");
  Serial.print("Endereço IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Serial.println("Configurando tempo com NTP...");
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);

  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Falha ao obter tempo do NTP, tentando novamente...");
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer); 
    if (!getLocalTime(&timeinfo)) {
      Serial.println("Falha crítica ao obter tempo do NTP. Operações Firebase podem falhar.");
    }
  }
  Serial.print("Tempo sincronizado: ");
  Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");

  firebaseConfig.api_key = FIREBASE_API_KEY;
  firebaseConfig.database_url = FIREBASE_HOST;

  Firebase.reconnectWiFi(true);

  firebaseConfig.signer.resolveCertificate = false;

  Serial.print("Conectando ao Firebase...");
  Firebase.begin(&firebaseConfig, &firebaseAuth);
  Serial.println(" Conectado!");
  Serial.println("Aguardando operações...");
}

void loop() {
  if (!Firebase.ready()) {
    Serial.println("Firebase AINDA NÃO ESTÁ PRONTO para operações.");
    delay(1000);
    return;
  }

  if (millis() - sendDataPrevMillis > sendInterval) {
    sendDataPrevMillis = millis();
    Serial.println(">>> TENTANDO ENVIAR DADOS PARA O MOTOR <<<");

    float temperaturaMotor = random(400, 800) / 10.0; 
    int rpmMotor = random(1000, 3000);              
    float correnteMotor = random(50, 200) / 10.0;   

    Serial.print("Enviando Temperatura do Motor: ");
    Serial.print(temperaturaMotor);
    Serial.print(" para ");
    Serial.println("/Motor/Temperatura");
    if (Firebase.RTDB.setFloat(&firebaseData, "/Motor/Temperatura", temperaturaMotor)) {
      Serial.println("  -> Envio de Temperatura do Motor BEM-SUCEDIDO!");
    } else {
      Serial.print("  -> ERRO ao enviar Temperatura do Motor: ");
      Serial.println(firebaseData.errorReason());
    }

    Serial.print("Enviando RPM do Motor: ");
    Serial.print(rpmMotor);
    Serial.print(" para ");
    Serial.println("/Motor/RPM");
    if (Firebase.RTDB.setInt(&firebaseData, "/Motor/RPM", rpmMotor)) {
      Serial.println("  -> Envio de RPM do Motor BEM-SUCEDIDO!");
    } else {
      Serial.print("  -> ERRO ao enviar RPM do Motor: ");
      Serial.println(firebaseData.errorReason());
    }

    Serial.print("Enviando Corrente do Motor: ");
    Serial.print(correnteMotor);
    Serial.print(" para ");
    Serial.println("/Motor/Corrente");
    if (Firebase.RTDB.setFloat(&firebaseData, "/Motor/Corrente", correnteMotor)) {
      Serial.println("  -> Envio de Corrente do Motor BEM-SUCEDIDO!");
    } else {
      Serial.print("  -> ERRO ao enviar Corrente do Motor: ");
      Serial.println(firebaseData.errorReason());
    }
  }

  delay(10);
}