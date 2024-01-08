<template>
  <div class="list">
    <ListItem v-for="item in infoList" :key="item.sesstionId" :sesstioItem="item" :height="55" :border="true" @click="onGoDialog(item)">
      <template #right v-if="item?.sesstionMsg">
        <div>{{ item?.sesstionMsg[item?.sesstionMsg.length - 1]?.sendTime }}</div>
        <!-- <div>勿扰</div> -->
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
import { useStore } from "@/store"
import { useRouter } from "vue-router"
const store=useStore()
defineProps({
  infoList: {
    type: Array,
    required: true,
  },
})
const router=useRouter()
const onGoDialog=(item)=>{
  store.setCuurentSesstion({
    sesstionId:item.sesstionId,
    sesstionName:item.sesstionName,
    us:item.us,
    memberPerson:item.memberPerson,
    sesstioAvatar:item.sesstioAvatar
  })
  router.push({
    path:`/user/sesstion/${item.us}/${item.sesstionId}`,
  })
}

</script>

<style scoped lang="scss">
 .left {
    position: relative;
    // padding: 5px;
    // width: 50px;
    // // background: #f07a7a;
    box-sizing: border-box;
    margin: 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;   
  }
</style>