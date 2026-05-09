import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // This forces Vite to strictly use only one instance of React
    dedupe: ['react', 'react-dom', 'zustand'] 
  }
})