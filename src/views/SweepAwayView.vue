<template>
  <div class="sweepAway">
    <p class="head">
      <CloseBg :isShow="true" @click="onClose"/>
      <Icon iconName="icon-ellipsis" color="#fff" />
    </p>
    <qrcode-stream
      :paused="paused"
      @detect="onDetect"
      @camera-on="onCameraOn"
      @camera-off="onCameraOff"
      @error="onError"
    >
      <div v-show="showScanConfirmation" class="scan-confirmation">
        <!-- <img :src="withBase('/checkmark.svg')" alt="Checkmark" width="128" /> -->
      扫描成功
      </div>
    </qrcode-stream>
    <div class="qr-scanner">
        <div class="box">
            <div class="line"></div>
            <div class="angle"></div>
        </div>
    </div>
    <div class="option">
      <div>
        <div class="iconBg">
          <Icon icon-name="icon-erweima"></Icon>
        </div>

        <Text>我的二维码</Text>
      </div>
      <div>
        <div class="iconBg">
          <Icon icon-name="icon-tupian"></Icon>
        </div>

        <Text>相册</Text>
      </div>
    </div>
    <div class="footer">
      <div :style="{ color: selectIndex && '#fff' }">
        扫一扫
        <div class="point" :style="{ background: selectIndex && '#fff' }"></div>
      </div>
      <div :style="{ color: !selectIndex && '#fff' }">
        翻译
        <div
          class="point"
          :style="{ background: !selectIndex && '#fff' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { QrcodeStream } from "vue-qrcode-reader"
import {useRouter} from "vue-router"
import {decryptData} from "@/utils/index"
const paused = ref(false)
const result = ref(JSON.stringify({"type": "wx", "result": "3913aa67f49071f41e440b469c2654f95c25ec3bb59930974db49d1bc550f5bc3260e83513beb33d"}) )
const showScanConfirmation = ref(false)
const selectIndex = ref(0)
decryptData("12345678", "3913aa67f49071f41e440b469c2654f95c25ec3bb59930974db49d1bc550f5bc3260e83513beb33d")
const router=useRouter()
const onCameraOn = () => {
  showScanConfirmation.value = false
}
try {
  const data=JSON.parse(result.value)
  console.log(data)
  if(data.type==="wx"){
    const {us,wechat_id}=JSON.parse(decryptData(data.result)) 
    console.log(us,wechat_id)
    if(us===1){
      console.log("私聊")
      router.push(`/friend/peopleinfo/1/${wechat_id}`)
    }else{
      console.log("群聊")
    }
  }
} catch (error) {
  console.log(error)
}
const onCameraOff = () => {
  console.log(result.value)
  // {type:'wx',resulet:加密({us: "1", wechat_id: "wx_4bc488f2"}||{us: "2", gid: "77",pwd:"123456"})}      
  // {us: "2", gid: "77",pwd:"123456"}
  showScanConfirmation.value = true
}  
const onError = (err) => {
  console.error(err)
}
const onDetect = async (detectedCodes) => {
  result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue))
  paused.value = true
  await timeout(500)
  paused.value = false
  try {
    const {type,resulet}=JSON.parse(result.value)
    if(type==="wx"){
      const {us,wechat_id,gid,pwd}=JSON.parse( decryptData(resulet))
      if(us==="1"){
        router.push(`/chat/${wechat_id}`)
      }else{
        router.push(`/groupChat/${gid}/${pwd}`)
      }
    }
  } catch (error) {
    console.log(error)
  }
    

}
const timeout = (ms) => {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms)
  })
}
const onClose=()=>{
  router.back(0)
}
</script>

<style lang="scss"  scoped>
.sweepAway {
  position: relative;
  height: 100%;
  .head {
    position: absolute;
    top: 20px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    box-sizing: border-box;
    z-index: 999;
  }
  .scan{
    position: absolute;
    width: 80%;
    height: 60%;
    bottom: 30%;
    left: 10%;
    border: solid 1px #ccc;
    .line{
     width: 100%;
        background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #00ff33 211%);
        border-bottom: 3px solid #00ff33;
        transform: translateY(-100%);
        animation: radar-beam 2s infinite;
        animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
        animation-delay: 1.4s;

    }
  }
  .option {
    position: absolute;
    width: 100%;
    display: flex;
    justify-content: space-between;
    bottom: 12%;
    height: 12%;
    > div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 30%;
    }
    .iconBg{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #ccc;
      text-align: center;
      line-height: 50px;
    }
  }
  .footer {
    position: absolute;
    width: 100%;
    height: 12%;
    background: #000;
    bottom: 0;
    color: #ccc;
    display: flex;
    justify-content: center;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 2px 10px;
    }
    .point {
      width: 5px;
      height: 5px;
      border-radius: 50%;

      margin-top: 7px;
    }
  }
  .scan-confirmation {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    color: #00ff33;
    background-color: rgba(255, 255, 255, 0.8);
  }

  .qr-scanner {
    position: absolute;
    top: 0;
        
        background-size: 3rem 3rem;
        background-position: -1rem -1rem;
        width: 100%;
        height: 100%;
    }
 
    .qr-scanner .box {
        width: 287px;
        height: 287px;
        max-height: 287px;
        max-width: 287px;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -60%);
        overflow: hidden;
        border: 0.1rem solid rgba(0, 255, 51, 0.2);
    }
 
    .qr-scanner .line {
        height: calc(100% - 2px);
        width: 100%;
        background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #00ff33 211%);
        border-bottom: 3px solid #00ff33;
        transform: translateY(-100%);
        animation: radar-beam 2s infinite;
        animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
        animation-delay: 1.4s;
    }
 
    .qr-scanner .box:after,
    .qr-scanner .box:before,
    .qr-scanner .angle:after,
    .qr-scanner .angle:before {
        content: '';
        display: block;
        position: absolute;
        width: 3vw;
        height: 3vw;
 
        border: 0.2rem solid transparent;
    }
 
    .qr-scanner .box:after,
    .qr-scanner .box:before {
        top: 0;
        border-top-color: #00ff33;
    }
 
    .qr-scanner .angle:after,
    .qr-scanner .angle:before {
        bottom: 0;
        border-bottom-color: #00ff33;
    }
 
    .qr-scanner .box:before,
    .qr-scanner .angle:before {
        left: 0;
        border-left-color: #00ff33;
    }
 
    .qr-scanner .box:after,
    .qr-scanner .angle:after {
        right: 0;
        border-right-color: #00ff33;
    }
 
    @keyframes radar-beam {
        0% {
            transform: translateY(-100%);
        }
 
        100% {
            transform: translateY(0);
        }
    }
}
</style>