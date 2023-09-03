<template>
  <div class="friend">
    <div class="title">X</div>
    <div class="content" v-for="(item, index) in friends" :key="index">
      <div class="img">
        <img src="../assets/image/test.jpg" alt="" />
      </div>
      <div class="nickname">{{ item.name }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const friends = ref([
  {
    name: "小明",
  },
  {
    name: "小红",
  },
  {
    name: "小蓝",
  },
]);
</script>

<style scoped lang="scss">
.friend {
  .title {
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    color: #6e6e6e;
    background-color: #ece9e7;
    padding: 0 10px;
  }
  .content {
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin: 0 10px;
    border-bottom: 1px solid #e6e6e6;
    .img {
      height: 32px;
      width: 32px;
      img {
        height: 32px;
        width: 32px;
        border-radius: 20%;
      }
    }
    .nickname {
      margin-left: 16px;
    }
  }
  .content:last-child {
      border-bottom: 0;
    }
}
</style>