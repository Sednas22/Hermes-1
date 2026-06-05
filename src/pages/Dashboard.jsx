import dados from '../data/dados.json'
import Footer from '../components/Footer'

export default function Dashboard() {
  const { missao, telemetria, limites } = dados
  const ultimo = telemetria[telemetria.length - 1]
  const emAlerta = ultimo.o2 < limites.o2_min || ultimo.pressao < limites.pressao_min || ultimo.temperatura > limites.temp_max

  return (
    <div className="page">
      <div className="container">

        <div className="hero">
          <div className="hero-tag">MISSÃO ATIVA - {missao.orbita}</div>
          <h1>HERMES<span>-1</span></h1>
          <p>
            Sistema integrado de monitoramento de suporte à vida para cápsulas espaciais.
            Acompanhe os parâmetros críticos de habitabilidade em tempo real.
          </p>
        </div>

        <div className="grid-3" style={{ marginBottom: '2rem' }}>
          <div className="card">
            <div className="card-label">Veículo</div>
            <div style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600 }}>{missao.veiculo}</div>
          </div>
          <div className="card">
            <div className="card-label">Altitude</div>
            <div className="card-value">{missao.altitude}</div>
          </div>
          <div className="card">
            <div className="card-label">Velocidade Orbital</div>
            <div className="card-value" style={{ fontSize: '1.4rem' }}>{missao.velocidade}</div>
          </div>
          <div className="card">
            <div className="card-label">Duração da Missão</div>
            <div className="card-value" style={{ fontSize: '1.4rem' }}>{missao.duracao}</div>
          </div>
          <div className="card">
            <div className="card-label">Status da Missão</div>
            <div style={{ marginTop: '0.5rem' }}>
              <span className={`badge ${emAlerta ? 'critico' : 'nominal'}`}>
                {emAlerta ? 'ALERTA ATIVO' : 'NOMINAL'}
              </span>
            </div>
          </div>
          <div className="card">
            <div className="card-label">Última Leitura</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {ultimo.timestamp}
            </div>
          </div>
        </div>

        <hr className="divider" />

        <div className="section-title">TELEMETRIA EM TEMPO REAL</div>
        <div className="section-heading">Parâmetros da cabine</div>
        <div className="section-desc">
          Monitoramento contínuo dos sistemas de suporte à vida da cápsula.
          Alertas são disparados automaticamente quando os limites críticos são atingidos.
        </div>

        <div className="grid-3">
          <div className={`card ${ultimo.o2 < limites.o2_min ? 'alert' : ''}`}>
            <div className="card-label">Concentração de O₂</div>
            <div className={`card-value ${ultimo.o2 < limites.o2_min ? 'critical' : ''}`}>
              {ultimo.o2.toFixed(1)}
            </div>
            <div className="card-unit">% · Limite mínimo: {limites.o2_min}%</div>
            <div style={{ marginTop: '0.75rem' }}>
              <span className={`badge ${ultimo.o2 < limites.o2_min ? 'critico' : 'nominal'}`}>
                {ultimo.o2 < limites.o2_min ? 'CRÍTICO' : 'NOMINAL'}
              </span>
            </div>
          </div>

          <div className={`card ${ultimo.pressao < limites.pressao_min ? 'alert' : ''}`}>
            <div className="card-label">Pressão Atmosférica</div>
            <div className={`card-value ${ultimo.pressao < limites.pressao_min ? 'critical' : ''}`}>
              {ultimo.pressao.toFixed(1)}
            </div>
            <div className="card-unit">kPa · Limite mínimo: {limites.pressao_min} kPa</div>
            <div style={{ marginTop: '0.75rem' }}>
              <span className={`badge ${ultimo.pressao < limites.pressao_min ? 'critico' : 'nominal'}`}>
                {ultimo.pressao < limites.pressao_min ? 'CRÍTICO' : 'NOMINAL'}
              </span>
            </div>
          </div>

          <div className={`card ${ultimo.temperatura > limites.temp_max ? 'alert' : ''}`}>
            <div className="card-label">Temperatura da Cabine</div>
            <div className={`card-value ${ultimo.temperatura > limites.temp_max ? 'critical' : ''}`}>
              {ultimo.temperatura.toFixed(1)}
            </div>
            <div className="card-unit">°C · Limite máximo: {limites.temp_max}°C</div>
            <div style={{ marginTop: '0.75rem' }}>
              <span className={`badge ${ultimo.temperatura > limites.temp_max ? 'critico' : 'nominal'}`}>
                {ultimo.temperatura > limites.temp_max ? 'CRÍTICO' : 'NOMINAL'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
