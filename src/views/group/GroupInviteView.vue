<template>
  <div class="groupJoin"  v-if="groupInfo" >
    <div v-if="groupInfo.code==groupType.NOT_JOINED_GROUP">
    <Close></Close>
    <div class="head">
       <div class="avatarBox" >
            <img v-for="image in groupInfo.groupAvatar" :key="image"  :src="image" />
   
            <div v-for="empty in 9-groupInfo.groupAvatar.length" :key="empty">
            </div> 
    </div>
    <h2>{{ groupInfo.groupName }}({{ groupInfo.groupCount }})</h2>
    <Text>你和群里其他人都不是朋友关系，请注意隐私安全。</Text>
    </div>
    <ul>
      <li><Text :size="14">该群聊人数较多，为减少新消息给你带来的打扰，建议谨慎加入。</Text>  </li>
      <li><Text :size="14">为维护微信平台绿色网络环境，请勿在群内传播违法违规内容。</Text>  </li>
    </ul>
        <button class="agree"  @click="onJoinGroup()">
        加入群聊
      </button>
    </div>
  
    <div v-if="groupInfo.code==groupType.ALREADY_JOINED_GROUP">
    <Close></Close>
    <div class="main">
      <Text>你已经加入了本群</Text>
    </div>
    </div>
  </div>

  <div v-else class="quitGroup">
    <Close></Close>
    <div class="main">
      <Text>该群聊不存在或已解散</Text>
    </div>
    
  </div>

</template>
<script setup >
import { inviteGroup,joinGroup } from "@/api/group"
import { onMounted,ref } from "vue"
import { useRoute } from "vue-router"
import {groupType} from "@/constant"
const route = useRoute()
const router = useRouter()
const {inviteUrl}=route.params
const groupInfo=ref(null)
onMounted(async () => {
  const {res,err}=await inviteGroup(inviteUrl)
  if(err){
    throw err
  }
  if(res.code==404){
    return 
  }

  if(res.code===200){
    groupInfo.value=res.data
    // console.log(groupInfo.value.image_urls.length)
  }
})

const onJoinGroup=async ()=>{
  const {res,err}=await joinGroup(groupInfo.value.groupId)
  if(err){
    throw err
  }
  if(res.code===200){
    router.back()
  }
}
</script>
<style lang="scss" scoped>
.groupJoin{
 height: 100%;
  >div{
     height: 100%;
  padding: 5px 10px;
  position: relative;
  }
  .head{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 40px 25px ;
      .avatarBox{

      display: grid;
      grid-template-columns: repeat(3, 1fr);

      gap: 2px;
      // margin-right: 10px;
      padding: 2px;
      margin: 10px 10px;
      background-color: $bd-color;
      border-radius: 3px;
      width: 60px;
      height: 60px;

  
      >img{
        width: 18px;
        height: 18px;
      }
      
    }
    &::after{
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 1px;
      content: "";
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
      background-color: #c8c7cc;
    }
    h3{
      font-size: 20px;
      font-weight: 500;
    }
  }
  ul{
    padding: 0 30px;
    list-style: none;
    li{
      margin: 20px 0;
    }
  }

  .agree {
      position: absolute;
      height: 40px;
      width: 144px;
      margin-bottom: 30px;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
      background-color: #07c060;
      border-radius: 8px;
      color: white;
      bottom: 50px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

.quitGroup{
      height: 100%;
  padding: 5px 10px;
  position: relative;
  

  
}
  .main{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
