<template>
  <div
    :class="[
      'item',
      item?.marginTop && 'marginTop',
  item?.marginBorde && 'marginBorde'
    ]"
    :style="{ height: item?.height + 'px',background:item?.bg }"
  >
  <slot name="left">
    <div class="Textleft">
      <div>
    {{ item.name}}
      </div>
      
           <div   v-if="item&&item.content"  :style="{color:item.contentColor}">
            {{ item.content }}
        </div>
        </div>

  </slot>
  

    <div class="time">
      <img  v-if="item && item.avatar" :src="item.avatar" alt="" width="50" height="50">
      <span v-if="item && item.nickName">{{ item.nickName }} </span>
      <span v-if="item && item.userWx">{{ item.userWx }} </span>
      <Icon  v-if="item && item.icon"  :icon-name="item.icon"></Icon>
      <span v-if="item && item.text">{{ item.text }} </span>
    
      <Icon icon-name="icon-arrow-right"></Icon>
    </div>
  </div>
</template>

<script setup>
import {  defineProps } from "vue"
//import Icon from "@/components/common/Icon.vue"
defineProps({
  item: {
    type: Object,
    required: true,
  },    
  height: {
    type: Number,
    default: 50,
  },
  border: {
    type: Boolean,
    default: false,
  }
})

</script>

<style scoped lang="scss">
.item {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  background: #fff;
  .Textleft {
    display: flex;
    font-size: 14px;
    align-items: center;
    padding: 5px 10px;
    >div:nth-child(1){
     min-width: 60px;
    }
    >div:nth-child(2){
      color:#ccc;
      margin-left: 10px;

    }
  }
  
  .time {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: right;
    margin-right: 7px;
    font-size: 12px;
    // background: #282222;
    img{
      border-radius: 5px;
    }
  }

}
.marginTop {
  margin-top: 7px;
}
.marginBorde {
  // border-top: #ccc 1px solid;
  position: relative;
  &::before{
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
}

</style>