<template>
  <router-link to="/user/userinfo">
    <div class="meInfo" >
    <div class="avatar">
      <img :src="store.user.userAvatar" alt="avatar">
    </div>
    <div class="content">
      <div class="nickName">

        {{ store.user.nickName }}
      </div>
      <div class="wx">
        微信号:{{ store.user.userWx }}
      </div>
    </div>
    <div class="Qrcode">
      <Icon iconName="icon-erweima"  />
      <Icon iconName="icon-arrow-right"  />
    </div>
  </div>


  </router-link>
  
  <div class="wxState">
    <div class="elliptic">
      <i class="iconfont icon-jiahao1"></i>状态
    </div>
    <div class="elliptic">
 
      <img src="https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500" alt="">
      <img src="https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500" alt="">
      <img src="https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500" alt="">
   
      3个朋友 <Dots  ></Dots>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue"
import { useStore } from "@/store"
import Icon from "@/components/common/Icon.vue"
import Dots from "@/components/Dots.vue"

defineProps({
  meInfo:{
    type:Object,
  }
})
const store=useStore()
</script>

<style scoped lang='scss'>
.meInfo{
  display: flex;
  align-items: center;
  background: #fff;
  .avatar{
    flex: 1;
    padding-left: 10px;
    img{
      padding: 15px;
      width: 50px;
      height: 50px;
      border-radius: 18px;
    }
  }
  .content{

    flex: 5;
    .nickName{
      font-size: $small-text-size;
      font-weight: 600;
     
    }
    .wx{
      color: $small-text-color;
      margin-top: 10px;
    }
    
  }
  .Qrcode{
    flex: 1;
    display: flex;
    justify-content: space-around;
    padding-right: 10px;
  }


}
.wxState{
  display: flex;
  justify-content: center;
  background: #fff;
  padding-bottom: 10px;
  .elliptic{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    padding: 5px 10px;
    border:solid 1px #ccc;

      img{
    width: 20px;
    height: 20px;
    border-radius:50% ;

  }
  :nth-child(2){
    position: relative;
    left: -6px;
    z-index: 1;
  }
  :nth-child(3){
    position: relative;
    left: -12px;
    z-index: 2;
  }


 
  }
}
</style>