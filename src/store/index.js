// store/index.js
import { createPinia } from "pinia"
import { userStore } from "./user"
import { callStore } from "./call"

const pinia = createPinia()

export const installPinia = (app) => {
  app.use(pinia)
}

export { userStore, callStore }