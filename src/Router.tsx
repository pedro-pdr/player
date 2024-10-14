import { Routes, Route } from 'react-router-dom'
import { Player } from './pages/Player'
import { Login } from './pages/Login'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/player" element={<Player />} />
    </Routes>
  )
}