import { request } from "@/api/axios.js"
// 查询好友列表
export const getFriendsList=async (data={})=>{

  return await request({url:"/frindeShip/friendShip",method:"GET",data })
}
// 通过手机号或者微信号搜索好友
export const serarchFriend=async (data={})=>{

  return await request({ url: "/frindeShip/friendShip", method: "GET", data })
}
