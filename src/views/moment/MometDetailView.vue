<template>
  <div class="momentDetail">
     <BackHeader>
      详情
      <template #right>
        <div></div>

      </template>
    </BackHeader>
    <Card   :currentUserId="myUser.uId"  ref="cardRef" type="detail"  v-if="momentDeatil" :data="momentDeatil"></Card>
  </div>
  <CommentInput></CommentInput>

</template>
<script setup >

import { useRoute,useRouter } from "vue-router"
import{getMomentDetail,setMomentAppoint,setMomentComment,deleteMoment} from "@/api/moment"
import { onMounted, ref ,getCurrentInstance} from "vue"
import emitter from "@/utils/Bus"
import { useStore } from "@/store"
const route=useRoute()
const {mid}=route.params
const momentDeatil=ref(null)
const cardRef=ref(null)
const store = useStore()
const router = useRouter()

const { appContext : { config: { globalProperties } } } = getCurrentInstance()
// 状态管理里面存储的用户信息
const myUser={...store.user}
onMounted(async()=>{
  const {res,err}=await getMomentDetail(mid)
  if(err){
    console.log(err)
    return
  }
  if(res.code==200){
    console.log(res.data)
    momentDeatil.value=res.data
  }
  
})
// 评论数据更新 根据ref 获取子组件实例 通过index 直接拿到指定的子组件修改内部数据以便前端做展示
emitter.on("notifyMomentIndexComment",async({mid,rid,ruser,comment})=>{
  
  cardRef.value["comments"].push({
    avatar:myUser["userAvatar"],
    gender:myUser["userSex"],
    nickName:myUser["nickName"],
    phone_number:myUser["useriPhone"],
    region:myUser["userRigon"],
    uid:myUser["uId"],
    wechat_id:myUser["userWx"],
    rid,
    ruser,
    comment
  })
  setMomentComment(mid,{comment,ruser,rid})
})
// 点赞数据更新
emitter.on("notifyMomentIndexAppoint",async({mid,data})=>{
  setMomentAppoint(mid,data)
})
// 删除时
emitter.on("notifyMomentDelete",async({mid})=>{
  console.log(mid)
  globalProperties.$confirm({
    message:"删除该朋友圈吗？",
    succed:async()=>{
  
      const {res,err}=await deleteMoment(mid)
      if(err){
        console.log(err)
        return
      }
      if(res.code==200){
        // 删除成功 返回上一页
        router.back(-1)
        
      }
    },
  
  })
  
})
</script>
<style lang="scss" scoped>
.momentDetail{
  height: 100%;
}




</style>
