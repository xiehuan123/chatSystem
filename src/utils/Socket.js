/*
 * @Author: xiehuan123 1208044257@qq.com
 * @Date: 2023-10-09 13:32:03
 * @LastEditors: xiehuan123 1208044257@qq.com
 * @LastEditTime: 2023-12-04 20:47:21
 * @FilePath: /chatSystem/src/utils/Socket.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {io} from "socket.io-client"


/**
 * @description: 
 * @param {*} uid
 * @param {*} token
 * @return {*}
 */
export default function openSocket (uid,token){
  // 替换为你的 Socket.IO 服务器地址
  const socket = io("/",{
    query:{
      uid,
      token
    }
  })
  socket.on("connect",()=>{
    console.log("连接成功")
  })

  return socket
}