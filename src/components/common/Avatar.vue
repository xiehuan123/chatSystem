<template>
  <div class="avatar"  :style="{width: width+'px',height:height+'px', borderRadius:border+'px'}">
      <img :src="src" alt="图片加载失败" >
    </div>
</template>

<script setup>
import { defineProps } from "vue"
defineProps({
  width:{
    type:Number,
    default:70,
  },
  height:{
    type:Number,
    default:70,
  },
  src:{
    type:String,
    default:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  },
  border:{
    type:Number,
    default:10,
  }

})
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