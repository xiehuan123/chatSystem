


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
// 组件挂载之前
onBeforeMount(() => {
  // 页面刷新 
  window.addEventListener("beforeunload", () => {
    //将vuex里面的数据存储到localstorage里面
    window.sessionStorage.setItem("cuurentSesstion", JSON.stringify(store.cuurentSesstion))
  
    messageStore.setMessageList(store.infoList)
    // console.log(store.infoList,7878)
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
    console.log(messageStore.messageList,7777)
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
