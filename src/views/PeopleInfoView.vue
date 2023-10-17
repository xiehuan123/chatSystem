<template>
  <div class="peopleinfo" >
    <header class="header">
      <div class="back" @click="toBack">
        <Icon iconName="icon-arrow-left" />
      </div>
      <div class="title"></div>
      <div class="option" @click="toMenu">
        <Icon iconName="icon-ellipsis" />
      </div>
    </header>
    <div class="top">
      <div class="info">
        <div class="left">
          <Avatar :src="info.avatar" :size="55" :border="5" />
         
        </div>
        <div class="right">
           <Text :size="22" color="#000000" :weight="500">{{ info.nickname }}</Text>
          <Text>昵称:{{ info.nickname }}</Text>
          <Text>微信号：{{ info.wechat_id }}</Text>
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
        <Icon iconName="icon-xiaoxi" :fontSize="24"></Icon
        ><span class="text" @click="onGoSendInfoView()">发消息</span>
      </div>
      <div class="video_msg">
        <Icon iconName="icon-vst_shipintonghua" :fontSize="24"></Icon
        ><span class="text" @click="onGoSendVideoView()">音频通话</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref,onMounted} from "vue"
import { useRouter,useRoute } from "vue-router"



import { useStore } from "@/store"
import {getInfo} from "@/api/index"
const router = useRouter()
const route=useRoute()
const store=useStore()
const info=ref({})
const infoList=ref({})
const {uId}=route.params
onMounted(async()=>{
  const {err,res}=await getInfo(uId)
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
      id:8,
      name:"电话号码",
      marginBorde: true,
      height:58,
      content:info.value.phone_number
    },
    {
      id: 2,
      name: "朋友权限",
      height:58,
      marginBorde: true,
    },
    {
      id: 3,
      name: "朋友圈",
      height:70,
      marginTop: true,
    },
    {
      id: 4,
      name: "更多信息",
      height:58,
      marginBorde: true,
    },
  ]
  console.log(res["data"])

})

const toBack = () => {
  console.log(uId)
  console.log("aaa")
  router.go(-1)
}
const toMenu = () => {
  console.log("菜单")
}
// 发送信息跳转
const onGoSendInfoView=()=>{
  store.setCuurentSesstion({sesstionId:info.value.uid,sesstionName:info.value.nickname,us:1,sesstioAvatar:info.value.avatar})
  router.push({
    path:`/user/sesstion/1/${uId}`,
   
  })
}
// 音视频通话跳转
const onGoSendVideoView=()=>{
  
  router.push({
    path:`/videocall/${uId}`,
    query:{
      src:info.value.avatar,
      name:info.value.nickname
    }
  })
}

</script>

<style lang="scss" scoped>
.peopleinfo {
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
      align-items: flex-start;
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
      border-bottom: 0.5px solid #c3c3c3;
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