<template>
  <div class="newFriend">
    <h4 class="title">
      <Icon
        iconName="icon-arrow-left"
        :fontSize="18"
        class="arrow_left"
        @click="toBack"
      ></Icon
      ><span>新的朋友</span>
         <span  class="add">
           <RouterLink to="/friend/addfriend">  添加朋友</RouterLink>  
      </span>
     
    </h4>
 
    <SearchShow></SearchShow>
    <div class="friends">
      <div class="friend" v-for="friends in peoples" :key="friends.title">
        <div class="listtile" :id="friends.title">{{ friends.title }}</div>
        <div class="content" v-for="item in friends.list" :key="item.uid" @click="onGoto(item.friend_static,item.user?.wechat_id)">
          <Avatar :src="item.user?.avatar" :size="45"></Avatar>
          <div class="nickName">
            <div v-if="item.flag==1">
              <div>
              <Text :size="15" color="#262626">{{ item.nickName }}</Text>
                <Text :size="12" >我:{{ item.friend_msg }}</Text>
               
              </div>
              <div class="status">{{ sendOption[item.friend_static] }}</div>
            </div>

             <div v-if="item.flag==2">
              <div>
              <Text :size="15" color="#262626">{{ item.nickName }}</Text>
                <Text :size="12" >{{item.user.nickName  }}:{{ item.friend_msg }}</Text>
              </div>
              <div class="status" v-if="item.friend_static==0"   @click="onGo(item.user?.uid)"><MyButton  backgroundColor="#edededb3"   color="#000">接受</MyButton></div>
            <div class="status" v-if="item.friend_static==1" >已添加</div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>
<script setup >


import { ref,onMounted } from "vue"
import { useRouter} from "vue-router"
import {queryFriendHistory} from "@/api/frindeShip"
import { userStore } from "@/store"
import {getFriendResultSort} from "@/utils/index"
import MyButton from "@/components/common/myButton.vue"
const router=useRouter()
const store=userStore()
const peoples = ref(
  [
    {
      "title": "近三天",
      "list": [
        {
          "uid": 3,
          "nickName": "静能生慧",
          "avatar": "uploads/wx_c8a0e42a/avatar.png"
        },
        {
          "uid": 2,
          "nickName": "789789",
          "avatar": "uploads/wx_8f5fbab5/avatar.png"
        }
      ]
    },
    {
      "title": "三天前",
      "list": [
        {
          "uid": 3,
          "nickName": "123456",
          "avatar": "uploads/wx_c8a0e42a/avatar.png"
        },
        {
          "uid": 2,
          "nickName": "789789",
          "avatar": "uploads/wx_8f5fbab5/avatar.png"
        }
      ]
    },
  ])
const sendOption=ref(["等待验证","已添加"])

onMounted(async()=>{
  store.noticeCount["addressBook"]=0
  const {res,err}=await queryFriendHistory()
  if(err){
    return err
  }
  if(res["code"]==200){
    peoples.value=getFriendResultSort(res["data"])
    console.log(peoples.value)
  }
  
})



const toBack=()=>{
  router.go(-1)
}
const onGoto=(friend_static, wechat_id)=>{
 
  if(wechat_id==null || friend_static==0){
    return 
  }
  router.push(
    {
      path:`/friend/peopleinfo/2/${wechat_id}`
    }
  )
}
const onGo=(uid)=>{
  router.push(
    {
      path:`/application/2/${uid}`
    }
  )
}

</script>
<style lang="scss" scoped>
.newFriend {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: $content-color;
  // overflow: hidden;
    .title {
    margin: 0 7px;
    text-align: center;
    margin-top: 14px;
    margin-bottom: 16px;
    position: relative;
    .arrow_left {
      position: absolute;
      left: 0;
      top: 0;
    }
    .add{
      position: absolute;
      right: 0;
    }
  }
  
.friends {
  margin-top: 10px;

  .friend {

    background-color: $white;

    .listtile {
      font-size: 12px;
      height: 24px;
      line-height: 24px;
      color: #262626;
      // background-color: #ece9e7;
      background-color: $content-color;
      padding: 0 10px;
    }

    .content {
      display: flex;
      align-items: center;
      margin-left: 10px;
      height: 65px;


      .nickName {
        position: relative;
        margin-left: 16px;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        &::before {
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

        >div {
          display: flex;
          width: 100% ;
          >div{
            width: 100%;
          }
          .status {
            text-align: center;
            width: 90px;
            font-size: 15px;
          }
        }
      }

      // 分组最后面那个清楚 
      &:last-child>.nickName::before {
        content: none;

      }


    }

    .content:last-child {
      border-bottom: 0;
    }
  }
}

}

</style>
