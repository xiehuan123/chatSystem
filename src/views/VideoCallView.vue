<template>
  <div class="videocall" >
    <video  class="myVideo" ref="myVideo" autoplay muted>
    </video>
    <video   class="remoteVideo" ref="remoteVideo" autoplay muted>
<!-- <source src="http://vjs.zencdn.net/v/oceans.mp4" /> -->
     
</video>
    <div class="main">
      <div><Avatar :src="avatar"></Avatar>
          <Text :size="24" color="#fff">{{nickName}}</Text>
      </div>
    <div >
      <Text :size="20" color="#fff">{{ message }}</Text>
      <div class="meun" v-if="CallStore.callType==1|| callFlag==2">
        <div v-for=" item in meun" :key="item.id"  >
          <div class="yuan" :style="{background:item.bg[item.index]}"  @touchstart="onTouchStart(item.id)" >
            <Icon :icon-name="item.iconName[item.index]" :font-size="item.fontSize" :color="item.color[item.index]"></Icon>
          </div>
          <Text>{{ item.name[item.index] }}</Text>
        </div>
       
      </div>
       <div class="meun" v-if="CallStore.callType==2 && callFlag==1">
        <div v-for=" item in acceptMeun" :key="item.id"  >
          <div class="yuan" :style="{background:item.bg}"  @touchstart="onTouchStart(item.id)" >
            <Icon :icon-name="item.iconName" :font-size="item.fontSize" :color="item.color"></Icon>
          </div>
          <Text>{{ item.name }}</Text>
        </div>
       
      </div>
    </div>
    </div>
 
  </div>
</template>

<script setup>

import {ref}  from "vue"
import { callStore } from "@/store/call"
import { useRoute,useRouter } from "vue-router"
import emitter from "@/utils/Bus"

const CallStore=callStore()
const route=useRoute()
const router=useRouter()
// 拨打的好友id
const {fid}=route.params
const {type}=route.query
const meun=ref([
  {
    id:1,
    name:["麦克风已开","麦克风已关"],
    iconName:["icon-maikefeng","icon-maikefeng"],
    index:0,
    fontSize:35,
    color:["#000","#fff"],
    bg:["#fff","#27282a"]
  },
  {
    id:2,
    name:["取消"],
    iconName:["icon-14guaduan-2","icon-14guaduan-2"],
    index:0,
    fontSize:35,
    color:["#fff"],
    bg:["#d44d53"]
  },
  {
    id:3,
    name:["扬声器已开","扬声器已关"],
    iconName:["icon-yangshengqi","icon-ai16"],
    index:1,
    fontSize:35,
    color:"#fff",
    bg:["#fff","#27282a"]
  }
])
const acceptMeun=ref([
  {
    id:4,
    name:"挂断",
    iconName:"icon-14guaduan-2",
    index:0,
    fontSize:35,
    color:"#fff",
    bg:"#d44d53"
  },
  {
    id:5,
    name:"接听",
    iconName:"icon-jieting",
    fontSize:35,
    color:"#fff",
    bg:"#22c91a"
  }
])
const message=ref("等待对方接收邀请")
// 我的流
const myVideo=ref(null)
// 远程流
const remoteVideo=ref(null)
// 图片
const avatar=ref("")
// 接通状态 1未接通 2 已接通
const callFlag=ref(1)  
const nickName=ref("")
const selectFunction=ref({
  1:(index)=>{
    console.log("麦克风")
    meun.value[index]["index"]=meun.value[index]["index"]?0:1
  },
  2:()=>{
    console.log("挂断")
    hangUp()
  },
  3:(index)=>{
    // 免提
    meun.value[index]["index"]=meun.value[index]["index"]?0:1
  },
  4:()=>{
    console.log("挂断")
    hangUp()
  },
  5:()=>{
    console.log("接听")
    agreeCall()
  }
})
// 判断点击的哪个按钮
const onTouchStart=(id)=>{

  
  console.log(id)
  const index=meun.value.findIndex((item)=>item.id==id)
  console.log(index)
  selectFunction.value[id](index)
}

// 拨打电话
const videoCall=(type)=>{
  let option={
    video:true,
    audio:true
  }
  if(type==1){
    option.video=true
  }
  CallStore.setConnect(fid,type)
  // 获取当前的视频流传递给远程

  // // 拨打端接收到了拒绝通话请求 或者挂断
  CallStore.conn.on("data",({flag})=>{
    console.log("拨打端接收到了拒绝通话请求 或者挂断",flag)

    if (flag=="hangUp"){
      // 关闭自己视频流电话
      message.value="对方已拒绝"
      setTimeout(()=>{hangUp()},2000)
     
    }else if(flag=="accept"){
      // 这里表示对方已同意通话
      callFlag.value=2
      console.log("对方同意了",fid)
   
      message.value="正在通话中..."
      getUserMedia({video: true, audio: true}).then((stream) => {
        // 将自己的视频流放到自己标签里面
        myVideo.value.srcObject=stream
        CallStore.remoterCall=CallStore.peer.call(fid, stream)
        console.log(CallStore.remoterCall,7777)
        CallStore.remoterCall.on("stream", (stream) => {
          console.log("拨打端 接收远程端的流",stream)
          remoteVideo.value.srcObject = stream
        })
      }).catch((err) => {
        console.error("Failed to get local stream", err)
      })
     
    }
  })
}
// 挂断电话
const hangUp=()=>{
  
  if(callFlag.value==1){
    console.log("未接通")
  }else if(callFlag.value==2){
    console.log("挂断电话")
    // 挂断电话
    console.log(CallStore.conn)
    CallStore.cancelMediaStream(CallStore.remoterCall,remoteVideo.value.srcObject)
    CallStore.remoterCall.close()
  }
  if(CallStore.callType==1){
    CallStore.conn.send({flag:"hangUp"})}
  else if(CallStore.callType==2){
    CallStore.remoterConn.send({flag:"hangUp"})
  }
  CallStore.cancelMediaStream(CallStore.locahostCall,myVideo.value.srcObject)
 
  router.push({
    path:"/"
  })
  
}
// 同意电话
const agreeCall=async ()=>{
  CallStore.remoterConn.send({flag:"accept"})
  message.value="正在接通中..."
  callFlag.value=2
  const stream= await getUserMedia({video: true, audio: true})
  // 自己的视频流
  myVideo.value.srcObject=stream
  // 这里加延迟 是因为那边发送的时候 还没有创建好remoterCall
  setTimeout(()=>{
    CallStore.remoterCall?.answer(stream) 
    // 接收远程流
    CallStore.remoterCall?.on("stream", (stream) => {
     
      remoteVideo.value.srcObject = stream
    })
    message.value="正在通话中..."
  },500)
  CallStore.remoterConn.on("data",({flag})=>{
    console.log("接收方接收到了拒绝通话请求 或者挂断",flag)
    if (flag=="hangUp"){
      // 关闭自己视频流电话
      message.value="对方已挂断"
      setTimeout(()=>{hangUp()},2000)
    }
  })   
     
   
}
const getUserMedia=(constrains)=> {
  if (window.navigator.mediaDevices.getUserMedia) {
    return window.navigator.mediaDevices.getUserMedia(constrains)
  } else if (window.navigator.webkitGetUserMedia) {
    return window.navigator.webkitGetUserMedia(constrains)
  } else if (window.navigator.mozGetUserMedia) {
    return window.navigator.mozGetUserMedia(constrains)
  } else if (window.navigator.getUserMedia) {
    return window.navigator.getUserMedia(constrains)
  }
}
// 拨打方
if(CallStore.callType==1){
  console.log(CallStore.localUser)
  nickName.value=CallStore.localUser.nickName
  avatar.value=CallStore.localUser.avatar

  videoCall(type)
}else if(CallStore.callType==2){
  console.log("接收方",CallStore.callType)
  // // 接收方
  nickName.value=CallStore.remoteUser.nickName
  avatar.value=CallStore.remoteUser.userAvatar
  message.value=CallStore.remoteUser.type==1?  "邀请您进行视频通话":"邀请您进行语音通话"

}

emitter.on("notifyPeererror",(err)=>{
  console.log("err",err)
  message.value="对方暂时无法接听您的电话"
  setTimeout(()=>{
    hangUp()
  },2000)
})
</script>

<style scoped lang='scss'>
.videocall{
  display: flex;
  width: 100vw;
  height: 100vh;
  background: #6f6363;
  flex-direction: column;
  .myVideo{
    position: absolute;
    z-index: 1;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    
  }
  .remoteVideo{
    position: absolute;
    z-index: 2;
    top: 30vw;
    right: 5vw;
    width: 30vw;
    height: 40vw;
    object-fit: cover;
  }
  .main{
    position: relative;
    z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  >div{
    width: 100%;
    box-sizing: border-box;
  }
  >div:nth-child(1){
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 5;
    // background: #facece;
  }
  >div:nth-child(2){
    // background: #e74b4b;
    flex: 1;
    padding: 30px 10px;
    text-align: center;
    .meun{
      display: flex;
      height: 100px;
      margin-top: 20px;
      >div{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 100%;
     
        .yuan{
          width: 70px;
          height: 70px;
          border-radius: 50%;
          text-align: center;
          line-height: 70px;

        }
  
      }
    }
  }
  }

}
</style>