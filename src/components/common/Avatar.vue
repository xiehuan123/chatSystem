<template>
  <div :class="['avatar',className]"  >
    <div :style="{width: px2rem(size),height:px2rem(size), borderRadius:px2rem(borderRadius)}" >
      <img :src="src" alt="图片加载失败" @error="onError" >
    </div>
       <div  :class="['dots',num>9&&'double']"  v-if="num>0"      >
       {{ num }}
      </div>
     
    </div>
</template>

<script setup>
import {px2rem} from "@/utils"
defineProps({
  size:{
    type:Number,
    default:45,
  },
  src:{
    type:String,
    default:"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
  },
  borderRadius:{
    type:Number,
    default:3,
  },
  num:{
    type:Number,
    default:0,
  },
  className:{
    type:String,
    default:""
  }


})
const onError=(e)=>{
  e.target.src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
}
</script>

<style scoped lang='scss'>
.avatar{
  position: relative;
  >div{

overflow: hidden;
  img{
      width: 100%;
      height: 100%;
    }
  }
  .dots{
    position: absolute;
    position: absolute;
      width: 20px;
      height: 20px;
      
      top: 0;
      right: 0;
      transform: translateY(-25%) translateX(25%);
      border-radius: 50%;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background: #fd0000;
   &  .double{
      padding: 0 2px;
    }
  }
} 
.pointer{
  pointer-events: none;
}
</style>