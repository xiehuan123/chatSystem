<template>
  <div class="videocall" >
    <video  class="myVideo" ref="myVideo" autoplay>

     
    </video>

    <video  class="remoteVideo" ref="remoteVideo" autoplay>
<!-- <source src="http://vjs.zencdn.net/v/oceans.mp4" /> -->
     
</video>
    <div class="main">

      <div><Avatar :src="avatar"></Avatar>
    <Text :size="24" color="#fff">{{nickName}}</Text>
    </div>
    <div >

      <Text>等待对方接收邀请</Text>
      <div class="meun">
        <div v-for=" item in meun" :key="item.id"  >
          <div class="yuan" :style="{background:item.bg[item.index]}"  @touchstart="onTouchStart(item.id)" >
            <Icon :icon-name="item.iconName[item.index]" :font-size="item.fontSize" :color="item.color[item.index]"></Icon>
          </div>
          <Text>{{ item.name[item.index] }}</Text>
        </div>
       
      </div>
    </div>
    </div>
 
  </div>
</template>

<script setup>
import Avatar from "@/components/common/Avatar.vue"
import Text from "@/components/common/Text.vue"
import Icon from "@/components/common/Icon.vue"
import {ref}  from "vue"
import { useStore } from "@/store"
import { useRoute,useRouter } from "vue-router"
const store=useStore()
const route=useRoute()
const router=useRouter()
// 拨打的好友id
const {fid}=route.params
const {src,name}=route.query
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

// 我的流
const myVideo=ref(null)
// 远程流
const remoteVideo=ref(null)
// 图片
const avatar=ref("")
const nickName=ref("")
const onTouchStart=(id)=>{
  console.log(id)
  const index=meun.value.findIndex((item)=>item.id==id)
  console.log(index)
  switch(id){
  case 1:
    console.log("麦克风")
    meun.value[index]["index"]=meun.value[index]["index"]?0:1
    break
  case 2:
    console.log("挂断")
    store.cancelMediaStream(store.locahostCall,myVideo.value.srcObject)
    store.cancelMediaStream(store.remoterCall,remoteVideo.value.srcObject)
    store.$socket.emit("callPhoneServe",store.remoteUser.uId)
    router.back(fid!=-1?0:fid)
    break
  case 3:
    // 免提
    meun.value[index]["index"]=meun.value[index]["index"]?0:1
    break
  }
    


}

// 拨打电话
const videoCall=()=>{
  console.log(store.peer)
  store.setConnect(fid)

 
  // 获取当前的视频流传递给远程
  getUserMedia({video: true, audio: true})
    .then((stream) => {
      // 将自己的视频流放到自己标签里面
      myVideo.value.srcObject=stream
      // 调用 call 方法那边接收
      store.remoterCall=store.peer.call(fid, stream)
      // 拨打端 接收远程端的流
      store.remoterCall.on("stream", (stream) => {
        console.log("接收端获取远程的流",stream)
        remoteVideo.value.srcObject = stream
      })
 
  
      // // 拨打端接收到了拒绝通话请求 或者挂断
      store.conn.on("data",(data)=>{
        console.log("接收到新")
        if (data==0){
          // 关闭自己视频流电话
          store.cancelMediaStream(store.locahostCall,myVideo.value.srcObject)
          console.log("关闭通话")
          router.back(0)
        }
      })
      
    })
    .catch((err) => {
      console.log(err)
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
if(fid!=-1){
  nickName.value=name
  avatar.value=src
  console.log(name,src)
  videoCall()
}else{

  // // 接收方
  nickName.value=store.remoteUser.nickName
  avatar.value=store.remoteUser.userAvatar
  getUserMedia({video: true, audio: true})
    .then((stream) => {
      console.log("接收端获取自己的流",stream)
      // 自己的视频流
      myVideo.value.srcObject=stream
      store.remoterCall.answer(stream) 
      // 接收远程流
      store.remoterCall.on("stream", (stream) => {
        console.log("接收端获取远程的流",stream)
        remoteVideo.value.srcObject = stream
      })
    })
    .catch((err) => {
      console.error("Failed to get local stream", err)
    })
}
store.$socket.on("callPhone",()=>{
  nickName.value=store.remoteUser.nickName
  avatar.value=store.remoteUser.userAvatar
  console.log("接收到电话信息")
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
    top: 10vw;
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