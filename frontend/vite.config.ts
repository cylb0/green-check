import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@/api': path.resolve(__dirname, './src/api/index.ts'),
      '@/components': path.resolve(__dirname, './src/components/index.ts'),
      '@/constants': path.resolve(__dirname, './src/constants/index.ts'),
      '@/context': path.resolve(__dirname, './src/context/index.ts'),
      '@/data': path.resolve(__dirname, './src/data/index.ts'),
      '@/hooks': path.resolve(__dirname, './src/hooks/index.ts'),
      '@/layouts': path.resolve(__dirname, './src/layouts/index.ts'),
      '@/pages': path.resolve(__dirname, './src/pages/index.ts'),
      '@/services': path.resolve(__dirname, './src/services/index.ts'),
      '@/types': path.resolve(__dirname, './src/types/index.ts')
    }
  }
})
