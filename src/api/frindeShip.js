import { request } from "@/api/axios.js"
// 查询好友列表
export const getFriendsList=async (data={})=>{

  return await request({url:"/frindeShip/",method:"GET",data })
}
// 通过手机号或者微信号搜索好友
export const serarchFriend=async (kwd,data={})=>{

  return await request({ url: `/frindeShip/${kwd}`, method: "GET", data })
}
// 发送好友请求
export const sendhFriend=async (data={})=>{

  return await request({ url: "/frindeShip/", method: "POST", data })
}
// 查询好友历史记录
export const queryFriendHistory=async (data={})=>{
  return await request({url:"/frindeShip/history",method:"GET",data})
}
// 同意好友请求
export const finishFriend=async(data={})=>{
  return await request({url:"/frindeShip/",method:"PUT",data})
}
