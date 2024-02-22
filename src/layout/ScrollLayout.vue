<template>
  <div class="scroll" :style="{ height: `calc( 100vh - ${bottom}px)`}" >
    <div class="wrapper">
      <slot></slot>
    </div>
  </div>

</template>
<script setup>
import BScroll from "better-scroll"
import {  onMounted, watch } from "vue"
import {defineProps} from "vue"
const  scroll=ref(null)
const props=defineProps({
  bottom:{
    type:Number,
    default:0
  },
  alpha:{
    type:String,
    default:""
  }
})
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

})
watch(()=>props.alpha,()=>{

  if(props.alpha=="0"){

    return scroll.value.scrollTo(0, 0, 300)
  } 
  const el=document.getElementById(props.alpha)
  if(!el) return
  
  scroll.value.scrollToElement(el,0, 300)

})

</script>

<style lang="scss">
.scroll{
  // height: 100vh calc(100vh - 60px);
  overflow: hidden;
  
  
}
</style>

