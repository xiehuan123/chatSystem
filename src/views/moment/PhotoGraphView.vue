<!--
 * @Author: xiehuan123 1208044257@qq.com
 * @Date: 2023-12-05 13:38:23
 * @LastEditors: xiehuan123 1208044257@qq.com
 * @LastEditTime: 2024-02-19 12:37:25
 * @FilePath: /chatSystem/src/views/moment/PhotoGraph.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="photograph">
    <div class="content" v-show="show">
        <video ref="videoDom" autoplay  ></video>
        <Icon icon-name="icon-cuowuguanbiquxiao" className="Cancel" color="#ffffff" @click="toBack"  :font-size="30"></Icon>

      </div>

      <div class="content" v-show="!show">
        <canvas ref="canvas" @touchstart="onTouchStart($event)" @touchmove="onTouchMove($event)" @touchend="onTouchEnd($event)">

        </canvas>
       
        <span class="Cancel" @click="onEsc">取消</span>
      </div>
    <footer v-show="show">
      <Icon icon-name="icon-jinyongshanguangdeng" color="#ffffff" :font-size="35"></Icon>

        <div class="shutter" @click="onShutter"></div>
     
      <Icon icon-name="icon-shuaxin" color="#ffffff" :font-size="35"></Icon>
    </footer>  

    <footer v-show="!show">
      <ul class="childList" v-if="firstIndex==1">
        <li :class="secondIndex==9? 'shadow':''"   > <Icon icon-name="icon-xiangpica" :font-size="25" color="#fff" @click="onSecondClick(9)"></Icon></li>
        |
        <li v-for="(color,index ) in colors" :key="index"  :style="{backgroundColor:color}"  :class="secondIndex==index? 'scale':''"    @click="onSecondClick(index)">
        </li>
      </ul>
      <ul class="optionList">
         <li v-for="item in meunList " :key="item.id" @click="onFirstClick(item.id)">
          <Icon :icon-name="item.iconName"  :color="item.id==firstIndex?'#91e26c':'#fff'"  :font-size="30"></Icon></li>
      </ul>
      <button @click="onFinish()">完成</button>
    </footer>
  </div>
</template>
<script setup >
import {ref,onMounted} from "vue"
import {getUserMedia} from "@/utils/index"
import Icon from "@/components/common/Icon.vue"
import { useRouter } from "vue-router"
import { momentIndexDB } from "@/store"
const router=useRouter()
const videoDom=ref(null)
const momentStore=momentIndexDB()
const canvas=ref(null)
//画板控制开关
const painting = ref(false)
//第一个点坐标
const startPoint= ref({x: undefined, y: undefined})
//控制橡皮擦开启
const EraserEnabled = ref(false) 
// ctx
const ctx=ref(null)
const meunList=ref([
  {
    id:1,
    iconName:"icon-huabi",

  },
  {
    id:2,
    iconName:"icon-xiaolian2",
    color:"#ffffff"
  },{
    id:3,
    iconName:"icon-wenzi",

  },
  {
    id:4,
    iconName:"icon-caijian",
   
  },{
    id:5,
    iconName:"icon-masaike",
   
  }
])
const colors=ref([ "#ffffff","#000",  "#e84129","#ef9d4c","#f4b958","#8fcc27","#12aa21","#25aaf3"])
// 一级选项选中index
const firstIndex=ref(-1)
// 二级选项选中i(ndex
const secondIndex=ref(-1)
// 默认是在拍照的状态下面
const show=ref(true)
onMounted(async ()=>{
  const stream= await getUserMedia({video:true})
  videoDom.value.srcObject=stream
})
const toBack=()=>{
  // 停止视频流
  var stream = videoDom.value.srcObject
  var tracks = stream.getTracks()

  tracks.forEach(function(track) {
    track.stop()
  })
  videoDom.value.srcObject=null
  router.back(-1)
  
}
// 拍照
const onShutter=()=>{
  canvas.value.width = document.documentElement.clientWidth// 设置画布宽度为视频宽度
  console.log(videoDom.value.height)
  canvas.value.height = document.documentElement.clientHeight*0.8
  ctx.value=canvas.value.getContext("2d")
  ctx.value.drawImage(videoDom.value,0,0,canvas.value.width,canvas.value.height)
  // ctx.value.clearRect(0,0,canvas.value.width,canvas.value.height)
  show.value=false

}
// 取消已经拍摄好的照片
const onEsc=()=>{
  show.value=true
}
// 一级选中逻辑
const onFirstClick=(id)=>{
  firstIndex.value=id
  if(id==1){
    // 开启画布
  
    secondIndex.value=0
    ctx.value.strokeStyle=colors.value[secondIndex.value]
   
  }
  
}
// 二级选中
const onSecondClick=(id)=>{
  secondIndex.value=id
  if(id!=9){
    ctx.value.strokeStyle=colors.value[secondIndex.value]
    EraserEnabled.value=false
  }else{
   
    EraserEnabled.value = true
    ctx.value.restore()
    

  }
  
}
//画线条函数
const drawLine=(xStart, yStart, xEnd, yEnd)=> {
  
  //开始绘制路径
  ctx.value.beginPath()
  //线宽
  ctx.value.lineWidth = 2
  //起始位置
  ctx.value.moveTo(xStart, yStart)
  //停止位置
  ctx.value.lineTo(xEnd, yEnd)
  //描绘线路
  ctx.value.stroke()
  //结束绘制
  ctx.value.closePath()
}
//触屏设备
const onTouchStart =(e)=> {
  if(firstIndex.value!=1)return
  //[0]表示touch第一个触碰点
  let x = e.touches[0].clientX
  let y = e.touches[0].clientY

  painting.value = true
  if (EraserEnabled.value) {
    ctx.value.clearRect(x - 20, y - 20, 40, 40)
    
    
  }
  startPoint.value.x= x
  startPoint.value.y= y
}
// 移动事件
const onTouchMove =  (e)=> {
  
  let x = e.touches[0].clientX
  let y = e.touches[0].clientY

  let newPoint = {x: x, y: y}
  if (painting.value) {
    if (EraserEnabled.value) {
      
      ctx.value.clearRect(x - 15, y - 15, 30, 30)
      // ctx.value.fillRect(x - 20, y - 20, 40, 40)
      // canvas.value.restore()
      // ctx.value.drawImage(videoDom.value,0,0,canvas.value.width,canvas.value.height)
    } else {
      drawLine(startPoint.value.x, startPoint.value.y, newPoint.x, newPoint.y)
    }
    startPoint.value.x= newPoint.x
    startPoint.value.y= newPoint.y
  }
  
  
}
// 移动结束事件
const onTouchEnd = function () {
  painting.value = false
}
// 完成保存图片到会话中
const onFinish=()=>{
  const image=ctx.value.canvas.toDataURL("image/png")
  momentStore.setMometimageList(image)
  router.push(
    {
      path:"/moment/mometnPublish"
    }
  )
}
</script>
<style lang="scss" scoped>
.photograph{
  width: 100vw;
  height: 100vh;
  .content{
    position: relative;
    width: 100%;
    height: 80%;
    video{
      width: 100%;
      height: 100%;
      //属性自适应
      object-fit: cover;
    }
    canvas{
 
       object-fit: cover;
    }
    .Cancel{
      position: absolute;
      left: 10px;
      top: 10px;
      color: #fff;
    }
  }
  footer{
    position: relative;
    display: flex;
    height: 20%;
    background-color: #000;
    justify-content: space-around;
    padding-top: 20px;
    box-sizing: border-box;
    .shutter{
      position: relative;
      width: 65px;
      height: 65px;
      background-color: #fff;
      border-radius: 50%;
      &::after{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 80px;
        height: 80px;
        border-radius: 50%;
        content: "";
        border: solid 3px #fff;
      }
    }
    .optionList{
      list-style: none;
      display: flex;
      height: 70px;
      width: 60%;
      justify-content: space-evenly;
    }
    button{
      width: 70px;
      height: 40px;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
      background-color: $msg-box-bg;
      border-radius: 8px;
      color: #ffffff;
    }
    .childList{
      position: absolute;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      list-style: none;
      top: 0;
      width: 80%;
      transform: translateY(-50%);
      color: #fff;
      :not(:first-child){
         width: 20px;
        height: 20px;
        border-radius: 50%;
        border: solid 3px #fff;
      }
      // & >:first-child{
      //   border-right: solid #fff 2px;
      // }
     
      
    }
  }
  .scale{
    transition: all .5s;
    transform: scale(1.2) ;
    
  }
  .shadow{
    background-color:rgba(255, 255, 255,.3);
    border-radius: 50%;
  }
  
}



</style>
