
import { render, h } from "vue"
import messageComponent from "./Message.vue"

const message = (message, icon,duration = 2000) => {
  const handleDestroy = () => {
    // 从 body 上移除组件
    render(null, document.body)
  }
  // 使用 h 函数创建 vnode
  const vnode = h(messageComponent, {
    message,
    icon,
    duration,
    destroy: handleDestroy
  })
  // 使用 render 函数将 vnode 渲染为真实DOM并挂载到 body 上
  render(vnode, document.body)
}

export  default message

