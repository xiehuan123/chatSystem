<template>
  <transition
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
<div class="dialog" @click.self="onClose" v-show="isVisible">
<div class="main">
  <div class="info">
    <Avatar  />
    <div>
      <Text color="#ffffff" :size="17">{{store.user.nickName}}</Text>
      <Text>{{store.user.userRigon}}</Text>
    </div>
  
  </div>
  <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
  <Text>扫一扫上面的二维码添加我为好友</Text>
</div>
</div>
  </transition>
</template>

<script setup>
import { ref,defineProps,watch,defineEmits} from "vue"
import {useStore}from "@/store"

import Avatar from "@/components/common/Avatar.vue"
import Text from "@/components/common/Text.vue"
const props=defineProps({
  visible:{
    type:Boolean,
    default:false
  }
})
const store=useStore()
const isVisible=ref(false)

const emit=defineEmits(["update:visible"])
const onClose=()=>{
  isVisible.value=false
  emit("update:visible",false)
  
}
// 监听传递的值
watch(()=>props.visible,(val)=>{
  console.log(val)
  isVisible.value=val
})
</script>

<style lang="scss">
.dialog{
    position: relative;
    display: flex;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99;
  
    align-items: center;
   
    background-color: $mask-bg;
    .main{
      
      width: 90%;
      height: 60%;
      margin: 0 auto;
      padding: 30px;
      box-sizing: border-box;
      border: solid 1px #ccc;
      background: linear-gradient(70deg,#EF54C0,#F9F871);
      .info{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        
      }
      img{
          width: 100%;
         
        }
    }
}
</style>