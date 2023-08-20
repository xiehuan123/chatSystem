<script setup>
import BasicLayout from './layout/BasicLayout.vue';
import Login from './views/Login.vue';
import Index from './views/Index.vue';
import PhoneLoginView from './views/PhoneLoginView.vue';
import Friend from './components/Friend.vue'
</script>

<template>
  <div id="app">
  <!-- <Friend></Friend> -->
   <router-view></router-view>
  <!-- <Index></Index> -->
  <!-- <Login></Login> -->
  <!-- <PhoneLoginView></PhoneLoginView> -->
  </div>
 
</template>
<style scoped>
</style>
