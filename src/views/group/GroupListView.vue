<template>
  <div class="groupList">
    <BackHeader> 群聊
        <template #right>
          <div></div>
        </template>
      </BackHeader>
      <ScrollLayout>


        <div  class="group"  @click="onGotoView(item.group,item.image_urls)" v-for="item in groupList" :key="item.id">
          <div class="avatarBox">
            <img v-for="image in item.image_urls" :key="image"  :src="image" />
            <div v-for="empty in 9-item.image_urls.length" :key="empty">
            </div> 
          </div>
          <div class="groupInfo">
            <div class="groupName">{{item.group.group_name}}</div>   
        </div>
        </div>
          </ScrollLayout>
  </div>
</template>
<script setup >

import { getGroupList } from "@/api/group"
import { useRouter } from "vue-router"
import { userStore } from "@/store"
const router=useRouter()
const groupList = ref([])
const store=userStore()
const getGroupListData = async () => {
  const {res} = await getGroupList()
  console.log(res)
  groupList.value = res.data
}
getGroupListData()


const onGotoView=(group,image_urls)=>{
  const {gid,group_member_count,group_name}=group
  console.log(group)
  store.setCuurentSesstion({

    sesstionId:gid,
    sesstionName:group_name,
    sesstioAvatar:image_urls,
    memberPerson:group_member_count,
    us:2
  })
  router.push({
    path:`/user/sesstion/2/${gid}`
  })
}
</script>
<style lang="scss" scoped>
.groupList{
  height: 100%;
  .group{
    display: flex;
    padding: 10px;
    .avatarBox{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: start;
      gap: 1px;
      margin-right: 10px;
      padding: 2px;
   background-color: $bd-color;
      border-radius: 3px;
      width: 36px;
      height: 36px;
      >img{
        width: 10px;
        height: 10px;
      }
      
    }
    .groupInfo{
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
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
      .groupName{
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
}



</style>
