import { request } from "@/api/axios.js"
// 通过id获取用户信息
export const getInfo = async (uId, data = {}) => {

  return await request({ url: `/user/getInfo/${uId}`, method: "GET", data })
}
// 通过Id获取用户的个人二维码
export const getQrcode=async (uId, data = {}) => {

  return await request({ url: `/user/getInfo/${uId}`, method: "POST", data })
}
// 登录用户
export const login = async (data = {}) => {
  return await request({ url: "/user/login", method: "POST", data ,headers:{
    "fingerprint":localStorage.getItem("fingerprint")||""
  }})
}
// 确认登录接口
export const ackLogin=async (data = {}) => {
  return await request({ url: "/user/ack/login", method: "POST", data ,headers:{
    "fingerprint":localStorage.getItem("fingerprint")||""
  }})
}
// 退出登录请求
export const logout=async (uId,data={})=>{
  return await request({ url: `/user/logout/${uId}`, method: "POST", data })
}
// 注册用户
export const register = async (data = {}) => {
  console.log("data", data)
  return await request({ url: "/user/register", method: "POST", data,headers: {
    "Content-Type": "multipart/form-data"
  } })
}
// 注册验证码发送
export const sendRegisterCode = async (phone,data = {}) => {
  return await request({ url: `/user/code/${phone}`, method: "POST", data })
}
// 找回密码验证码 || 验证码 登录
export const sendRLCode=async (phone,data = {}) => {
  return await request({ url: `/user/code/${phone}`, method: "patch", data })
}
// 修改密码 手机号
export const modifyPassword=async (data = {}) => {
  return await request({ url: "/user/updatePassword", method: "patch", data })
}
// 上传图片
export const uploadImage=async(data={})=>{
  return await request({ url: "/user/upload", method: "post", data, })
}
// 上传音频
export const uploadAudio=async(data={})=>{
  return await request({ url: "/user/uploadMedia", method: "post", data,headers: {
    "Content-Type": "multipart/form-data"
  } })
}

export const getTranslate = async (data={}) => {
  return await request({ url: "/user/translate", method: "post", data })

}
// 测试请求
export const test = async (uId,data={}) => {
  return await request({ url: `/user/test/${uId}`, method: "get", data })
}
