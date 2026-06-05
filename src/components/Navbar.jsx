import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <div className="navbar-dot" />
          <span>HERMES-1</span>
        </div>
        <ul className="navbar-links">
          <li><NavLink to="/" end>Dashboard</NavLink></li>
          <li><NavLink to="/historico">Histórico</NavLink></li>
          <li><NavLink to="/tecnologia">Tecnologia</NavLink></li>
          <li><NavLink to="/sustentabilidade">Sustentabilidade</NavLink></li>
          <li><NavLink to="/tripulacao">Tripulação</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}
