<template>
  <div v-if="props.num"  class="dots" :style="{top:props.top+'px',right:props.right+'px'}">
    {{ props.num }}
  </div>
</template>

<script setup>
import { ref, computed,defineProps } from 'vue'
const props=defineProps({
      num:{
        default:0,
        type:Number
      },
      top:{
        default:0,
        type:Number
      },
      right:{
        default:0,
        type:Number
      },

})
</script>

<style scoped>
 .dots{
   
   position: absolute;
   right: 0;
   top: 0;
   width: 20px;
   height: 20px;
   border-radius: 50%;
   font-size: 12px;
   text-align: center;
   line-height: 20px;
   color: #fff;
   background: #fd0000;

 }
</style>