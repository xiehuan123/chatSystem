<template>
  <div class="basic">
    <AppHeader></AppHeader>
    <AppMain></AppMain>
    <AppFooter></AppFooter>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AppFooter from "../components/AppFooter.vue";
import AppHeader from "../components/AppHeader.vue";
import AppMain from "../components/AppMain.vue";
import { io } from "socket.io-client";
import axios from "axios";

onMounted(async () => {
  const data = await axios.get("http://127.0.0.1:5000");
  console.log(data);
  console.log(11);
  // 替换为你的 Socket.IO 服务器地址
  const socket = io("http://127.0.0.1:5000");
  socket.on("connect", () => {
    console.log("连接成功");
  });
  socket.emit("message", "这是一条测试消息");
});
</script>

<style scoped>
.basic {
  position: relative;
}
</style>