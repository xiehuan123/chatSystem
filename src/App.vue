


<template>
  <div id="app" @touchmove.prevent>
   <router-view></router-view> 
  </div>
 
</template>
<script setup>

import { onMounted,onBeforeMount,onBeforeUnmount } from "vue"
import { userStore,callStore } from "@/store"
// import {setSocketItem} from "@/utils/index"
const store=userStore()
const CallStore=callStore()
// 组件挂载之前
onBeforeMount(() => {
  // 页面刷新 
  window.addEventListener("beforeunload", () => {
    //将vuex里面的数据存储到localstorage里面
    window.sessionStorage.setItem("cuurentSesstion", JSON.stringify(store.cuurentSesstion))
    
   
  })
})
//组件卸载之前
onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", () => { 
  } )
})
onMounted(()=>{
  // 页面刷新 
  window.addEventListener("load", () => {
    //将浏览器里面的数据存储到pinia里面
    store.setCuurentSesstion(JSON.parse(window.sessionStorage.getItem("cuurentSesstion")))

    store.openSocket(store.user.uid,store.token)
    CallStore.openPeer()
  })
})

</script>
<style scoped>
#app{
  height: 100vh;
  
}
</style>
