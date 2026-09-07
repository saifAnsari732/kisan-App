import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  build: {
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('react-router-dom') || id.includes('react-router')) return 'vendor-router';
            if (id.includes('react-dom') || id.includes('react')) return 'vendor-react';
            if (id.includes('lucide-react')) return 'vendor-lucide';
            return 'vendor'; // group all other node_modules
          }
        }
      }
    },
    chunkSizeWarningLimit: 1000,
  }
})