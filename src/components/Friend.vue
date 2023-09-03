<template>
  <div class="friend" >
    <div class="title">{{friends.title}}</div>
    <div class="content" v-for="item in friends.list" :key="item.uid" @click="onGoto(item.uid)">
      <div class="img">
        <img :src="item.avatar" alt="" />
      </div>
      <div class="nickname">{{ item.nickname }}</div>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue"
import { useRouter } from "vue-router"
const router=useRouter()
defineProps({
  friends:{
    type:Object,
    default:()=>{
      return {
        title:"x",
        list:[
          { uId:1,
            userName: "小明",
          },
          {uId:2,
            userName: "小红",
          },
          {uId:3,
            userName: "小蓝",
          },
        ]
     
      }
     
    }
  }
})
const onGoto=(uId)=>{
  router.push({
    path:`/peopleinfo/${uId}`
  })
}
</script>

<style scoped lang="scss">
.friend {
  .title {
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    color: #6e6e6e;
    background-color: #ece9e7;
    padding: 0 10px;
  }
  .content {
    display: flex;
    align-items: center;
    padding: 10px 0;
    margin: 0 10px;
    border-bottom: 1px solid #e6e6e6;
    .img {
      height: 32px;
      width: 32px;
      img {
        height: 32px;
        width: 32px;
        border-radius: 20%;
      }
    }
    .nickname {
      margin-left: 16px;
    }
  }
  .content:last-child {
      border-bottom: 0;
    }
}
</style>