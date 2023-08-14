<template>
  <div class="item" :style="{ height: height + 'px' }">
    <div class="avatar">
      <img :src="infoItem?.avatar" alt="" />
      <Dots :num="infoItem?.infoMsg?.length" :top="0" :right="0"></Dots>
    </div>
    <div class="content">
      <div>{{ infoItem?.infoName }}</div>
      <div>
        <span v-if="infoItem?.infoMsg.length > 1"
          >[{{ infoItem?.infoMsg.length }}]</span
        >{{ lastInfoMsg?.sendName }}:{{ lastInfoMsg?.sendMsg }}
      </div>
    </div>
    <div class="time" v-if="lastInfoMsg">
      <div>{{ lastInfoMsg?.sendTime }}</div>
      <div>勿扰</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";
import Dots from "./Dots.vue";
const props = defineProps({
  infoItem: {
    type: Object,
    required: true,
  },
  height: {
    default: "95",
    type: String,
  },
});
// const props = defineProps({
//   height: {
//     default: "95",
//     type: String,
//   },
//   infoName: {
//     default: "秋天-前后端派单",
//     type: String,
//   },
//   avatar: {
//     default:
//       "data:image/jpeg;base64,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",
//     type: String,
//   },
//   stateCode:{
//     default: "0",
//     type: String,
//   },
//   infoMsg:{
//     default:[{
//       "sendName":"秋天客服002",
//       "sendMsg":"接单扣2",
//       "sendTime":"下午:3:38"
//     }],
//     type:Array

//   },

// });
// console.log(props);
const lastInfoMsg=computed(()=>{
  console.log(props?.infoItem?.infoMsg);
  return props?.infoItem?.infoMsg[props?.infoItem?.infoMsg.length-1]
})
// console.log(lastInfoMsg);
</script>

<style scoped lang="scss">
.item {
  display: flex;
  // background: #f0eaea;
  border: solid 1px #f0eaea;
  padding: 10px 10px;
  box-sizing: border-box;

  .avatar {
    position: relative;
    padding: 10px;
    width: 70px;
    // background: #f07a7a;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
  .content {
    flex: 1;
    padding-left: 5px;
    > div:first-child {
      font-size: 23px;
      font-weight: 500;
      margin-top: 10px;
    }
    > div:last-child {
      font-size: 13px;
      color: #ccc;
      margin-top: 5px;
    }
  }
  .time {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    text-align: right;
    width: 60px;
    font-size: 12px;
    // background: #282222;
  }
}
</style>