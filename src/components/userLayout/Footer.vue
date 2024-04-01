<template>

  <div class="footer">
    <div class="main">
      <div class="speech">
        <Icon :iconName="isShowAduioKeyboard" :fontSize="$fs - 35" @click="handoff" />
      </div>
      <div class="textInput">
        <div class="inputBox">
          <input v-show="aduioKeyboard" type="text" v-model="textInput" @keydown.enter="sendInfo()" ref="inputRef" />
          <!-- <div v-else  @touchstart ="startRecording()" @touchend ="endRecording()">按住 说话</div> -->
          <div v-show="!aduioKeyboard" data-Long="1" @load="onLoad()" ref="startLongRef">按住 说话</div>

        </div>
      </div>
      <div class="operation">
        <Icon iconName="icon-xiaolian" :fontSize="35" />
        <Icon iconName="icon-jiahao2" v-show="!isTextDom" @click="onOpenOtions()" :fontSize="35" />
        <div class="sendInfo" v-show="isTextDom" @click="sendInfo()">发送</div>
      </div>
    </div>

    <div class="option" v-show="isOption">
      <ul ref="ul" @touchstart="onTouchstart($event)" @touchmove="onTouchmove($event)" @touchend="onTouchEnd($event)">
        <li>

          <div class="item">
            <ImageUpload triggerId="image-upload" :multiple="true" @change="onImageChang"></ImageUpload>
            <label for="image-upload" class="bg">
              <Icon iconName="icon-tupian" :fontSize="30" />

            </label>
            <div>相册</div>
          </div>
          <div class="item" v-for="oItem in optionsFirst" :key="oItem.oId" @touchstart="onTouchOpen(oItem.oId)">
            <div class="bg">
              <Icon :iconName="oItem.oIcon" :fontSize="30" />
            </div>

            <div>{{ oItem.oName }}</div>
          </div>
        </li>
        <li>
          <div class="item" v-for="oItem in optionsSecond" :key="oItem.oId" :data-oId="oItem.oId">
            <div class="bg">
              <Icon :iconName="oItem.oIcon" :fontSize="30" />
            </div>

            <div>{{oItem.oName}}</div>
          </div>
        </li>
      </ul>
      <div class="dian">
        <div :class="activeIndex == 1 ? 'active' : ''"></div>
        <div :class="activeIndex == 2 ? 'active' : ''"></div>
      </div>
    </div>
    <MediaUpload :isAudio="isAudio" @escRecording="escRecording" @sendRecording="sendRecording" />

  </div>

</template>

<script setup>
import { messageType } from "@/constant"

import { ref } from "vue"

const textInput = ref("")
const aduioKeyboard=ref(true)
const startLongRef=ref(null)
const emit = defineEmits("sendInfo")
const ul = ref(null)
//判断是否有值显示发送
const isTextDom = computed(() => {
  return textInput.value
})

//第一页
const optionsFirst = ref([

  {
    oId: 2,
    oName: "拍摄",
    oIcon: "icon-31paishexuanzhong",
  },
  {
    oId: 3,
    oName: "语音通话",
    oIcon: "icon-vst_shipintonghua",
  },
  {
    oId: 4,
    oName: "位置",
    oIcon: "icon-weizhi",
  },
  {
    oId: 5,
    oName: "红包",
    oIcon: "icon-hongbao",
  },
  {
    oId: 6,
    oName: "转账",
    oIcon: "icon-zhuanzhang",
  },
  {
    oId: 7,
    oName: "语音输入",
    oIcon: "icon-yuyinshuru",
  },
  {
    oId: 8,
    oName: "我的收藏",
    oIcon: "icon-shoucang",
  },
])
const optionsSecond = ref([
  {
    oId: 1,
    oName: "相册",
    oIcon: "icon-tupian",
  },
  {
    oId: 2,
    oName: "拍摄",
    oIcon: "icon-31paishexuanzhong",
  },
  {
    oId: 3,
    oName: "语音通话",
    oIcon: "icon-vst_shipintonghua",
  },
  {
    oId: 4,
    oName: "位置",
    oIcon: "icon-weizhi",
  },
  {
    oId: 5,
    oName: "红包",
    oIcon: "icon-hongbao",
  },
 
])
const clientX=ref(0)
const movX=ref(0)
const isOption=ref(false)
//目前选项第几页标识
const activeIndex=ref(1)
const inputRef=ref(null)

const onTouchstart=(e)=>{
  console.log(e)
  
  clientX.value=e.changedTouches[0].clientX
}

//触摸移动捕获x点
const onTouchmove = (e) => {
  const moveClientX = e.changedTouches[0].clientX
  if (clientX.value != 0) {
    movX.value = moveClientX - clientX.value
    ul.value.style.left = movX.value + "px"
    console.log(movX)
  }
  console.log()
}
//触摸结束判断是往左边还是右边滑动
const onTouchEnd=()=>{
  clientX.value=0
  console.log ("松开",  movX.value)
  if(movX.value>0){
    activeIndex.value=1
    ul.value.style.left="0"

  }else{
    activeIndex.value=2
    ul.value.style.left="-100%"
   
  }
}
//是否显示加号选项
const onOpenOtions = () => {
  isOption.value = !isOption.value
}
//发送数据
const sendInfo=()=>{

  console.log("传递子组件的值",textInput.value)
  if(!textInput.value){
    return
  }
  emit("sendInfo",{code :1,msg:textInput.value})
  textInput.value=""

}
// 图片发送
const onImageChang=(imageList)=>{
  
  emit("sendInfo", { code: messageType.IMAGE, msg: imageList })

}
//判断显示键盘还是鼠标
const isShowAduioKeyboard=computed(()=>{

  return aduioKeyboard.value?"icon-yuyin":"icon-jianpan"
})
//切换点击
const handoff=()=>{
  aduioKeyboard.value=!aduioKeyboard.value

}


// 选项点击
const onTouchOpen=(oId)=>{
  console.log(oId)
  switch (oId) {
  case 1:
      
    break
  case 7:
    isOption.value=false
    isAudio.value=true
    break
  default:
    break
  }
}
// 录音界面控制
const isAudio=ref(false)
// 取消录音
const escRecording=()=>{
  isAudio.value=false
  isOption.value=true
}
// 发送录音
const sendRecording=(data)=>{
  emit("sendInfo", data)

}
</script>

<style scoped lang='scss'>
.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  background: #dfdfdf;
  transition: 1s;
  z-index: 999;

  input[type="file"] {     display: none;
    }
  .main {
    width: 100%;

    display: flex;
    height: 50px;
    text-align: center;
    border-bottom: solid 1px #ccc;

    .speech {
      width: 60px;

      font-size: $fs-35;
    }
    .textInput {
      width: 100%;

      text-align: center;

      padding: 3px 3px;
      box-sizing: border-box;
      .inputBox {
        height: 100%;
        border-radius: 7px;
        background: #fff;
        input {
          outline: none;
          border: none;
          width: 97%;
          height: 100%;
  
          font-size: 21px;
          // width: 98%;
          // height: 98%;
        }
        div{
          display:flex;
          justify-content: center;
          align-items: center;
          height: 100%;
          width: 100%;
          line-height: inherit;

        }
      }
    }
    .operation {
      display: flex;
      justify-content: space-around;
      width: 100px;
      // background: #d53333;
      align-items: center;

      i {
        font-size: $fs-35;
      }
      .sendInfo {
        width: 50px;
        height: 25px;
        border-radius: 5px;
        margin: 0 5px;
        color: #fff;
        font-size: 14px;
        background: #6af647;
        line-height: 25px;
      }
    }
  }
  .option {
    height: 300px;
    margin-top: 50px;
    transition: all 5s;
    ul {
      position: relative;
      list-style: none;
      height: 100%;
      width: 200%;
      display: flex;
      -webkit-overflow-scrolling: touch;
      li {
        width: 100%;
        height: 200px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
        
     
        .item {
          display: flex;
          width: 100%;
          height: 100%;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          // background: #000;

          .bg {
            display: inline-block;
            width: 50px;
            height: 50px;
            overflow: hidden;
            background: rgb(246, 246, 246);
            text-align: center;
            line-height: 50px;
            border-radius: 15px;
          }
          div {
            margin-top: 5px;
            font-size: 15px;
          }
        }
      }
    }
    .dian {
      > div {
        width: 5px;
        height: 5px;
        margin: 5px 5px;
        border-radius: 50%;
        opacity: 0.4;
        background: rgba(110, 110, 110);
      }
      .active {
        opacity: 1;
      }
      display: flex;

      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
    }
  }
  .audio{
    height: 300px;
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .message{
      position: absolute;
      top: 70px;
    }
    .send{
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #0bae36;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .start{
      width: 50px;
      height: 50px;
      margin-left: 20px;
      border-radius: 50%;
      background: #0bae36;
      display: flex;
      justify-content: center;
      align-items: center;
      
    }
    .end{
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
  .show {
    height: 300px;
  }
}
</style>