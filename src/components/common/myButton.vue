<!--
 * @Author: xiehuan123 1208044257@qq.com
 * @Date: 2023-12-18 15:30:28
 * @LastEditors: xiehuan123 1208044257@qq.com
 * @LastEditTime: 2023-12-20 22:44:00
 * @FilePath: /chatSystem/src/components/common/Button.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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