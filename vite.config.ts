import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/inventori',
  base: '/',
  plugins: [
    vue(),
    legacy(),
    splitVendorChunkPlugin()
  ],
  resolve: {
    // alias: {
    //   '@': path.resolve(__dirname, './src'),
    // },
    alias: {
      "~": fileURLToPath(new URL('./node_modules', import.meta.url)),
      "@": fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // test: {
  //   globals: true,
  //   environment: 'jsdom'
  // },
  build: {
    chunkSizeWarningLimit: 1600,
  },
})
