
<template>
  <div class="myButton" :style="{display:display}" >
    <button  v-bind="attrs"  :style="{fontSize:size+'px', color:color,fontWeight:weight,backgroundColor:backgroundColor}">
      <slot></slot>
   </button>

  </div>
</template>

<script setup>
import { defineProps,useAttrs } from "vue"
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
const attrs=useAttrs()
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
 button[disabled] {
      background-color: #e1e1e1;
      color: #b4b4b4;
    }

 
}
</style>