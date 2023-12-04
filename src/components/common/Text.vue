<template>
  <div class="text" :style="{display:display}">
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
  display:{
    type:String,
    default:"block"
  }

})
</script>

<style scoped lang='scss'>
// .text{
//   // display: inline-block;
//   // margin: 2px;
// }
</style>