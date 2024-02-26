<template>
  <div class="Card">
    <div :class="['CardHead', bootomLine]">
      <div class="left">
        <Avatar :size="40" :src="data.user.avatar">
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
          <div v-for="img in img_list(data.img_list)" :key="img">
            <img :src="img" alt="">

          </div>



        </div>
        <footer>
          <Text :style="{ display: 'inline-block' }">{{ momentformat(data.pub_time) }}</Text>
          <Icon v-if=" type==momentType.DETAIl&&  currentUserId == data.uid" iconName="icon-shanchu" @click="onDelMoment(data.mid)"></Icon>
          <div class="option">
            <div @click="onShow()">
              <div>

              </div>
            </div>
            <ul :class="isShow && 'active'">
              <li v-show="appoint">
                <Icon iconName="icon-aixin" :fontSize="18" color="#FF0000" @click="onSetAppoint"></Icon>取消

              </li>
              <li v-show="!appoint">
                <Icon iconName="icon-aixin" :fontSize="18" @click="onSetAppoint"></Icon>赞
              </li>
              <span >|</span>
              <li @click="onShowComment(data.mid, 0)">
                <Icon iconName="icon-tubiao_pinglun" :fontSize="18"></Icon>评论
              </li>
            </ul>
          </div>
        </footer>
        <div v-if="type == momentType.PUBLIC">


          <div class="appoint" v-if="appoints.length != 0">
            <Icon iconName="icon-aixin" color="blue" :fontSize="20"></Icon>

            <span v-for="(item, index) in appoints" :key="item.uid" @click="onGOto(item.wxid)"> <span
                v-if="index != appoints.length - 1">{{ item.nickName }},</span> <span v-else>{{ item.nickName }}</span>
            </span>
          </div>
          <div class="comment">

            <div v-for="item in comments" :key="item.uid" @click="onShowComment(data.mid, item.uid, item)">
              <Text color="#737cfe" :style="{ display: 'inline-block' }">{{ item.nickName }}:</Text>
              <Text v-if="item.rid" color="#737cfe" :style="{ display: 'inline-block' }">回复{{ item.ruser.nickName
              }}:</Text>

              <Text :style="{ display: 'inline-block' }" color="#262626">{{ item.comment }}</Text>

            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="CardFooter" v-if="type == momentType.DETAIl && (appoints.length != 0||comments.length!=0)">
      <div class="appointBox" v-if="appoints.length != 0">
        <Icon className="line" iconName="icon-aixin" color="blue" :fontSize="20"></Icon>
        <div>
          <Avatar v-for="item in appoints" :key="item.uid" :size="30" @click="onGOto(item.wechat_id)"> </Avatar>
        </div>

      </div>
      <div class="commentBox" v-if="comments.length!=0">
        <Icon className="line" iconName="icon-xiaoxi1" color="blue" :fontSize="20"></Icon>
        <div>
          <div class="commentContent" v-for="item in comments" :key="item.uid"
            @click="onShowComment(data.mid, item.uid, item)">
            <div class="head">
              <Avatar :src="item.avatar" :size="30"></Avatar>
            </div>

            <div class="middle">
              <Text color="#737cfe" @click="onGOto(item.wxid)" :style="{ display: 'inline' }">{{ item.nickName }}</Text>
              <div>
                <Text v-if="item.rid" @click.self="onShowComment(data.mid, item.uid, item)" color="#737cfe"
                  :font-size="12" :style="{ display: 'inline' }">回复{{
                    item.ruser.nickName }}:</Text>

                <Text :style="{ display: 'inline' }" @click.self="onShowComment(data.mid, item.uid, item)" :font-size="12"
                  color="#262626">{{ item.comment }}</Text>
              </div>

            </div>
            <div class="time">
              {{ item.date }}
            
            </div>
            <!-- <Text  v-if="item.rid" color="#737cfe"  :style="{display:'inline-block'}" >回复{{ item.ruser.nickName }}:</Text> 

            <Text :style="{display:'inline-block'}" color="#262626">{{ item.comment }}</Text> -->

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup >
import { defineProps, ref, computed, watch, defineExpose } from "vue"
import { useRouter } from "vue-router"
import { momentFormatTime } from "@/utils/index"
import emitter from "@/utils/Bus"

import { userStore } from "@/store"
import Icon from "./common/Icon.vue"

import {momentType}  from "@/constant"

const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
      // return {
      //   "mid": 16,
      //   "pub_time": "2024-01-01T03:53:24",
      //   "content": "时间真快 转眼就2024了",
      //   "img_list": "uploads/1/pyq_170408101573911704081204.085763.png,uploads/1/pyq_170408101636511704081204.0864809.png,uploads/1/pyq_170408101765511704081204.0881338.png,uploads/1/pyq_170408101806011704081204.090378.png,uploads/1/pyq_170408102595811704081204.091224.png,uploads/1/pyq_170408102645911704081204.092055.png,uploads/1/pyq_170408104860111704081204.092575.png,uploads/1/pyq_170408105292311704081204.095501.png,uploads/1/pyq_170408105950411704081204.097103.png",
      //   "uid": 1,
      //   "user": {
      //     "uid": 1,
      //     "nickName": "leiwen",
      //     "avatar": "uploads/2cafb490664c11ee98e6366fb630587c/avatar.png"
      //   },
      //   "appoints": [
      //     {
      //       "uid": 1,
      //       "nickName": "leiwen",
      //       "gender": "保密",
      //       "phone_number": "13087259146",
      //       "avatar": "/uploads/2cafb490664c11ee98e6366fb630587c/avatar.png",
      //       "wechat_id": "wx_2caf587c",
      //       "region": null
      //     }
      //   ],
      //   "isAppoint": true,
      //   "comments": [
      //     {
      //       "uid": 1,
      //       "avatar": "uploads/2cafb490664c11ee98e6366fb630587c/avatar.png",
      //       "rid": 0,
      //       "wxid": "wx_2caf587c",
      //       "nickName": "leiwen",
      //       "comment": "真的意难平",
      //       "ruser": {}
      //     }
      //   ]
      // }


    }
  },
  index: {

    type: Number,
    default: -1,
  },
  type: {
    type: String,
    // public 或者 detail
    default: "public"
  },
  currentUserId: {
    type: Number,
    default: -1,
  }

})

// const appointFormat = computed(() => {
//   return function () {
//     return function () {

//     }
//   }
// })
// 路由
const router = useRouter()
const store = userStore()
const myUser = { ...store.user }
// 组件内部点赞显示 用于做前端展示
const appoint = ref(props.data.isAppoint)
// 内部点赞列表
const appoints = ref(props.data.appoints)
// 内部评论 
const comments = ref(props.data.comments)
// 控制评论点赞弹出
const isShow = ref(false)
// 线条控制
const bootomLine = ref(props.type)
// 对外暴露 点赞数据 方便 父组件更新
defineExpose({
  comments
})
// 时间做转换 ps:还有问题
const momentformat = computed(() => {
  return function (time) {

    return momentFormatTime(time)
  }
})
// 朋友圈图片做分解
const img_list = computed(() => {
  return function (imgList) {

    return imgList?.split(",")??[]
  }
})
const onGOto = (wxID) => {
  router.push({ path: `/friend/peopleinfo/1/${wxID}` })
}


const onShow = () => {
  isShow.value = !isShow.value
}
// 评论触发父组件执行 弹出对话框
const onShowComment = (mid, rid, user = {}) => {
  console.log(mid, rid, user)
  // 关闭弹出的 点赞与评论
  isShow.value = false
  //  如果是 回复人是自己的话 就不弹出评论框
  if (rid == myUser.uId) return
  emitter.emit("ShowComment", { mid, rid, user, index: props.index })
 
}
// 删除
const onDelMoment = (mid) => {
  emitter.emit("notifyMomentDelete", { mid})

}
// 点赞
const onSetAppoint = () => {
  appoint.value = !appoint.value
  if (appoint.value) {
    appoints.value.push({
      avatar: myUser["userAvatar"],
      gender: myUser["userSex"],
      nickName: myUser["nickName"],
      phone_number: myUser["useriPhone"],
      region: myUser["userRigon"],
      uid: myUser["uId"],
      wechat_id: myUser["userWx"],
    })
  } else {
    appoints.value = appoints.value.filter(item => item.uid != myUser.uId)
  }
 
}
// 监听点赞评论框 当他关闭就向后端发送点赞更新请求
watch(() => isShow.value, (val) => {
  // val = False 代表 每次关闭 同时满足 修改的状态 不等于之前的状态 才发送请求给后端修改点赞数据
  if (!val && appoint.value != props.data.isAppoint) {
    emitter.emit("notifyMomentIndexAppoint", { mid: props.data.mid, data: { appoint: appoint.value } })

  }
})

</script>
<style lang="scss" scoped>
.Card {
  height: 100%;
  background-color: #fff;

  .public {
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
  }

  .CardHead {
    position: relative;
    display: flex;
    padding-left: 10px;
    padding-top: 10px;
    padding-bottom: 5px;
    overflow: hidden;
   
    .right {
      margin-left: 10px;
      margin-right: 20px;
      flex: 1;

      .imgList {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
         max-height:350px ;
        overflow: hidden;
        >div {
          width: 90px;
          height: 90px;
          margin: 2px;

          &:only-child {
            width: 70%;
            height: auto;

          }

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
     
        footer{
          position: relative;
         
          margin: 7px 0;
          height: 40px;
          display: flex;
          line-height: 40px;
          .text{
            position: absolute;
            left: 0;
          }
          .option{
            position: absolute;
            right: 0;
            height: 100%;
            width: 45px;
         
        
            .active {
        
            width: 150px;

          }
           >div {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
        
            align-items: center;
            justify-content: end;
            background-color: #fff;
            z-index: 5;
                  >div {
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 32px;
              height: 20px;
              background-color: #F7FAFD;
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
          }
          ul{
            position: absolute;
  
            z-index: 4;
            width: 150px;
            height: 40px;
            border-radius: 7px;
            list-style: none;
            background-color: #404040;
            color: #000000;
            transition: all .5s;
            right: 45px;
            width: 0;
            overflow: hidden;
            
            >span{
              position: absolute;
            }
            li {
              width: 70px;
              text-align: center;
              color: #ffffff;
              float: left;
            }
          }
        }
      .appoint {
        display: flex;
        align-items: center;
        padding: 2px;
        background-color: #F7FAFD;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;

        >span {

          padding: 0 2px;
        }
      }

      .comment {
        background-color: #F7FAFD;
        padding: 0 4px;
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
   
      }

    }
  }

  .CardFooter {
    margin: 0 15px;
    padding: 2px;
    background-color: #e4e2e275;
    border-radius: 5px;

    .line {
      line-height: 54px;
    }

    .appointBox {
      display: flex;
      height: 54px;

      >div {
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .commentBox {
      display: flex;

      >div {
        flex: 1;
        padding: 5px;

      }

      .commentContent {
        display: flex;
        padding-right: 30px;
        align-items: center;

        .head,
        .time {
          width: 30px;

        }

        .middle {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding-left: 5px;
          :last-child {
            &:active {
              background-color: rgba(214, 212, 212, 0.7);
            }
          }

        }


      }
    }


  }

}</style>
