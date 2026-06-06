# Hermes-1 - Edge Computing & Computer Systems
<p>Entrega desenvolvida para a disciplina de <b>Edge Computing & Computer Systems</b>, como parte da Global Solution 2026 da FIAP. Projeto apresentado ao curso de Engenharia de Software.<p>
Desenvolvido por Cainã Sandes Batista - RM: 568571. <hr>

<h3>Sobre o projeto:</h3>
<p>
O <b>Hermes-1</b> é um ecossistema integrado de monitoramento de suporte à vida e telemetria para cápsulas espaciais, com foco na indústria espacial. Esta branch contém a camada de hardware embarcado e orquestração de fluxo do ecossistema, simulando a coleta de parâmetros críticos de habitabilidade da cápsula e sua transmissão para a base terrestre. As demais camadas do projeto (interface React, auditoria em Python e documentação completa) estão disponíveis nas branches específicas deste repositório.
</p>

<h3>Descrição da solução:</h3>
<p>
Um ESP32-S2 simulado no Wokwi monitora continuamente três parâmetros críticos de suporte à vida da cápsula Dragon: concentração de oxigênio, pressão atmosférica interna e temperatura da cabine. Os dados são transmitidos via protocolo <b>MQTT</b> para um broker público HiveMQ e consumidos pelo <b>Node-RED</b>, que exibe o dashboard em tempo real com gauges, histórico e status da missão. Quando qualquer parâmetro ultrapassa o limite crítico de segurança, o ESP32 aciona imediatamente um LED vermelho e um buzzer na cabine, enquanto o dashboard atualiza o status para <b>CRÍTICO</b>.<p>
<b>OBSERVAÇÃO:</b> o broker público foi optado para fins de simulação. Em produção, o ecossistema utilizaria o cluster privado HiveMQ Cloud com autenticação e TLS.
</p>

<h3>Arquitetura do projeto:</h3>
<p>
  [DHT22 + Potenciômetros] → [ESP32-S2] → [MQTT / HiveMQ] → [Node-RED] → [Dashboard /ui]

<ul>
  <li>wokwi (folder)</li>
  <ul>
    <b><li>sketch.ino</b> - Código principal do ESP32-S2. Realiza a leitura dos sensores, monta o payload JSON, publica via MQTT a cada 3 segundos e aciona os atuadores de alerta quando os limites críticos são atingidos;</li>
    <b><li>diagram.json</b> - Diagrama do circuito no Wokwi. Define os componentes (ESP32-S2, DHT22, dois potenciômetros, LED vermelho e buzzer) e todas as conexões entre eles;</li>
    <b><li>libraries.txt</b> - Lista de bibliotecas utilizadas na simulação: <code>DHT sensor library</code> e <code>PubSubClient</code>.</li>
  </ul>
  <li>node-red (folder)</li>
  <ul>
    <b><li>flows.json</b> - Flow completo do Node-RED para importação. Contém o nó MQTT inscrito no tópico <code>hermes1/telemetria</code>, o nó function que processa os dados e distribui para as 7 saídas, três gauges (O₂, pressão e temperatura), gráfico de histórico e texto de status da missão.</li>
  </ul>
</ul>
</p>

<h3>Parâmetros monitorados:</h3>
<p>
<ul>
  <li><b>Concentração de O₂</b> - Sensor: potenciômetro 1 (GPIO 6) · Faixa: 15% a 100% · Limite crítico: abaixo de 19.5%;</li>
  <li><b>Pressão atmosférica</b> - Sensor: potenciômetro 2 (GPIO 7) · Faixa: 80 kPa a 110 kPa · Limite crítico: abaixo de 95.0 kPa;</li>
  <li><b>Temperatura da cabine</b> - Sensor: DHT22 (GPIO 4) · Faixa: 15°C a 40°C · Limite crítico: acima de 28.0°C.</li>
</ul>
</p>

<h3>Componentes do circuito:</h3>
<p>
<ul>
  <li><b>ESP32-S2 DevKitM-1</b> - Microcontrolador principal;</li>
  <li><b>DHT22</b> - Sensor de temperatura (GPIO 4);</li>
  <li><b>Potenciômetro 1</b> - Simula concentração de O₂ (GPIO 6);</li>
  <li><b>Potenciômetro 2</b> - Simula pressão atmosférica (GPIO 7);</li>
  <li><b>LED vermelho</b> - Alerta visual de parâmetro crítico (GPIO 8);</li>
  <li><b>Buzzer</b> - Alerta sonoro de parâmetro crítico (GPIO 13);</li>
  <li><b>Resistor 220Ω</b> - Proteção do LED.</li>
</ul>
</p>

<h3>Como executar:</h3>

**1. Simulação no Wokwi (recomendado):**
<p>
<ul>
  <li>Acesse diretamente o projeto: <a href="https://wokwi.com/projects/465791681412231169">Hermes-1</a>;</li>
  <li>Clique em <b>▶ Play</b> para iniciar a simulação - o ESP32 conectará automaticamente ao broker HiveMQ e começará a publicar telemetria;</li>
  <li>Com a simulação rodando, interaja livremente com os componentes em tempo real:</li>
  <ul>
    <li>Gire o <b>Potenciômetro 1</b> para variar a concentração de O₂ - valores abaixo de 19.5% acionam o alerta;</li>
    <li>Gire o <b>Potenciômetro 2</b> para variar a pressão - valores abaixo de 95.0 kPa acionam o alerta;</li>
    <li>Clique no <b>DHT22</b> para alterar a temperatura simulada - valores acima de 28.0°C acionam o alerta;</li>
    <li>Quando em estado crítico, o <b>LED vermelho acende</b> e o <b>buzzer dispara</b> automaticamente.</li>
  </ul>
</ul>
</p>

**2. Dashboard no Node-RED:**
<p>
Certifique-se de ter o <a href="https://nodejs.org/pt-br">Node.js</a> instalado na máquina.
    
```bash
# Instale o Node-red
npm install -g node-red

# Inicie o Node-red
node-red
```
Acesse no navegador: <b>http://localhost:1880</b> ou <b>http://127.0.0.1:1880/</b>

- <p>Instale o pacote <code>node-red-dashboard</code> via <b>Menu ≡ → Manage palette → Install</b>;</p>
- <p>Importe o arquivo <code>node-red/flows.json</code> via <b>Menu ≡ → Import</b>;</p>
- <p>Clique em <b>Deploy</b>;</p>
- <p>Acesse o dashboard em <code>http://localhost:1880/ui</code> ou <code>http://127.0.0.1:1880/ui</code>;</p>
- <p>Com a simulação do Wokwi rodando, os dados aparecerão nos gauges em tempo real;</p>
- O dashboard consta com o histórico dos dados recebidos do Wokwi, podendo filtrar e acompanhar os parâmetros conforme o tempo.
</p>

<h3>Imagens do projeto:</h3>

<p>Circuito Hermes-1 operando / Circuito Hermes-1 em estado crítico<br>
<img height="300" alt="circuito hermes-1" src="https://github.com/user-attachments/assets/f6ecbd0d-42bf-452f-b120-3fe0f3700f8f" />
<img height="300" alt="circuito em critico" src="https://github.com/user-attachments/assets/0b5de9f1-8336-4bda-95a0-0662567c402b" /></p>
<p>Dados coletados e enviados no monitor / Fluxo Node-red tratando os dados<br>
<img height="150" alt="serial monitor" src="https://github.com/user-attachments/assets/49706171-8f92-4a69-9eba-68cd6caeed6d" padding="5px"/>
<img height="150" alt="fluxo node-red" src="https://github.com/user-attachments/assets/de0944d5-f5a5-4040-805e-60ab54cc11f5" /></p>
<p>Dashboard Hermes-1 operando / Dashboard Hermes-1 alertando anomalias<br>
<img width="500" alt="dashboard hermes-1" src="https://github.com/user-attachments/assets/61c6c3a3-cc53-484e-86d6-b046ca0816a2" />
<img width="500" alt="dashboard em critico" src="https://github.com/user-attachments/assets/5461a0c0-7ef0-4cc1-9917-c49211fe01ec" /></p>

<h3>Publicação:</h3>
<p>

🔗 Link do repositório: https://github.com/Sednas22/Hermes-1/tree/EdgeComputing

🔗 Link do Wokwi: https://wokwi.com/projects/465791681412231169

🔗 Link do Hermes-1: https://github.com/Sednas22/Hermes-1/
</p>
