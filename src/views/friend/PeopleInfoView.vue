<template>
  <div class="peopleinfo" >
    <BackHeader>
      <template #right>
        
    <RouterLink   :to="{path:`/friend/profileSettings/${info.uid}/${info.nickName}`}"><Icon iconName="icon-ellipsis" fontSize="20"></Icon></RouterLink>

      </template>
    </BackHeader>
    <div class="top">
      <div class="info">
        <div class="left">
          <Avatar :src="info.avatar" :size="55" :border="7" />  
        </div>
        <div class="right">
          <div>
            <Text :size="25" color="#000000" :weight="500">{{ info.nickName }}</Text>
            <Icon  v-if="info.gender"  :iconName="sexMap[info.gender]['iconName']" :color="sexMap[info.gender]['color']"></Icon>
          </div>
          <Text>昵称:{{ info.nickName }}</Text>
          <Text>微信号：{{ info.wechat_id }}</Text>
          <Text v-if="info.region">地区：{{ info.region }}</Text>  
        </div>
      </div>
    </div>
    <TextItem
      v-for="item in infoList"
      :key="item.id"
      :item="item"
      @click="onGoToView(item.id)"
    >
 
      <template #right>
        <Icon iconName="icon-arrow-right"> </Icon>
      </template>
    </TextItem>
    <div class="bottom">
      <div class="send_msg" @click="onGoSendInfoView()" v-if="info['friendCode']==1 || info['friendCode']==2 ">
        <Icon iconName="icon-message" :fontSize="24"></Icon
        ><span class="text" >发消息</span>
      </div>
      <div class="video_msg" @click="onGoSendVideoView()" v-if="info['friendCode']==1">
        <Icon iconName="icon-vst_shipintonghua" :fontSize="24"></Icon
        ><span class="text" >音频通话</span>
      </div>
      <!-- 有问题 就是 -->
      <div class="send_msg" v-if="info['friendCode']==0">
        <span  v-if="flag==1" class="text" @click="onAddfriendView()">添加到通讯录</span>
        <span  v-if="flag==2" class="text" @click="onAddfriendView()">前往验证</span>
      </div>
    </div>
  </div>
  <ShareSheet  @onOpen="onOpen"  :options="options" v-model:show="show"></ShareSheet>
</template>

<script setup>
import {ref,onMounted} from "vue"
import { useRouter,useRoute } from "vue-router"
import { userStore } from "@/store"
import { callStore } from "@/store/call"
// import {getInfo} from "@/api/index"
import {serarchFriend} from "@/api/frindeShip"
import ShareSheet from "@/components/common/ShareSheet.vue"
const router = useRouter()
const route=useRoute()
const store=userStore()
const CallStore=callStore()
const info=ref({})
const infoList=ref({})
const show=ref(false)
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

const options=ref([{id:1,name:"视频通话"},{id:2,name:"语音通话"}])
const {kwd,flag}=route.params
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
        moment:info.value.moment,
        marginTop: true,
      },
      {
        id: 4,
        name: "更多信息",
        height:45,
        marginBorde: true,
      },
    ]
    console.log("设置")
    // 这里表示当前是自己的好友 然后设置当前会话
    store.setCuurentSesstion({
      sesstionId:info.value.uid,
      sesstionName:info.value.nickName,
      us:1,sesstioAvatar:info.value.avatar
      ,wechat_id:info.value.wechat_id,
    })
    break
  case 2:
    infoList.value=[
      {
        id: 3,
        name: "朋友圈",
        marginTop: true,
        moment:info.value.moment,
        height:60,
      },
   
      {
        id: 2,
        name: "更多信息",
        height:45,
        marginBorde: true,
     
      },
    ]
    break
  }
  console.log(sexMap.value[info.value.gender]["iconName"])

 
})


// 发送信息跳转
const onGoSendInfoView=()=>{
  console.log(info.value)
  // 点击发送消息的时候得把当前的会话信息存储到pinia里面
  store.setCuurentSesstion({sesstionId:info.value.uid,sesstionName:info.value.nickName,us:1,sesstioAvatar:info.value.avatar
    ,wechat_id:info.value.wechat_id,
  
  })

  router.push({
    path:`/user/sesstion/1/${info.value.uid}`,
   
  })
}
// 调用菜单栏
const onGoSendVideoView=()=>{
  show.value=true
  
}
// 跳转到发送好友请求页面
const onAddfriendView=async ()=>{
  router.push({path:`/application/${flag}/${info.value.uid}`})
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
// 根据id 跳转到指定页面
const onGoToView=(id)=>{
  console.log("跳转到指定页面")
  switch(id){
  case 1:
    break
  case 2:
    break
  case 3:
    router.push({
      path:`/moment/momentUser/${info.value.uid}`,
    })
    break
  case 4:
    break
  case 5:
    break
  }
}
// 根据id 打开指定的功能
const onOpen=(id)=>{
  switch(id){
  case 1:
    CallStore.localUser={"uid":info.value.uid,"avatar":info.value.avatar,"nickName":info.value.nickName}
    console.log(info.value,8888)
    router.push({
      path:`/videocall/${info.value.uid}`,
      query:{
        type:1 // 1 为视频通话 2 为语音通话  
      }
      
    })
    console.log("视频通话")
    break
  case 2:
    console.log("语音通话")
    break
  }
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
      &:active{
        background-color: rgba(237, 237, 237,.2);
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