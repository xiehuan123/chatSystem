<template>
  <div class="momentIndex">

    <BackHeader class="header">
      <template #right>
        <Icon @click="toMenu" :fontSize="25" iconName="icon-paishe" />
      </template>
    </BackHeader>
   
    <main class="main">
       <ScrollLayout>
      <div class="scroll-area">
        <div class="bg">
          <Icon :class-name="['pyqlogo',isPulldown]" :font-size="22"  icon-name="icon-iconfontzhizuobiaozhunbduan36"></Icon>
          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="" >
        </div>
        <div class="content">
          <div class="info">
            <Text color="#ffffff" :size="18">{{ store.user.nickName }} </Text>
            <Avatar :size="55" :src="store.user.userAvatar" @click="onGOto()"></Avatar>
          </div>
          <Card v-for="(item,index) in momentList" :key="item.mid" :data="item" :index="index" @ShowComment="onShowComment" ref="cardListRef"></Card>

          
      
        </div>

      </div>
      </ScrollLayout>

    </main>



  </div>
  <ShareSheet @onOpen="onOpen" v-model:show="show" :options='[{"id":1,"name":"拍摄"},{"id":2,"name":"从相册选择"}]'></ShareSheet>
   <input type="file" ref="fileDom"  accept="image/*"  @change="onUploadChange" multiple hidden>
  <CommentInput></CommentInput>
</template>
<script setup >


// import BScroll from "better-scroll"
import { ref, onMounted } from "vue"
import { userStore,momentIndexDB } from "@/store"
import ShareSheet from "@/components/common/ShareSheet.vue"
import { getMomentPublic,setMomentComment,setMomentAppoint } from "@/api/moment"
import {compressionFile} from "@/utils/index"

import emitter from "@/utils/Bus"
import Icon from "@/components/common/Icon.vue"
import { useRouter } from "vue-router"
import ScrollLayout from "@/layout/ScrollLayout.vue"
// 主要滚动
const scroll = ref(null)
// 选择图片 组件显示
const show = ref(false)
// 朋友圈 列表信息
const momentList = ref([])
const store = userStore()
// 状态管理里面存储的用户信息
const myUser={...store.user}
// 循环子组件的dom结构
const cardListRef=ref(null)
// 朋友圈logo类名
const isPulldown=ref("")
// 路由
const router=useRouter()
const fileDom=ref(null)
const momentIndexDBStore=momentIndexDB()
onMounted(async () => {
  await getMomentPublicReuest()
  // 提示，因为transform是对dom操作，所以需要在这个生命周期操作
  // scroll.value = new BScroll(".main", {
  //   mouseWheel: true,
  //   probeType: 3,
  //   click: true,
  //   pullDownRefresh: {
  //     threshold: 20,  // 下拉刷新的阈值
  //     stop: 20  // 刷新停留的位置
  //   }
  // })
 
  // // 下拉刷新
  // scroll.value.on("pullingDown", async() => {
  //   console.log("下拉刷新")
  //   // 在这里执行下拉刷新的操作，比如发送请求获取最新数据等
  //   await getMomentPublicReuest()
    
  //   scroll.value.finishPullDown() 
  // })
  // scroll.value.on("scroll", (pos) => {
  //   if (pos.y > 1) {
  //   // 用户正在下拉，可以在这里执行相应的操作
  //   // 比如修改下拉提示的显示状态等
  //     isPulldown.value="isPulldown"
  //   }
  //   if(pos.y==0){
  //     isPulldown.value=""
  //   }
  // })
  // setTimeout(()=>{
  //   console.log("dom更新完毕")
  //   scroll.value.refresh()
  // },10)

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
  scroll.value.refresh()
})
// 点赞数据更新
emitter.on("notifyMomentIndexAppoint",async({mid,data})=>{
  setMomentAppoint(mid,data)
  scroll.value.refresh()
})
// 跳转
const onGOto=()=>{
  console.log("跳转")
  router.push({
    path:`/friend/peopleinfo/1/${myUser.userWx}`
  })
}
// 上传图片相关方法
const onUploadChange = async() => {

  const len=parseInt(await momentIndexDBStore.getMomentItem("momnetImageListLength")||0)
  const files = fileDom.value.files
  console.log(files.length,len,77777777)
  if(files.length+len>10){
    alert("最多只能选中9张图片")
    return
  }
  for (const key in files) {
    if (Object.hasOwnProperty.call(files, key)) {
      const file = files[key]
      const compressFileBase64= await compressionFile(file) 
      momentIndexDBStore.setMometimageList(compressFileBase64) 
    }
  }
 
  show.value=false
  router.push({path:"/moment/momentPublish"})
 
}
// 选项的点击事件
const onOpen=(id)=>{
  switch (id){
  case 1:
    router.push({
      path:"/moment/photoGraph"
    })
    break
  case 2:
    fileDom.value.click()
    break

  }
}
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
    // margin-bottom: 50px;
    background-color: #fff;

    >div {
      touch-action: none;
      margin-bottom: 100px;
    }

    .bg {
      position: relative;
      height: 275px;
        @keyframes xz {
        0%{
          
          transform:    rotateZ(0deg);
     
        }
    
        100%{
          transform:  rotateZ(360deg);
        }
      }
      .pyqlogo{
        position: absolute;
        left: 30px;
        top: -30px;
        transition: top 1s;
      }
     
      .isPulldown{
        top: 60px;
        animation: xz .8s  infinite;
      }
      
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
