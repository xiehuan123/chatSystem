<template>
  <div class="search">
    <SearchBar @searchKwd="searchKwd"></SearchBar>
    <div class="result">
      <div class="content" v-if="!isEmpty">
        <ListItem
          :sesstioItem="infoItem"
          :height="58"
          @click="goSearch"
        >
        </ListItem>
      </div>
      <div v-if="isEmpty&&Object.keys(infoItem).length!=0" class="empty">
      <Text>用户不存在</Text>
      
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue"
import { useRouter } from "vue-router"
import {serarchFriend} from "@/api/frindeShip"
const infoItem =ref({}) 
//搜索值 
const searcKwd=ref("")
// 不存在控制
const isEmpty=ref(false)
const router=useRouter()
const searchKwd=(kwd)=>{
  searcKwd.value=kwd
  // 接收到空字符就直接空对象 
  if(kwd==""){
    infoItem.value={}
    return
  }
  console.log(kwd)
  isEmpty.value=false
  infoItem.value=
    {
      sesstionId: 1,
      sesstionName:`搜索:${searcKwd.value}`,
      avatar:"icon-a-19ruzhi",
    }
}
// 搜索
const goSearch=async ()=>{
  console.log("搜索")
  const {res,err}=await serarchFriend(searcKwd.value)


  if(err){
    throw err
  }
  if (res["code"]==500){
    isEmpty.value=true
    return
  }
    
    
  router.push({
    path:`/friend/peopleinfo/1/${searcKwd.value}`
  }) 
}
</script>

<style lang="scss" scoped>
.search{
  height: 100%;
  background: $content-color;
  .empty{
    background: #fff;
    text-align: center;
    padding: 50px 0;
  }
}
</style>