<template>
  <div class="list">
    <ListItem v-for="item in infoList" :key="item.sesstionId" :sesstioItem="item" :height="55" :border="true" @click="onGoDialog(item)">
      <template #right v-if="item?.sesstionMsg">
      
        <div>{{getFormatTime(item?.sesstionMsg[item?.sesstionMsg.length - 1]?.sendTime)  }}</div>
      
      </template>
      <template #left>

        <div class="left">
          <Avatar :src="item?.sesstioAvatar" :size="40" :num="item?.num"></Avatar>
          
        
       </div>
      </template>
    </ListItem>
  </div>
</template>

<script setup>
import { userStore } from "@/store"
import { useRouter } from "vue-router"
import { getFormatTime } from "@/utils"
const store=userStore()
defineProps({
  infoList: {
    type: Array,
    required: true,
  },
})

const router=useRouter()
const onGoDialog=(item)=>{
  console.log(item,789789)
  store.setCuurentSesstion({
    sesstionId:item.sesstionId,
    sesstionName:item.sesstionName,
    us:item.us,
    memberPerson:item.memberPerson,
    sesstioAvatar:item.sesstioAvatar,
    wechat_id:item.wechat_id
  })
  store.noticeCount["weixin"]=store.noticeCount["weixin"]-item.num<0?0:store.noticeCount["weixin"]-item.num
  router.push({
    path:`/user/sesstion/${item.us}/${item.sesstionId}`,
  })
}

</script>

<style scoped lang="scss">
 .left {
    position: relative;
  
    // width: 50px;
    // // background: #f07a7a;
    margin: 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;   
  }
</style>