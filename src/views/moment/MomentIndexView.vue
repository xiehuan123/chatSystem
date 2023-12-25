<template>
  <div class="momentIndex">
    <!-- <header>11111</header> -->

    <BackHeader class="header">
      <template #right>
        <Icon @click="toMenu" :fontSize="25" iconName="icon-paishe" />
      </template>
    </BackHeader>
    <main class="main">
      <div class="scroll-area">
        <div class="bg">
          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
        </div>
        <div class="content">
          <!-- <div v-for="n in 50" class="item" :key="n">{{ n }}</div> -->
          <div class="info">
            <Text color="#ffffff" :size="18">{{ store.user.nickName }}</Text>
            <Avatar :size="55" :src="store.user.userAvatar"></Avatar>
          </div>
          <Card v-for="(item,index) in momentList" :key="item.mid" :data="item" :index="index" @ShowComment="onShowComment" ref="cardListRef"></Card>
          <!-- <Card></Card> -->
          
      
        </div>

      </div>


    </main>



  </div>
  <ShareSheet v-model:show="show"></ShareSheet>
  <CommentInput></CommentInput>
</template>
<script setup >


import BScroll from "@better-scroll/core"
import { ref, onMounted } from "vue"
import { useStore } from "@/store"
import ShareSheet from "@/components/common/ShareSheet.vue"
import { getMomentPublic,setMomentComment,setMomentAppoint } from "@/api/moment"
import emitter from "@/utils/Bus"
const scroll = ref(null)
const show = ref(false)
const momentList = ref([])
const store = useStore()
const myUser={...store.user}
// 循环子组件的dom结构
const cardListRef=ref(null)
onMounted(async () => {
  await getMomentPublicReuest()
  // 提示，因为transform是对dom操作，所以需要在这个生命周期操作
  scroll.value = new BScroll(".main", {
    mouseWheel: true,
    probeType: 3,
    click: true
  })

})

const toMenu = () => {
  show.value = !show.value
}
// 获取公共朋友圈内容
const getMomentPublicReuest = async () => {
  const { err, res } = await getMomentPublic()
  if (err) {
    throw err
  }
  if (res["code"] === 200) {
    momentList.value = res["data"]
    console.log(res["data"])
  }
}
// 评论数据更新 根据ref 获取子组件实例 通过index 直接拿到指定的子组件修改内部数据以便前端做展示
emitter.on("notifyMomentIndexComment",async({mid,rid,ruser,comment,index})=>{
  // console.log(mid,rid,ruser)
  // console.log(cardListRef.value[index].comments,index)
  cardListRef.value[index]["comments"].push({
    avatar:myUser["userAvatar"],
    gender:myUser["userSex"],
    nickName:myUser["nickName"],
    phone_number:myUser["useriPhone"],
    region:myUser["userRigon"],
    uid:myUser["uId"],
    wechat_id:myUser["userWx"],
    rid,
    ruser,
    comment
  })
  setMomentComment(mid,{comment,ruser,rid})
})
// 点赞数据更新
emitter.on("notifyMomentIndexAppoint",async({mid,data})=>{
  setMomentAppoint(mid,data)
})
</script>
<style lang="scss" scoped>
.momentIndex {
  position: relative;
  height: 100%;

  .header {
    position: fixed;
    top: 0;
    z-index: 9;
    width: 100%;
  }

  .main {
    position: absolute;
    top: 0;
    height: 100%;
    margin-bottom: 10px;
    background-color: #F7FAFD;

    >div {
      touch-action: none;
    }

    .bg {

      img {
        width: 100%;
        height: 100%;
      }

    }

    .item {
      touch-action: none
    }

    .content {
      position: relative;
      background-color: $bg-color;

      padding-top: 70px;
      padding-bottom: 10px;
      width: 100%;
      box-sizing: border-box;

      .info {
        position: absolute;
        display: flex;
        right: 0;
        top: -32px;
        width: 120px;
        justify-content: space-around;
        right: 10px;
      }
    }

  }
}

</style>
