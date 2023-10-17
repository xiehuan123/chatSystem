import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import basicSsl from "@vitejs/plugin-basic-ssl"
import eslintPlugin from "vite-plugin-eslint"
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  server:{
    host: "localhost",
    port: 5173, // 修改成你的开发服务器端口
    // proxy: {
    //   "/api": {
    //     target: "https://127.0.0.1:5000",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
  },
  // basicSsl()
  plugins: [vue(),basicSsl(),Components({}),
    
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
