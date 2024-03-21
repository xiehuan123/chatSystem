// store/index.js
import { createPinia } from "pinia"
import { userStore } from "./user"
import { callStore } from "./call"
import {messageIndexDB,momentIndexDB} from "./indexDB"
const pinia = createPinia()
export const installPinia = (app) => {
  app.use(pinia)
}

export { userStore, callStore,messageIndexDB,momentIndexDB }