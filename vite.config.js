import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [react()],
  assetsInclude: ['**/*.jsx'],
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  server: {
    port: 5000,
    open: true,
    fs: {
      strict: false
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
