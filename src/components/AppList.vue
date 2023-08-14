<template>
  <div class="list">
    <ListItem
      v-for="item in infoList"
      :key="item.infoId"
      :infoItem="item"
    ></ListItem>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ListItem from "./ListItem.vue";
const infoList = ref([
  {
    infoId: 1,
    infoName: "李文-前后端派单",
    avatar: "",
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
    avatar: "",
    stateCode: "0",
    infoMsg: [
      {
        sendName: "李文客服002",
        sendMsg: "接单扣3",
        sendTime: "下午:3:38",
      },
    ],
  },
]);
</script>

<style scoped>
</style>