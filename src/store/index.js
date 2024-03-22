// store/index.js
import { createPinia } from "pinia"
import { userStore } from "./user"
import { callStore } from "./call"
import {messageIndexDB,momentIndexDB} from "./indexDB"
import { logout } from "@/api"
import router from "@/router"
const pinia = createPinia()
export const installPinia = (app) => {
  app.use(pinia)
}
// 这里需要重构  实例化全部在这个文件使用 
const logoutFunc = async () => {
  const callStoreInstance = callStore()
  const userStoreInstance = userStore()
  await logout(userStoreInstance.user.uid)
  localStorage.clear()
  sessionStorage.clear()
  userStoreInstance.$socket.disconnect()
  callStoreInstance.peer.disconnect()
  router.push("/login")

}
const compulsionLogout=async()=>{
  const callStoreInstance = callStore()
  const userStoreInstance = userStore()
  localStorage.clear()
  sessionStorage.clear()
  userStoreInstance.$socket.disconnect()
  callStoreInstance.peer.disconnect()
}
export { logoutFunc,compulsionLogout,userStore, callStore,messageIndexDB,momentIndexDB }