<template>
  <div class="momentUser">
    <BackHeader >
      <template #right>
        <div></div>

      </template>
    </BackHeader>
    <div class="main" >
      <ScrollLayout>

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


      </ScrollLayout>

    </div>

  </div>
</template>
<script setup >
import MomentItem from "@/components/MomentItem.vue"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { getMomentUser } from "@/api/moment"
import {getInfo} from "@/api/index"
import { getGroupBy } from "@/utils/index"
import ScrollLayout from "@/layout/ScrollLayout.vue"
const route=useRoute()
const {uid}=route.params

const momentList=ref([])
const user=ref({})
onMounted(async()=>{
  
  const {res:{data}}=await getInfo(uid)

  user.value=data
  const {res}=await getMomentUser(uid)
  momentList.value=getGroupBy(res.data,"pub_time")
  console.log(momentList.value)
  
})




</script>
<style lang="scss" scoped>
.momentUser {
 position: relative;
  height: 100%;
  width: 100%;
  .main {
   position: absolute;
    top: 0;
    height: 100%;
    margin-bottom: 10px;
    background-color: #F7FAFD;
    width: 100%;
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


