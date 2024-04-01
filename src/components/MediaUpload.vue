<template>
  <div class="meidia-upload" v-show="isAudio">
    <div class="message" v-show="isMessage">正在录音中...</div>
    <div class="send" @touchstart="sendRecording()"> 发送</div>
    <div class="start" @touchstart="startRecording()" @touchend="endRecording()">

      <Icon iconName="icon-yuyinshuru" :fontSize="30" color="#fff"></Icon>
    </div>
    <div class="end" @touchend="escRecording">取消</div>
  </div>
</template>
<script setup >
import Recorder from "js-audio-recorder"
import { messageType } from "@/constant"
import { uploadAudio } from "@/api/index"
defineProps({
  isAudio: {
    type: Boolean,
    default: false,
  },
  
})
const emit = defineEmits(["escRecording"])
// 录音提示 控制
const isMessage = ref(false)
// 录音示例
const recorder = ref(null)
// 录音数据
const recorderData = ref(null)
document.addEventListener("contextmenu", function (event) {
  event.preventDefault()
})
// 开始录音
const startRecording = async () => {
  isMessage.value = true
  console.log("开始录音")
  recorder.value = new Recorder({
    sampleBits: 16,         // 采样位数，支持 8 或 16，默认是16
    sampleRate: 16000,      // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
    numChannels: 1,         // 声道，支持 1 或 2， 默认是1
  })
  // 开始录音
  await recorder.value.start()
}
// 结束录音
const endRecording = () => {
  isMessage.value = false
  console.log("结束录音")
  recorder.value.stop()
  const form= new FormData()
  form.append("media",recorder.value.getWAVBlob())
  form.append("duration",parseInt(recorder.value.duration))
  form.append("type","wav")
  recorderData.value = form
  console.log(recorderData.value)
  recorder.value.destroy()
}
// 发送录音
const sendRecording = async () => {
  if (!recorderData.value) {
    console.log("请先录音")
    return
  }
  console.log("发送录音")
  const { res, err } = await uploadAudio(recorderData.value)
  if(err){
    console.log(err)
    return
  }
  if(res.code != 200){
    console.log(res.msg)
    return
  }
  emit("sendRecording", { code: messageType.AUDIO, msg: res.data })
  recorderData.value = null
}
// 取消录音
const escRecording = () => {
  console.log("取消录音")
  recorder.value.destroy()
  recorderData.value = null
  emit("escRecording")
}



</script>
<style lang="scss" scoped>

    .meidia-upload {
      height: 300px;
      margin-top: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
  
      .message {
        position: absolute;
        top: 70px;
      }
  
      .send {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #0bae36;
        display: flex;
        justify-content: center;
        align-items: center;
      }
  
      .start {
        width: 50px;
        height: 50px;
        margin-left: 20px;
        border-radius: 50%;
        background: #0bae36;
        display: flex;
        justify-content: center;
        align-items: center;
  
      }
  
      .end {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #d53333;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        margin-left: 20px;
      }
    }


</style>
