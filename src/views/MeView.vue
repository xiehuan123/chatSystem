<template>
  <div class="me">
    <meinfo :me-info="meinfoData"></meinfo>
    <FindList :info-list="infoList"></FindList>
  </div>
</template>

<script setup>
import { ref, computed ,getCurrentInstance} from 'vue'
import meinfo from '../components/meinfo.vue';
import FindList from '../components/FindList.vue';
const meinfoData=
{
    avatar:"https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500",
    wx:"xiehuan6666666",
    nickName:"Appoint"
   
}
const infoList=[
{
    infoId: 1,
    infoName: "服务",
    avatar: "icon-iconfontzhizuobiaozhunbduan36",
    marginTop:true,
 
    
  },
  {
    infoId: 2,
    infoName: "收藏",
    avatar: " icon-shoucang",
    marginTop:true,
   
  },
  {
    infoId: 3,
    infoName: "朋友圈",
    avatar: "icon-tupian_o",
    marginBorde:true
   
  },
  {
    infoId: 4,
    infoName: "视频号",
    avatar: "icon-24gl-playCircle",
    marginBorde:true
   
  },
  {
    infoId: 5,
    infoName: "卡包",
    avatar: "icon-kabao",
    marginBorde:true
  },
  {
    infoId: 6,
    infoName: "表情",
    avatar: "icon-biaoqing",
    marginBorde:true
   
  },
  {
    infoId: 7,
    infoName: "设置",
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