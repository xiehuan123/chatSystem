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
    sesstionId: 1,
    sesstionName: "朋友圈",
    avatar: "icon-iconfontzhizuobiaozhunbduan36",
    
  },
  {
    sesstionId: 2,
    sesstionName: "视频号",
    avatar: "icon-a-rongqi18",
    marginTop:true
  },
  {
    sesstionId: 3,
    sesstionName: "直播",
    avatar: "icon-icon-test",
    marginBorde:true
  },
  {
    sesstionId: 4,
    sesstionName: "扫一扫",
    avatar: "icon-saoyisao",
    marginTop:true
  },
  {
    sesstionId: 5,
    sesstionName: "看一看",
    avatar: "icon-kanyikan",
    marginTop:true
  },
  {
    sesstionId: 6,
    sesstionName: "附近",
    avatar: "icon-fujin",
  },

  {
    sesstionId: 8,
    sesstionName: "游戏",
    avatar: "icon-leidatu",
    marginTop:true
  },
  {
    sesstionId: 9,
    sesstionName: "小程序",
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