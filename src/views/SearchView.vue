<template>
  <div class="search_view">
    <Search @sendUserData="receiveUserData"></Search>
    <div class="result">
      <div class="bgc">
        <h3 class="title">个人</h3>
      </div>
      <div class="content">
        <div v-if="true">
          <ListItem
            v-for="item in infoList"
            :key="item.sesstionId"
            :sesstioItem="item"
            :height="58"
          ></ListItem>
        </div>
        <p class="notfund">11111</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Search from "@/components/Search.vue"
import ListItem from "@/components/ListItem.vue"
import { reactive } from "vue"
const infoList = [
  {
    sesstionId: 1,
    sesstionName: "昵称",
    avatar: "icon-iconfontzhizuobiaozhunbduan36",
    sesstionMsg: [
      {
        sendMsg: "个性签名",
      },
    ],
  },
]
const receiveUserData = (userData) => {
  console.log("aa11111", userData)
}

const userData = reactive({})
</script>

<style lang="scss" scoped>
.search_view {
  height: 100%;
  width: 100%;

  .result {
    padding-bottom: 10px;
    background-color: #e3e3e3;
    .bgc {
      background-color: white;
      padding: 0 7px;
      .title {
        font-size: 12px;
        height: 30px;
        line-height: 30px;
        // padding: 0 7px;
        font-weight: normal;
        color: #ccc;
        border-bottom: #e3e3e3 0.2px solid;
        background-color: white;
      }
      .content {
        background-color: #e3e3e3;
      }
    }
  }
}
:deep(.time) {
  opacity: 0;
}
.notfund {
  height: 58px;
  background-color: white;
  text-align: center;
}
</style>