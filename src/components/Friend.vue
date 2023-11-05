<template>
  <div class="friend" >
    <div class="title" :id="friends.title">{{friends.title}}</div>
    <div class="content" v-for="item in friends.list" :key="item.uid" @click="onGoto(item.wechat_id)">
     <Avatar :src="item.avatar" :size="35"></Avatar>
  
      <div class="nickname"><div>
        {{ item.nickname }}
      </div></div>
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
const onGoto=(kwd)=>{
  router.push({
    path:`/peopleinfo/${kwd}`
  })
}
</script>

<style scoped lang="scss">
.friend {

  background-color: $white;
  .title {
    font-size: 12px;
    height: 24px;
    line-height: 24px;
    color: #6e6e6e;
    // background-color: #ece9e7;
    background-color: $bg-color;
    padding: 0 10px;
  }
  .content {
    display: flex;
    align-items: center;

    margin-left: 10px;
    height: 50px;

    
    .nickname {
      position: relative;
      margin-left: 16px;
      height: 100%;
      width: 100%;
      line-height: 50px;
      // border-bottom: 1px #ccc solid;
      &::before{
      position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
      }
    }
    // 分组最后面那个清楚 
    &:last-child>.nickname::before{
      content: none;
     
    }
   
  }

  .content:last-child {
      border-bottom: 0;
    }
}
</style>