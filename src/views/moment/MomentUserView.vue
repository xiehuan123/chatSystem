<template>
  <div class="momentUser">
    <BackHeader >
      <template #right>
        <div></div>

      </template>
    </BackHeader>
    <div class="main" >
      <div class="scroll-area">
        <div class="bg">

          <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
        </div>
        <div class="content">

          <div class="info">
            <Text  :style="{padding:'0 5px'}" color="#ffffff" :size="18">{{ user.nickName }} </Text>
            <Avatar :size="55" :src="user.avatar" @click="onGOto()"></Avatar>
          
          </div>
          <Text className="Autograph">{{ user.Autograph }}</Text>
       
          <MomentItem v-for="(item,key) in momentList" :key="key" :title="key"  :momentItem="item" ></MomentItem>
          
        </div>

      </div>


    </div>

  </div>
</template>
<script setup >
import MomentItem from "@/components/MomentItem.vue"
import BScroll from "better-scroll"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { getMomentUser } from "@/api/moment"
import {getInfo} from "@/api/index"
import { getGroupBy } from "@/utils/index"
const route=useRoute()
const {uid}=route.params
const scroll = ref(null)

const momentList=ref([])
const user=ref({})
onMounted(async()=>{
  
  const {res:{data}}=await getInfo(uid)

  user.value=data
  const {res}=await getMomentUser(uid)
  momentList.value=getGroupBy(res.data,"pub_time")
  console.log(momentList.value)
  
  scroll.value = new BScroll(".main", {
    mouseWheel: true,
    probeType: 3,
    click: true,
    
  })
  // 滚动有问题 暂时解决了
  setTimeout(() => {
    scroll.value.refresh()
  }, 0)
})




</script>
<style lang="scss" scoped>
.momentUser {
 position: relative;
  height: 100%;

  .main {
   position: absolute;
    top: 0;
    height: 100%;
    margin-bottom: 10px;
    background-color: #F7FAFD;
    >div{
      touch-action: none;
    }
    .bg {
      height: 275px;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .content {
      position: relative;
      background-color: #F7FAFD;
      padding-top: 70px;
      padding-bottom: 10px;
      width: 100%;
      box-sizing: border-box;

      .info {
        position: absolute;
        display: flex;
        right: 0;
        top: -32px;
    
        justify-content: space-around;
        right: 10px;
      }
      .Autograph{
        position: absolute;
        right: 10px;
        top: 22px;
      }
    }
  }
}</style>


