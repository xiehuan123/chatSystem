<template>
  <transition
    name="dialog-fade"

   >
<div class="dialog" @click.self="onClose" v-show="isVisible">
<div class="main">
  <div class="info">
    <Avatar :src="store.user.userAvatar" />
    <div>
      <Text color="#ffffff" :size="17">{{store.user.nickName}}</Text>
      <Text >{{store.user.userRigon}}</Text>
    </div>
  
  </div>
  <img :src="store.user.QRcode" alt="">
  <Text :style="{ textAlign:'center'}">扫一扫上面的二维码添加我为好友</Text>
</div>
</div>
  </transition>
</template>

<script setup>
import { ref,defineProps,watch,defineEmits} from "vue"
import {userStore}from "@/store"

import Avatar from "@/components/common/Avatar.vue"
import Text from "@/components/common/Text.vue"
const props=defineProps({
  visible:{
    type:Boolean,
    default:false
  }
})
const store=userStore()
const isVisible=ref(false)
console.log(store.user)
const emit=defineEmits(["update:visible"])
const onClose=()=>{
  isVisible.value=false
  emit("update:visible",false)
  
}
// 监听传递的值
watch(()=>props.visible,(val)=>{

  isVisible.value=val
})
</script>

<style lang="scss">
.dialog{
    position: relative;
    display: flex;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
  
    align-items: center;
  
    background-color: $mask-bg;
    .main{
      width: 90%;
      height: 62%;
      margin: 0 auto;
      padding: 30px;
      box-sizing: border-box;
      border: solid 1px #ccc;
      background: linear-gradient(70deg,#EF54C0,#F9F871);
      .info{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        
        >div{
          padding-left: 10px;     
        }
      }
      img{
          width: 100%;
         
        }
    }
}
</style>