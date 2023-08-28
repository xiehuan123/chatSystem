<template>
  <!-- 添加朋友的页面的功能组件 -->
  <div class="item">
    <div class="container">
      <div class="left">
        <Icon iconName="icon-xiaolian" :fontSize="36" class="icon_left"></Icon>
        <span class="content">
          <div class="text">雷达加朋友</div>
          <div class="tips">添加身边的朋友</div>
        </span>
      </div>
      <Icon iconName="icon-arrow-right" :fontSize="18"></Icon>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Icon from "./common/Icon.vue";
</script>

<style lang="scss" scoped>
.item {
  height: 36px;
  padding: 12px 0;
  background-color: #f3f3f3;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.5px solid #c3c3c3;
    margin: 0 12px;
    padding-bottom: 7px;
    .icon_left {
      transform: translateY(-3px);
    }
    .left {
      display: flex;
      align-items: center;
      .content {
        margin-left: 12px;
        .text {
          color: #1f1f1f;
        }
        .tips {
          margin-top: 4px;
          font-size: 12px;
          color: #c3c3c3;
        }
      }
    }
  }
}
</style>