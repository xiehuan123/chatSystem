<template>
  <div id="app" @touchmove.prevent>

      <router-view></router-view>


  </div>

</template>
<script setup>
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import {  onMounted } from "vue"
import { userStore, callStore, messageIndexDB } from "@/store"

// import {useMessage} from "@/hooks/useMessage"
// import {setSocketItem} from "@/utils/index"
// const [messageList,setMessageList]=useMessage()


const store = userStore()
const callStoreInstance = callStore()
const messageStore = messageIndexDB()
// setTimeout(() => {
//   console.log("备份")
//   messageStore.setMessageList(store.sesstionList,store.sesstionMsgs)
// }, 10000)
// 组件挂载之前
onBeforeMount(() => {
  // 页面刷新 
  window.addEventListener("beforeunload", () => {
    //将pinia里面的数据存储到localstorage里面
    window.sessionStorage.setItem("cuurentSesstion", JSON.stringify(store.cuurentSesstion))
    // 备份消息到本地
    console.log(store.sesstionList, store.sesstionMsgs, "备份消息到本地")

    messageStore.setMessageList(store.sesstionList, store.sesstionMsgs)
    // 将当前的socket以及peer 服务关闭
    store.$socket.disconnect()
    callStoreInstance.peer.disconnect()
  })
  // 页面刷新 
  window.addEventListener("load", () => {
    //将浏览器里面的数据转化到pinia里面
    store.setCuurentSesstion(JSON.parse(window.sessionStorage.getItem("cuurentSesstion") || "{}"))

    const user = JSON.parse(window.localStorage.getItem("user") || "{}")
    const token = window.localStorage.getItem("token")
    setTimeout(() => {
      console.log("初始化消息", messageStore.sesstionList, messageStore.sesstionMsgs)
      store.initInfoList(messageStore.sesstionList, messageStore.sesstionMsgs)

    }, 100)


    if (user && token) {
      store.openSocket(token)
      callStoreInstance.openPeer(user.uid)
    }


  })
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
  // const callStoreInstance = callStore()
  // if (store.token){
  //   store.openSocket(store.token)
  //   callStoreInstance.openPeer(store.user.uid)
  // }

})


</script>
<style scoped>
#app {
  height: 100%;
  font-size: 18px;

}
</style>
