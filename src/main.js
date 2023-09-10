import { createApp } from "vue"
import "@/style.css"
import router from "@/router"
import App from "@/App.vue"
import "@/assets/iconfont.js"
import loading from "@/components/common/Loading"
import message from "@/components/common/Message"
import { createPinia } from "pinia"
// import "@/acces"
const app=createApp(App)
app.config.globalProperties.$loading = loading
app.config.globalProperties.$message = message
app.use(router).use(createPinia())  .mount("#app")
