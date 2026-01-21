import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3004,
    host: true,       // 👈 escucha todas las interfaces
    strictPort: true,
    proxy: {
      '/M2SHOP': {
        target: 'http://192.168.10.193:3006',
        changeOrigin: true
      }
    }
  }
})