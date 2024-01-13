<template>
  <div class="sharesheet" v-show="isShow">
     <ul>
    <li v-for="item in props.options" :key="item.id" @click="onOpen(item.id)">
      {{ item.name }}
    </li>
    <li  @click="close"> 取消</li>
  </ul>
  <input type="file" ref="fileDom"  accept="image/*"  @change="onUploadChange" multiple hidden>
  </div>
 
</template>
<script setup>
import {ref,defineProps, watch,defineEmits } from "vue"
import { useRouter } from "vue-router"
import {compressionFile,setMometimageList,getMomentItem} from "@/utils/index"

const props = defineProps({
  options: {
    type: Array,
    default: () => [{"id":1,"name":"拍摄"},{"id":2,"name":"从相册选择"}],
  },
  show:{
    type:Boolean,
    default:false
  }
})
const router =useRouter()
const isShow=ref(false)
const fileDom=ref(null)
const emit=defineEmits(["update:show","onOpen"])
watch(()=>props.show,(val)=>{
  isShow.value=val
})
const close =()=>{
  emit("update:show",false)
}
const onOpen=(id)=>{

  emit("onOpen",id)
  // switch (id){
  // case 1:
  //   router.push({
  //     path:"/photoGraph"
  //   })
  //   break
  // case 2:
  //   fileDom.value.click()
  //   break

  // }
}
const onUploadChange = async() => {

  const len=parseInt(await getMomentItem("momnetImageListLength")||0)
  const files = fileDom.value.files
  console.log(files.length,len,77777777)
  if(files.length+len>10){
    alert("最多只能选中9张图片")
    return
  }
  for (const key in files) {
    if (Object.hasOwnProperty.call(files, key)) {
      const file = files[key]
      const compressFileBase64= await compressionFile(file) 
      setMometimageList(compressFileBase64) 
    }
  }
 
  emit("update:show",false)
  router.push({path:"/mometnPublish"})
 
}
</script>
<style lang="scss" scoped>
.sharesheet {
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-color: $mask-bg;
  z-index: 999999;
  ul{
    position: absolute;
    width: 100%;
    bottom: 0;
    background-color: #ffff;
    border-radius: 10px 10px 0 0;
    // 当前 ul 下面除了最后一个元素生效
    :not(:last-child){
       &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 1px;
      content: "";
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      background-color: #c8c7cc;
      }
    }
    >li{
      position: relative;
      height: 50px;
      text-align: center;
      line-height: 50px;
      &:active{
        background-color: rgba(237, 237, 237,.2);
      }
    }
   
   
  
  }
  
}
</style>
