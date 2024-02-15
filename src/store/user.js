import { ref } from "vue"
import { defineStore } from "pinia"
import { io } from "socket.io-client"



export const userStore = defineStore("user", () => {
  const $socket = ref(null)
  //存储当前登录用户信息
  const user = ref(JSON.parse(localStorage.getItem("user")|| null )   )
  const token=ref(localStorage.getItem("token")||null)
  
  // 远程接收的流
  // const conn=ref(null)
  //存储所有会话列表以及即时消息
  const infoList = ref([
    // {
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小明",
       
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // },
    // {
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小红",
       
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // },{
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小明",
       
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // },
    // {
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小红",
       
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // },{
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小明",
       
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // },
    // {
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小红",
       
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // },{
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小明",
       
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // },
    // {
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小红",
       
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // },{
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小明",
       
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // },
    // {
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小红",
       
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // },{
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小明",
       
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // },
    // {
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小红",
       
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // },{
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小明",
       
    //   "sesstioAvatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500"
    // },
    // {
    //   "sesstionMsg": [
    //     { "uId": 1, "gId": 0, "mId": 3, "code": 1, "us": 1, "avatar": "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500", "sendName": "小明", "className": "other", "sendMsg": "你好", "sendTime": "12:25","readStatus":false }],
    //   "sesstionId": 1, "us": 1, "sesstionName": "小红",
       
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
  const openSocket = (token) => {
    $socket.value = io(import.meta.env.VITE_SOCKET_URL, {
      extraHeaders: {
        "Authorization": `${token}`
      }
    })
    $socket.value.on("connect",()=>{

      console.log("socket  连接成功")
    })
    //服务器转发过来的信息
    $socket.value.on("receiveServeMessage", (data,call) => {
      console.log("后台回复", data)
      console.log(infoList)
      setInfoList(data)
      call("接收成功")
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
    const  index= infoList.value.findIndex(sesstion => sesstion.sesstionId.toString() === data.sesstionId.toString()&& sesstion.us.toString() === data.us.toString())
    if(index!=-1){
      console.log("存在当前会话",infoList.value)
      //如果当前会话 存在将信息部分添加到会话中就行
      infoList.value[index].sesstionMsg.push(data.sesstionMsg)
      // 给每一个会话添加未读的条数
      infoList.value.forEach(item=>{
        console.log(item,888888888888)
        item["num"]=item.sesstionMsg.filter(msg=>!msg.readStatus).length
      })
      return 
    }
    //信息不存在 创建会话
    infoList.value.push({
      ...data,
      num:1,
      sesstionMsg:[data.sesstionMsg]

    })
    
    

    

  }
  // 设置当前会话所有消息已读
  const setSesstionreadStaus=()=>{
    console.log("zhix")
    // 找到当前会话索引
    const index=infoList.value.findIndex(item=>item.sesstionId==cuurentSesstion.value.sesstionId)
    if(index==-1) return
    // 循环遍历当前会话所有信息状态会已读
    infoList.value[index].sesstionMsg.forEach(item=>item.readStatus=true)
    infoList.value[index].num=0
    console.log("当前会话",infoList.value[index])
  }
  // 设置token
  const setToken=(data)=>{
    token.value=data
    localStorage.setItem("token",data)
  }


 

  return { $socket,user,token,infoList, openSocket, cuurentSesstion,setSesstionreadStaus,setUser ,setToken,setCuurentSesstion,clearUser,setInfoList}
})
