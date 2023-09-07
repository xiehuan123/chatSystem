<template>
  <div class="audio"  v-show="auidoShow">
  <div class="messg"></div>
  <div class="footer"  >
    <div 
    :class="['esc',isActive==1?'avtive':'']"  ref="escRef" @touchstart="onStart($event)"></div>
    <div  :class="['transformText',isActive==2?'avtive':'']"   ref="transformTextRef"></div>
  </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from "vue"
import Hammer from "hammerjs"
import emitter from "@/utils/Bus"


const auidoShow =ref(false)
const escRef=ref(null)
const transformTextRef=ref(null)
const isActive=ref(0)
const onStart=(e)=>{
  console.log(e)
}
onMounted(()=>{
  emitter.on("audioShow",(data)=>{
    console.log("接收数据")
    auidoShow.value=data

  })
  emitter.on("xWen",(data)=>{
    console.log(data)
    isActive.value=data

  })
  const hammer = new Hammer(document.querySelector(".audio"))
 
  hammer.on("tap", (event) => {
    console.log(event)
    const rect = event.target.getBoundingClientRect()
    console.log(rect)
    console.log("触摸到了")
  })

})
</script>

<style scoped lang='scss'>
.audio{
  
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: $mask-bg;
  z-index: 999;
  .footer{
    height: 40%;
    width: 100%;
    position: absolute;
    bottom: 0;
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