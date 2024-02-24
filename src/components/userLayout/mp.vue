<template>
  <div class="mpvue">
    <button
      @touchstart="touchstart"
      @touchend="touchend"
      @touchmove="touchmove"
    >{{btRecoding?'松开结束':'按住说话'}}</button>
    <div class="shade" v-if="btRecoding" catchtouchmove="ture">
      <div class="blackBoxSpeak" v-if="blackBoxSpeak">
        <div>
          <img src="https://gitee.com/sanghongxv/blogImage/raw/master/ic_record.gif" />
        </div>
       <soundWave :audioBg="audioBg"></soundWave>
        <div class="blackBoxSpeakConent">手指上划，取消录制</div>
      </div>
      <div class="blackBoxPause" v-else>
        <img src="https://gitee.com/sanghongxv/blogImage/raw/master/ic_release_to_cancel.png" />
        <div class="blackBoxSpeakConent" style="background:red">松开手指，取消录制</div>
      </div>
    </div>



  </div>
</template>
<script setup >

import { ref } from "vue"

const loop = ref(0)
const btRecoding = ref(false)
const blackBoxSpeak = ref(false)
// const  startX = ref(0)
const startY = ref(0)
const timeOutEvent = ref(0)



// 手指开始触发
const touchstart=(e)=> {
  let i = 1
  blackBoxSpeak.value = true
  startY.value = e.clientY
  // 每1秒打印一次(无实质用途)
  loop.value = setInterval(()=>{
    console.log(`${i++}`)          
  },1000)
  timeOutEvent.value = 0
  // 长按1000毫秒后执行
  timeOutEvent.value = setTimeout(()=>{
    startRecord()
  },1000)
  return false
}
// 长按超过1000毫秒
const startRecord=()=>{
// 调用录音方法
  btRecoding.value = true
}
// 短按
const startRecordClick=()=>{
  // 长按没有超过1000毫秒
}
// 手指离开屏幕触发
const touchend =()=> {
  console.log("结束")
  clearTimeout(loop.value)
  clearTimeout(timeOutEvent.value)
  if (timeOutEvent.value == 0) {
    startRecordClick()
  } else {
    btRecoding.value = false
    // 长按结束调用保存录音或者其实事件
  } 
}
// 滑动触发
const touchmove=(e)=> {
  const endY = e.clientY
  if(startY.value<endY){
    blackBoxSpeak.value = true
  } else {
    blackBoxSpeak.value = false 
  }
}




</script>
<style lang="scss" scoped>
.mpvue{
    -webkit-user-select: none;  /* Safari */
  -moz-user-select: none;     /* Firefox */
  -ms-user-select: none;      /* Internet Explorer */
  user-select: none; 
}
button{
  z-index: 999;
  position: absolute;
  bottom: 0;
}
.shade {
  z-index: 998;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  img {
    width: 148px;
    height: 246px;
  }
  .blackBoxSpeak,
  .blackBoxPause {
    width: 343px;
    height: 343px;
    border-radius: 24px;
    background-color: rgba($color: #000000, $alpha: 0.7);
    margin: auto;
    padding: 32px;
    position: relative;
    text-align: center;
    top: 188px;
  }
  .blackBoxSpeakConent {
    position: absolute;
    bottom: 24px;
    color: #fff;
    text-align: center;
    font-size: 30px;
    padding: 12px 0;
    width: 85%;
    margin: auto;
    border-radius: 16px;
  }
}
</style>


