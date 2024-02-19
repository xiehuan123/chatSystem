<template>
    <div class="addressBook">
       <div class="wraper">
      <div class="functions">
      <ListItem v-for="item in meun" :key="item.sesstionId" :sesstio-item="item" @click="onGo(item.path)"></ListItem>
    </div>
    <div class="business">
      <div class="title">我的企业及企业联系人</div>
      <div class="content">
        <Icon icon-name="icon-qiyeweixinEnterprise-WeChat"></Icon><span>企业微信联系人</span>
      </div>
    </div>
  

      <div class="friends">
      <Friend v-for="item in peoples" :key="item.title" :friends="item"></Friend>
   
    </div>
  </div>
    </div>
  
    

    <index-bar></index-bar>
</template>

<script setup>

import { ref, onMounted, nextTick} from "vue"


import {getFriendsList} from "@/api/frindeShip"
import { getResultSort } from "@/utils/index"
import BScroll from "better-scroll"
import { useRouter } from "vue-router"
const router=useRouter()
const meun =ref([

  { sesstionId:1,
    sesstionName:"新的朋友",
    avatar:"icon-Dimission-S",
    path:"/friend/newFriend"
   
  },
  { sesstionId:2,
    sesstionName:"仅聊天的朋友",
    avatar:"icon-tianjiahaoyou",
    marginBorde:true,
    path:""
  }, 
  { sesstionId:3,
    sesstionName:"群聊",

    avatar:"icon-qunliao1",
    marginBorde:true,
    path:"/group/groupList"
  
  },
  { sesstionId:3,
    sesstionName:"标签",

    avatar:"icon-biaoqian",
    marginBorde:true,
    path:""

  
  },
  { sesstionId:3,
    sesstionName:"公众号",
   
    avatar:"icon-qunliao1",
    marginBorde:true,
    path:""
  
  
  }

])
const peoples = ref([])
onMounted(async()=>{
 
  const {err,res}=await getFriendsList()
  if(err){
    throw err
  }

  const data=res["data"].map(item=>item.user)

  peoples.value=[...getResultSort([...data])]
  nextTick(()=>{
    scroll.value.refresh()
  })
  scroll.value = new BScroll(document.querySelector(".addressBook"), {
    // // 解决上划溢出
    // bounce: false,
    click:true
  })
})
const onGo=(path)=>{
  router.push({
    path
  })
}
</script>

<style scoped lang="scss">
.addressBook {
  width: 100%;
  height: 100%;
 
  overflow: hidden;
  .wraper {
     touch-action: none;

  }
      .business {
    .title {
      font-size: 8px;
      height: 24px;
      line-height: 24px;
      color: #6e6e6e;
      padding: 0 10px;
    }
    .content {
      height: 32px;
      padding: 10px;
      display: flex;
      background-color: $white;
      i {
        height: 32px;
        line-height: 32px;
        font-size: 32px;
        margin-right: 16px;
      }
      span {
        width: 100%;
        line-height: 32px;
      }
    }
  }
  .functions {
    flex: 1;
    background: white;
    .function {
     display: flex;
    align-items: center;

    margin-left: 10px;
    height: 50px;

      i {
        height: 32px;
        line-height: 32px;
        font-size: 32px;
        margin-right: 16px;
      }
      span {
        display: inline-block;
        width: 100%;
        line-height: 32px;
         
      }
    }
    .function:last-child {
      border-bottom: 0;
    }
  }
 
 

  
}
</style>