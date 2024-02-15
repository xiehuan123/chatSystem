<template>
  <div class="comment" v-if="commentShow" @click.self="onClose">
    <div>
 <div class="textInput">
      <div class="inputBox">
        <input type="text" placeholder="评论"  v-model="commnetContent" @keydown.enter="sendInfo()"
          ref="commentRef" />
      </div>
    </div>

    <Icon iconName="icon-xiaolian" :fontSize="35" />
    <div :class="['sendInfo',active&& 'active']" @click="sendInfo()">发送</div>
    </div>
   

  </div>
</template>
<script setup >
import { computed, ref,nextTick } from "vue"
import emitter from "@/utils/Bus"
// 评论内容
const commnetContent = ref("")
// 评论组件显示
const commentShow = ref(false)
// 评论的文章id
const commentMid = ref(0)
// 是否回复文章底下的人 不是 是0 就是代表评论楼主的
const commentRid = ref(0)
const commetnRuser = ref({})
const commentRef = ref(null)
// Card组件的索引
const CardIndex=ref(-1)

// 接收card 组件发过来的文章id 以及评论信息
emitter.on("ShowComment", ({ mid,rid, user,index }) => {
  commentMid.value = mid
  commetnRuser.value = user
  commentRid.value = rid
  commentShow.value = true
  CardIndex.value=index
  // 评论框获取焦点 务必是在dom渲染完成执行

  nextTick(() => {
    
  
    commentRef.value?.focus()
  })
})
// 关闭当前的评论框
const onClose=()=>{
  commentShow.value=false
  commnetContent.value=""
}
// 发送显示框的颜色控制
const active=computed(()=>{
  return commnetContent.value.length>0
})
// 评论朋友圈  通知朋友圈主页发送请求
const  sendInfo=()=>{
  emitter.emit("notifyMomentIndexComment",{mid:commentMid.value,  rid:commentRid.value,comment:commnetContent.value, ruser:commetnRuser.value,index:CardIndex.value})
  // 也通知card组件做前端展示 使用户体验更好
  // emitter.emit("notifyCardComment",{mid:commentMid.value,  rid:commentRid.value,comment:commnetContent.value, ruser:commetnRuser.value})

  commentShow.value = false
  commnetContent.value=""
}
</script>
<style lang="scss" scoped>
.comment{
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;

  z-index: 9999;
}
.comment>div {
  position: absolute;
  bottom: 0;
  width: 100%;
  // padding: 0 2px;
  display: flex;
  height: 50px;
  text-align: center;
  border-bottom: solid 1px #ccc;
  align-items: center;
  background-color: #F7FAFD;

  .textInput {
    flex: 6;
    text-align: center;
    padding: 3px 3px;
    box-sizing: border-box;
    height: 100%;

    .inputBox {
      height: 100%;
      border-radius: 7px;




      input {
        outline: none;
        border: none;
        width: 97%;
        height: 100%;
        background: #fff;
        font-size: 21px;
        // width: 98%;
        // height: 98%;
        border-radius: 10px;
      }

      div {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        line-height: inherit;

      }
    }
  }

  .sendInfo {
    margin-left: 10px;
    margin-right: .3125rem;
    padding: 5px 10px;
    border: solid #ccc .0625rem;
    border-radius: 5px;
  }
  .active{
    background-color: $msg-box-bg;
    color: $bg-color;
  }


}
</style>
