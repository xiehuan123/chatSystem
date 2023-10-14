<template>
  <div class="searchBar">
    <div class="content">
      <Icon iconName="icon-sousuoxiao" class="ico_search"></Icon>
      <input
        type="text"
        placeholder="账号/手机号"
        class="ipt"
        v-model="searcKwd"
        @input="search"
      />
      <CloseBg @click="cleanKwd" :isShow="isShow" />
    </div>
    <Text @click="toBack" color="rgb(108, 113, 155)">取消</Text>
  </div>
</template>
<script setup>
import {ref,defineEmits,computed,watch} from "vue"
import { useRouter } from "vue-router"

import{debounce} from "@/utils/index"
import Icon from "@/components/common/Icon.vue"
import  Text from "@/components/common/Text.vue"
import CloseBg from "@/components/CloseBg.vue"
const searcKwd=ref("")
const router = useRouter()
// 返回上一级
const toBack = () => {
  router.go(-1)
}
const emit=defineEmits(["searchKwd"])
const search=  debounce(function(e){
  emit("searchKwd",e.target.value)
})
// 关闭标签显示
const isShow=computed(()=>{
  return searcKwd.value.length
})
// 清空搜索
const cleanKwd=()=>{
  searcKwd.value=""
  emit("searchKwd",searcKwd.value)
}
watch(searcKwd,(val)=>{
  // 如果是空字符串就直接传递过去
  if(val==""){
    emit("searchKwd",searcKwd.value)
  }

})
</script>
<style lang="scss" scoped>
.searchBar {
  width: 100%;
  height: 50px;

  display: flex;
  align-items: center;
  padding: 0 5px;
  box-sizing: border-box;
  .content {
    display: flex;
    height: 35px;
    flex: 4;
    align-items: center;
    border-radius: 6px;
    background-color: white;

    .ico_search {
      margin: 0 10px;
      transform: translateY(-2px);
    }
    .ico_mkf {
      margin-right: 6px;
    }
    .ipt {
      flex: 1;
      height: 100%;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
    }
    .ipt::placeholder {
      color: #bbbbbb;
    }
  }
}
</style>