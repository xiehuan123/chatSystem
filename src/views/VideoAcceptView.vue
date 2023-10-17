<template>
  <div class="videoaccept" >
    <video  class="myVideo" ref="myVideo" autoplay>

     
    </video>

    <video  class="remoteVideo" ref="remoteVideo" autoplay>
<!-- <source src="http://vjs.zencdn.net/v/oceans.mp4" /> -->
     
</video>
    <div class="main">

      <div><Avatar :src="store.remoteUser.userAvatar"></Avatar>
    <Text :size="24" color="#fff">{{ store.remoteUser.nickName }}</Text>
    </div>
    <div >

      <Text>邀请你语音通话...</Text>
      <div class="meun">
        <div v-for=" item in meun" :key="item.id"  >
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

//import Icon from "@/components/common/Icon.vue"
import {ref}  from "vue"
import { useStore } from "@/store"
import { useRouter } from "vue-router"
const store=useStore()
const router=useRouter()
const meun=ref([

  {
    id:1,
    name:"挂断",
    iconName:"icon-14guaduan-2",
    index:0,
    fontSize:35,
    color:"#fff",
    bg:"#d44d53"
  },
  {
    id:2,
    name:"接听",
    iconName:"icon-jieting",
    fontSize:35,
    color:"#fff",
    bg:"#22c91a"
  }
])

const myVideo=ref(null)
const remoteVideo=ref(null)
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
const onTouchStart=(id)=>{
  switch(id){
  case 1:  
    // console.log(store.remoterCall,"拒绝")
    // 拒绝通话
    // store.remoterCall.close()
    // 关闭通话
    getUserMedia({video: true, audio: true})
      .then((stream) => {
        store.remoterCall.answer(stream) 
        // 发送标识通知拨打方 拒绝通话
        store.conn.send(0)
        // 关闭远程视频流
        store.cancelMediaStream(store.remoterCall,stream)
        router.back(0)
      })
    
    break
  case 2:
    // 接受通话 
    router.push({
      path:"/videocall/-1"
    })
    break
  }    
}

// const getUserMedia=(constrains)=> {
//   if (window.navigator.mediaDevices.getUserMedia) {
//     return window.navigator.mediaDevices.getUserMedia(constrains)
//   } else if (window.navigator.webkitGetUserMedia) {
//     return window.navigator.webkitGetUserMedia(constrains)
//   } else if (window.navigator.mozGetUserMedia) {
//     return window.navigator.mozGetUserMedia(constrains)
//   } else if (window.navigator.getUserMedia) {
//     return window.navigator.getUserMedia(constrains)
//   }
// }

// Handle incoming voice/video connection
// store.peer.on("call", (call) => {
//   getUserMedia({video: true, audio: true})
//     .then((stream) => {
//       remoteVideo.value.srcObject=stream
//       call.answer(stream) // Answer the call with an A/V stream.
//       // call.on("stream", renderVideo)
//     })
//     .catch((err) => {
//       console.error("Failed to get local stream", err)
//     })
// })
</script>

<style scoped lang='scss'>
.videoaccept{
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