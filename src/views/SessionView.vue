<template>


    <main class="main" ref="mainDom"  >
      <Dialog :msgs="msgs"></Dialog>
    </main>
    <Footer @sendInfo="onSendInfo"  >
    </Footer>
    

</template>

<script setup>
import { ref,watch} from "vue"
import { useStore } from "@/store"
import {  useRoute } from "vue-router"
import Footer from "@/components/userLayout/Footer.vue"

import Dialog from "@/components/userLayout/Dialog.vue"

const route = useRoute()
const mainDom = ref(null)
const store=useStore()
const msgs = ref([
])

//发送信息
const onSendInfo = (data) => {
  const info={
    ...store.cuurentSesstion,
    sesstionMsg:{
      uid: store.user.uId,//发送方的uid
      code: data["code"], //消息类型 1文本 2 语音 3 文件
      us: store.cuurentSesstion.us, //1.私聊 2.群聊
      avatar:store.user.userAvatar,
      sendName: store.user.nickName,
      className: "my",
      sendMsg: data["msg"],
    }
  }
  store.setInfoList(info)
  store.$socket?.emit("receiveClientMessage",info)
  mainDom.value.scrollIntoView(false)
}
//监听pinia 里面的消息 
watch(() => store.infoList,(newValue) => {
  try {
    const storeInfoLsit = newValue.find(item=>item.us==us&&item.sesstionId.toString()===sesstionId.toString())
    const {sesstionMsg,...sesstion} =storeInfoLsit
    store.setCuurentSesstion(sesstion)
    msgs.value=sesstionMsg 
  } catch (error) {
    console.log(error)
  }
  
     
}, { deep: true })
//当前会话的参数 比如 是用户 还是群聊
const {us,sesstionId}=route.params
const storeInfoLsit = store.infoList.find(item=>item.us==us&&item.sesstionId.toString()===sesstionId.toString())
try {
  const {sesstionMsg,...sesstion} =storeInfoLsit
  store.setCuurentSesstion(sesstion)
  msgs.value=sesstionMsg 
} catch (error) {
  console.log(error)
}



</script>

<style scoped lang='scss'>
.userLayout {
  height: 100%;
  .header {
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: center;
    background: #ccc;

    .back {
      width: 50px;

      text-align: center;
    }
    .title {
      width: 100%;
      text-align: center;
    }
    .option {
      text-align: center;
      width: 56px;
      height: 100%;
    }
  }
  .main {
    height: calc(100% - 90px);
    margin-bottom: 50px;
  }
}
</style>