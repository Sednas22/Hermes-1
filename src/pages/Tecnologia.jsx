import dados from '../data/dados.json'

export default function Tecnologia() {
  const { arquitetura } = dados

  return (
    <div className="page">
      <div className="container">

        <div className="hero">
          <div className="hero-tag">STACK TÉCNICA</div>
          <h1>Tecnologia e <span>arquitetura</span></h1>
          <p>
            O ecossistema Hermes-1 é composto por cinco camadas tecnológicas integradas,
            cobrindo desde a coleta física de dados até a interface de controle terrestre.
          </p>
        </div>

        <div className="section-title">FLUXO DA SOLUÇÃO</div>
        <div className="section-heading">Como o sistema funciona</div>
        <div className="section-desc">
          Os dados percorrem um caminho completo, do sensor físico na cápsula até o painel
          de controle na terra, em tempo real, com latência mínima via protocolo MQTT.
        </div>

        <div className="card" style={{ marginBottom: '2.5rem', fontFamily: 'var(--font-mono)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            padding: '1rem 0'
          }}>
            {['ESP32 (Wokwi)', 'MQTT / HiveMQ', 'Node-RED', 'React Dashboard', 'Python Auditor'].map((item, i, arr) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  background: 'var(--cyan-dim)',
                  border: '1px solid var(--cyan-border)',
                  borderRadius: '4px',
                  padding: '0.4rem 0.8rem',
                  color: 'var(--cyan)'
                }}>{item}</span>
                {i < arr.length - 1 && (
                  <span style={{ color: 'var(--orange)' }}>→</span>
                )}
              </span>
            ))}
          </div>
        </div>

        <div className="section-title">CAMADAS DO ECOSSISTEMA</div>
        <div className="section-heading">Detalhamento técnico</div>

        {arquitetura.map((item, i) => (
          <div className="arch-item" key={i}>
            <div className="arch-number">{String(i + 1).padStart(2, '0')}</div>
            <div className="arch-content">
              <h3>{item.camada}</h3>
              <div className="tech">{item.tecnologia}</div>
              <p>{item.descricao}</p>
            </div>
          </div>
        ))}

        <hr className="divider" />

        <div className="section-title">PROTOCOLOS E PADRÕES</div>
        <div className="section-heading">Decisões de engenharia</div>

        <div className="grid-2">
          <div className="card">
            <div className="card-label">Por que MQTT?</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
              O protocolo MQTT foi escolhido por ser leve, assíncrono e projetado para
              ambientes com restrição de banda, exatamente o cenário de comunicação
              espacial. Opera com modelo pub/sub, ideal para telemetria contínua.
            </p>
          </div>
          <div className="card">
            <div className="card-label">Por que ESP32?</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
              O ESP32-S2 oferece wifi integrado, múltiplas entradas analógicas e baixo
              consumo energético. É amplamente utilizado em sistemas embarcados de
              edge computing por sua relação entre capacidade e custo.
            </p>
          </div>
          <div className="card">
            <div className="card-label">Por que React?</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
              React permite construir interfaces reativas e componentizadas, ideais para
              dashboards que precisam atualizar dados em tempo real sem recarregar a
              página. O React Router DOM viabiliza a navegação entre módulos do sistema.
            </p>
          </div>
          <div className="card">
            <div className="card-label">Por que Python para auditoria?</div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginTop: '0.5rem' }}>
              Python é a linguagem padrão para análise de dados e automação de scripts
              de diagnóstico. Sua legibilidade e bibliotecas nativas tornam o processamento
              de logs de telemetria simples, robusto e auditável.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
