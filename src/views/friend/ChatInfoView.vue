<template>
  <div class="chatInfo">
     <BackHeader>聊天信息
      <template #right>
        <div></div>
      </template>
    </BackHeader>
    <ScrollLayout >
      <div class="headInfo">
        <div> 
          <Avatar @click="onGotoView(store.cuurentSesstion.wechat_id)" :src="store.cuurentSesstion.sesstioAvatar" :size="45" :border="5"  >
          </Avatar>
          <Text :size="12">{{ store.cuurentSesstion.sesstionName }}</Text>
          
        </div>
        <div class="Dottedbox">

          </div>
      </div>
      <textItem  @click="onClick(item.id)" v-for="item in meun" :key="item.id" :item="item" >
      
      </textItem>

    </ScrollLayout>



  </div>
</template>
<script setup >
import Avatar from "@/components/common/Avatar.vue"
import { userStore } from "@/store"
const store=userStore()
const meun = ref([
  {
    id: 1,
    name: "查找聊天记录",
    height: 45,
    marginTop:true
  },
  {
    id: 2,
    name: "消息免打扰",
    marginTop:true,

    height: 45,
    select:true


  },
  {
    id: 3,
    name: "置顶聊天",
    height: 45,
    marginBorde: true,
    select:true

  },
  {
    id: 4,
    name: "提醒",
    height: 45,
    marginBorde: true,
    select:true
    

  },
  {
    id: 5,
    name: "设置当前聊天背景",
    height: 45,
    marginTop: true,
 

  }, {
    id: 6,
    name: "清空聊天记录",
    height: 45,
    marginTop: true,


  }, {
    id: 7,
    name: "投诉",
    height: 45,
    marginTop: true,
  },
  

])
console.log(store.cuurentSesstion,"store.cuurentSesstion")
const router=useRouter()
const onGotoView=(wechat_id)=>{
  router.push({path:`/friend/peopleinfo/1/${wechat_id}`})
}


</script>
<style lang="scss" scoped>
.chatInfo {
  background: $bg-color;
  .headInfo{
    display: flex;
    padding: 5px 10px;
    >div{
      display: flex;
      align-items: center;
      flex-direction: column;
      >div{
        margin-right: 10px;
      }
    }
    .Dottedbox{
      width: 45px;
      height: 45px;
      border: 2px dashed #dedede;
      border-radius: 5px;
    
         background: linear-gradient(#ccc, #ccc) no-repeat center/2em 2px, 
                linear-gradient(#ccc, #ccc) no-repeat center/2px 2em,
                ghostwhite;
    }
  }
}



</style>
