<template>
  <transition name="dialog-fade">
    <div class="dialog" @click.self="onClose" v-if="isVisible">
      <div class="main" >
        <div class="info">
          <Avatar :src="data.userAvatar" v-if="data.userAvatar" />
          <div>
            <Text color="#000000" :size="17" v-if="data.nickName">{{data.nickName}}</Text>
            <Text color="#000000" v-if="data.userRigon">{{data.userRigon}}</Text>
          </div>

        </div>
        <img :src="data.QRcode" alt="" v-if="data.QRcode">
        <Text :style="{ textAlign:'center'}">扫一扫上面的二维码添加我为好友</Text>
      </div>
      
    </div>
  </transition>
</template>

<script setup>
import { ref,defineProps,watch,} from "vue"

import Avatar from "@/components/common/Avatar.vue"
import Text from "@/components/common/Text.vue"
const props=defineProps({
  dialog:{
    type:Object,
    default:()=>{
      return {
        title:"",
        open:false,
        data:{
   
        }
      }
    }
  }
})
const isVisible=ref(props.dialog.open)
const data = ref(props.dialog.data)
const onClose=()=>{
  isVisible.value=false
}
// 监听传递的值
watch(() => props.dialog,(val)=>{
  isVisible.value = val.open
  if(val.open){
    data.value = val.data
  }
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
      // background: linear-gradient(70deg,#EF54C0,#F9F871);
      background-color: #fff;
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