import { useState } from 'react'
import dados from '../data/dados.json'

export default function Tripulacao() {
  const { tripulacao } = dados
  const [filtro, setFiltro] = useState('TODOS')

  const tripulacaoFiltrada = filtro === 'TODOS'
    ? tripulacao
    : tripulacao.filter(t => t.status === filtro)

  return (
    <div className="page">
      <div className="container">

        <div className="hero">
          <div className="hero-tag">MONITORAMENTO BIOMÉDICO</div>
          <h1>Status da <span>tripulação</span></h1>
          <p>
            Acompanhe em tempo real os indicadores biomédicos de cada tripulante.
            Filtre por status para triagem rápida em situações de alerta.
          </p>
        </div>

        <div className="filtros">
          {['TODOS', 'NOMINAL', 'CRITICO', 'REPOUSO'].map(f => (
            <button
              key={f}
              className={`btn-filtro ${filtro === f ? (f === 'CRITICO' ? 'ativo-critico' : 'ativo') : ''}`}
              onClick={() => setFiltro(f)}
            >
              {f === 'TODOS' ? 'Ver Todos' : f}
              {f !== 'TODOS' && (
                <span style={{ marginLeft: '0.5rem', opacity: 0.6 }}>
                  ({tripulacao.filter(t => t.status === f).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid-2">
          {tripulacaoFiltrada.length === 0 ? (
            <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Nenhum tripulante com este status.
            </p>
          ) : (
            tripulacaoFiltrada.map(t => (
              <div
                key={t.id}
                className={`crew-card ${t.status.toLowerCase()}`}
                style={{ position: 'relative', overflow: 'hidden' }}
              >
                {t.status === 'CRITICO' && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--orange), transparent)'
                  }} />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="crew-name">{t.nome}</div>
                    <div className="crew-cargo">{t.cargo}</div>
                  </div>
                  <span className={`badge ${t.status.toLowerCase()}`}>{t.status}</span>
                </div>

                <div className="crew-stats">
                  <div className="crew-stat">
                    <label>BPM</label>
                    <span style={{ color: t.bpm > 85 ? 'var(--orange)' : 'var(--cyan)' }}>
                      {t.bpm}
                    </span>
                  </div>
                  <div className="crew-stat">
                    <label>Estresse</label>
                    <span style={{ color: t.estresse > 60 ? 'var(--orange)' : 'var(--cyan)' }}>
                      {t.estresse}%
                    </span>
                  </div>
                  <div className="crew-stat">
                    <label>Tripulante</label>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      #{String(t.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <div>
                  <div style={{
                    fontSize: '0.65rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    letterSpacing: '1px',
                    marginBottom: '0.4rem'
                  }}>
                    NÍVEL DE ESTRESSE
                  </div>
                  <div style={{
                    height: '4px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '2px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: `${t.estresse}%`,
                      background: t.estresse > 60
                        ? 'linear-gradient(90deg, var(--orange), #ff3b3b)'
                        : 'linear-gradient(90deg, var(--cyan), var(--green))',
                      borderRadius: '2px',
                      transition: 'width 0.5s ease'
                    }} />
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        <hr className="divider" />

        <div className="section-title">LEGENDA DE STATUS</div>
        <div className="grid-3">
          <div className="card">
            <span className="badge nominal">NOMINAL</span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
              Todos os indicadores dentro dos parâmetros esperados. Tripulante apto para operações.
            </p>
          </div>
          <div className="card alert">
            <span className="badge critico">CRÍTICO</span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
              Indicadores fora do limite de segurança. Requer atenção imediata da equipe médica em terra.
            </p>
          </div>
          <div className="card">
            <span className="badge repouso">REPOUSO</span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.75rem' }}>
              Tripulante em período de descanso programado. Monitoramento passivo ativo.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
