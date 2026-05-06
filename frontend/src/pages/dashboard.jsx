import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [stats, setStats] = useState(null)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(res.data)
    } catch (err) {
      navigate('/login')
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  if (!stats) return <h2 style={{ textAlign: 'center' }}>Loading...</h2>

  return (
     <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h2>Dashboard</h2>
     <div>
      <button onClick={() => navigate('/projects')} style={{ marginRight: '10px' }}>
      Projects
      </button>
       <button onClick={handleLogout}>Logout</button>
       </div>
     </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '30px' }}>
        <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>{stats.totalTasks}</h3>
          <p>Total Tasks</p>
        </div>
        <div style={{ background: '#fff3cd', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>{stats.todo}</h3>
          <p>To Do</p>
        </div>
        <div style={{ background: '#cce5ff', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>{stats.inProgress}</h3>
          <p>In Progress</p>
        </div>
        <div style={{ background: '#d4edda', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>{stats.done}</h3>
          <p>Done</p>
        </div>
      </div>

      {stats.overdue > 0 && (
        <div style={{ background: '#f8d7da', padding: '15px', borderRadius: '8px', marginTop: '20px' }}>
          <p>{stats.overdue} Overdue Tasks</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard