import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: ['talented-achievement-production-7bd5.up.railway.app', '0.0.0.0']
  }
})
