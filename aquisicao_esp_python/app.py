import os
from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, db

app = Flask(__name__)

SERVICE_ACCOUNT_KEY_PATH = 'projetocertificadora2-firebase-adminsdk-fbsvc-d243a787ca.json' 
DATABASE_URL = 'https://projetocertificadora2-default-rtdb.firebaseio.com/' 

if not os.path.exists(SERVICE_ACCOUNT_KEY_PATH):
    print(f"ERRO: Arquivo de chave da conta de serviço não encontrado em '{SERVICE_ACCOUNT_KEY_PATH}'")
    print("Por favor, baixe o arquivo JSON do Console do Firebase (Project settings > Service accounts) e coloque-o na mesma pasta do seu script.")
    exit()

cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
firebase_admin.initialize_app(cred, {
    'databaseURL': DATABASE_URL
})

ref = db.reference('/') 

@app.route('/send-data', methods=['POST'])
def receive_data():
    if request.method == 'POST':
        try:
            data = request.get_json()
            if data is None:
                raise ValueError("Payload não é JSON ou está vazio.")

            print(f"Dados recebidos do ESP32: {data}")

            timestamp_val = {".sv": "timestamp"} 

            data_type = data.get('type') 
            value = data.get('value', 'no_value')
            field = data.get('field', 'unknown_field')

            if data_type == "Motor" and field != "unknown_field":
                motor_data = {
                    field: value,
                    "last_update": timestamp_val 
                }
                ref.child('Motor').update(motor_data)
                print(f"Dados enviados para Firebase em 'Motor/{field}': {value}")

            elif data_type == "Motor" and "data" in data:
                data_to_update = data.get("data")
                if isinstance(data_to_update, dict):
                    data_to_update["last_update_overall"] = timestamp_val
                    ref.child('Motor').update(data_to_update)
                    print(f"Múltiplos dados enviados para Firebase em 'Motor': {data_to_update}")
                else:
                    raise ValueError("Payload para 'Motor' com 'data' inválido.")

            else:
                data_to_firebase = {
                    "value": value,
                    "timestamp": timestamp_val
                }
                ref.child(f'esp_data/{data.get("sensor_id", "unknown_esp")}').set(data_to_firebase)
                print(f"Dados enviados para Firebase em 'esp_data/{data.get('sensor_id', 'unknown_esp')}' (tipo desconhecido ou não Motor)")

            return jsonify({"status": "success", "message": "Data received and sent to Firebase"}), 200

        except Exception as e:
            print(f"Erro ao processar a requisição: {e}")
            return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    print(f"Servidor Python iniciado. Escutando em http://0.0.0.0:5000/send-data")
    print("Certifique-se de que o ESP32 pode alcançar este IP e porta.")
    app.run(host='0.0.0.0', port=5000)