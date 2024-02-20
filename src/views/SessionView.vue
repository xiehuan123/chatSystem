<template>
    <main class="main" ref="mainDom"  >
      <ChatList :msgs="msgs"></ChatList>
    </main>
    <Footer @sendInfo="onSendInfo"  >
    </Footer>
</template>

<script setup>
import { ref,watch,onMounted } from "vue"
import { userStore } from "@/store"
import {  useRoute } from "vue-router"

import BScroll from "better-scroll"
const route = useRoute()
const mainDom = ref(null)
const store=userStore()
const msgs = ref([
])
const scroll=ref(null)
//发送信息
const onSendInfo = (data) => {
  console.log(data,"发送的消息")
  const info={
    ...store.cuurentSesstion,
    sesstionMsg:{
      uid: store.user.uid,//发送方的uid
      code: data["code"], //消息类型 1文本 2 语音 3 文件
      us: store.cuurentSesstion.us, //1.私聊 2.群聊
      avatar:store.user.userAvatar,
      sendName: store.user.nickName,
      className: "my",
      readStatus:true,
      sendMsg: data["msg"],
      wechat_id:store.user.userWx
    },
   
    "callback":(data)=>{
      console.log(data,"发送成功")
    }
  }
  console.log(info,"底部发送的数据")
  store.setInfoList(info)

  // 发过去添加到pinia里面是已读的  经过服务器中转到对方就是未读
  store.$socket?.emit("receiveClientMessage",info,(data)=>{
    console.log(data,"服务端回调成功") 
  },
  
  )
  
}
//监听pinia 里面的消息 
watch(() => store.infoList,(newValue) => {
  
 
  console.log(newValue,58)
  const storeInfoLsit = newValue.find(item=>item.us==us&&item.sesstionId.toString()===sesstionId.toString())
  if(!storeInfoLsit){
    return 
  }
  const {sesstionMsg,...sesstion} =storeInfoLsit
  console.log(sesstion)
  msgs.value=sesstionMsg 
  scroll.value.scrollTo(0, scroll.value.maxScrollY, 300)
  
  
     
}, { deep: true })
//当前会话的参数 比如 是用户 还是群聊
const {us,sesstionId}=route.params
const storeInfoLsit = store.infoList.find(item=>item.us==us&&item.sesstionId.toString()===sesstionId.toString())
if(storeInfoLsit){
  const {sesstionMsg} =storeInfoLsit
  msgs.value=sesstionMsg 
}


onMounted(()=>{
  scroll.value = new BScroll(".main", {
    mouseWheel: true,
    probeType: 3,
    click: true,
  })

})
// 进入需要执行当前会话未读消息设置已读 离开也需要
store.setSesstionreadStaus()
watch(() => msgs.value,() => {
  console.log("msgs.value")
  setTimeout(() => {
    scroll.value.refresh()
    scroll.value.scrollTo(0, scroll.value.maxScrollY, 300)
  }, 100)

}, { deep: true })
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