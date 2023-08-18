<template>
  <div class="findlist">
    <ListItem
      v-for="item in infoList"
      :key="item.infoId"
      :infoItem="item"
      :height="45"
    >
  <template #right>
    <i class="iconfont icon-arrow-right"></i>
  </template>
  <template #left>
    <div class="avatar">
     
     <i :class="['iconfont',item?.avatar,'iconSize']"></i>
   </div>
  </template>
  </ListItem>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import ListItem from "./ListItem.vue";
defineProps({
  infoList:{
    type: Array,
    required: true,

  }
})
</script>

<style scoped lang="scss">
.findlist{

  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
  }
  .iconSize{
    font-size: 20px;
  }

}
</style>