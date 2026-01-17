import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages처럼 서브 경로(/<repo>/)에 배포될 때도 자산 경로가 깨지지 않도록 상대 base 사용
  base: './',
  plugins: [react()],
})
