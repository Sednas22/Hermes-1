import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import Historico from './pages/Historico'
import Tecnologia from './pages/Tecnologia'
import Sustentabilidade from './pages/Sustentabilidade'
import Tripulacao from './pages/Tripulacao'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/"                  element={<Dashboard />} />
        <Route path="/historico"         element={<Historico />} />
        <Route path="/tecnologia"        element={<Tecnologia />} />
        <Route path="/sustentabilidade"  element={<Sustentabilidade />} />
        <Route path="/tripulacao"        element={<Tripulacao />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
