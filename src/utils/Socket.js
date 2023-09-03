import {io} from "socket.io-client"


export default function openSocket (uid,token){
  console.log(uid,"uid")
  // 替换为你的 Socket.IO 服务器地址
  const socket = io("http://127.0.0.1:5000",{
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