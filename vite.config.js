import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ieum-presentation/',
  build: {
    rollupOptions: {
      input: {
        // 기존 졸작 발표자료 (무수정)
        main: resolve(process.cwd(), 'index.html'),
        // 마케팅 발표자료 (신규)
        marketing: resolve(process.cwd(), 'marketing.html'),
      },
    },
  },
})
