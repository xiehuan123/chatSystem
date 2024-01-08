import { request } from "@/api/axios.js"
// 查询当前用户的加入的所有群聊
export const getGroupList = async (data={}) => { 

  return await request({ url: "/group/", method: "GET", data })

}
//  查询群聊信息
export const getGroupInfo = async (groupId,data={}) => { 
  return await request({ url: `/group/${groupId}`, method: "GET", data })

}
// 创建群聊
export const createGroup = async (data={}) => { 
  return await request({ url: "/group/", method: "POST", data })
}
// 加入群聊
export const joinGroup = async (groupId,data={}) => { 
  return await request({ url: `/group/${groupId}`, method: "PUT", data })
}