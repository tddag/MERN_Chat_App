import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: 'mernChatApp.js',
        chunkFileNames: 'chunk.js',
        assetFileNames: 'mernChatApp.css'
      }
    }
  }
})