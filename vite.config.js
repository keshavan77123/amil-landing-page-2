import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // GitHub project Pages serves this site under the repository name.
  base: process.env.GITHUB_ACTIONS ? '/amil-landing-page-2/' : '/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false,
    watch: {
      ignored: ['**/public/**', '**/node_modules/**']
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-swiper': ['swiper'],
          'vendor-icons': ['lucide-react'],
        }
      }
    }
  }
})
