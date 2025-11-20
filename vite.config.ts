import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Grafos_rotaMinima/',
  
  css: {
    postcss: {
      plugins: []
    }
  },

  plugins: [react(), tailwindcss()],
})