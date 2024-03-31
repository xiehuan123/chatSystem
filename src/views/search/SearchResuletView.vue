<template>
  <!-- 暂时没用上 -->
  <div class="searchResulet">
       <BackHeader></BackHeader>
    <div class="top">
      <div class="info">
        <div class="left">
          <Avatar :src="info.avatar" :size="55" :border="5" />
         
        </div>
        <div class="right">
           <Text :size="22" color="#262626" :weight="500">{{ info.nickName }}</Text>
          <Text v-if="info.region">地区：{{ info.region }}</Text>

        </div>
      </div>
    </div>
    <TextItem
      v-for="item in infoList"
      :key="item.id"
      :item="item"  
    >
      <template #right>
        <Icon iconName="icon-arrow-right"> </Icon>
      </template>
    </TextItem>
    <div class="bottom">
      <div class="send_msg">
        <span class="text" @click="onAddfriend()">添加到通讯录</span>
      </div>
     
    </div>
  </div>
</template>
<script setup>
import {ref,onMounted} from "vue"
import { useRouter,useRoute } from "vue-router"



import { userStore } from "@/store"
import {serarchFriend} from "@/api/frindeShip"
const router = useRouter()
const route=useRoute()
const store=userStore()
const info=ref({})
const infoList=ref({})
const {kwd}=route.params
onMounted(async()=>{
  const {err,res}=await serarchFriend(kwd)
  console.log(res)
  if(err){
    throw err
  }
  info.value=res["data"]
  infoList.value=[
    {
      id: 1,
      name: "设置备注和标签",
      marginBorde: true,
      height:58,
    },
   
    {
      id: 2,
      name: "个性签名",
      height:58,
      content:"等待所有的美好",
      marginTop: true,
    },
    {
      id: 3,
      name: "来源",
      height:58,
      content:"来自账号搜索",
      marginBorde: true,
    },
  ]
  console.log(res["data"])

})


// 发送信息跳转
const onAddfriend=()=>{
  store.setCuurentSesstion({sesstionId:info.value.kwd,sesstionName:info.value.nickName,us:1,sesstioAvatar:info.value.avatar})
  router.push({
    path:`/user/sesstion/1/${kwd}`,
   
  })
}


</script>

<style lang="scss" scoped>
.searchResulet {
  background-color: #e3e3e3;
  height: 100%;

  .header {
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: center;
    background-color: white;

    .back {
      width: 50px;

      text-align: center;
    }
    .title {
      width: 100%;
      text-align: center;
    }
    .option {
      text-align: center;
      width: 56px;
      height: 100%;
    }
  }
  .top {
    background-color: white;
    :deep(.infoitem:last-child) {
      border-bottom: 0;
    }
    .info {
      display: flex;
   
      margin: 0 12px;
      padding: 20px 0;
      .left {
        width: 55px;
        height: 55px;
        margin-right: 28px;
        img {
          border-radius: 6px;
          width: 100%;
          height: 55px;
          transform: translateY(-6px);
        }
      }

    }
  }
  .center {
    margin: 10px 0;
    background-color: white;
    :deep(.infoitem:last-child) {
      border-bottom: 0;
    }
  }
  .bottom {
    margin-top: 7px;
    .send_msg {
      background-color: white;
      text-align: center;

      height: 48px;
      line-height: 48px;
      .text {
        color: #6a7c92;
        margin-left: 10px;
        font-size: 15px;
      }
    }
    .video_msg {
      background-color: white;
      text-align: center;
      border-bottom: 0.5px solid #c3c3c3;
      height: 48px;
      line-height: 48px;
      .text {
        color: #6a7c92;
        font-size: 15px;
        margin-left: 10px;
      }
    }
  }
}

.iconSize {
  font-size: 20px;
}
:deep(.item .content) {
  margin-left: 12px;
}
:deep(.item .content > div:nth-child(1)) {
  font-size: 15px;
}
</style>
