<template>
    <div class="addressBook">
       <div class="wraper">
      <div class="functions">
      <ListItem v-for="item in meun" :key="item.sesstionId" :sesstio-item="item" @click="onGo(item.path)"></ListItem>
      <!-- <div class="function" v-for="item in meun" :key="item.id">
        <Icon :icon-name="icon-tianjiahaoyou"></Icon>
         <div class="nickName">
          <div>新的朋友</div>
        </div>
      </div> -->
  
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

import { ref, onMounted} from "vue"


import {getFriendsList} from "@/api/frindeShip"
import { getResultSort } from "@/utils/index"
import BScroll from "better-scroll"
import { useRouter } from "vue-router"
const router=useRouter()
const meun =ref([

  { sesstionId:1,
    sesstionName:"新的朋友",
    avatar:"icon-Dimission-S",
    path:"/newFriend"
   
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
    path:""
  
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
const peoples = ref(
  [
    // {
    //   "title": "1",
    //   "list": [
    //     {
    //       "uid": 3,
    //       "nickName": "123456",
    //       "avatar": "uploads/wx_c8a0e42a/avatar.png"
    //     },
    //     {
    //       "uid": 2,
    //       "nickName": "789789",
    //       "avatar": "uploads/wx_8f5fbab5/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "7",
    //   "list": [
    //     {
    //       "uid": 4,
    //       "nickName": "qwerty",
    //       "avatar": "uploads/wx_1a2b3c4d/avatar.png"
    //     },
    //     {
    //       "uid": 5,
    //       "nickName": "asdfgh",
    //       "avatar": "uploads/wx_5e6f7g8h/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "Z",
    //   "list": [
    //     {
    //       "uid": 6,
    //       "nickName": "zxcvbn",
    //       "avatar": "uploads/wx_9i8h7g6f/avatar.png"
    //     },
    //     {
    //       "uid": 7,
    //       "nickName": "poiuyt",
    //       "avatar": "uploads/wx_4d3c2b1a/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "L",
    //   "list": [
    //     {
    //       "uid": 8,
    //       "nickName": "lkjhgf",
    //       "avatar": "uploads/wx_1234567/avatar.png"
    //     },
    //     {
    //       "uid": 9,
    //       "nickName": "mnbvcx",
    //       "avatar": "uploads/wx_7654321/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "0",
    //   "list": [
    //     {
    //       "uid": 10,
    //       "nickName": "098765",
    //       "avatar": "uploads/wx_a1b2c3d4/avatar.png"
    //     },
    //     {
    //       "uid": 11,
    //       "nickName": "543210",
    //       "avatar": "uploads/wx_d4c3b2a1/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "A",
    //   "list": [
    //     {
    //       "uid": 12,
    //       "nickName": "qwerty",
    //       "avatar": "uploads/wx_1a2b3c4d/avatar.png"
    //     },
    //     {
    //       "uid": 13,
    //       "nickName": "asdfgh",
    //       "avatar": "uploads/wx_5e6f7g8h/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "Z",
    //   "list": [
    //     {
    //       "uid": 14,
    //       "nickName": "zxcvbn",
    //       "avatar": "uploads/wx_9i8h7g6f/avatar.png"
    //     },
    //     {
    //       "uid": 15,
    //       "nickName": "poiuyt",
    //       "avatar": "uploads/wx_4d3c2b1a/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "L",
    //   "list": [
    //     {
    //       "uid": 16,
    //       "nickName": "lkjhgf",
    //       "avatar": "uploads/wx_1234567/avatar.png"
    //     },
    //     {
    //       "uid": 17,
    //       "nickName": "mnbvcx",
    //       "avatar": "uploads/wx_7654321/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "0",
    //   "list": [
    //     {
    //       "uid": 18,
    //       "nickName": "098765",
    //       "avatar": "uploads/wx_a1b2c3d4/avatar.png"
    //     },
    //     {
    //       "uid": 19,
    //       "nickName": "543210",
    //       "avatar": "uploads/wx_d4c3b2a1/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "Q",
    //   "list": [
    //     {
    //       "uid": 20,
    //       "nickName": "qwerty",
    //       "avatar": "uploads/wx_1a2b3c4d/avatar.png"
    //     },
    //     {
    //       "uid": 21,
    //       "nickName": "asdfgh",
    //       "avatar": "uploads/wx_5e6f7g8h/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "Z",
    //   "list": [
    //     {
    //       "uid": 22,
    //       "nickName": "zxcvbn",
    //       "avatar": "uploads/wx_9i8h7g6f/avatar.png"
    //     },
    //     {
    //       "uid": 23,
    //       "nickName": "poiuyt",
    //       "avatar": "uploads/wx_4d3c2b1a/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "L",
    //   "list": [
    //     {
    //       "uid": 24,
    //       "nickName": "lkjhgf",
    //       "avatar": "uploads/wx_1234567/avatar.png"
    //     },
    //     {
    //       "uid": 25,
    //       "nickName": "mnbvcx",
    //       "avatar": "uploads/wx_7654321/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "0",
    //   "list": [
    //     {
    //       "uid": 26,
    //       "nickName": "098765",
    //       "avatar": "uploads/wx_a1b2c3d4/avatar.png"
    //     },
    //     {
    //       "uid": 27,
    //       "nickName": "543210",
    //       "avatar": "uploads/wx_d4c3b2a1/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "Q",
    //   "list": [
    //     {
    //       "uid": 28,
    //       "nickName": "qwerty",
    //       "avatar": "uploads/wx_1a2b3c4d/avatar.png"
    //     },
    //     {
    //       "uid": 29,
    //       "nickName": "asdfgh",
    //       "avatar": "uploads/wx_5e6f7g8h/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "Z",
    //   "list": [
    //     {
    //       "uid": 30,
    //       "nickName": "zxcvbn",
    //       "avatar": "uploads/wx_9i8h7g6f/avatar.png"
    //     },
    //     {
    //       "uid": 31,
    //       "nickName": "poiuyt",
    //       "avatar": "uploads/wx_4d3c2b1a/avatar.png"
    //     }
    //   ]
    // },
    // {
    //   "title": "L",
    //   "list": [
    //     {
    //       "uid": 32,
    //       "nickName": "lkjhgf",
    //       "avatar": "uploads/wx_1234567/avatar.png"
    //     },
    //     {
    //       "uid": 33,
    //       "nickName": "mnbvcx",
    //       "avatar": "uploads/wx_7654321/avatar"
    //     },
    //     {
    //       "uid": 32,
    //       "nickName": "lkjhgf",
    //       "avatar": "uploads/wx_1234567/avatar.png"
    //     },
    //     {
    //       "uid": 33,
    //       "nickName": "mnbvcx",
    //       "avatar": "uploads/wx_7654321/avatar"}
    //   ]}
  ])
onMounted(async()=>{
 
  const {err,res}=await getFriendsList()
  if(err){
    throw err
  }
  const data=res["data"].map(item=>item.user)

  peoples.value=[...getResultSort(data)]
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
  // touch-action: none;
  overflow: hidden;

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