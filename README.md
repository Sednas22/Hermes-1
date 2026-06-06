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

<h3>Estrutura do projeto:</h3>
<p>
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


<h3>Publicação:</h3>
<p>

🔗 Link do repositório: https://github.com/Sednas22/Hermes-1/tree/EdgeComputing

🔗 Link do Wokwi: https://wokwi.com/projects/465791681412231169

🔗 Link do Hermes-1: https://github.com/Sednas22/Hermes-1/
</p>
