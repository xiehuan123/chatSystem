<template>
  <router-link to="/user/userinfo">
    <div class="meInfo" >
      <Avatar :src="store.user.userAvatar"></Avatar>
   
    <div class="content">
      <div class="nickName">

        {{ store.user.nickName }}
      </div>
      <Text class="wx"> 微信号:{{ store.user.userWx }}</Text>
   
    </div>
    <div class="Qrcode">
      <Icon iconName="icon-erweima"  />
      <Icon iconName="icon-arrow-right"  />
    </div>
  </div>


  </router-link>
  
  <div class="wxState">
    <div class="elliptic">
      <Icon iconName="icon-jiahao1"></Icon>状态
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
import { userStore } from "@/store"


defineProps({
  meInfo:{
    type:Object,
  }
})
const store=userStore()
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

    flex: 4;
    .nickName{
      font-size: $small-text-size;
      font-weight: 600;
   
    }
    .wx{
      color: $small-text-color;
      margin-top: 2px;
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
  background: #fff;
  padding: 10px 0;
  font-size: 12px;
  color: $bd-color;
  padding-left: 60px;
  .elliptic{
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    padding: 2px 10px;
    border:solid 1px #ccc;
    margin-left: 10px;

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