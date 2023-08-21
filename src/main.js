import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import '@/assets/iconfont.js';
import loading from "./components/common/Loading"
import message from "./components/common/Message"
import openSocket from './utils/Socket';
const app=createApp(App)
app.config.globalProperties.$loading = loading
app.config.globalProperties.$message = message
app.config.globalProperties.$openSocket = openSocket
app.use(router).mount('#app')
