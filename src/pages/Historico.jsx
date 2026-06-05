import dados from '../data/dados.json'

export default function Historico() {
  const { telemetria, limites } = dados

  const criticos = telemetria.filter(r => r.status === 'CRITICO').length
  const nominais = telemetria.filter(r => r.status === 'NOMINAL').length

  return (
    <div className="page">
      <div className="container">

        <div className="hero">
          <div className="hero-tag">AUDITORIA DE VOO</div>
          <h1>Histórico da <span>missão</span></h1>
          <p>
            Registro completo das leituras de telemetria coletadas durante o voo.
            Eventos críticos são sinalizados automaticamente para análise técnica.
          </p>
        </div>

        <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
          <div className="card">
            <div className="card-label">Total de Leituras</div>
            <div className="card-value">{telemetria.length}</div>
            <div className="card-unit">registros válidos</div>
          </div>
          <div className="card">
            <div className="card-label">Leituras Nominais</div>
            <div className="card-value" style={{ color: 'var(--green)' }}>{nominais}</div>
            <div className="card-unit">dentro dos limites</div>
          </div>
          <div className="card alert">
            <div className="card-label">Eventos Críticos</div>
            <div className="card-value critical">{criticos}</div>
            <div className="card-unit">parâmetros fora do limite</div>
          </div>
        </div>

        <hr className="divider" />

        <div className="section-title">LOG DE TELEMETRIA</div>
        <div className="section-heading">Registros do voo</div>
        <div className="section-desc">
          Cada linha representa uma leitura transmitida pelo ESP32 via MQTT durante a missão.
          Leituras marcadas em laranja indicam parâmetros fora dos limites de segurança.
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="tabela">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>O₂ (%)</th>
                <th>Pressão (kPa)</th>
                <th>Temperatura (°C)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {telemetria.map((r, i) => (
                <tr key={i} className={r.status === 'CRITICO' ? 'critico' : ''}>
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{r.timestamp}</td>
                  <td style={{ color: r.o2 < limites.o2_min ? 'var(--orange)' : 'var(--text-primary)' }}>
                    {r.o2.toFixed(1)}
                  </td>
                  <td style={{ color: r.pressao < limites.pressao_min ? 'var(--orange)' : 'var(--text-primary)' }}>
                    {r.pressao.toFixed(1)}
                  </td>
                  <td style={{ color: r.temperatura > limites.temp_max ? 'var(--orange)' : 'var(--text-primary)' }}>
                    {r.temperatura.toFixed(1)}
                  </td>
                  <td>
                    <span className={`badge ${r.status === 'CRITICO' ? 'critico' : 'nominal'}`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr className="divider" />

        <div className="section-title">LIMITES DE SEGURANÇA</div>
        <div className="section-heading">Parâmetros de Referência</div>

        <div className="grid-3">
          <div className="card">
            <div className="card-label">O₂ Mínimo</div>
            <div className="card-value">{limites.o2_min}</div>
            <div className="card-unit">% - abaixo disso: alerta crítico</div>
          </div>
          <div className="card">
            <div className="card-label">Pressão Mínima</div>
            <div className="card-value">{limites.pressao_min}</div>
            <div className="card-unit">kPa - abaixo disso: alerta crítico</div>
          </div>
          <div className="card">
            <div className="card-label">Temperatura Máxima</div>
            <div className="card-value">{limites.temp_max}</div>
            <div className="card-unit">°C - acima disso: alerta crítico</div>
          </div>
        </div>

      </div>
    </div>
  )
}
