<template>
  <div class="swtich" @click="onClick()">
    <div class="ellipse">
      <div class="dots" :class="[selected&&'open',!selected&&'close']"></div>
    </div>
  </div>
</template>
<script setup >
import {ref,defineProps,watch,defineEmits} from "vue"
const selected=ref(false)
const props=defineProps({
  isSelected:{
    type:Boolean,
    default:false,
  }
})
const emit=defineEmits(["update:isSelected"])
watch(()=>props.isSelected,(val)=>{
  selected.value=val
})
const onClick=()=>{
  selected.value=!selected.value
  emit("update:isSelected",selected.value)
}
</script>
<style lang="scss" scoped>
.swtich{
  .ellipse{
    position: relative;
    width: 40px;
    height: 20px;
    border-radius: 20px;
    background: $mask-bg;
    .dots{
      position: absolute;
      
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #fff;
      transition: all .5s;

    }
    &:has(.open){
      background: $msg-box-bg;
    }
  }
  .open{
    left: 50%;
  }
  .close{
    left: 0;
  }
}



</style>
