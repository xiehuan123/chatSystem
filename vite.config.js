import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import AutoImport from "unplugin-auto-import/vite"
import eslintPlugin from "vite-plugin-eslint"
import path from "path"
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
 
  server: {
    
    host:"0.0.0.0",
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
  plugins: [
    vue(),
    VitePWA({
    injectRegister: 'auto',
    registerType: 'autoUpdate',
    devOptions: {
        enabled: true  // 是否支持开发模式下也使 pwa 生效
    },

    // MANIFEST PWA https://vite-pwa-org.netlify.app/guide/pwa-minimal-requirements.html
    includeAssets: ['wx.svg', 'apple-touch-icon.png', 'mask-icon.svg', 'favicon.png'], // 应该是下面 manifest 中可能用到的文件名字吧
    manifest: {
        name: 'IM',
        short_name: "IM",
        theme_color: "#373737",
        start_url: "./",
        display: "standalone",
        background_color: "#373737",
        icons: [
            {
                src: "wx.svg",
                sizes: "512x512",
                type: "image/svg+xml",
                purpose: "any",
            },
            {
                src: "appicon-apple.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
        ],
    },
    workbox:{
  
      globDirectory: 'dist',
      globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg}'],

      runtimeCaching: [                     // 配置自定义运行时缓存
		     {
            urlPattern: /^http:\/\/127\.0\.0\.1:5001\/.*$/, // 接口缓存 此处填你想缓存的接口正则匹配
            handler: 'NetworkFirst',
            options: {
              cacheName: 'interface-cache',
            },
          },
		      ]

        }
      

})
,
    Components({
      dirs: ["src/components", "src/layout"],
    }),
    AutoImport({
      imports: ["vue", "vue-router"],
      eslintrc: {
        enabled: true,
        // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
      },
    }),
    // 启用 eslint 插件
    eslintPlugin({
      // 自动修复代码中的 ESLint 错误
      fix: true,
      overrideConfig: {
        settings: {
          "import/resolver": {
            alias: {
              map: [
                ["vue-router", "vue-router/dist/vue-router.esm-bundler.js"],
              ],
              extensions: [".js", ".jsx", ".json"],
            },
          },
        },
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import \"./src/styles/var.scss\";", // 加载全局样式，使用scss特性
      },
    },
  },

  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
