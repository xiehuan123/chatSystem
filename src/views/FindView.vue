<template>
  <div class="find">
    <FindList :infoList="infoList"></FindList>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import FindList from "../components/FindList.vue"
const infoList=ref([

    {
    infoId: 1,
    infoName: "朋友圈",
    avatar: "icon-iconfontzhizuobiaozhunbduan36",
    
  },
  {
    infoId: 2,
    infoName: "视频号",
    avatar: "icon-a-rongqi18",
    marginTop:true
  },
  {
    infoId: 3,
    infoName: "直播",
    avatar: "icon-icon-test",
    marginBorde:true
  },
  {
    infoId: 4,
    infoName: "扫一扫",
    avatar: "icon-saoyisao",
    marginTop:true
  },
  {
    infoId: 5,
    infoName: "看一看",
    avatar: "icon-kanyikan",
    marginTop:true
  },
  {
    infoId: 6,
    infoName: "附近",
    avatar: "icon-fujin",
  },

  {
    infoId: 8,
    infoName: "游戏",
    avatar: "icon-leidatu",
    marginTop:true
  },
  {
    infoId: 9,
    infoName: "小程序",
    avatar: "icon-xiaochengxu",
    marginTop:true
  }



])
</script>

<style scoped>
.find{
  background: rgb(227, 227, 227);
  height: 100%;
}
</style>