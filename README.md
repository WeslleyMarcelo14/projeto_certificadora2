# 🎓 Projeto - Certificadora de Competência 2 (EC46H)

Repositório do projeto desenvolvido para a disciplina **Certificadora de Competência 2 - EC46H**, ministrada pela professora **Flávia Belintani Blum Haddad** na UTFPR.

## 🛠️ Descrição

O projeto consiste em um **sistema de monitoramento IoT** para motores industriais, combinando hardware (ESP32) e software (aplicação web). O sistema coleta dados de sensores em tempo real e apresenta através de uma interface web moderna desenvolvida com **Next.js** e **TypeScript**.

### Funcionalidades Principais:

- 📊 **Monitoramento em Tempo Real**: Acompanhamento de RPM, corrente e temperatura do motor
- 📈 **Histórico de Dados**: Visualização de gráficos históricos com filtros personalizáveis  
- 💾 **Persistência de Dados**: Armazenamento no Firebase (Realtime Database + Firestore)
- 🔧 **Controle IoT**: Interface para gerenciar dados vindos do ESP32
- 🔐 **Sistema de Autenticação**: Login seguro com Firebase Auth
- 📱 **Interface Responsiva**: Design moderno e adaptável para diferentes dispositivos

## 🏗️ Arquitetura do Sistema

```
ESP32 (Hardware) → Firebase (Cloud) → Next.js App (Frontend)
     ↓                    ↓                    ↓
- Servo Motor         - Realtime DB      - Monitoramento
- Sensores           - Firestore        - Histórico  
- WiFi               - Authentication   - Controles
```

## 🎨 Paleta de Cores Utilizada

A identidade visual do projeto foi cuidadosamente definida para garantir clareza e contraste:

| Cor         | Hex      | Aplicação principal                             |
|-------------|----------|--------------------------------------------------|
| **Preto**   | `#1C1C1C`| Cor base da interface, plano de fundo principal |
| **Amarelo** | `#F2C94C`| Destaques como navbar e elementos de interação  |
| **Branco**  | `#FFFFFF`| Textos principais para garantir legibilidade     |
| **Cinza**   | `#F5F5F5`| Linhas, divisores e elementos de apoio           |

## 👥 Membros do Grupo

- [Allan Santos](https://github.com/alllanvfs)  
- [Tiago Souza](https://github.com/tiagomsouzac)  
- [Henry Ossamu](https://github.com/HenryCIX)  
- [Weslley Marcelo](https://github.com/WeslleyMarcelo14)

## 🎯 Objetivos do Projeto

### Acadêmicos
- Aplicar conceitos de **Internet das Coisas (IoT)**
- Integrar **hardware e software** em soluções práticas
- Desenvolver **interfaces web modernas** e responsivas
- Implementar **sistemas de monitoramento em tempo real**
- Utilizar **tecnologias cloud** para armazenamento e processamento

### Técnicos
- Demonstrar comunicação **ESP32 ↔ Firebase ↔ Web App**
- Criar dashboard para **visualização de dados** industriais
- Implementar **autenticação e segurança** de dados
- Desenvolver **API RESTful** para integração de sistemas
- Aplicar **boas práticas** de desenvolvimento web

## 🏆 Resultados Esperados

- ✅ Sistema funcional de monitoramento IoT
- ✅ Interface web responsiva e intuitiva  
- ✅ Coleta e armazenamento de dados em tempo real
- ✅ Visualização histórica através de gráficos
- ✅ Integração completa hardware/software/cloud

## 📞 Contato

Projeto desenvolvido por estudantes da **UTFPR** para a disciplina **EC46H**.  
Orientação: **Professora Flávia Belintani Blum Haddad**

---

*Este projeto demonstra a aplicação prática de conceitos IoT, desenvolvimento web moderno e integração de sistemas distribuídos.*

## 🚀 Tecnologias

### Frontend
- **Next.js 15** - Framework React para produção
- **TypeScript** - Linguagem de programação tipada
- **Tailwind CSS** - Framework CSS utilitário
- **Recharts** - Biblioteca para gráficos interativos
- **Firebase SDK** - Integração com serviços do Google

### Backend/Cloud
- **Firebase Realtime Database** - Banco de dados em tempo real
- **Firebase Firestore** - Banco de dados NoSQL
- **Firebase Authentication** - Sistema de autenticação
- **Python Flask** - API para integração com ESP32

### Hardware/IoT
- **ESP32** - Microcontrolador para coleta de dados
- **Servo Motor** - Atuador controlado via GPIO
- **Sensores** - Monitoramento de temperatura, corrente e RPM
- **WiFi** - Conectividade para envio de dados

## 📁 Estrutura do Projeto

```
projeto_certificadora2/
├── src/
│   ├── app/                    # Páginas da aplicação
│   │   ├── (main)/
│   │   │   ├── Principal/      # Página inicial do projeto
│   │   │   ├── Motor/          # Monitoramento em tempo real
│   │   │   └── Historico/      # Gráficos e histórico
│   │   └── Login/              # Sistema de autenticação
│   ├── Components/             # Componentes reutilizáveis
│   ├── contexts/               # Contextos React (Auth)
│   └── firebase/               # Configuração Firebase
├── aquisicao_esp_python/       # Código ESP32 e API Python
│   ├── Aquisicao.ino          # Firmware ESP32
│   ├── app.py                 # API Flask
│   └── *.json                 # Credenciais Firebase
└── public/                     # Recursos estáticos
```

## 🔧 Como Executar

### Pré-requisitos
- Node.js 18+
- Python 3.8+
- Conta Firebase configurada
- ESP32 (opcional para dados reais)

### Frontend (Next.js)
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

### Backend Python (API)
```bash
# Instalar dependências
pip install flask firebase-admin

# Executar API
python app.py
```

### Hardware (ESP32)
1. Instalar Arduino IDE
2. Adicionar bibliotecas: `WiFi`, `FirebaseESP32`, `ESP32Servo`
3. Configurar credenciais WiFi e Firebase
4. Fazer upload do código `Aquisicao.ino`

## 📊 Funcionalidades Detalhadas

### 🎯 Página Motor (`/Motor`)
- Visualização em tempo real dos dados do motor
- Tabela com histórico de registros
- Funcionalidades CRUD (Create, Read, Update, Delete)
- Ordenação e filtragem de dados
- Indicadores visuais de status

### 📈 Página Histórico (`/Historico`)
- Gráficos de linha interativos
- Filtros por tipo de dado (RPM, Corrente, Temperatura)
- Visualização temporal dos dados coletados
- Interface responsiva para diferentes dispositivos

### 🔐 Sistema de Autenticação
- Login seguro com Firebase Auth
- Proteção de rotas privadas
- Gerenciamento de sessão de usuário
- Redirecionamento automático
