import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
// import basicSsl from "@vitejs/plugin-basic-ssl"
import eslintPlugin from "vite-plugin-eslint"
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({

  server:{
    host: "localhost",
    port: 5173, // 修改成你的开发服务器端口
    proxy: {
      "/uploads": {
        target: "http://127.0.0.1:5001",
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
      // "/api": {
      //   target: "http://124.71.84.62:5001",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/api/, ""),
      // },
    },
  },
  // basicSsl()
  plugins: [vue(),Components({}),
    AutoImport({ imports: ["vue", "vue-router"], eslintrc: {enabled: true,
    // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
    }, }),
    // 启用 eslint 插件
    eslintPlugin({
      // 自动修复代码中的 ESLint 错误
      fix: true,
      overrideConfig: {
        settings: {
          "import/resolver": {
            alias: {
              map: [
                ["vue-router", "vue-router/dist/vue-router.esm-bundler.js"]
              ],
              extensions: [".js", ".jsx", ".json"]
            }
          }
        }
      }
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
