<template>
  <div class="me">
    <meinfo :me-info="meinfoData"></meinfo>
    <FindList :info-list="infoList"></FindList>
  </div>
</template>

<script setup>
import {} from "vue"
import meinfo from "../components/meinfo.vue"
import FindList from "../components/FindList.vue"
const meinfoData=
{
  avatar:"https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500",
  wx:"xiehuan6666666",
  nickName:"Appoint"
   
}
const infoList=[
  {
    sesstionId: 1,
    sesstionName: "服务",
    avatar: "icon-iconfontzhizuobiaozhunbduan36",
    marginTop:true,
 
    
  },
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
    marginBorde:true
   
  },
  {
    sesstionId: 4,
    sesstionName: "视频号",
    avatar: "icon-24gl-playCircle",
    marginBorde:true
   
  },
  {
    sesstionId: 5,
    sesstionName: "卡包",
    avatar: "icon-kabao",
    marginBorde:true
  },
  {
    sesstionId: 6,
    sesstionName: "表情",
    avatar: "icon-biaoqing",
    marginBorde:true
   
  },
  {
    sesstionId: 7,
    sesstionName: "设置",
    avatar: "icon-shezhi",
    marginTop:true,
   
  }
]
</script>

<style scoped>
.me{
  background: rgb(227, 227, 227);
  height: 100%;
}
</style>