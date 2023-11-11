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
           <RouterLink to="/addfriend">  添加朋友</RouterLink>
      
      </span>
     
     
    </h4>
 
    <SearchShow></SearchShow>
    <div class="friends">
      <div class="friend" v-for="friends in peoples" :key="friends.title">
        <div class="listtile" :id="friends.title">{{ friends.title }}</div>
        <div class="content" v-for="item in friends.list" :key="item.uid" @click="onGoto(item.wechat_id)">
          <Avatar :src="item.avatar" :size="45"></Avatar>
          <div class="nickname">
            <div>
              <div>
         
              <Text :size="15" color="#000000">{{ item.nickname }}</Text>
                <Text :size="12">我:我是Appoint</Text>
              </div>

              <div class="status">已添加</div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>
<script setup >


import { ref } from "vue"
import { useRouter} from "vue-router"
const router=useRouter()
const peoples = ref(
  [
    {
      "title": "近三天",
      "list": [
        {
          "uid": 3,
          "nickname": "静能生慧",
          "avatar": "uploads/wx_c8a0e42a/avatar.png"
        },
        {
          "uid": 2,
          "nickname": "789789",
          "avatar": "uploads/wx_8f5fbab5/avatar.png"
        }
      ]
    },
    {
      "title": "三天前",
      "list": [
        {
          "uid": 3,
          "nickname": "123456",
          "avatar": "uploads/wx_c8a0e42a/avatar.png"
        },
        {
          "uid": 2,
          "nickname": "789789",
          "avatar": "uploads/wx_8f5fbab5/avatar.png"
        }
      ]
    },
  ])
const toBack=()=>{
  router.go(-1)
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
      color: #000000;
      // background-color: #ece9e7;
      background-color: $content-color;
      padding: 0 10px;
    }

    .content {
      display: flex;
      align-items: center;
      margin-left: 10px;
      height: 65px;


      .nickname {
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

            width: 70px;
          }
        }
      }

      // 分组最后面那个清楚 
      &:last-child>.nickname::before {
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
