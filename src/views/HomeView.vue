<template>
  <div class="home">
    <HomeList :infoList="store.infoList"></HomeList>
  </div>
</template>

<script setup>
import { ref, computed, getCurrentInstance } from "vue";
import {useStore} from "../store/index"
import HomeList from "../components/HomeList.vue";
const store=useStore()
store.openSocket()
store.$socket.on("receiveServeMessage",(data)=>{
console.log("后台回复",data);
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

//服务器转发过来的信息
store.$socket.on("receiveServeMessage", (data) => {
  console.log("后台回复", data);
  console.log(store.infoList);
  //查找当 当前发送的聊天记录在不在当前会话里面 如果在就添加进去
  const  index= store.infoList.findIndex(info => info.infoId === data.uId)
  if(index!=-1){
    return store.infoList[index].infoMsg.push(data)
  }
  store.infoList.push({
    ...data,
    sesstionMsg:[data.sesstionMsg]

  })


});
</script>

<style scoped lang="scss">
</style>