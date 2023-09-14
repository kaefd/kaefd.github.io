import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { splitVendorChunkPlugin } from 'vite'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue(), vueJsx()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })


// https://vitejs.dev/config/
export default defineConfig({
  base:'/',
  mode: 'development',
  plugins: [vue(), vueJsx(), splitVendorChunkPlugin()],
  server: {
    headers: {
      'Permissions-Policy': 'interest-cohort=()',
    },
    proxy: {
      '/api': {
        target: 'https://auristeel.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
  alias: {
  "~": fileURLToPath(new URL('./node_modules', import.meta.url)),
  // "@": fileURLToPath(new URL('./src', import.meta.url))
  },
  },
  build: {
  chunkSizeWarningLimit: 1600,
  },
  
  });