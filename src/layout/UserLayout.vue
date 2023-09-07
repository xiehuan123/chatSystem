<template>
  <div class="userLayout"  @touchmove="onMove($event)" @touchend="onEnd($event)">
    <header class="header">
      <div class="back" @click="onBack()">
        <Icon iconName="icon-arrow-left" />
      </div>
      <div class="title">{{title}}</div>
      <div class="option" v-if="route.name=='会话'">
        <Icon iconName="icon-ellipsis" />
      </div>
    </header>
    <Audio></Audio>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed,onMounted } from "vue"
import { useRouter,useRoute } from "vue-router"
import { useStore } from "@/store"
import Audio from "@/components/userLayout/Audio.vue"
import Hammer from "hammerjs"
import emitter from "@/utils/Bus"
import Icon from "@/components/common/Icon.vue"
const router = useRouter()
const route = useRoute()
const store=useStore()
const title=computed(()=>{
  return  route.name=="会话"?store.cuurentSesstion.sesstionName:route.name

})
const onBack = () => {
  router.go(-1)
}
const onEnd=()=>{
  emitter.emit("audioShow", false)
  emitter.emit("xWen", 0)
}
const onMove=(e)=>{
  const clientX=e.touches[0]["clientX"]
  const clientY=e.touches[0]["clientY"]
  console.log("滑动了",clientX,clientY)
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

    emitter.emit("xWen", 0)
    return
  }
  // 在x矩形内
  if(x){
    emitter.emit("xWen", 1)
  }else if(wen){
    emitter.emit("xWen", 2)
  }

  
}
onMounted(()=>{

  
  const hammer=Hammer(document.querySelector(".userLayout"))
  // 可选：您可以设置Hammer.js的options来调整事件的触发条件
  hammer.get("press").set({ time: 500 }) // 500毫秒的长按时间

  // 长按事件
  hammer.on("press", function(e) {
    const dom=e.target
    if(dom.hasAttribute("data-long")){
      emitter.emit("audioShow", true)
    }
  
   
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
    console.log("鼠标在矩形内")
    return true
   
  } else {
    // 鼠标不在矩形内
    console.log("鼠标不在矩形内")
    return false
   
  }

}
</script>

<style scoped lang='scss'>
.userLayout {
  height: 100%;
  background: $bg-color;
  .header {
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: center;
    background: $bg-color;

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