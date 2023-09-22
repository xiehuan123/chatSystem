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
          <img :src="info.avatar" alt="" />
        </div>
        <div class="right">
          <div class="nickname">昵称:{{ info.nickname }}</div>
          <div class="num">微信号：{{ info.wechat_id }}</div>
          <div class="region">地区：{{ info.region }}</div>
        </div>
      </div>
    </div>
    <ListItem
      v-for="item in infoList"
      :key="item.sesstionId"
      :sesstioItem="item"
      :height="58"
    >
      <template #right>
        <Icon iconName="icon-arrow-right"> </Icon>
      </template>
    </ListItem>
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
import Icon from "@/components/common/Icon.vue"
import ListItem from "@/components/ListItem.vue"
import { useStore } from "@/store"
import {getInfo} from "@/api/index"
const router = useRouter()
const route=useRoute()
const store=useStore()
const info=ref({})
const {uId}=route.params
onMounted(async()=>{
  const {err,res}=await getInfo(uId)
  if(err){
    throw err
  }
  info.value=res["data"]
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
const infoList = [
  {
    sesstionId: 1,
    sesstionName: "设置备注和标签",
    avatar: "icon-iconfontzhizuobiaozhunbduan36",
    marginBorde: true,
  },
  {
    sesstionId: 2,
    sesstionName: "朋友权限",
    avatar: "icon-shoucang",
    marginBorde: true,
  },
  {
    sesstionId: 3,
    sesstionName: "朋友圈",
    avatar: "icon-shoucang",
    marginTop: true,
  },
  {
    sesstionId: 4,
    sesstionName: "更多信息",
    avatar: "icon-shoucang",
    marginBorde: true,
  },
]
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
      align-items: center;
      margin: 0 12px;
      height: 130px;
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
      .right {
        .nickname {
          font-weight: bold;
          font-size: 22px;
        }
        .num {
          color: #c3c3c3;
          font-size: 14px;
          margin: 6px 0;
        }

        .region {
          color: #c3c3c3;
          font-size: 14px;
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
.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
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