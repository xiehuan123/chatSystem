<template>
  <div class="soundwave">
    <div :class="['msg-txt',audioBg]">
      <div class="text" v-show="audioBg=='right'">
          123132132123132132123132132123132132
        </div>
      <div class="audioplay">
      
        <div
          v-for="index in num"
          :key="index"
          class="item"
          :style="{
            animation: `radius-animation 1s ${
              (index + 1) * 0.3
            }s infinite alternate`,
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue"
defineProps({
  num: {
    type: Number,
    default: 10,
  },
  audioBg:{
    type:String,
    default:""
  }
})
</script>

<style   lang='scss'>
.soundwave {
  .left{
    background:#ee5655!important ;
    &::before{
      border-left: 26px solid #ee5655!important;

    }
  }
  .right{
    width: 79vw !important;
    height: 6vw;
    .audioplay{
     
      position: absolute;
      right: 5px;
      bottom: 5px;
    }
  }
  .msg-txt {
    position: relative;
    width: -moz-fit-content;
    width: fit-content;
    background: $msg-box-bg;
    border-color: $msg-box-bg;
    font-size: 14px;
    line-height: 1.5;
    color: #000;
    padding: 2em 2em;
    margin: 5px 0 0;
    border-radius: 10px;
    > p {
    unicode-bidi: plaintext;
  }
  &::before {
    content: "";
    position: absolute;
    border-top: 13px solid transparent;
    border-left: 26px solid $msg-box-bg;
    border-bottom: 13px solid transparent;

    left: 50%;
    transform: translateX(-50%) rotate(-34deg);
    bottom: -4px;
  }
    .audioplay {
  
    display: flex;
    .item {
      margin: 0 1px;
      width: 2px;
      height: 20px;
      border-radius: 2px;
      background-color: $small-text-color;
    }
    @keyframes radius-animation {
      100% {
        transform: scaleY(0.2);

      
      }
    }
  }
  }

 



 
  
}
</style>