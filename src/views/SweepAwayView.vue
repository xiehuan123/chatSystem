<template>
  <div class="sweepAway">
    <p class="head">
      <CloseBg :isShow="true" @click="onClose" />
      <Icon iconName="icon-ellipsis" color="#fff" />
    </p>
    <qrcode-stream :paused="paused" @detect="onDetect" @camera-on="onCameraOn" @camera-off="onCameraOff"
      @error="onError">
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
        <router-link :to="{ path: `/qrcode/1/${store.user.uid}` }">
          <div class="iconBg">
            <Icon icon-name="icon-erweima"></Icon>
          </div>

          <Text>我的二维码</Text>
        </router-link>
      </div>

      <div>
        <div class="iconBg">
          <label for="album">
            <Icon icon-name="icon-tupian"></Icon>
          </label>
        </div>
        <input id="album" hidden type="file" accept="image/*" @change="handleFile" />
        <Text> <label for="album"> 相册</label> </Text>
      </div>
    </div>
    <div class="footer">
      <div :style="{ color: selectIndex && '#fff' }">
        扫一扫
        <div class="point" :style="{ background: selectIndex && '#fff' }"></div>
      </div>

      <div :style="{ color: !selectIndex && '#fff' }">
        <router-link :to="{ path: `/translator` }">
          翻译 </router-link>
        <div class="point" :style="{ background: !selectIndex && '#fff' }"></div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { QrcodeStream } from "vue-qrcode-reader"
import {useRouter} from "vue-router"
import {decryptData} from "@/utils/index"
import {userStore} from "@/store"
import jsQR from "jsqr"

const paused = ref(false)
const result = ref(null)
const showScanConfirmation = ref(false)
const selectIndex = ref(1)
const router=useRouter()
const store=userStore()
const onCameraOn = () => {
  showScanConfirmation.value = false
}

const onCameraOff = () => {
  // {type:'wx',resulet:加密({us: "1", wechat_id: "wx_4bc488f2"}||{us: "2", gid: "77",pwd:"123456"})}      
  // {us: "2", gid: "77",pwd:"123456"}
  showScanConfirmation.value = true
}  
const onError = (err) => {
  console.error(err)
}
const onDetect = async (detectedCodes) => {
  console.log("扫码中", detectedCodes)
  paused.value = true

  const text = detectedCodes[0]["rawValue"]
  await timeout(500)
  // 正则表达式
  const pattern = /{"type":\s*"wx",\s*"result":\s*"[^"]*"\s*}/

  // 使用正则表达式进行匹配
  if (!pattern.test(text)) {
    console.log("是以 http:// 或 https:// 开头的 URL")
    router.push(`/webframe?content=${text}`)
    return
  }

  const dataObject = JSON.parse(text)

  paused.value = false
  result.value = dataObject 

  const data = dataObject
  console.log( typeof data,"data")
  if (data["type"] ==="wx"){
    console.log("wx", decryptData(data["result"]))
    const decryptResultData=decryptData(data["result"])
    console.dir("decryptData", decryptResultData)
    console.log(typeof decryptResultData)
    const decryptDataObj = JSON.parse(decryptResultData)
    console.log(decryptDataObj,"obj")
    if (decryptDataObj.us==="1"){
      console.log("私聊")
      router.push(`/friend/peopleinfo/1/${decryptDataObj.wechat_id}`)
    }else{
      console.log("群聊")
      router.push(`/group/groupInvite/${decryptDataObj.inviteUrl}`)
    }
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
// 解析二维码
const handleFile = async (e) => {
  const file = e.target.files[0]
  const reader = new FileReader()

  reader.onload = function (event) {
    const imageData = event.target.result
    const image = new Image()
    image.onload = function () {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      canvas.width = image.width
      canvas.height = image.height
      ctx.drawImage(image, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)
      if (code) {
        console.log("Found QR code", code)
        onDetect([{ rawValue: code.data }])
      } else {
        console.log("No QR code found", code)
      }
    }
    image.src = imageData
  }

  reader.readAsDataURL(file)


  
 
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
      background: rgba(96, 91, 91, 0.7);

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