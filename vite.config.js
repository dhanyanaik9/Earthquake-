import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 👇 Add the base path for your GitHub repo here
export default defineConfig({
  plugins: [react()],
  base: '/Earthquake-/',   // 👈 IMPORTANT
})
