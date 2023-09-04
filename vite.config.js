import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import eslintPlugin from "vite-plugin-eslint"
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  
  plugins: [vue(),
    // 启用 eslint 插件
    eslintPlugin({
      // 自动修复代码中的 ESLint 错误
      fix: true,
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import \"./src/styles/var.scss\";" // 加载全局样式，使用scss特性
      }
    },
  },

  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },

})
