<template>
  <div class="userLayout"  @touchmove="onMove($event)" @touchend="onEnd($event)">
    <header class="header">
      <div class="back" @click="onBack()">
        <Icon iconName="icon-arrow-left" />
      </div>
      <div class="title">{{title}} <span v-if="store.cuurentSesstion.us==2">({{ store.cuurentSesstion.memberPerson }})</span></div>
      <div class="option" v-if="route.name=='会话'"  @click="onGotoView()">
        <Icon iconName="icon-ellipsis" />
      </div>
    </header>
    <Audio :audioBg="audioBg"></Audio>
    
         <router-view ></router-view>

     

    
  </div>
</template>

<script setup>
import { ref,computed,onMounted } from "vue"
import {useRoute,useRouter } from "vue-router"
import { userStore } from "@/store"
import Audio from "@/components/userLayout/Audio.vue"
import Hammer from "hammerjs"
import Recorder from "js-audio-recorder"
import emitter from "@/utils/Bus"
//import Icon from "@/components/common/Icon.vue"
const router = useRouter()
const route = useRoute()
const store=userStore()

// 跳转view
const onGotoView=()=>{
  if(route.name!="会话"){
    return
  }
  if(store.cuurentSesstion.us==1){
    router.push({name:"chatInfo"})
    return
  }
  if(store.cuurentSesstion.us==2){
    router.push({name:"groupDetail"})
    return
  }
  
}
// 控制录音框的颜色
const audioBg=ref("")
const title=computed(()=>{
  return  route.name=="会话"?store.cuurentSesstion.sesstionName:route.name

})
// // 录音实例
const recorder =ref(null) 
// // 录音存储的数据
const recorderData=ref(null)
// // 跳转上一级
const onBack = () => {
  router.go(-1)
}
// // 手指离开事件
const onEnd=async ()=>{
  audioBg.value=""
  recorderData.value={
    wav:recorder.value?.getWAVBlob(),
    duration:recorder.value?.duration
  }
  recorder.value?.destroy()
  emitter.emit("audioShow", false)
  emitter.emit("xWen", 0)
}

// // 手指移动事件
const onMove=(e)=>{
  const clientX=e.touches[0]["clientX"]
  const clientY=e.touches[0]["clientY"]
  const x=isInRect({
    "x": 31.893878936767578,
    "y": 394.7063903808594,
    "width": 61.23724365234375,
    "height": 61.23723220825195,
    "top": 394.7063903808594,
    "right": 93.13112258911133,
    "bottom": 455.9436225891113,
    "left": 31.893878936767578
  },clientX,clientY)
  const wen=isInRect({
    "x": 282.0688781738281,
    "y": 394.7063903808594,
    "width": 61.23725509643555,
    "height": 61.23723220825195,
    "top": 394.7063903808594,
    "right": 343.3061332702637,
    "bottom": 455.9436225891113,
    "left": 282.0688781738281
  },clientX,clientY)
  if(!x&&!wen){
    audioBg.value=""
    emitter.emit("xWen", 0)
    return
  }
  // 在x矩形内
  if(x){
    audioBg.value="left"
    emitter.emit("xWen", 1)
  }else if(wen){
    audioBg.value="right"
    emitter.emit("xWen", 2)
  }

  
}
onMounted(()=>{

  console.log(document.querySelector(".userLayout"))
  const hammer=Hammer(document.querySelector(".userLayout"))
  // 可选：您可以设置Hammer.js的options来调整事件的触发条件
  hammer.get("press").set({ time: 500 }) // 500毫秒的长按时间

  // 长按事件 录音
  hammer.on("press", async function(e) {
    const dom=e.target
    if(dom.hasAttribute("data-long")){
      console.log("录音开始")
      emitter.emit("audioShow", true)
      recorder.value=new Recorder({
        sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1,         // 声道，支持 1 或 2， 默认是1
      }
  
      )
      await recorder.value.start()
    }
  
   
  })
  // 长按松开事件
  hammer?.on("pressup", function() {
    console.log("长按松开事件触发")
    audioBg.value=""
    recorder.value.stop()
    emitter.emit("audioShow", false)
    recorderData.value={
      wav:   URL.createObjectURL(recorder.value.getWAVBlob()) ,
      duration:parseInt(recorder.value.duration) ,
      play:false
    }
    recorder.value.destroy()

    const info={
      ...store.cuurentSesstion,
      sesstionMsg:{
        uid: store.user.uid,//发送方的uid
        code: 2, //消息类型 1文本 2 语音 3 文件
        us: store.cuurentSesstion.us, //1.私聊 2.群聊
        avatar:store.user.userAvatar,
        sendName: store.user.nickName,
        className: "my",
        sendMsg: recorderData.value,
      }
    }
    store.setInfoList(info)
    store.$socket?.emit("receiveClientMessage",info)
    console.log(recorderData.value)
  })
})

const isInRect=(rect,mouseX,mouseY)=>{
  // 判断鼠标是否在矩形区域内
  if (
    mouseX >= rect.left &&
    mouseX <= rect.right &&
    mouseY >= rect.top &&
    mouseY <= rect.bottom
  ) {
    // 鼠标在矩形内
   
    return true
   
  } else {
    // 鼠标不在矩形内

    return false
   
  }

}
</script>

<style scoped lang='scss'>
.userLayout {
  height: 100%;
  background: #F7FAFD;
  .header {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: center;
    background: $bg-color;
    z-index: 99;
    .back {
      width: 50px;

      text-align: center;
    }
    .title {
      width: 100%;
      text-align: center;
    }
    .option {
      text-align: center;
      width: 56px;
      height: 100%;
    }
  }
  .main {
    height: calc(100% - 90px);
    margin-bottom: 50px;
  }
}
</style>