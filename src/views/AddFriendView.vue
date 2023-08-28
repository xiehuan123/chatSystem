<template>
  <div class="addfriendview">
    <h4 class="title">
      <Icon
        iconName="icon-arrow-left"
        :fontSize="18"
        class="arrow_left"
        @click="toBack"
      ></Icon
      ><span>添加朋友</span>
    </h4>
    <div class="search" @click="toSearch">
      <Icon iconName="icon-sousuoxiao" class="serach_ico"></Icon>账号/手机号
    </div>
    <div class="num">
      我的微信号：xiehuan666
      <Icon iconName="icon-erweima" class="ico" :fontSize="20"></Icon>
    </div>
    <FunctionItem v-for="(_, index) in arr" :key="index"></FunctionItem>
  </div>
</template>

<script setup>
import FunctionItem from "../components/FunctionItem.vue";
import Icon from "../components/common/Icon.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const toBack = () => {
  router.go(-1);
};
const toSearch = () => {
  router.push({
    path: "/addfriend/search",
  });
};
const arr = [1, 3, 4, 5, 5];
</script>

<style lang="scss" scoped>
.addfriendview {
  width: 100%;
  height: 100%;
  background-color: #e3e3e3;
  overflow: hidden;
  .title {
    margin: 0 12px;
    text-align: center;
    margin-top: 14px;
    margin-bottom: 16px;
    position: relative;
    .arrow_left {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
  .search {
    height: 30px;
    margin: 0 12px;
    line-height: 30px;
    background-color: white;
    font-size: 12px;
    border-radius: 6px;
    text-align: center;
    color: #7b7b7b;
    .serach_ico {
      margin-right: 4px;
    }
  }
  .num {
    width: 100%;
    height: 24px;
    font-size: 16px;
    line-height: 24px;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 60px;
    color: #7b7b7b;
    position: relative;
    .ico {
      position: absolute;
      right: 70px;
      top: 0;
    }
  }
}
</style>