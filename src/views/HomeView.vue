<template>
  <div class="home">
    <HomeList :infoList="infoList"></HomeList>
  </div>
</template>

<script setup>
import { ref,watch,onMounted  } from "vue"
import {useStore} from "@/store/index"
import HomeList from "@/components/HomeList.vue"
import BScroll from "@better-scroll/core"
const store=useStore()
const infoList=ref(store.infoList)
watch(() => store.infoList, (newValue, oldValue) => {
  console.log(`count 变化，新值：${newValue}，旧值：${oldValue}`)
  infoList.value = newValue
     
}, { deep: true })
onMounted(()=>{
// 提示，因为transform是对dom操作，所以需要在这个生命周期操作
  scroll.value = new BScroll(".home", {
    click:true
  })
})
// globalProperties.$loading()

// globalProperties.$socket.emit("message", "这是一条测试信息11");
// const infoList = ref([
//   {
//     //这个变量如果 是群聊就是群id 如果是私聊就是好友id
//     infoId: 1,
//     //这个变量如果 是群聊就是群名字 如果是私聊就是好友名字
//     infoName: "小明",
//     avatar:"https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500",
//     us: 1,//表示私聊 2表示群聊
//     infoMsg: [
//       {
//         sendName: "李文客服002",
//         sendMsg: "接单扣3",
//         sendTime: "下午:3:38",
//         mid:1,
//         //发送者头像
//         avatar:"https://img0.baidu.com/it/u=1441576986,4133872496&fm=253&fmt=auto&app=138&f=JPEG?w=842&h=500",
//         // 消息类型
//         code:1,
//         //消息id
//         mid:1,
//         className:"other"
//       },
//     ],
//   },
// ]);



</script>

<style scoped lang="scss">
.home{
  height: 100%;
  background: $white;

}
</style>