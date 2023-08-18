import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/styles/var.scss";' // 加载全局样式，使用scss特性
      }
    },
},

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
