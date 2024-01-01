<template>
  <div :class="['text',className]" :style="style">
    <span :style="{fontSize:size+'px', color:color,fontWeight:weight}">
      <slot></slot>
   </span>
  </div>
</template>

<script setup>
import { defineProps } from "vue"
defineProps({
  size:{
    type:Number,
    default:15
  },
  color:{
    type:String,
    default:"#ccc"
  },
  weight:{
    type:Number,
    default:0
  },

  className:{
    type:String,
    default:""
  },
  style:{
    type:Object,
    default:()=>{}
  }

})
</script>

<style scoped lang='scss'>
// .text{
//   // display: inline-block;
//   // margin: 2px;
// }
</style>