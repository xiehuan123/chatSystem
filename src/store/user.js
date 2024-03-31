import { ref } from "vue"
import { defineStore } from "pinia"
import { io } from "socket.io-client"
import {compulsionLogout } from "."
import router from "@/router"
import confirm from "@/components/common/Confirm"

export const userStore = defineStore("user", 
  () => {
    const $socket = ref(null)
    //存储当前登录用户信息
    const user = ref( JSON.parse(localStorage.getItem("user")||null) )   
    const token=ref(localStorage.getItem("token")||null)
    // 底部相关的通知
    const noticeCount=ref({
      "weixin":0,
      "addressBook":0,
      "find":0
    })
    // 指纹id
    const fingerprint=ref(0)

    //存储所有会话列表以及即时消息
    const sesstionList = ref([
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
    // 存储所有消息列表 {sesstinId:[]}
    const sesstionMsgs=ref({})
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
      $socket.value.on("receiveServeMessage", (data) => {
        console.log("后台回复", data)
        setInfoList(data)
    
      })
      // 通知信息
      $socket.value.on("receptioMessage",(data)=>{
        console.log(data)
        const {type,count,sesstionId,us}=data
        console.log("通知信息",type,count)
        if(sesstionId==cuurentSesstion.value.sesstionId&&us==cuurentSesstion.value.us){
          return
        }
        noticeCount.value[type]+=count 
      })
  
      // 系统消息 比如入群 退群
      $socket.value.on("systemMessage",(data)=>{
        console.log("系统消息",data)

      
        setCuurentSesstion(
          {
            sesstionId: data.sesstionId,
            us:2,
            sesstioAvatar:"0",
            sesstionName:data.sesstionName,
            memberPerson:data.memberPerson,
            num:0
          }
        )
        if(sesstionMsgs.value[data.sesstionId]){
          sesstionMsgs.value[data.sesstionId].push(data.sesstionMsg)
        }else{
          sesstionMsgs.value[data.sesstionId]=[data.sesstionMsg]
        }
 
      })
      // 下线服务
      $socket.value.on("offlineServices",(data)=>{
        
     
        // 提示用户
        confirm({
          message: data["message"],
          succedText:"确认",
          succed(){
            router.push("/login")
          },
          failedText:""
        })
    
        // 调用退出登录方法
        compulsionLogout()
      })
    }
    //登录完过后  存储数据
    const setUser=(data)=>{
      console.log(data)
      user.value=data
      localStorage.setItem("user", JSON.stringify(data))
   
    }
    //存储当前会话方法
    const setCuurentSesstion=(data)=>{
      console.log("存储当前会话",data)
      cuurentSesstion.value=data
    }
    // 清空当前会话
    const clearCuurentSesstion=()=>{
      cuurentSesstion.value={
        memberPerson:-1,
        sesstioAvatar:"",
        sesstionId:-1,
        sesstionName:"",
        us:-1,
        wechat_id:""
      }
    }
    // 清除用户数据 (退出登录)
    const clearUser=()=> {
      user.value = null
      localStorage.removeItem("user")
    
    }
    //设置即时消息  判断消息存不在存在会话 
    const setInfoList=(data)=>{
      console.log(sesstionList.value,sesstionMsgs.value)
      //查找当 当前发送的聊天记录在不在当前会话里面 如果在就添加进去 
      const  index= sesstionList.value.findIndex(sesstion => sesstion.sesstionId.toString() === data.sesstionId.toString()&& sesstion.us.toString() === data.us.toString())
      if(index!=-1){
      // 如果当前信息是当前会话就把当前未读信息改为true
        if(data.us==cuurentSesstion.value.us&&data.sesstionId==cuurentSesstion.value.sesstionId){

          data.sesstionMsg.readStatus=true
        }else{
        // 如果不是当前会话就未读信息加一
          console.log("不是当前会话",data.sesstionId,cuurentSesstion.value.sesstionId)
          sesstionList.value[index].num++
        }
        console.log("存在当前会话",sesstionList.value)
        //如果当前会话 存在将信息部分添加到会话消息中就行
        if(sesstionMsgs.value[data.sesstionId]){
          sesstionMsgs.value[data.sesstionId].push(data.sesstionMsg)
        }else{
          sesstionMsgs.value[data.sesstionId]=[data.sesstionMsg]
        }
     
        // 给每一个会话添加未读的条数
   

        return 
      }
      const {sesstionMsg,...params}=data
      //会话不存在 创建会话
      sesstionList.value.push({
        ...params,
        num:1,
  

      })
      //创建会话消息列表
      sesstionMsgs.value[data.sesstionId]=[sesstionMsg]
    
    

    

    }
    // 初始化信息
    const initInfoList=(sesstionlist,sesstionmsgs)=>{
      sesstionList.value=sesstionlist
      sesstionMsgs.value=sesstionmsgs
    }

    // 设置当前会话所有消息已读
    const setSesstionreadStaus=()=>{
      const index=sesstionList.value.findIndex(sesstion => sesstion.sesstionId.toString() === cuurentSesstion.value.sesstionId.toString()&& sesstion.us.toString() === cuurentSesstion.value.us.toString())
      if(index!=-1){
        sesstionList.value[index].num=0
      }
    }
    // 设置token
    const setToken=(data)=>{
      token.value=data
      localStorage.setItem("token",data)
    
    }
    const testfunc=(id)=>{
      console.log(id)
    }
    return {  testfunc,$socket,user,fingerprint,token,sesstionList,clearCuurentSesstion,sesstionMsgs,initInfoList,noticeCount, openSocket, cuurentSesstion,setSesstionreadStaus,setUser ,setToken,setCuurentSesstion,clearUser,setInfoList}
  },
 
  
)
