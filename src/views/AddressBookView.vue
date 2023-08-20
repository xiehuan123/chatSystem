<template>
  <div class="addressBook">
    <div class="functions">
      <div class="function">
        <i class="iconfont icon-tianjiahaoyou"></i><span>新的朋友</span>
      </div>
      <div class="function">
        <i class="iconfont icon-shouye"></i><span>仅聊天的朋友</span>
      </div>
      <div class="function">
        <i class="iconfont icon-qunliao1"></i><span>群聊</span>
      </div>
      <div class="function">
        <i class="iconfont icon-biaoqian"></i><span>标签</span>
      </div>
      <div class="function">
        <i class="iconfont icon-gongzhonghao"></i><span>公众号</span>
      </div>
    </div>
    <div class="business">
      <div class="title">我的企业及企业联系人</div>
      <div class="content">
        <i class="iconfont icon-qiyeweixinEnterprise-WeChat"></i><span>企业微信联系人</span>
      </div>
    </div>
    <div class="friends">
      <Friend v-for="(_,index) in peoples" :key="index"></Friend>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Friend from "../components/Friend.vue";
const peoples = ref([1, 2, 3]);
</script>

<style scoped lang="scss">
.addressBook {
  .business {
    .title {
      font-size: 10px;
      height: 24px;
      line-height: 24px;
      background-color: #ece9e7;
      color: #6e6e6e;
      border-radius: 3px;
    }
    .content {
      height: 32px;
      padding: 8px 0;
      display: flex;
      i {
        height: 32px;
        line-height: 32px;
        font-size: 32px;
        margin-right: 16px;
      }
      span {
        width: 100%;
        line-height: 32px;
      }
    }
  }
  padding: 14px;
  .functions {
    .function {
      height: 32px;
      padding: 8px 0;
      display: flex;
      border-bottom: 1px solid #e6e6e6;
      i {
        height: 32px;
        line-height: 32px;
        font-size: 32px;
        margin-right: 16px;
      }
      span {
        width: 100%;
        line-height: 32px;
      }
    }
    .function:last-child {
      border-bottom: 0;
    }
  }
}
</style>