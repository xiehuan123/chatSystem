<template>
  <div
  v-show="Object.keys(sesstioItem).length!=0"
    :class="[
      'item',
      sesstioItem?.marginTop && 'marginTop',
      border && 'border',
    ]"
    :style="{ height: height + 'px' }"
  
  >
  <slot name="left">
    <div class="avatar">
          <Icon :iconName="sesstioItem?.avatar" :fontSize="24"> </Icon>
        </div>

  </slot>
   
    

    <div :class="['content', sesstioItem?.marginBorde ? 'marginBorde' : '']">
      <div>{{ sesstioItem?.sesstionName }}</div>
      <div v-if="sesstioItem.sesstionMsg&&sesstioItem?.us == 2">
        <span v-if=" sesstioItem?.sesstionMsg.length > 1"
          >[{{ sesstioItem?.sesstionMsg.length }}]</span
        >
        <span>{{ lastInfoMsg?.sendName }}:</span
        >{{ lastInfoMsg?.sendMsg }}

      </div>
      <div v-if="sesstioItem.sesstionMsg&& sesstioItem?.us == 1">
        <!-- 文本 -->
       <span v-if="lastInfoMsg.code==1">{{ lastInfoMsg.sendMsg }}</span>
       <!-- 语音 -->
       <span v-if="lastInfoMsg.code==2">语音</span>
       <!-- 文件 -->
       <span v-if="lastInfoMsg.code==3">文件</span>
      </div>
    </div>

    <div :class="['time', sesstioItem?.marginBorde ? 'marginBorde' : '']">
      <slot name="right">
       
      </slot>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue"
//import Icon from "@/components/common/Icon.vue"
const props = defineProps({
  sesstioItem: {
    type: Object,
    required: true,
  },
  height: {
    type: Number,
    default: 45,
  },
  border: {
    type: Boolean,
    default: false,
  }
})
const lastInfoMsg = computed(() => {
  // 判断有没有传递中间的消息
  if(!(props?.sesstioItem?.sesstionMsg?.length)){
    return null
  }
  return props?.sesstioItem?.sesstionMsg[props?.sesstioItem?.sesstionMsg.length - 1]
})
// console.log(lastInfoMsg);
</script>

<style scoped lang="scss">
.item {
  display: flex;
  // background: #f0eaea;
  padding: 4px 0;
  background: #fff;
  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;

    > div:nth-child(1) {
      font-size: 17px;
      
    }
    > div:nth-child(2) {
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
    margin-right: 7px;
    font-size: 12px;
    // background: #282222;
  }
  .iconSize {
    font-size: 20px;
  }
}
.marginTop {
  margin-top: 7px;
}
.marginBorde{
  position: relative;
}
.border {
  position: relative;
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
}
.marginBorde::before {

   position: absolute;
    right: 0;
    top: 0;
    left: 0;
    height: 1px;
    content: '';
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    background-color: #c8c7cc;
}



</style>