import { ref } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import { io } from "socket.io-client"
import {BASE_URL} from "@/utils/CONFIG_ENUM"
import Peer from "peerjs"
export const useStore = defineStore("user", () => {
  const $socket = ref(null)
  //存储当前登录用户信息
  const user = ref(JSON.parse(localStorage.getItem("user")|| null )   )
  const token=ref(localStorage.getItem("token")||null)
  // 视频/语音通话
  const peer=ref(null)
  // conn 连接对象
  const conn=ref(null)
  // 远程电话流
  const remoterCall =ref(null)
  const router=useRouter()
  const remoteUser=ref(null)
  // 远程接收的流
  // const conn=ref(null)
  //存储所有会话列表以及即时消息
  const infoList = ref([
    //   {
    //   "sesstionMsg": [{ "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25" }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小明",
    //    
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // }
  ])
  //存储当前会话列表
  const cuurentSesstion = ref({
    sesstionId: 1,
    us: 1,  //1, 1.私聊 2.群聊
    sesstionName: "小明",
    sesstioAvatar: "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"

  })
  const openSocket = (uid, token) => {
    $socket.value = io(BASE_URL, {
      query: {
        uid,
        token
      }
    })
    $socket.value.on("connect",()=>{

      console.log("连接成功")
    })
    //服务器转发过来的信息
    $socket.value.on("receiveServeMessage", (data) => {
      console.log("后台回复", data)
      console.log(infoList)
      setInfoList(data)


    })
    //连接peejs服务器
    peer.value=new Peer(uid,
      {
        host: "127.0.0.1",
        port:8000,
        path: "/peerjs/myapp",
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" }, // 使用 Google 的 STUN 服务器
            {
              urls: "turn:49.235.114.194:3478", // 指定您的 TURN 服务器的地址和端口
              username: "123456", // TURN 服务器的用户名
              credential: "123456" // TURN 服务器的密码
            }
          ]
        }
      }
      
    )
    peer.value?.on("open",(id)=>{
      console.log("我的id",id)
    })
    peer.value?.on("error",(error)=>{
      console.error(error)
    })
    // Handle incoming voice/video connection
    peer.value?.on("call", (call) => {
      console.log(call,"接收到电话")
      remoterCall.value=call
   
      router.push({
        path:"/videoaccept"
      })
      
    
    })
    // 点对点连接成功
    peer.value?.on("connection", (connObj) => {
      console.log("连接成功")
      conn.value=connObj
      //  接收远程 发送用户名和头像
      connObj.on("data", (data) => {
        remoteUser.value=data
      })
      connObj.on("open", () => {
       
      })
    })
   
  }
  //登录完过后  存储数据
  const setUser=(data)=>{
  

    user.value=data
    // conn.value=peer.value.connect(data.uId)
    localStorage.setItem("user", JSON.stringify(data))
  
  }
  //存储当前会话方法
  const setCuurentSesstion=(data)=>{
    cuurentSesstion.value=data
  }
  // 清除用户数据 (退出登录)
  const clearUser=()=> {
    user.value = null
    localStorage.removeItem("user")
    
  }
  //设置即时消息  判断消息存不在存在会话 
  const setInfoList=(data)=>{
    //查找当 当前发送的聊天记录在不在当前会话里面 如果在就添加进去 
    const  index= infoList.value.findIndex(sesstion => sesstion.sesstionId.toString() === data.sesstionId.toString())
    if(index!=-1){
      console.log("存在当前会话",infoList.value)
      //如果当前会话 存在将信息部分添加到会话中就行
      return infoList.value[index].sesstionMsg.push(data.sesstionMsg)
    }
    //信息不存在 创建会话
    infoList.value.push({
      ...data,
      sesstionMsg:[data.sesstionMsg]

    })

  }
  // 设置token
  const setToken=(data)=>{
    token.value=data
    localStorage.setItem("token",data)

  }
  // 建立连接
  const setConnect=(fid)=>{

    conn.value=peer.value?.connect(fid)
    conn.value.on("open", () => {
      console.log("通话连接成功")
      conn.value.send({"userAvatar":user.value.userAvatar,"nickName":user.value.nickName})
    })
  }

 

  return { $socket,user,peer, remoteUser,remoterCall,infoList,conn, openSocket,setConnect, cuurentSesstion,setUser ,setToken,setCuurentSesstion,clearUser,setInfoList}
})
