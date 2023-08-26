<template>
  <div :class="['item',sesstioItem?.marginTop?'marginTop':'',border?'border':'']" :style="{ height: height + 'px' }">
    <slot name="left">

  </slot>
    <div :class="['content',sesstioItem?.marginBorde?'marginBorde':'']">
      <div>{{ sesstioItem?.sesstionName }}</div>
      <div v-if="sesstioItem.sesstionMsg">
        <span v-if="sesstioItem?.us==2&&sesstioItem?.sesstionMsg.length > 1"
          >[{{ sesstioItem?.sesstionMsg.length }}]</span>
          <span v-if="sesstioItem?.us==2">{{ lastInfoMsg?.sendName }}:</span>{{ lastInfoMsg?.sendMsg }}
      </div>
    </div>

      <div :class="['time',sesstioItem?.marginBorde?'marginBorde':'']">
        <slot name="right">
        <div>{{ lastInfoMsg?.sendTime }}</div>
        <div>勿扰</div>
      </slot>

      </div>

  </div>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";
const props = defineProps({
  sesstioItem: {
    type: Object,
    required: true,
  },
  height: {
   
    type: String,
    default: "95",
  },
  border:{
    type: Boolean,
    default: false,
  }
});;
const lastInfoMsg = computed(() => {
  console.log(props?.sesstioItem?.sesstionMsg);
  return props?.sesstioItem?.sesstionMsg[props?.sesstioItem?.sesstionMsg.length - 1];
});
// console.log(lastInfoMsg);
</script>

<style scoped lang="scss">
.item {
  display: flex;
  // background: #f0eaea;

  box-sizing: border-box;
  background: #fff;


 
  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;


    > div:nth-child(1) {
      font-size: 18px;
      font-weight: 500;
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
  .iconSize{

    font-size: 20px;
  }
 
}
.marginTop{
    margin-top: 7px;
  }
.marginBorde{
  border-top: #ccc 1px solid;
}
.border{
  border: solid 1px $bd-color;
}
</style>