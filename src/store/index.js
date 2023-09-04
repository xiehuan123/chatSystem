import { ref } from "vue"
import { defineStore } from "pinia"
import { io } from "socket.io-client"
import {BASE_URL} from "@/utils/CONFIG_ENUM"
export const useStore = defineStore("user", () => {
  const $socket = ref(null)
  //存储当前登录用户信息
  const user = ref(localStorage.getItem("user")|| null )
  const token=ref(localStorage.getItem("token")||null)
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
  }
  //登录完过后  存储数据
  const setUser=(data)=>{
    user.value=data
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
  const setToken=(data)=>{
    token.value=data
    localStorage.setItem("token",data)

  }
  return { $socket, infoList, openSocket, user, cuurentSesstion,setUser ,setToken,setCuurentSesstion,clearUser,setInfoList}
})
