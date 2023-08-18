<template>
  <div class="home">
    <HomeList :infoList="infoList"></HomeList>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import HomeList from "../components/HomeList.vue";
const infoList=ref([

{
    infoId: 1,
    infoName: "李文-前后端派单",
    avatar: "https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500",
    stateCode: "0",
    infoMsg: [
      {
        sendName: "李文客服002",
        sendMsg: "接单扣3",
        sendTime: "下午:3:38",
      },
    ],
  },
  {
    infoId: 2,
    infoName: "李文-前后端派单",
    avatar: "https://img0.baidu.com/it/u=3442879250,1839042971&fm=253&fmt=auto&app=138&f=JPEG?w=755&h=500",
    stateCode: "0",
    infoMsg: [
      {
        sendName: "李文客服002",
        sendMsg: "接单扣3",
        sendTime: "下午:3:38",
      },
    ],
  },


])
</script>

<style scoped lang="scss">


</style>