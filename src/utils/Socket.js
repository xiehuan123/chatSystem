import {io} from "socket.io-client"


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