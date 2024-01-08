<template>
  <div class="basic">
      
    <AppHeader @onShowMeun="onShowMeun"></AppHeader>
    <AppMain></AppMain>
    <AppFooter></AppFooter>
    
    <!-- 通过这种形式就不用写 事件了 子组件触发就直接改了这个值 -->
      <meunList  v-model:visible="isiMeun" ></meunList>
  </div>
  
</template>

<script setup>
import {  onMounted ,ref} from "vue"
import AppFooter from "@/components/AppFooter.vue"
import AppHeader from "@/components/AppHeader.vue"
import AppMain from "@/components/AppMain.vue"
// const { appContext : { config: { globalProperties } } } = getCurrentInstance()

// globalProperties.$socket=globalProperties.$openSocket(generateUUID(),2222)
const isiMeun=ref(false)
onMounted( async ()=>{


})
const onShowMeun=()=>{
  isiMeun.value=!isiMeun.value
}
</script>

<style scoped lang="scss">

.basic{
  position: relative;
  height: 100%;
  width: 100%;
  background: $bg-color;
}
</style>