
<template>
  <div class="myButton" :style="{display:display}">
    <button :style="{fontSize:size+'px', color:color,fontWeight:weight,backgroundColor:backgroundColor}">
      <slot></slot>
   </button>

  </div>
</template>

<script setup>
import { defineProps } from "vue"
defineProps({
  size:{
    type:Number,
    default:12
  },
  color:{
    type:String,
    default:""
  },
  weight:{
    type:Number,
    default:0
  },
  display:{
    type:String,
    default:"block"
  },
  backgroundColor:{
    type:String,
    default:""
  }

})
</script>

<style scoped lang='scss'>
.myButton{
  
button{
  padding: 4px 10px;
  border: none;
  border-radius: 5px ;
  color: #ffffff;
  background-color: #45b910;
}

 
}
</style>