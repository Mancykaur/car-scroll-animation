import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev
export default defineConfig({
  // Move 'base' here (outside of plugins)
  base: '/car-scroll-animation/', 
  plugins: [
    react(),
    tailwindcss(),
  ],
})
