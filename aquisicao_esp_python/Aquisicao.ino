#include <WiFi.h> 
#include <FirebaseESP32.h>
#include <ESP32Servo.h>
#include "time.h" 

#define WIFI_SSID "AP 20" 
#define WIFI_PASSWORD "20252024" 


#define FIREBASE_HOST "https://projetocertificadora2-default-rtdb.firebaseio.com"
#define FIREBASE_API_KEY "AIzaSyB7dqK2lKg9Tn4mwIhQ2WJF3tBD1exscJQ"

FirebaseData firebaseData;      
FirebaseAuth firebaseAuth;      
FirebaseConfig firebaseConfig; 

Servo servoMotor;
const int servoPin = 14;
int posicaoAtual = 90; // Posição inicial do servo (90 graus)
bool direcao = true; // true = horário, false = anti-horário

unsigned long sendDataPrevMillis = 0;
const int sendInterval = 10000; 


const char* ntpServer = "pool.ntp.org";
const long  gmtOffset_sec = -10800; 
const int   daylightOffset_sec = 0; 

void setup() {
  Serial.begin(115200); 
  Serial.println("\n");

  // Configurar servo motor (descomente quando tiver o servo)
  // servoMotor.attach(servoPin);
  // servoMotor.write(posicaoAtual);
  // Serial.println("Servo motor inicializado no GPIO 14");

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

// Função para enviar dados fictícios (valores aleatórios)
void enviarDadosFicticios() {
  Serial.println(">>> ENVIANDO DADOS FICTÍCIOS <<<");
  
  float temperaturaMotor = random(400, 800) / 10.0;  // 40-80°C
  int rpmMotor = random(1000, 3000);                 // 1000-3000 RPM
  float correnteMotor = random(50, 200) / 10.0;      // 5-20A

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

void enviarDadosServo() {
  Serial.println(">>> ATUALIZANDO SERVO MOTOR E ENVIANDO DADOS <<<");

  if (direcao) {
    posicaoAtual += 10;
    if (posicaoAtual >= 180) {
      posicaoAtual = 180;
      direcao = false;
    }
  } else {
    posicaoAtual -= 10;
    if (posicaoAtual <= 0) {
      posicaoAtual = 0;
      direcao = true;
    }
  }
  
  servoMotor.write(posicaoAtual);
  Serial.print("Servo movido para posição: ");
  Serial.print(posicaoAtual);
  Serial.println(" graus");

  float temperaturaMotor = 25.0 + (posicaoAtual / 180.0) * 50.0; 
  int rpmMotor = 1000 + (posicaoAtual * 10); 
  float correnteMotor = 5.0 + (posicaoAtual / 180.0) * 15.0; 

  Serial.print("Enviando Posição do Servo: ");
  Serial.print(posicaoAtual);
  Serial.print(" para ");
  Serial.println("/Motor/PosicaoServo");
  if (Firebase.RTDB.setInt(&firebaseData, "/Motor/PosicaoServo", posicaoAtual)) {
    Serial.println("  -> Envio de Posição do Servo BEM-SUCEDIDO!");
  } else {
    Serial.print("  -> ERRO ao enviar Posição do Servo: ");
    Serial.println(firebaseData.errorReason());
  }

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

void loop() {
  if (!Firebase.ready()) {
    Serial.println("Firebase AINDA NÃO ESTÁ PRONTO para operações.");
    delay(1000);
    return;
  }

  if (millis() - sendDataPrevMillis > sendInterval) {
    sendDataPrevMillis = millis();
    
    // Enviar dados do servo motor
    enviarDadosFicticios();
    
    // Enviar dados fictios (valores aleatórios)
    // enviarDadosServo();
  }

  delay(10);
}