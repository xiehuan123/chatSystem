import { request } from "@/api/axios.js"
// 查询好友列表
export const getFriendsList=async (data={})=>{

  return await request({url:"/frindeShip/friendShip",method:"GET",data })
}
