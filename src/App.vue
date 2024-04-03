<template>
  <div id="app" @touchmove.prevent>

      <router-view></router-view>


  </div>

</template>
<script setup>
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { onMounted, onBeforeMount } from "vue"
import { userStore, callStore, messageIndexDB } from "@/store"

// import {useMessage} from "@/hooks/useMessage"
// import {setSocketItem} from "@/utils/index"
// const [messageList,setMessageList]=useMessage()


const store = userStore()
const callStoreInstance = callStore()
const messageStore = messageIndexDB()
// ps 这里有问题呢 应该是组件销毁的时候才备份信息 但是 现在实现是刷新之前备份信息
onBeforeMount(() => {
  // 页面刷新 
  window.addEventListener("beforeunload", () => {
    //将pinia里面的数据存储到localstorage里面
    window.sessionStorage.setItem("cuurentSesstion", JSON.stringify(store.cuurentSesstion))
    // 备份消息到本地
    console.log(store.sesstionList, store.sesstionMsgs, "备份消息到本地")

    messageStore.setMessageList(store.sesstionList, store.sesstionMsgs)
    // 将当前的socket以及peer 服务关闭 perr 服务关闭 这样就不会导致 peer key 连接占用问题 
    store.$socket.disconnect()
    callStoreInstance.peer.disconnect()
  })
  // 页面刷新的时候将数据从localstorage里面取出来
  store.setCuurentSesstion(JSON.parse(window.sessionStorage.getItem("cuurentSesstion") || "{}"))
  setTimeout(() => {
    console.log("初始化消息", messageStore.sesstionList, messageStore.sesstionMsgs)
    store.initInfoList(messageStore.sesstionList, messageStore.sesstionMsgs)

  }, 100)
  const user = JSON.parse(window.localStorage.getItem("user") || "{}")
  const token = window.localStorage.getItem("token")
  if (user && token) {
    store.openSocket(token)
    callStoreInstance.openPeer(user.uid)
  }
  
})

onMounted(async () => {

  const fpPromise = FingerprintJS.load()

  const fp = await fpPromise
  const result = await fp.get()
  console.log(result.visitorId)
  const store = userStore()
  store.fingerprint = result.visitorId
  // 存入浏览器缓存
  localStorage.setItem("fingerprint", result.visitorId)

  
})



</script>
<style scoped>
#app {
  height: 100%;
  font-size: 18px;

}
</style>
