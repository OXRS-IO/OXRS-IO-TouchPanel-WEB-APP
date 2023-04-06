import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  base: "/OXRS-IO.github.io/",  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: [
        {
          chunkFileNames: "assets/[name].js",
          entryFileNames: "assets/[name].js",
          assetFileNames: "assets/[name].[ext]",
        }
      ],
    }
  }
})
