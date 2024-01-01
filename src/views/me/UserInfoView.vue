<template>
  <div class="userInfo">
    <textItem v-for="item in meun" :key="item.id" :item="item"  >
    </textItem>
  </div>
</template>

<script setup>
import { ref } from "vue"

import { useStore } from "@/store"
const store=useStore()
const meun=ref([
  {
    id:1,
    name:"头像",
    height:60,
    avatar:"https://th.bing.com/th?id=OIP.T5mFPDq5L-pb9_9mMbwcNwHaFW&w=293&h=212&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
    
  },
  {
    id:2,
    name:"名字",
    marginBorde:true,
    height:45,
    nickName:store.user.nickName
    
  }, {
    id:3,
    name:"拍一拍",
    height:45,
    marginBorde:true
   
  }, {
    id:4,
    name:"微信号",
    height:45,
    marginBorde:true,
    userWx:store.user.userWx
    
  },{
    id:5,
    name:"二维码名片",
    height:45,
    marginBorde:true,
    icon:"icon-erweima"
   
  },{
    id:6,
    name:"更多信息",
    height:45,
    marginBorde:true
   
  },{
    id:7,
    name:"来电铃声",
    marginTop:true,
    text:"背景声音"
    
  },{
    id:8,
    name:"微信豆",
    height:45,
    marginTop:true
  },
  {
    id:9,
    name:"我的地址",
    height:45,
    marginTop:true
  }

])
</script>

<style scoped lang='scss'>
.userInfo{
  background: $bg-color;
}
</style>