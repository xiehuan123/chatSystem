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
// 注册用户
export const register = async (data = {}) => {
  console.log("data", data)
  return await request({ url: "/user/register", method: "POST", data,headers: {
    "Content-Type": "multipart/form-data"
  } })
}
// 测试请求
export const test = async (uId,data={}) => {
  return await request({ url: `/user/test/${uId}`, method: "get", data })
}
