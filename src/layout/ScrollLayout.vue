<template>
  <div class="scroll">
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>

</template>
<script setup>
import BScroll from "better-scroll"
import {  onMounted } from "vue"
const  scroll=ref(null)
onMounted(()=>{
  scroll.value = new BScroll(".scroll", {
    mouseWheel: true,
    probeType: 3,
    click: true,
    
  })
  // 滚动有问题 暂时解决了
  setTimeout(() => {
    scroll.value.refresh()
  }, 100)
  // nextTick(() => {
  //   scroll.value.refresh()
  // })
})

</script>

<style lang="scss">
.scroll{
  height: calc( 100vh - 40px);
}
</style>

