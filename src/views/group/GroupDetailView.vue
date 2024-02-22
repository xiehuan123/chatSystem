<template>
  <div class="groupDetail">
    <BackHeader>
      <template #right>
        <div></div>
      </template>
      </BackHeader>
      <ScrollLayout>
         <div class="headInfo">
        
        <div v-for="item in showMemberList" :key="item.user.wechat_id"> 
          <Avatar @click="onGotoView(item.user.wechat_id)" :src="item.user.avatar" :size="50" :border="5"  >
          </Avatar>
          <Text :size="12">{{ item.user.nickName }}</Text>
          
        </div>
        
        <div class="Dottedbox">
          </div>
        </div>
        <div v-if="memberInfoList.length>19">
        查看更多群成员
        </div>
         <textItem  @click="onClick(item)"   v-for="item in meun" :key="item.id" :item="item" >
      
      </textItem>
      </ScrollLayout>
  </div>
</template>
<script setup >
import {   onMounted, ref } from "vue"
import {getGroupInfo,quitGroup,dismissGroup} from "@/api/group"
import { userStore } from "@/store"
const store=userStore()
// 群聊信息
const groupInfo=ref({})
// 群成员信息
const memberInfoList=ref([])
const meun =ref([])
const router=useRouter()
// 展示19个
const showMemberList=computed(()=>{
  return memberInfoList.value.slice(0,19)
})

onMounted(async () => {

  const {res,err} = await getGroupInfo(store.cuurentSesstion.sesstionId)
  if(err){
    throw err
  }
  if(res.code===200){
    console.log(res.data)
    const {memberList,...rest}=res.data

    groupInfo.value=rest
    memberInfoList.value=memberList
    meun.value=[
      {
        id: 1,
        name: "群聊名称",
        height: 45,
        text:groupInfo.value.group_name,
        marginTop:true
      },
      {
        id: 2,
        name: "群二维码",
        marginBorde:true,
        icon:"icon-erweima",
        height: 45,
      },
      {
        id: 3,
        name: "群公告",
        height: 45,
        marginBorde: true,
      },
      {
        id: 4,
        name: "备注",
        height: 45,
        marginBorde: true,

    

      },
      {
        id: 5,
        name: "查找聊天记录",
        height: 45,
        marginTop: true,

    

      },
      {
        id: 6,
        name: "消息免打扰",
        height: 45,

 

      }, {
        id: 7,
        name: "置顶聊天",
        height: 45,
        marginBorde: true,
        select:true
      }, {
        id: 8,
        name: "保存到通讯录",
        height: 45,
        marginBorde: true,
        select:true
      },
      {
        id: 9,
        name: "我在群里的昵称",
        height: 45,
        marginTop: true,
        text:store.user.nickName
      },
      {
        id: 10,
        name: "显示群成员昵称",
        height: 45,
        marginBorde: true,
      },
      {
        id: 11,
        name: "设置当前聊天背景",
        height: 45,
        marginTop: true,
      },
      {
        id: 12,
        name: "清空聊天记录",
        height: 45,
        marginBorde: true,
      },
      {
        id: 13,
        name: "投诉",
        height: 45,
        marginBorde: true,
      },
      {
        id: 14,
        content:groupInfo.value.user.uid===store.user.uid?"解散群聊":"退出群聊",
        height: 45,
        marginTop: true,
        contentColor:"#f00",
        right:true
      },
  
  

    ]
  }
  
})

const onClick=async (item)=>{
  if(item.id===14){
    if(groupInfo.value.user.uid===store.user.uid){
      const {res,err} = await dismissGroup(groupInfo.value.gid)
      if(err){
        throw err
      }
      if(res.code===200){
        router.push({path:"/weixin"})
      }
    }else{
      console.log("退出群聊")
      const {res,err} = await quitGroup(groupInfo.value.gid)
      if(err){
        throw err
      }
      if(res.code===200){
        router.push({path:"/weixin"})
      }
    }
  }
}
const onGotoView=(wechat_id)=>{
  router.push({path:`/friend/peopleinfo/1/${wechat_id}`})
}
</script>
<style lang="scss" scoped>
.groupDetail {
  background: $bg-color;
  .headInfo{
    display: flex;
    padding: 5px 10px;
    flex-wrap: wrap;
    max-height: 350px;
    background-color: #fff;
    >div{
      display: flex;
      align-items: center;
      flex-direction: column;
      margin: 5px 10px;
     
    }
    .Dottedbox{
      width: 50px;
      height: 50px;
      border: 2px dashed #dedede;
      border-radius: 5px;
      background: linear-gradient(#ccc, #ccc) no-repeat center/2em 2px, 
                linear-gradient(#ccc, #ccc) no-repeat center/2px 2em,
                ghostwhite;
    }
  }
}



</style>
