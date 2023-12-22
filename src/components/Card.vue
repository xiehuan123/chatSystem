<template>
<div class="Card">
    <div class="left">
      <Avatar :size="45">

      </Avatar>
    </div>
    <div class="right">
      <div>
        <Text color="#262626" :size="18">{{ data.user.nickName }}</Text>
      </div>

      <div class="content">
        <Text color="#262626">{{ data.content }}</Text>
      </div>


      <div class="imgList">
        <div  v-for="img in img_list(data.img_list)" :key="img">
          <img :src="img" alt="">
          
        </div>
        <div  v-for="img in img_list(data.img_list)" :key="img">
          <img :src="img" alt="">
          
        </div>
        

      </div>
      <footer>
        <Text>{{ momentformat(data.pub_time) }}</Text>

        <div class="option">
          <div @click="onShow()">
            <div>

            </div>
          </div>
          <ul :class="isShow && 'active'">
            <li>
              <Icon   iconName="icon-aixin" :fontSize="18" :color="data.isAppoint&&'#FF0000'"></Icon>赞
              
            </li>
            |
            <li>
              <Icon iconName="icon-tubiao_pinglun" :fontSize="18"></Icon>评论
            </li>
          </ul>
        </div>
      </footer>
      <div class="appoint">
        <Icon iconName="icon-aixin" color="blue" :fontSize="20"></Icon> 
     
        <span v-for="(item,index) in data.appoints" :key="item.uid" @click="onGOto(item.wxid)"> <span v-if="index!=data.appoints.length-1">{{item.nickName }},</span> <span v-else>{{ item.nickName }}</span>  </span>
      </div>
      <div class="comment">
    
        <div v-for="item in data.comments" :key="item.uid">
         <Text color="#737cfe" display="inline-block">{{ item.nickName }}</Text>    
        <Text  v-if="item.rid" color="#737cfe" display="inline-block">回复{{ item.ruser.nickName }}:</Text> 
        <Text display="inline-block" color="#262626">{{ item.comment }}</Text>
        
        </div>
      </div>
    </div>
  </div>
</template>
<script setup >
import { defineProps, ref,computed, } from "vue"
import { useRouter } from "vue-router"
import {momentFormatTime} from "@/utils/index"
defineProps({
  data: {
    type: Object,
    default: () => {
      return {
        id: 1,
        name: "Azy周螺蛳粉(招代理)",
        time: "2022-04-10T16:55:20",
      
        content: `有点像冬天的感觉了，
        冷飕飕的，
        又开始了关着门做生意了0000`,
        isAppoint: false,
        imgList: [],
        comments: [
          {
            uid:1,
            sendID: "wx_8f5fbab5",
            sendName: "Appoint",
            reviewID:"wx_8f5fbab5",
            reviewName:"leiwen",
            comment:"哈哈"

          }
        ],
        appoints: [{
          uid:1,
          wxID: "wx_8f5fbab5",
          nickName: "Appoint",

        },
        {
          uid: 2,
          wxID: "wx_8f5fbab5",
          nickName: "花开富贵",

        }]
      }


    }
  }

})
// const appointFormat = computed(() => {
//   return function () {
//     return function () {

//     }
//   }
// })
const router=useRouter()

const momentformat=computed(()=>{
  return function(time){
    console.log(time)
    return momentFormatTime(time)
  }
})
const img_list=computed(()=>{
  return function(imgList){
    console.log(imgList.split(","))
    return imgList.split(",")
  }
})  
const onGOto=(wxID)=>{
  router.push({path:`/peopleinfo/1/${wxID}`})
}
const isShow = ref(false)

const onShow = () => {
  isShow.value = !isShow.value
}
</script>
<style lang="scss" scoped>
.Card {
  position: relative;
  display: flex;
  padding-left: 15px;
  padding-top: 15px;
  padding-right: 10px;
  padding-bottom: 5px;
  overflow: hidden;


  &::after {
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

  .left {}

  .right {
    margin-left: 10px;

    .imgList {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;

      >div {
        width: 90px;
        height: 90px;
        margin: 2px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    footer {
      position: relative;
  
      
      margin: 12px 0;
      width: 100%;
      .option {
        position: absolute;
        width: 55px;
        height: 30px;
        top: -11px;
        right: -30px;
        >div {
          position: absolute;
          width: 65px;
          height: 45px;
          display: flex;
       
          align-items: center;
          background-color: $bg-color;
          z-index: 5;

          >div {
            position: relative;
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            width: 30px;
            height: 22px;
            background-color: #e3e2eb;

            &::before {
              content: "";
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background-color: #6f718f;

            }

            &::after {
              content: "";
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background-color: #6f718f;
            }
          }

        }

        >ul {
          position: absolute;
          display: flex;
          align-items: center;

          top: 1px;
          width: 150px;
          height: 40px;
          border-radius: 7px;
          list-style: none;
          background-color: #404040;
          color: #000000;


          transition: all .5s;

          li {
            flex: 1;
            text-align: center;
            color: #ffffff;
          }
        }

        .active {

          transform: translateX(-100%);

        }



      }

    }

    .appoint {
      display: flex;
      align-items: center;
      padding: 2px;
      background-color: #e3e2eb;

    }
    .comment{
      background-color: #e3e2eb;
      padding: 0 4px;
    }
  }
}</style>
