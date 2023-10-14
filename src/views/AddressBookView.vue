<template>
  <div class="addressBook">
    <div class="functions">
      <div class="function">
        <Icon icon-name="icon-tianjiahaoyou"></Icon><span>新的朋友</span>
      </div>
      <div class="function">
        <Icon icon-name="icon-shouye"></Icon><span>仅聊天的朋友</span>
      </div>
      <div class="function">
        <Icon icon-name="icon-qunliao1"></Icon><span>群聊</span>
      </div>
      <div class="function">
        <Icon icon-name="icon-biaoqian"></Icon><span>标签</span>
      </div>
      <div class="function">
        <Icon icon-name="icon-gongzhongha"></Icon><span>公众号</span>
      </div>
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
</template>

<script setup>
import { ref, onMounted} from "vue"

import Friend from "@/components/Friend.vue"
import Icon from "@/components/common/Icon.vue"
import {getFriendsList} from "@/api/frindeShip"
import { getResultSort } from "@/utils/index"



const peoples = ref([{
  title:"x",
  list:[
    { uId:1,
      userName: "小明",
    },
    {uId:2,
      userName: "小红",
    },
    {uId:3,
      userName: "小蓝2",
    },
  ]
     
}])
onMounted(async()=>{
  const {err,res}=await getFriendsList()
  if(err){
    throw err
  }
  const data=res["data"].map(item=>item.user)
  peoples.value=getResultSort(data)

})
</script>

<style scoped lang="scss">
.addressBook {
  height: 100%;
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
    padding: 10px;
    background: white;
    .function {
      height: 32px;
      padding: 8px 0;
      display: flex;
      border-bottom: 1px solid #e6e6e6;
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
    .function:last-child {
      border-bottom: 0;
    }
  }
  
}
</style>