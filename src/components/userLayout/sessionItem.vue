<template>
  <div v-show="Object.keys(sesstioItem).length != 0" :class="[
    'item',
    sesstioItem?.marginTop && 'marginTop',
    border && 'border',
  ]" :style="{ height: px2rem(height) }">

    <div class="left" v-if="sesstioItem.us==1">
      <Avatar :src="sesstioItem.sesstioAvatar" :size="40" :num="sesstioItem.num"></Avatar>
    </div>

    <div v-if="sesstioItem.us==2">
       <div class="avatarBox" >
            <img v-for="image in sesstioItem.sesstioAvatar" :key="image"  :src="image" />
            
            <div v-for="empty in 9-sesstioItem.sesstioAvatar.length" :key="empty">
            </div> 
    </div>
    </div>  
   

    <div class="content">
      <div>{{ sesstioItem.sesstionName }}</div>
      <div v-if="sesstioItem.us == 2">
        <span v-if="sesstioItem.num>1">[{{ sesstioItem.num }}]</span>
        <span>{{ lastInfoMsg.sendName }}:</span>{{ lastInfoMsg.sendMsg }}
      </div>
      <div v-if="sesstioItem.us == 1">
       
        <!-- 文本 -->
        <span v-if="lastInfoMsg.code == 1">{{ lastInfoMsg.sendMsg }}</span>
        <!-- 语音 -->
        <span v-if="lastInfoMsg.code == 2">语音</span>
        <!-- 文件 -->
        <span v-if="lastInfoMsg.code == 3">文件</span>
      </div>
    </div>

    <div class="time">
      <div>{{ getFormatTime(lastInfoMsg.sendTime) }}
      </div>
    </div>
  </div>
</template>

<script setup>

import { getFormatTime,px2rem} from "@/utils"
defineProps({
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
  },
  lastInfoMsg: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped lang="scss">
.item {
  display: flex;
  // background: #f0eaea;
  padding: 4px 0;
  background: #fff;

  .left {
    position: relative;
    margin: 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  
    
  }
  .avatarBox{
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      align-items: start;
      gap: 1px;
      // margin-right: 10px;
      padding: 2px;
      margin: 10px 10px;
      background-color: $bd-color;
      border-radius: 3px;
      width: 36px;
      height: 36px;
  
      >img{
        width: 10px;
        height: 10px;
      }
      
    }



  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;

    >div:nth-child(1) {
      font-size: 17px;

    }

    >div:nth-child(2) {
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


</style>