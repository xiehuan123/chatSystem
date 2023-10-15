<template>
  <div class="search">
    <Search @searchKwd="searchKwd"></Search>
    <div class="result">
      <div class="content">
        <ListItem
          :sesstioItem="infoItem"
          :height="58"
          @click="goSearch"
        >
        </ListItem>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue"
import Search from "@/components/SearchBar.vue"
import ListItem from "@/components/ListItem.vue"

const infoItem =ref({})   
const searcKwd=ref("")
const searchKwd=(kwd)=>{
  searcKwd.value=kwd
  // 接收到空字符就直接空对象 
  if(kwd==""){
    infoItem.value={}
    return
  }
  console.log(kwd)
  infoItem.value=
    {
      sesstionId: 1,
      sesstionName:`搜索:${searcKwd.value}`,
      avatar:"icon-a-19ruzhi",
    }
}
const goSearch=()=>{
  console.log(1111)  
}
</script>

<style lang="scss" scoped>
.search{
  height: 100%;
  background: $content-color;
}
</style>