<template>
  <div
    :class="[
      'item',
      sesstioItem?.marginTop && 'marginTop',
  sesstioItem?.marginBorde && 'marginBorde'
     
    ]"
    :style="{ height: height + 'px' }"
  >
  <slot name="left">
    <div class="avatar">
          {{ sesstioItem.name}}
        </div>

  </slot>
   

    <div class="time">
      <img  v-if="sesstioItem && sesstioItem.avatar" :src="sesstioItem.avatar" alt="" width="50" height="50">
      <span v-if="sesstioItem && sesstioItem.nickName">{{ sesstioItem.nickName }} </span>
      <span v-if="sesstioItem && sesstioItem.userWx">{{ sesstioItem.userWx }} </span>
      <Icon  v-if="sesstioItem && sesstioItem.icon"  :icon-name="sesstioItem.icon"></Icon>
      <span v-if="sesstioItem && sesstioItem.text">{{ sesstioItem.text }} </span>
    
      <Icon icon-name="icon-arrow-right"></Icon>
    </div>
  </div>
</template>

<script setup>
import {  defineProps } from "vue"
import Icon from "@/components/common/Icon.vue"
defineProps({
  sesstioItem: {
    type: Object,
    required: true,
  },    
  height: {
    type: String,
    default: "50",
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
  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
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