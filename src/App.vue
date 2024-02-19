


<template>
  <div id="app" @touchmove.prevent>
   <router-view></router-view> 
  </div>
 
</template>
<script setup>

import { onMounted,onBeforeMount,onBeforeUnmount } from "vue"
import { userStore,callStore,messageIndexDB } from "@/store"

// import {useMessage} from "@/hooks/useMessage"
// import {setSocketItem} from "@/utils/index"
// const [messageList,setMessageList]=useMessage()


const store=userStore()
const CallStore=callStore()
const messageStore=messageIndexDB()
// setTimeout(() => {
//   console.log("备份")
//   messageStore.setMessageList(store.infoList)
// }, 10000)
// 组件挂载之前
onBeforeMount(() => {
  // 页面刷新 
  window.addEventListener("beforeunload", () => {
    //将pinia里面的数据存储到localstorage里面
    window.sessionStorage.setItem("cuurentSesstion", JSON.stringify(store.cuurentSesstion))
    // 备份消息到本地
    messageStore.setMessageList(store.infoList)
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
    store.setCuurentSesstion(JSON.parse(window.sessionStorage.getItem("cuurentSesstion")||"{}"))
    
    const user=JSON.parse(window.localStorage.getItem("user")||"{}")
    const token=window.localStorage.getItem("token")
    store.initInfoList(messageStore.messageList)
    if(user&&token){
      store.openSocket(token)
      CallStore.openPeer(user.uid)
    }
 
  
  })
})

</script>
<style scoped>

#app{
  height: 100vh;
  font-size: 18px;
  
}
</style>
