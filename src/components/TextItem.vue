<template>
  <div
    :class="[
      'item',
      item?.marginTop && 'marginTop',
  item?.marginBorde && 'marginBorde'
     
    ]"
    :style="{ height: item.height + 'px' }"
  >
  <slot name="left">
    <div class="Textleft">
          {{ item.name}}
           <div   v-if="item&&item.content" >
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
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    >div{
      color:rgb(28, 108, 246);
      margin-left: 10px ;
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
  border-top: #ccc 1px solid;
}

</style>