import { request } from "@/api/axios.js"
// 通过id获取用户信息
export const getInfo = async (uId, data = {}) => {

  return await request({ url: `/user/getInfo/${uId}`, method: "GET", data })
}
// 登录用户
export const login = async (data = {}) => {
  return await request({ url: "/user/login", method: "POST", data })
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
