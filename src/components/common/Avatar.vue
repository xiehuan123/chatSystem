<template>
  <div class="avatar"  :style="{width: size+'px',height:size+'px', borderRadius:border+'px'}">
      <img :src="src" alt="图片加载失败" @error="onError" >
    </div>
</template>

<script setup>
import { defineProps } from "vue"
defineProps({
  size:{
    type:Number,
    default:45,
  },
  src:{
    type:String,
    default:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  },
  border:{
    type:Number,
    default:3,
  }

})
const onError=(e)=>{
  e.target.src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
}
</script>

<style scoped lang='scss'>
.avatar{
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
}
</style>