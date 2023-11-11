<template>
  <div class="search" @click="toSearch">
      <Icon iconName="icon-sousuoxiao" class="serach_ico"></Icon>账号/手机号
    </div>
</template>
<script setup >
import { useRouter } from "vue-router"
const router=useRouter()
const toSearch = () => {
  router.push({
    path: "/addfriend/search",
  })
}


</script>
<style lang="scss" scoped>
  .search {
    height: 30px;
    margin: 0 7px;
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



</style>
