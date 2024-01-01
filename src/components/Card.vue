<template>
<div class="Card">
    <div class="left">
      <Avatar :size="45" :src="data.user.avatar">

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
       
        

      </div>
      <footer>
        <Text>{{ momentformat(data.pub_time) }}</Text>

        <div class="option">
          <div @click="onShow()">
            <div>

            </div>
          </div>
          <ul :class="isShow && 'active'">
            <li v-show="appoint">
              <Icon   iconName="icon-aixin" :fontSize="18" color="#FF0000" @click="onSetAppoint"></Icon>赞
             
            </li>
            <li v-show="!appoint">
          <Icon   iconName="icon-aixin" :fontSize="18"  @click="onSetAppoint"></Icon>赞
            </li>
            |
            <li @click="onShowComment(data.mid,0  )">
              <Icon iconName="icon-tubiao_pinglun" :fontSize="18"></Icon>评论
            </li>
          </ul>
        </div>
      </footer>
      <div class="appoint" v-if="appoints.length!=0">
        <Icon iconName="icon-aixin" color="blue" :fontSize="20"></Icon> 
     
        <span v-for="(item,index) in appoints" :key="item.uid" @click="onGOto(item.wxid)"> <span v-if="index!=appoints.length-1">{{item.nickName }},</span> <span v-else>{{ item.nickName }}</span>  </span>
      </div>
      <div class="comment">
    
        <div v-for="item in comments" :key="item.uid" @click="onShowComment(data.mid,item.uid,  item)" >
         <Text color="#737cfe" :style="{display:'inline-block'}">{{ item.nickName }}:</Text>    
        <Text  v-if="item.rid" color="#737cfe"  :style="{display:'inline-block'}" >回复{{ item.ruser.nickName }}:</Text> 
        
        <Text :style="{display:'inline-block'}" color="#262626">{{ item.comment }}</Text>
        
        </div>
      </div>
    </div>
  </div>
</template>
<script setup >
import { defineProps, ref,computed,watch,defineExpose } from "vue"
import { useRouter } from "vue-router"
import {momentFormatTime} from "@/utils/index"
import emitter from "@/utils/Bus"

import { useStore } from "@/store"

const props=defineProps({
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
  },
  index:{
   
    type:Number,
    default:-1,
  }

})
// const appointFormat = computed(() => {
//   return function () {
//     return function () {

//     }
//   }
// })
// 路由
const router=useRouter()
const store=useStore()
const myUser={...store.user}
// 组件内部点赞显示 用于做前端展示
const appoint=ref(props.data.isAppoint)
// 内部点赞列表
const appoints=ref(props.data.appoints)
// 内部评论 
const comments=ref(props.data.comments)
// 控制评论点赞弹出
const isShow = ref(false)
defineExpose({
  comments
})
const momentformat=computed(()=>{
  return function(time){

    return momentFormatTime(time)
  }
})
const img_list=computed(()=>{
  return function(imgList){

    return imgList.split(",")
  }
})  
const onGOto=(wxID)=>{
  router.push({path:`/peopleinfo/1/${wxID}`})
}


const onShow = () => {
  isShow.value = !isShow.value
}
// 评论触发父组件执行 弹出对话框
const onShowComment=(mid,rid,user={})=>{
  // 关闭弹出的 点赞与评论
  isShow.value=false
  // 如果是自己的评论 就不能评论
  if(rid==myUser.uId)return
  emitter.emit("ShowComment",{mid,rid,user,index:props.index})
  
}

// 点赞
const onSetAppoint=()=>{
  appoint.value=!appoint.value
  if(appoint.value){
    appoints.value.push({
      avatar:myUser["userAvatar"],
      gender:myUser["userSex"],
      nickName:myUser["nickName"],
      phone_number:myUser["useriPhone"],
      region:myUser["userRigon"],
      uid:myUser["uId"],
      wechat_id:myUser["userWx"],
    })
  }else{
    appoints.value=appoints.value.filter(item=>item.uid!=myUser.uId)
  }
}
// 监听点赞评论框 当他关闭就向后端发送点赞更新请求
watch(()=>isShow.value,(val)=>{
  // val = False 代表 每次关闭 同时满足 修改的状态 不等于之前的状态 才发送请求给后端修改点赞数据
  if(!val&&appoint.value!=props.data.isAppoint){
    emitter.emit("notifyMomentIndexAppoint",{mid:props.data.mid,data:{appoint:appoint.value}})

  }
})
// // 评论先做展示
// emitter.on("notifyCardComment",({rid,ruser,comment})=>{
//   comments.value.push({
//     avatar:myUser["userAvatar"],
//     gender:myUser["userSex"],
//     nickName:myUser["nickName"],
//     phone_number:myUser["useriPhone"],
//     region:myUser["userRigon"],
//     uid:myUser["uId"],
//     wechat_id:myUser["userWx"],
//     rid,
//     ruser,
//     comment
//   })
// })
</script>
<style lang="scss" scoped>
.Card {
  position: relative;
  display: flex;
  padding-left: 10px;
  padding-top: 10px;
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

  .left {
    width: 2.5rem;
  }

  .right {
    margin-left: 10px;
    flex: 1;
    .imgList {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
     
   
      >div {
        width: 90px;
        height: 90px;
        margin: 2px;
        &:only-child{
        width: 90%;
        height: auto;
      
      }
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
        right: 0px;
        >div {
          position: absolute;
          width: 65px;
          height: 45px;
          display: flex;
          padding: 0 5px;
          align-items: center;
          background-color: $bg-color;
          z-index: 5;

          >div {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 32px;
            height: 20px;
            background-color: #e3e2eb;
            border-radius: 4px;
            &::before {
              content: "";
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background-color: #6f718f;
              margin-right: 4px;

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
      border-top-left-radius: 3px;
      border-top-right-radius: 3px;
      margin-right: 17px;
      >span{

        padding: 0 2px;
      }
    }
    .comment{
      background-color: #e3e2eb;
      padding: 0 4px;
      border-bottom-left-radius: 3px;
      border-bottom-right-radius: 3px;
      margin-right: 17px;
    }
  }
}</style>
