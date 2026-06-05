import { useState } from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [aberto, setAberto] = useState(false)

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-dot" />
          <span>HERMES-1</span>
        </div>

        <ul className="navbar-links">
          <li><NavLink to="/" end onClick={() => setAberto(false)}>Dashboard</NavLink></li>
          <li><NavLink to="/historico" onClick={() => setAberto(false)}>Histórico</NavLink></li>
          <li><NavLink to="/tecnologia" onClick={() => setAberto(false)}>Tecnologia</NavLink></li>
          <li><NavLink to="/sustentabilidade" onClick={() => setAberto(false)}>Sustentabilidade</NavLink></li>
          <li><NavLink to="/tripulacao" onClick={() => setAberto(false)}>Tripulação</NavLink></li>
        </ul>

        <button
          className={`hamburguer ${aberto ? 'ativo' : ''}`}
          onClick={() => setAberto(!aberto)}
          aria-label="Abrir menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-menu ${aberto ? 'aberto' : ''}`}>
        <ul>
          <li><NavLink to="/" end onClick={() => setAberto(false)}>Dashboard</NavLink></li>
          <li><NavLink to="/historico" onClick={() => setAberto(false)}>Histórico</NavLink></li>
          <li><NavLink to="/tecnologia" onClick={() => setAberto(false)}>Tecnologia</NavLink></li>
          <li><NavLink to="/sustentabilidade" onClick={() => setAberto(false)}>Sustentabilidade</NavLink></li>
          <li><NavLink to="/tripulacao" onClick={() => setAberto(false)}>Tripulação</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}