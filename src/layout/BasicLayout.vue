<template>
  <div class="basic">
    <AppHeader></AppHeader>
    <AppMain></AppMain>
    <AppFooter></AppFooter>
  </div>
</template>

<script setup>
import {  onMounted } from "vue"
import AppFooter from "../components/AppFooter.vue"
import AppHeader from "../components/AppHeader.vue"
import AppMain from "../components/AppMain.vue"
// const { appContext : { config: { globalProperties } } } = getCurrentInstance()

// globalProperties.$socket=globalProperties.$openSocket(generateUUID(),2222)

onMounted( async ()=>{


})
</script>

<style scoped lang="scss">
$primary-color: #2196F3;
.basic{
  position: relative;
  height: 100%;
}
</style>