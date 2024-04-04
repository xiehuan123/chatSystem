<template>
  <div class="me">
    <meinfo :me-info="meinfoData"></meinfo>
    <FindList :info-list="infoList"></FindList>
  </div>
</template>

<script setup>
import {ref} from "vue"

const meinfoData=
{
  avatar:"https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500",
  wx:"xiehuan6666666",
  nickName:"Appoint"
   
}
const infoList=ref([
  // {
  //   sesstionId: 1,
  //   sesstionName: "服务",
  //   avatar: "icon-iconfontzhizuobiaozhunbduan36",
  //   marginTop:true,
 
    
  // },
  {
    sesstionId: 2,
    sesstionName: "收藏",
    avatar: "icon-shoucang",
    marginTop:true,
   
  },
  {
    sesstionId: 3,
    sesstionName: "朋友圈",
    avatar: "icon-tupian_o",
    color:"#53719f",
    marginBorde:true
   
  },
  {
    sesstionId: 4,
    sesstionName: "视频号",
    avatar: "icon-video",
    color:"#d2a467",
    marginBorde:true
   
  },
  // {
  //   sesstionId: 5,
  //   sesstionName: "卡包",
  //   avatar: "icon-kabao",
  //   color:"#53719f",
  //   marginBorde:true
  // },
  {
    sesstionId: 6,
    sesstionName: "表情",
    avatar: "icon-biaoqing",
    color:"#d2a467",
    marginBorde:true,
    path:"/emoticon"
   
  },
  {
    sesstionId: 7,
    sesstionName: "设置",
    avatar: "icon-shezhi",
    color:"#53719f",
    marginTop:true,
    path:"/setting"
   
  }
])
</script>

<style lang="scss"  scoped>
.me{

  height: 100%;
}
</style>