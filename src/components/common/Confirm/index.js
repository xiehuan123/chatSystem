
import { render, h } from "vue"
import ConfirmComponent from "./Confirm.vue"

const confirm = ( {message, icon,succed=()=>{},failed=()=>{}}) => {
  const handleDestroy = () => {
    // 从 body 上移除组件
    render(null, document.body)
  }
  console.log(message)
  // 使用 h 函数创建 vnode
  const vnode = h(ConfirmComponent, {
   
    message,
    icon,
    succed,
    failed,
    destroy: handleDestroy
  })
  // 使用 render 函数将 vnode 渲染为真实DOM并挂载到 body 上
  render(vnode, document.body)
}

export  default confirm

