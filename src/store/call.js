import { ref } from "vue"
import { defineStore } from "pinia"
import { useRouter } from "vue-router"
import Peer from "peerjs"
import emitter from "@/utils/Bus"
import { userStore } from "."
export const callStore = defineStore("callStore", () => {
  const {user}=userStore()

  const router=useRouter()
  // 视频/语音通话
  const peer = ref(null)
  // 拨打方conn 连接对象
  const conn = ref(null)
  // 接收方conn 连接对象
  const remoterConn = ref(null)
  // 远程电话流
  const remoterCall = ref(null)
  // 本地电话流
  const locahostCall = ref(null)
  // 作为接收方的 远程的用户信息
  const remoteUser = ref(null)
  // 作为拨打方的 远程用户信息
  const localUser = ref(null)
  // 区别接收方还是拨打方 1代表 拨打 2代表接收
  const callType = ref(1)
  
  // 建立点对点连接
  const setConnect = (fid,type) => {
    conn.value = peer.value?.connect(fid)
    conn.value.on("open", () => {
      console.log("通话连接成功")
      console.log(user.uid,user.userAvatar,"发送过去的数据")
      conn.value.send({
        flag: "connect",
        uid: user.uid,
        userAvatar: user.userAvatar,
        nickName: user.nickName,
        type
      })
    
    })
  }
  //关闭视频流
  // 取消媒体流（关闭权限请求）
  const cancelMediaStream = (call, mediaStream) => {
    if (call) {
      call.close()
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop() // 停止媒体轨道
      })
      console.log("已取消媒体流")
    }
  }


  // 连接
  const openPeer=(uid)=>{
    //连接peejs服务器
    peer.value = new Peer(uid, {
      host: import.meta.env.VITE_PEER_HOST,
      port: import.meta.env.VITE_PEER_PORT,
      path: import.meta.env.VITE_PEER_PATH,
      config: {
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" }, // 使用 Google 的 STUN 服务器
          {
            urls: "turn:124.71.84.62:3478", // 指定您的 TURN 服务器的地址和端口
            username: "123456", // TURN 服务器的用户名
            credential: "123456", // TURN 服务器的密码
          },
        ],
      },
    })
    peer.value?.on("open", (id) => {
      console.log("peer服务🔗成功,我的id", id)
    })
    peer.value?.on("error", (error) => {
      
      if (error.type === "unavailable-id") {
        // 处理重复链接错误的逻辑
        console.log("重复链接")
        // 执行其他操作，比如重新连接等
      } else {
        // 其他类型的错误，可以继续向上传播或者进行其他处理
        emitter.emit("notifyPeererror", error)
      }
  
    })
    peer.value?.on("call", (call) => {
      console.log(call, "接收到电话")
      remoterCall.value = call
    })
    // 点对点连接成功
    peer.value?.on("connection", (connObj) => {
      console.log("接收方连接成功")
 
      remoterConn.value = connObj
      //  接收远程 接收用户名和头像
      connObj.on("data", ({flag,...params}) => {
        console.log(flag,"远程发过来的")
        if(flag==="connect"){
          remoteUser.value = params
          callType.value=2
          router.push({
            path: `/videocall/${params.uid}?type=${params.type}`,
          })
        }
      })
      connObj.on("open", () => {})
    })
  }
  return {
    peer,
    openPeer,
    callType,
    localUser,
    remoteUser,
    remoterCall,
    locahostCall,
    conn,
    remoterConn,
    setConnect,
    cancelMediaStream,
  }
})
