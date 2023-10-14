<template>
  <div class="text">
    <span :style="{fontSize:size+'px', color:color}"><slot >
    

  </slot></span>
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
  }

})
</script>

<style scoped lang='scss'>
.text{
  // display: inline-block;
  margin: 7px;
}
</style>