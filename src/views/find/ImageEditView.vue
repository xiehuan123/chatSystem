<template>
  <BackHeader> 在线编辑
    <template #right>
      <div></div>
    </template>
  </BackHeader>
  <div class="image-editor">
    <div class="wraper" ref="wraper" :style="{ 'filter': filterList[fileterIndex].value }">
      <img v-if="image" :src="image">
      <canvas ref="canvas" @touchend="onTouchEnd" @touchmove="onTouchMove" @touchstart="onTouchStart"></canvas>
      <input class="textInput"
        :style="{ 'left': inputLeft + 'px', 'top': inputTop + 'px', 'color': color, 'font':`${textSize}px/2 Arial` }"
        v-show="textInput" @keydown.enter="onText" v-model="inputValue">
    </div>
    <div class="buttons">
      <input id="import-image" type="file" @change="importImage" accept="image/*" hidden>
      <label class="button" for="import-image">导入</label>
      <label class="button" @click="downloadImage">导出</label>
    </div>
    <div class="filterList">
      <div class="item" v-for="(item,index) in filterList" :key="item.name" @click="filterImage(index)">
        <div class="effect"
          :style="{ 'filter': item.value, backgroundImage: `url(${image})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }">
        </div>
        <div class="text">{{ item.name }}</div>
      </div>
    </div>
    <div class="tools">
      <div class="option">
        <input type="color" v-model="color" class="color-picker" @input="painting = true" @change="painting = false">
        <div>
          <input id="brushSizeInput" type="range" min="1" max="5" v-model="brushSize">
          <label for="brushSizeInput">线条:{{ brushSize }}</label>
          <!-- 文字大小 -->
          <input id="textSizeInput" type="range" min="12" max="24" v-model="textSize">
          <label for="textSizeInput">文字:{{ textSize }}</label>
        </div>

      </div>
      <div class="edit">
        <button @click="changeTool('pen')">画笔</button>
        <button @click="changeTool('eraser')">橡皮擦</button>
        <button @click="changeTool('text')">文字</button>
        <button @click="revolk">撤销</button>
      </div>
      <!-- <input id="brushSizeInput" type="range" min="1" max="50" value="10">
      <label for="brushSizeInput">Brush Size</label> -->


    </div>
  </div>
</template>

<script setup>

import { canvasToImage, compressionFile } from "@/utils"
const { appContext: { config: { globalProperties } } } = getCurrentInstance()
// canvas 不能设置 样式 宽高 100% 会导致坐标出问题
const canvas = ref(null)
// ctx
const ctx = ref(null)
// 颜色选择器
const color = ref("#000000")
// 线条大小
const brushSize = ref(1)
// 文字大小
const textSize = ref(16)
const tool = ref("")
// 点击开始坐标
const startPoint = ref({ x: undefined, y: undefined })
// 是否可以画板
const painting = ref(false)
const offsetX = ref(0)
// 
const offsetY = ref(0)
// 文件名
const fileName = ref("")
const wraper = ref(null)
// 图片
const image = ref(null)
// 保存canvas 状态
const canvasState = ref([])
const index=ref(0)
// 滤镜列表
const filterList = ref([
  { name: "原图", value: "none" },
  { name: "模糊", value: "blur(1px)" },
  { name: "亮度", value: "brightness(0.5)" },
  { name: "对比度", value: "contrast(200%)" },
  { name: "灰度", value: "grayscale(100%)" },
  { name: "色相旋转", value: "hue-rotate(90deg)" },
  { name: "反色", value: "invert(100%)" },
  { name: "透明度", value: "opacity(90%)" },
  { name: "饱和度", value: "saturate(200%)" },
  { name: "边缘检测", value: "edge-detect(0)" }, // 新增的边缘检测效果
  { name: "模糊边缘", value: "blur(2px) contrast(100%)" } // 新增的模糊边缘效果
])
// fileter index
const fileterIndex = ref(0)


onMounted(() => {
  canvas.value.width = wraper.value.clientWidth// 设置画布宽度
  // 设置 Canvas 背景色为透明
  canvas.value.style.backgroundColor = "transparent"
  canvas.value.height = wraper.value.clientHeight// 设置画布高度
  ctx.value = canvas.value.getContext("2d")
  ctx.value.lineWidth = brushSize.value
  ctx.value.strokeStyle = color.value
  // 设置图片平滑
  ctx.value.imageSmoothingEnabled = true
  // 设置字体大小
  ctx.value.font = `${textSize.value}px/2 Arial`
  // 获取距离设备高宽度
  const rect = canvas.value.getBoundingClientRect()
  console.log(rect)
  offsetX.value = rect.left
  offsetY.value = rect.top

})
// 导入图片相关方法
const importImage = async (event) => {
  const file = event.target.files[0]
  image.value = await compressionFile(file) 
  fileName.value=file.name
  
}
// 下载图片相关方法
const downloadImage = async () => {
  const dataUrl =await canvasToImage(wraper.value)
  var link = document.createElement("a")
  link.download = fileName.value+"_"+new Date().getTime()+".png"
  link.href = dataUrl
  link.click()
   
}
// 选择工具
const changeTool = (newTool) => {
  tool.value = newTool
}
// canvas 移动开始
const onTouchStart = (e) => {
  let x = e.touches[0].clientX - offsetX.value
  let y = e.touches[0].clientY - offsetY.value
  // 初始化为状态对象
  canvasState.value[index.value] = {
    type: tool.value,
    data: []
  }
  if(tool.value==="eraser"){
    painting.value = true
    ctx.value.clearRect(x,y, 20, 20)
  }
  if(tool.value==="pen"){
    painting.value = true
    startPoint.value.x = x
    startPoint.value.y = y
    ctx.value.lineWidth = brushSize.value
    ctx.value.strokeStyle = color.value
 
    
    console.log("开始", canvasState.value)
  }
  if(tool.value==="text"){
    //每次点击 将之前的 画上去
    onText()
    ctx.value.font = `${textSize.value}px/2 Arial`
    ctx.value.fillStyle = color.value
    textInput.value=true
    console.log("文本",x,y)
    inputLeft.value = x
    inputTop.value = y

  }

}
// canvas 移动
const onTouchMove=(e)=>{
  console.log(e.touches[0].clientX,"移动")

  if(!painting.value)return
  let x = e.touches[0].clientX - offsetX.value
  let y = e.touches[0].clientY - offsetY.value
  if(tool.value==="eraser"){
    console.log("橡皮擦",x,y)
    ctx.value.clearRect(x, y, 20, 20)
    canvasState.value[index.value]["data"].push(
      {
        xStart: startPoint.value.x,
        yStart: startPoint.value.y,
        xEnd: 20,
        yEnd: 20,
       
      }
    )
  }

  let newPoint = { x: x, y: y }
  if(tool.value==="pen"){
 
    console.log("按钮移动",x,y)
    canvasState.value[index.value]["data"].push(
      {
        xStart: startPoint.value.x,
        yStart: startPoint.value.y,
        xEnd: newPoint.x,
        yEnd: newPoint.y,
        lineWidth: brushSize.value,
        color: color.value
      }
    )
    drawLine(startPoint.value.x, startPoint.value.y, newPoint.x, newPoint.y)
  }

  startPoint.value.x = newPoint.x
  startPoint.value.y = newPoint.y
}
//canvas画线条函数
const drawLine = (xStart, yStart, xEnd, yEnd) => {
  //开始绘制路径
  ctx.value.beginPath()
  //起始位置
  ctx.value.moveTo(xStart, yStart)
  //停止位置
  ctx.value.lineTo(xEnd, yEnd)
  //描绘线路
  ctx.value.stroke()
  //结束绘制
  ctx.value.closePath()
}
// canvas移动结束事件
const onTouchEnd = async function () {
  // 如果 之前开启了画版 才将之前的图片数据缓存起来
  if (!painting.value) return
  console.log("结束")
  //结束移动 加加索引
  index.value++
  // 当前保存的装态
  console.log("canvasState",canvasState.value,index.value)
  /*ps 这里是使用保存 图片的方式实现撤销
  // painting.value = false
  // console.log("结束")
  // const tempImageList = JSON.parse(sessionStorage.getItem("tempImageList")) || []
  // const dataUrl=await canvasToImage(wraper.value)
  // tempImageList.push(dataUrl)
  // console.log("tempImageList",tempImageList)

  // sessionStorage.setItem("tempImageList",JSON.stringify(tempImageList))*/
}

// 撤销
const revolk = () => {
  console.log("撤销",index.value)
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
  if (index.value == 0) {
    globalProperties.$message("暂无记录")
    return
  }
  // 撤销 索引减减
  index.value--
  console.log("index",index.value)
  console.log("canvasState",canvasState.value)
  for (let i = 0; i < index.value; i++) {
    const cuurrentType = canvasState.value[i]["type"]
    const cuurrentState = canvasState.value[i]["data"]
    console.log("cuurrentType", cuurrentType)
    console.log("cuurrentState",cuurrentState)
    // 画笔
    if (cuurrentType === "pen") {
      for (const key in cuurrentState) {
        const { xStart, yStart, xEnd, yEnd, lineWidth,color } = cuurrentState[key]
        ctx.value.lineWidth = lineWidth
        ctx.value.strokeStyle = color
        drawLine(xStart, yStart, xEnd, yEnd)
      }
    }
    // 橡皮擦
    if (cuurrentType === "eraser") {
      for (const key in cuurrentState) {
        const { xStart, yStart, xEnd, yEnd } = cuurrentState[key]
        ctx.value.clearRect(xStart, yStart, xEnd, yEnd)
      }
    }
    // 文本
    if (cuurrentType === "text") {
      console.log("文本",cuurrentState)
      for (const key in cuurrentState) {
        const { text, x, y,font } = cuurrentState[key]
        ctx.value.font = font
        ctx.value.fillStyle = color.value
        ctx.value.fillText(text, x, y)
      }
    }
   
  }
 
  /*ps 这里是使用保存 图片的方式实现撤销getTempImage()*/
}
/*ps 这里是使用保存 图片的方式实现撤销
// 备份临时文件方法
// const backupTempImage = (dataUrl) => {
//   const tempImageList = JSON.parse(sessionStorage.getItem("tempImageList")) || []
//   tempImageList.push(dataUrl)
//   sessionStorage.setItem("tempImageList", JSON.stringify(tempImageList))
// }
// 取出临时文件相关方法
// const getTempImage = () => {
//   const tempImageList = JSON.parse(sessionStorage.getItem("tempImageList")) || []
//   if (tempImageList.length == 0) {
//     globalProperties.$message("暂无记录")
//     return
//   }
//   tempImageList.pop()
//   if (tempImageList.length == 0) {
//     image.value = null
//     sessionStorage.setItem("tempImageList", JSON.stringify(tempImageList))
//     return
//   }
//   image.value = tempImageList[tempImageList.length - 1]
//   sessionStorage.setItem("tempImageList", JSON.stringify(tempImageList))
// }
*/
// 滤镜点击事件
const filterImage=(index)=> {
  fileterIndex.value=index
}
// 文字输入框显示
const textInput = ref(true)
// 文字输入框内容
const inputValue = ref("")
// 文字输入框left
const inputLeft = ref(0)
// 文字输入框top
const inputTop = ref(0)
// 文字回车
const onText=()=>{
  textInput.value = false
  if(inputValue.value==="")return
  
  // ctx.value.font = "16px/2 Arial"
  // ctx.value.fillStyle = color.value
  console.log(inputValue.value,inputLeft.value, inputTop.value)
  // ps 文字绘制的时候 会有一个基线的问题  所以这里加上20 不太理解 有待研究
  ctx.value.fillText(inputValue.value, inputLeft.value, inputTop.value+20)
  canvasState.value[index.value]["data"].push(
    {
      font: `${textSize.value}px/2 Arial`,
      text: inputValue.value,
      x: inputLeft.value,
      y: inputTop.value + 20
    }
  )
  // 每次回车代表   一个新的步骤
  index.value++
  console.log("文本",canvasState.value)
  inputValue.value=""
  
}
</script>

<style  lang="scss" scoped>
.image-editor {
  padding: 5px 20px;

}

.buttons {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
}

.file-upload {
  display: inline-block;
  background-color: #007bff;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  

}

.file-upload input[type="file"] {
  display: none;
}

.file-upload:hover {
  background-color: #0056b3;
}

.tools {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  .option{
    display: flex;
    flex-direction: column;
    width: 50px;
    flex: 2;
    input[type="range"] {
      width: 40px;
      border: none;
      cursor: pointer;
    }
    font-size: 12px;
  }
  .edit{
    display: flex;
    flex: 5;
   
    flex-wrap: wrap;
    button{
      height: 35px;
      padding: 2px 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      outline: none;
      margin: 5px;
      font-size: 12px;
   
    }
  }
}

.color-picker {
  margin-right: 10px;
}

.button {
  
  padding: 4px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  filter: blur();
  font-size: 14px;
}

.button:hover {
  background-color: #0056b3;
}

.active {
  background-color: #0056b3;
}
.wraper{
  position: relative;
  
  border: 1px solid #ccc;
  height: 300px;
  width: 100%;
  box-sizing: border-box;
  img{
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  canvas{
    position: absolute;
 
  }
  .textInput{
    position: absolute;
    z-index: 2;
    border: none;
    /* 去除边框 */
    outline: none;
    /* 去除聚焦时的边框 */
    background-color: transparent;
    /* 透明背景 */
    font-size: 16px;
    /* 字体大小 */
    font-family: Arial, sans-serif;
    /* 字体 */
    color: black;
    /* 文本颜色 */
    text-decoration: underline;
    /* 添加下划线 */
    &::placeholder {
      color: #ccc;
      /* 占位符颜色 */
    }
  }
  
}
.filterList {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  .item{
    .effect{
        padding: 5px 10px;
          background-color: #007bff;
          color: white;
          border-radius: 5px;
          cursor: pointer;
          margin: 5px;
          width: 25px;
          height: 50px;
    }
    .text{
      text-align: center;
      margin-top: 5px;
      color: #262626;
      font-size: 12px;
    }
  
  }
}





</style>