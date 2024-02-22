<template>
  
      <main class="main" ref="mainDom"  >
     
      <ChatList :msgs="msgs" ref="chatRef"></ChatList>
    </main>
    <Footer @sendInfo="onSendInfo"  >
    </Footer>

    
</template>
<script >
// ps 下拉加载有问题
import { defineComponent } from "vue"
import { userStore } from "@/store"
const store=userStore()
export default defineComponent({
  beforeRouteEnter(to, from, next) {
    store.setSesstionreadStaus()
    next()
  },
  beforeRouteLeave(to, from, next) {

    store.setSesstionreadStaus()
    next()
  },
})
</script>

<script setup>
import { ref,onMounted } from "vue"


import BScroll from "better-scroll"
const mainDom = ref(null)
const chatRef=ref(null)
const msgs = ref()
const scroll=ref(null)
const index=ref(1)
const pageSize=ref(10)
// 是否在下拉
const isPulldown=ref(false)
//发送信息
const onSendInfo = (data) => {
  isPulldown.value=false
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

// 监听pinia 里面的消息 
watch(() => store.sesstionMsgs[store.cuurentSesstion.sesstionId],(newValue) => {
  console.log("pinia 里面的消息")
  msgs.value=newValue 
}, { deep: true })



onMounted(()=>{
  scroll.value = new BScroll(".main", {
    mouseWheel: true,
    probeType: 3,
    click: true,
   
    pullDownRefresh: {
      threshold: 5,  // 下拉刷新的阈值
      stop: 20  // 刷新停留的位置
    }
  })
  // 下拉刷新
  scroll.value.on("pullingDown", async() => {
    console.log("下拉刷新")
    isPulldown.value=true
    // 在这里执行下拉刷新的操作，比如发送请求获取最新数据等
    const sesstionMsgs=store.sesstionMsgs[store.cuurentSesstion.sesstionId]
    const start=-(pageSize.value*index.value)
    const  end=sesstionMsgs.length - (index.value-1)*pageSize.value
    console.log(start,end,"下拉刷新")
    if(-start>=sesstionMsgs.length) {
      console.log("没有更多数据了")
      return 
    }
    msgs.value.unshift(...sesstionMsgs.slice(start,end ))
    console.log(pageSize.value*index.value,sesstionMsgs.length - (index.value-1)*pageSize.value)
    index.value++
    scroll.value.finishPullDown() 
    setTimeout(() => {
      scroll.value.scrollTo(0, 0, 300)
      scroll.value.refresh()
      
    }, 100)
  
  })
  
  // 需要渲染当前会话的聊天记录
  const sesstionMsgs=store.sesstionMsgs[store.cuurentSesstion.sesstionId]
  if(sesstionMsgs){

    
    msgs.value=sesstionMsgs.slice(-(pageSize.value*index.value),sesstionMsgs.length - (index.value-1)*pageSize.value)
    index.value++
  }
 


})

watch(() => msgs.value,() => {
  // 不在下拉的时候 滚动到最底部
  if(!isPulldown.value){
    setTimeout(() => {
      scroll.value.refresh()
      scroll.value.scrollTo(0, scroll.value.maxScrollY, 300)
    }, 100)
  }
  // setTimeout(() => {
  //   scroll.value.refresh()
  //   scroll.value.scrollTo(0, scroll.value.maxScrollY, 300)
  // }, 100)

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