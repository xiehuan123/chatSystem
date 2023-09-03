// 引入 Vue 和 Vue Router
import { createRouter, createWebHistory } from "vue-router"


import routes from "./router"

// 创建 router 实例并配置
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
