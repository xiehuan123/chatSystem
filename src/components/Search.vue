<template>
  <div class="search">
    <form action="" class="frm">
      <div class="content">
        <Icon iconName="icon-sousuoxiao" class="ico_search"></Icon>
        <input type="text" placeholder="搜索" class="ipt"/>
        <Icon iconName="icon-yuyinshuru" class="ico_mkf"></Icon>
      </div>
      <span class="text" @click="toBack">取消</span>
    </form>
  </div>
</template>

<script setup>
import Icon from "../components/common/Icon.vue"
import { useRouter } from "vue-router"
const router = useRouter()
const toBack = () => {
  router.go(-1)
}

</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 50px;
  background-color: #e3e3e3;
 
  .frm {
    display: flex;
    align-items: center;
    margin: 0 7px;
    .content {
      text-align: center;
      background-color: white;
      border-radius: 6px;
      margin-top: 12px;
      .ico_search {
        margin: 0 6px 10px;
      }
      .ico_mkf {
        margin-right: 6px;
      }
      .ipt {
        height: 24px;
        width: 260px;
        border: 0; // 去除未选中状态边框
        outline: none; // 去除选中状态边框
      }
      .ipt::placeholder {
        color: #bbbbbb;
      }
    }
    .text {
      margin-left: 8px;
      font-size: 14px;
      transform: translateY(5px);
      color: #6a7c92;
    }
  }
}
</style>