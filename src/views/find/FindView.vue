<template>
  <div class="find">
    <FindList :infoList="infoList"></FindList>
  </div>
</template>

<script setup>
import { ref } from "vue"

const infoList=ref([

  {
    sesstionId: 1,
    sesstionName: "朋友圈",
    path:"/moment/momentIndex",
    avatar: "icon-iconfontzhizuobiaozhunbduan36",
  },
  // {
  //   sesstionId: 2,
  //   sesstionName: "视频号",
  //   avatar: "icon-a-rongqi18",
  //   marginTop: true,
  // },
  // {
  //   sesstionId: 3,
  //   sesstionName: "直播",
  //   avatar: "icon-icon-test",
  //   marginBorde: true,
  // },
  {
    sesstionId: 4,
    sesstionName: "扫一扫",
    avatar: "icon-saoyisao",
    marginTop: true,
    path:"/sweepaway"
  },
  {
    sesstionId: 5,
    sesstionName: "看一看",
    avatar: "icon-kanyikan",
    marginTop: true,
  },
  {
    sesstionId: 6,
    sesstionName: "图片编辑",
    avatar: "icon-fujin",
    path:"/imageEdit"
  },

  {
    sesstionId: 8,
    sesstionName: "游戏",
    avatar: "icon-leidatu",
    marginTop: true,
    path: "/game"
  },
  {
    sesstionId: 9,
    sesstionName: "翻译",
    avatar: "icon-xiaochengxu",
    marginTop: true,
    path: "/translator"
  },
])
</script>

<style scoped>
.find {

  height: 100%;
}
</style>