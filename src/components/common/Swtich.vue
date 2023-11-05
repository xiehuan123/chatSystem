<template>
  <div class="swtich" @click="onClick()">
    <div class="ellipse">
      <div class="dots" :class="[selected&&'open',!selected&&'close']"></div>
    </div>
  </div>
</template>
<script setup >
import {ref} from "vue"
const selected=ref(false)
const onClick=()=>{
  selected.value=!selected.value
}
</script>
<style lang="scss" scoped>
.swtich{
  .ellipse{
    position: relative;
    width: 50px;
    height: 25px;
    border-radius: 20px;
    background: $mask-bg;
    .dots{
      position: absolute;
      
      width: 25px;
      height: 25px;
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
