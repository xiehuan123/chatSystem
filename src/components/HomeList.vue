<template>
  <div class="list">
    <ListItem v-for="item in infoList" :key="item.infoId" :infoItem="item" :height="50">
      <template #right v-if="item?.infoMsg">
        <div>{{ item?.infoMsg[item?.infoMsg.length - 1]?.sendTime }}</div>
        <div>勿扰</div>
      </template>
      <template #left>
        <div class="avatar">
          <img :src="item?.avatar" alt="图片加载失败" />
        <Dots :position="true"  :num="item?.infoMsg?.length" :top="0" :right="0"></Dots>
       </div>
      </template>
    </ListItem>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ListItem from "./ListItem.vue";
import Dots from "./Dots.vue";
defineProps({
  infoList: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped lang="scss">
 .avatar {
    position: relative;
    padding: 5px;
    width: 50px;
    // background: #f07a7a;
    box-sizing: border-box;
    margin: 0 10px;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
</style>