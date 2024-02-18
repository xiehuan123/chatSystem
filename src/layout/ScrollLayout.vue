<template>
  <div class="scroll">
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>

</template>
<script setup>
import BScroll from "better-scroll"
import { onMounted } from "vue"
const  scroll=ref(null)
onMounted(()=>{
  console.log(858)
  scroll.value = new BScroll(".scroll", {
    mouseWheel: true,
    probeType: 3,
    click: true,
    
  })
  // 滚动有问题 暂时解决了
  setTimeout(() => {
    scroll.value.refresh()
  }, 10)
})

</script>

<style lang="scss">
.scroll{
  height: calc( 100vh - 40px);
}
</style>

