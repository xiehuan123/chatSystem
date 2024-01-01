import { request } from "@/api/axios.js"
// 获取公共的朋友圈的内容 好友的最新的3条朋友圈
export const getMomentPublic=async (data={})=>{
  return await request({url:"/moments/public",data})
}
// 获取自己的朋友圈的内容
export const getMomentSelf=async (data={})=>{
  return await request({url:"/moments",method:"GET",data})
}
// 获取单条朋友圈的内容
export const getMomentDetail=async (mid,data={})=>{
  return await request({url:`/moments/${mid}`,method:"GET",data})
}
//点赞朋友圈
export const setMomentAppoint=async (mid,data={})=>{
  return await request({url:`/moments/${mid}`,method:"PATCH",data})
} 
// 评论朋友圈
export const setMomentComment=async (mid,data={})=>{
  return await request({url:`/moments/${mid}`,method:"POST",data})
}
// 发布朋友圈
export const publishMoment=async (data={})=>{
  return await request({url:"/moments/",method:"POST",data})
}
// 获取指定用户的朋友圈
export const getMomentUser=async (uid,data={})=>{
  return await request({url:`/moments/user/${uid}`,method:"GET",data})
}
