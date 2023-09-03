<template>
  <div class="search">
    <Search></Search>
    <div class="result">
      <h3 class="title">个人</h3>
      <div class="content">
        <ListItem
          v-for="item in infoList"
          :key="item.sesstionId"
          :sesstioItem="item"
          :height="58"
        ></ListItem>
      </div>
    </div>
  </div>
</template>

<script setup>
import Search from "../components/Search.vue"
import ListItem from "../components/ListItem.vue"
const infoList = [
  {
    sesstionId: 1,
    sesstionName: "昵称",
    // avatar: "icon-iconfontzhizuobiaozhunbduan36",
    sesstionMsg: [
      {
        sendMsg: "个性签名",
      },
    ],
    marginBorde: true,
  },
]
</script>

<style lang="scss" scoped>

</style>