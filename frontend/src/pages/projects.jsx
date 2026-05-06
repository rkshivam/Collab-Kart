import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function Projects() {
  const [projects, setProjects] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProjects(res.data)
    } catch (err) {
      navigate('/login')
    }
  }

  const createProject = async () => {
    try {
      await axios.post(`${API_BASE}/api/projects/create`,
        { name, description },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setName('')
      setDescription('')
      fetchProjects()
    } catch (err) {
      alert('Error creating project')
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2>Projects</h2>
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
      </div>

      <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h3>Create Project</h3>
        <input
          type="text"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
        />
        <button onClick={createProject} style={{ padding: '10px 20px' }}>
          Create
        </button>
      </div>

      <div style={{ marginTop: '30px' }}>
        {projects.map(project => (
          <div key={project._id} style={{ background: '#fff', border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '10px' }}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects