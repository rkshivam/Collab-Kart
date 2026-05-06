 import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Projects from './pages/projects'



function App() {
  const token = localStorage.getItem('token')

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App