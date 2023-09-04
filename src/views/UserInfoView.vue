<template>
  <div class="userInfo">
    <ListItem v-for="item in meun" :key="item.id" :sesstioItem="item" ></ListItem>
  </div>
</template>

<script setup>
import { ref } from "vue"
import ListItem from "../components/ListItem.vue"
const meun=ref([
  {
    id:1,
    sesstionName:"头像",
  },
  {
    id:2,
    sesstionName:"名字",
  }, {
    id:3,
    sesstionName:"拍一拍",
  }, {
    id:4,
    sesstionName:"微信号",
  },{
    id:5,
    sesstionName:"二维码名片"
  },{
    id:6,
    sesstionName:"更多信息"
  },{
    id:7,
    sesstionName:"来电铃声"
  },{
    id:8,
    sesstionName:"微信豆"
  },
  {
    id:9,
    sesstionName:"我的地址"
  }

])
</script>

<style scoped lang='scss'>
.userInfo{


}
</style>