<template>
  <div class="list">
    <ListItem v-for="item in infoList" :key="item.sesstionId" :sesstioItem="item" :height="55" :border="true" @click="onGoDialog(item)">
      <template #right v-if="item?.sesstionMsg">
        <div>{{ item?.sesstionMsg[item?.sesstionMsg.length - 1]?.sendTime }}</div>
        <div>勿扰</div>
      </template>
      <template #left>
        <div class="avatar">
          <img :src="item?.sesstioAvatar" alt="图片加载失败" />
        <Dots :position="true"  :num="item?.sesstionMsg?.length" :top="0" :right="0"></Dots>
       </div>
      </template>
    </ListItem>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import ListItem from "./ListItem.vue"
import Dots from "./Dots.vue"
defineProps({
  infoList: {
    type: Array,
    required: true,
  },
})
const router=useRouter()
const onGoDialog=(item)=>{
  router.push({
    path:`/user/${item.us}/${item.sesstionId}`,
  })
}
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