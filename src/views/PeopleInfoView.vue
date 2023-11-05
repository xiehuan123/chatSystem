<template>
  <div class="peopleinfo" >
    <BackHeader></BackHeader>
    <div class="top">
      <div class="info">
        <div class="left">
          <Avatar :src="info.avatar" :size="55" :border="5" />  
        </div>
        <div class="right">
          <div>
            <Text :size="22" color="#000000" :weight="500">{{ info.nickname }}</Text>
            <Icon  v-if="info.gender"  :iconName="sexMap[info.gender]['iconName']" :color="sexMap[info.gender]['color']"></Icon>
          </div>
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
      <div class="send_msg" v-if="info['friendCode']==1">
        <Icon iconName="icon-xiaoxi" :fontSize="24"></Icon
        ><span class="text" @click="onGoSendInfoView()">发消息</span>
      </div>
      <div class="video_msg" v-if="info['friendCode']==1">
        <Icon iconName="icon-vst_shipintonghua" :fontSize="24"></Icon
        ><span class="text" @click="onGoSendVideoView()">音频通话</span>
      </div>
      <div class="send_msg" v-if="info['friendCode']==0">
        <span class="text" @click="onAddfriendView()">添加到通讯录</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref,onMounted} from "vue"
import { useRouter,useRoute } from "vue-router"



import { useStore } from "@/store"
// import {getInfo} from "@/api/index"
import {serarchFriend} from "@/api/frindeShip"
const router = useRouter()
const route=useRoute()
const store=useStore()
const info=ref({})
const infoList=ref({})
const sexMap=ref({
  "男":{
    iconName:"icon-icon-person-lingdao",
    color:"rgb(8, 114, 244)"
  },
  "女":{
    iconName:"icon-nv",
    color:"rgb(248, 182, 182)"
  },
  "保密":{
    iconName:"icon-icon-person-lingdao",
    color:"rgb(8, 114, 244)"
  }
})
const {kwd}=route.params
onMounted(async()=>{
  // const {err,res}=await getInfo(uId)
  const {err,res}=await serarchFriend(kwd)
  if(err){
    throw err
  }
  info.value=res["data"]
  
  switch(info.value["friendCode"]){
  case 0:
    infoList.value=[
      {
        id: 1,
        name: "设置备注和标签",
        marginBorde: true,
        height:45,
      },
   
      {
        id: 2,
        name: "个性签名",
        height:45,
        content:"等待所有的美好",
        marginTop: true,
      },
      {
        id: 3,
        name: "来源",
        height:45,
        content:"来自账号搜索",
        marginBorde: true,
      },
    ]
    break
  case 1:
    infoList.value=[
      {
        id: 1,
        name: "设置备注和标签",
        marginBorde: true,
        height:45,
      },
      {
        id:8,
        name:"电话号码",
        marginBorde: true,
        height:45,
        content:info.value.phone_number,
        contentColor:"rgb(13, 120, 242)",
      },
      {
        id: 2,
        name: "朋友权限",
        height:45,
        marginBorde: true,
      },
      {
        id: 3,
        name: "朋友圈",
        height:58,
        marginTop: true,
      },
      {
        id: 4,
        name: "更多信息",
        height:45,
        marginBorde: true,
      },
    ]
    break
  case 2:
    break
  }
  console.log(sexMap.value[info.value.gender]["iconName"])

 
})


// 发送信息跳转
const onGoSendInfoView=()=>{
  store.setCuurentSesstion({sesstionId:info.value.uid,sesstionName:info.value.nickname,us:1,sesstioAvatar:info.value.avatar})
  router.push({
    path:`/user/sesstion/1/${info.value.uid}`,
   
  })
}
// 音视频通话跳转
const onGoSendVideoView=()=>{
  
  router.push({
    path:`/videocall/${info.value.uid}`,
    query:{
      src:info.value.avatar,
      name:info.value.nickname
    }
  })
}
// 跳转到发送好友请求页面
const onAddfriendView=async ()=>{
  router.push({path:`/application/${info.value.uid}`})
  // globalProperties.$loading("发送中...")
  // const {err,res}=await sendhFriend({uid:info.value.uid})
  // if(err){
  //   throw err
  // }
  // if(res["code"]!=200){
  //   globalProperties.$message("发送失败")
  //   return 
  // }
  
  // globalProperties.$message("发送成功")
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

    .info {
      display: flex;
      align-items: flex-start;
      margin: 0 12px;
      padding: 10px 0;
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
      .right{
        >div:nth-child(1){
            display: flex;
            align-items: center;
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
     &:last-child::before{
      content: none;
     
    }
    >div{
      position: relative;
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


</style>