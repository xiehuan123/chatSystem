<template>
  <div class="audio"  v-show="auidoShow">
  <div :class="['messg',audioBg]">
    <soundWave :audioBg="audioBg"></soundWave>
  </div>
  <div class="footer"  >

    <div 
    :class="['esc',isActive==1?'avtive':'']"  ref="escRef" ></div>
    <div  :class="['transformText',isActive==2?'avtive':'']"   ref="transformTextRef"></div>
  </div>
  </div>
</template>

<script setup>
// document.addEventListener("contextmenu", function(event) {
//   event.preventDefault()
// })
import { ref, onMounted,defineProps } from "vue"
// import Hammer from "hammerjs"
import emitter from "@/utils/Bus"

import soundWave from "../common/soundWave.vue"
// 录音大组件控制显示
const auidoShow =ref(false)
// xdom
const escRef=ref(null)
// 文dom
const transformTextRef=ref(null)
// 控制是否选中
const isActive=ref(0)

defineProps({
  audioBg:{
    type:String,
    default:"",
  }

})
onMounted(()=>{
  emitter.on("audioShow",(data)=>{
    // 初始化
    isActive.value=0
    console.log("接收数据")
    auidoShow.value=data

  })
  emitter.on("xWen",(data)=>{
    console.log(data)
    isActive.value=data

  })
  // const hammer = new Hammer(document.querySelector(".audio"))
 
  // hammer.on("tap", (event) => {
  //   console.log(event)
  //   const rect = event.target.getBoundingClientRect()
  //   console.log(rect)
  //   console.log("触摸到了")
  // })

})
</script>

<style scoped lang='scss'>
.audio{
  
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 50px);
  background: $mask-bg;
  z-index: 999;
  .messg{
    display: flex;
    padding: 5px 10px;
    justify-content: center;
    margin-bottom: 50px;
  }
  .left{
    justify-content: flex-start!important;

  }
  .right{
    justify-content: flex-end!important;
  }
  .footer{
    height: 40%;
    width: 100%;
    >div{
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: $mask-yuan;
      text-align: center;
      line-height: 50px;
      z-index: 555;
    }
    .esc{
      left: 10%;
      transform: rotateZ(-15deg);
      &::before{
        content: "X";
      }
    }
  
    .transformText{
      transform: rotateZ(15deg);
      right: 10%;
      &:before{
        content: "文";
      }
    }

  }
  .avtive{
    background: #fff !important; ;
  }
}
</style>