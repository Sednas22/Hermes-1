# Nome: Cainã Sandes Batista; RM: 568571.

# Limpa o terminal windows, mac ou linux
import os
os.system("cls" if os.name == "nt" else "clear")

# ======================================================
# HERMES-1 — Módulo de Auditoria Pós-Voo
# Analisa os logs de telemetria da cápsula Dragon
# e gera relatório de diagnóstico da missão
# ======================================================

# Arquivo de log gerado pelo sistema de telemetria
ARQUIVO_LOG = "telemetria_flight.txt"
ARQUIVO_RELATORIO = "relatorio_missao.txt"

# Limites críticos de segurança da cabine (tupla — imutável por definição de projeto)
LIMITES_CRITICOS = (
    19.5,   # O2 mínimo (%)
    95.0,   # pressão mínima (kPa)
    28.0    # temperatura máxima (°C)
)

# Informações fixas da missão
INFO_MISSAO = {
    "nome": "Hermes-1",
    "veiculo": "Cápsula Dragon — SpaceX",
    "orbita": "LEO (Low Earth Orbit)",
    "tripulantes": ["Cainã Oliveira", "Rachel Souza", "Yuri Tanaka", "Kenzo Lima"]
}

# Controle de navegação dos menus
rodando = True
submenu = 0

# Lista de registros carregados na memória durante a sessão
registros_carregados = []


# -------- FUNÇÕES DE ARQUIVO --------

# Cria o arquivo de log com dados simulados de telemetria
# Inclui leituras normais e algumas com falhas propositais para teste
def criar_log_exemplo():
    linhas = [
        "TIMESTAMP;O2;PRESSAO;TEMPERATURA;STATUS",
        "2026-06-01 08:00:00;21.0;101.3;22.5;NOMINAL",
        "2026-06-01 08:05:00;20.8;100.9;23.1;NOMINAL",
        "2026-06-01 08:10:00;20.5;100.5;23.8;NOMINAL",
        "2026-06-01 08:15:00;19.8;98.7;24.2;NOMINAL",
        "2026-06-01 08:20:00;18.9;94.1;25.0;CRITICO",   # O2 e pressão críticos
        "2026-06-01 08:25:00;ERRO;;24.5;INVALIDO",       # linha corrompida propositalmente
        "2026-06-01 08:30:00;20.1;99.2;29.3;CRITICO",   # temperatura crítica
        "2026-06-01 08:35:00;21.2;101.0;22.9;NOMINAL",
        "2026-06-01 08:40:00;21.5;102.3;22.1;NOMINAL",
        "2026-06-01 08:45:00;;101.8;23.0;INVALIDO",      # campo vazio propositalmente
        "2026-06-01 08:50:00;20.9;100.7;22.8;NOMINAL",
        "2026-06-01 08:55:00;21.0;101.2;22.5;NOMINAL",
    ]

    try:
        with open(ARQUIVO_LOG, "w", encoding="utf-8") as arquivo:
            for linha in linhas:
                arquivo.write(linha + "\n")
        print(f"[OK] Arquivo '{ARQUIVO_LOG}' criado com sucesso!")
    except Exception as e:
        print(f"[ERRO] Não foi possível criar o arquivo de log: {e}")


# Carrega e processa os registros do arquivo de telemetria
# Ignora linhas corrompidas e registra a quantidade de falhas encontradas
def carregar_registros():
    global registros_carregados
    registros_carregados = []
    falhas = 0

    try:
        with open(ARQUIVO_LOG, "r", encoding="utf-8") as arquivo:
            linhas = arquivo.readlines()

        # Ignora o cabeçalho
        for i, linha in enumerate(linhas[1:], start=2):
            linha = linha.strip()
            if not linha:
                continue

            partes = linha.split(";")

            # Valida se a linha tem os campos esperados
            try:
                timestamp = partes[0]
                o2 = float(partes[1])
                pressao = float(partes[2])
                temperatura = float(partes[3])
                status = partes[4]

                registros_carregados.append({
                    "timestamp": timestamp,
                    "o2": o2,
                    "pressao": pressao,
                    "temperatura": temperatura,
                    "status": status
                })

            except (ValueError, IndexError):
                # Linha corrompida — registra e segue
                falhas = falhas + 1
                print(f"  [AVISO] Linha {i} ignorada por dados inválidos: '{linha}'")

        print(f"\n[OK] {len(registros_carregados)} registros carregados. {falhas} linha(s) com falha ignorada(s).")

    except FileNotFoundError:
        print(f"[ERRO] Arquivo '{ARQUIVO_LOG}' não encontrado.")
        print("       Acesse a opção 1 do menu para criar um log de exemplo.")
    except Exception as e:
        print(f"[ERRO] Falha inesperada ao ler o arquivo: {e}")


# -------- FUNÇÕES DE ANÁLISE --------

# Calcula as médias dos parâmetros carregados na memória
def calcular_medias(registros: list) -> dict:
    if not registros:
        return {}

    soma_o2 = 0
    soma_pressao = 0
    soma_temp = 0

    for r in registros:
        soma_o2 = soma_o2 + r["o2"]
        soma_pressao = soma_pressao + r["pressao"]
        soma_temp = soma_temp + r["temperatura"]

    total = len(registros)

    return {
        "media_o2": round(soma_o2 / total, 2),
        "media_pressao": round(soma_pressao / total, 2),
        "media_temperatura": round(soma_temp / total, 2)
    }


# Filtra e retorna apenas os registros com status CRITICO
def filtrar_criticos(registros: list) -> list:
    return [r for r in registros if r["status"] == "CRITICO"]


# Verifica cada registro contra os limites críticos e retorna lista de anomalias detectadas
def detectar_anomalias(registros: list) -> list:
    anomalias = []

    limite_o2, limite_pressao, limite_temp = LIMITES_CRITICOS

    for r in registros:
        motivos = []

        if r["o2"] < limite_o2:
            motivos.append(f"O2 baixo ({r['o2']}%)")
        if r["pressao"] < limite_pressao:
            motivos.append(f"Pressão baixa ({r['pressao']} kPa)")
        if r["temperatura"] > limite_temp:
            motivos.append(f"Temperatura alta ({r['temperatura']}°C)")

        if motivos:
            anomalias.append({
                "timestamp": r["timestamp"],
                "motivos": motivos
            })

    return anomalias


# Calcula a autonomia estimada com base no consumo médio de O2 por hora
def calcular_autonomia(reserva_o2_litros: float, consumo_por_hora: float) -> float:
    if consumo_por_hora <= 0:
        raise ValueError("O consumo por hora precisa ser maior que zero.")
    return round(reserva_o2_litros / consumo_por_hora, 2)


# -------- FUNÇÕES DE EXIBIÇÃO --------

# Exibe o painel com as médias e anomalias detectadas
def exibir_diagnostico():
    if not registros_carregados:
        print("\n[AVISO] Nenhum registro na memória. Carregue o log primeiro (opção 2).")
        return

    medias = calcular_medias(registros_carregados)
    anomalias = detectar_anomalias(registros_carregados)
    criticos = filtrar_criticos(registros_carregados)

    print("\n" + "="*50)
    print("     DIAGNÓSTICO — MISSÃO HERMES-1")
    print("="*50)
    print(f"  Veículo   : {INFO_MISSAO['veiculo']}")
    print(f"  Órbita    : {INFO_MISSAO['orbita']}")
    print(f"  Registros : {len(registros_carregados)} leituras válidas")
    print("-"*50)
    print("  MÉDIAS DOS PARÂMETROS:")
    print(f"    O2          : {medias['media_o2']}%")
    print(f"    Pressão     : {medias['media_pressao']} kPa")
    print(f"    Temperatura : {medias['media_temperatura']}°C")
    print("-"*50)
    print(f"  Eventos CRÍTICOS detectados: {len(criticos)}")
    print(f"  Anomalias identificadas    : {len(anomalias)}")

    if anomalias:
        print("\n  DETALHAMENTO DAS ANOMALIAS:")
        for a in anomalias:
            print(f"    [{a['timestamp']}] → {', '.join(a['motivos'])}")

    print("="*50)


# Exibe a tela de cálculo de autonomia de O2 da missão
def menu_autonomia():
    print("\n--- Cálculo de Autonomia de O2 ---")
    print("  (Baseado nas reservas atuais da cápsula)\n")

    try:
        reserva = float(input("  Reserva atual de O2 (litros): "))
        consumo = float(input("  Consumo médio por hora (litros/h): "))
        horas = calcular_autonomia(reserva, consumo)

        print(f"\n  [RESULTADO] Autonomia estimada: {horas} horas")

        if horas < 24:
            print("  [ALERTA] Autonomia crítica — menos de 24 horas!")
        elif horas < 72:
            print("  [ATENÇÃO] Autonomia limitada — menos de 72 horas.")
        else:
            print("  [OK] Autonomia dentro do esperado para a missão.")

    except ValueError as e:
        print(f"\n  [ERRO] Entrada inválida: {e}")
    except Exception as e:
        print(f"\n  [ERRO] Falha inesperada: {e}")


# -------- FUNÇÃO DE RELATÓRIO --------

# Gera e salva o relatório completo da missão em arquivo .txt
def gerar_relatorio():
    if not registros_carregados:
        print("\n[AVISO] Nenhum registro na memória. Carregue o log primeiro (opção 2).")
        return

    medias = calcular_medias(registros_carregados)
    anomalias = detectar_anomalias(registros_carregados)
    criticos = filtrar_criticos(registros_carregados)
    agora = "2026-06-01 09:00:00" # data e hora de geração do relatório

    try:
        with open(ARQUIVO_RELATORIO, "w", encoding="utf-8") as rel:
            rel.write("="*50 + "\n")
            rel.write("   RELATÓRIO DE AUDITORIA — MISSÃO HERMES-1\n")
            rel.write("="*50 + "\n")
            rel.write(f"Gerado em       : {agora}\n")
            rel.write(f"Veículo         : {INFO_MISSAO['veiculo']}\n")
            rel.write(f"Órbita          : {INFO_MISSAO['orbita']}\n")
            rel.write(f"Tripulantes     : {', '.join(INFO_MISSAO['tripulantes'])}\n")
            rel.write("-"*50 + "\n")
            rel.write("MÉDIAS DOS PARÂMETROS:\n")
            rel.write(f"  O2            : {medias['media_o2']}%\n")
            rel.write(f"  Pressão       : {medias['media_pressao']} kPa\n")
            rel.write(f"  Temperatura   : {medias['media_temperatura']}°C\n")
            rel.write("-"*50 + "\n")
            rel.write(f"Eventos críticos: {len(criticos)}\n")
            rel.write(f"Anomalias       : {len(anomalias)}\n")

            if anomalias:
                rel.write("\nDETALHAMENTO DAS ANOMALIAS:\n")
                for a in anomalias:
                    rel.write(f"  [{a['timestamp']}] → {', '.join(a['motivos'])}\n")

            rel.write("="*50 + "\n")

        print(f"\n[OK] Relatório salvo em '{ARQUIVO_RELATORIO}'!")

    except Exception as e:
        print(f"[ERRO] Não foi possível salvar o relatório: {e}")


# -------- MENU PRINCIPAL --------

print("""
╔══════════════════════════════════════════╗
║     HERMES-1 — Auditoria Pós-Voo        ║
║     Módulo de Análise de Telemetria      ║
╚══════════════════════════════════════════╝
""")

while rodando:
    print("""
    Menu Principal

    1 - Criar log de exemplo (telemetria simulada)
    2 - Carregar log de telemetria
    3 - Exibir diagnóstico da missão
    4 - Calcular autonomia de O2
    5 - Gerar relatório em arquivo
    0 - Encerrar sistema
    """)

    opcao = input("  Escolha: ")

    match opcao:
        case "0":
            print("\n[HERMES-1] Sistema encerrado. Missão registrada.\n")
            rodando = False

        case "1":
            criar_log_exemplo()

        case "2":
            print(f"\nCarregando '{ARQUIVO_LOG}'...")
            carregar_registros()

        case "3":
            exibir_diagnostico()

        case "4":
            menu_autonomia()

        case "5":
            gerar_relatorio()

        case _:
            print("\n[AVISO] Opção inválida. Tente novamente.")

# Nome: Cainã Sandes Batista; RM: 568571.