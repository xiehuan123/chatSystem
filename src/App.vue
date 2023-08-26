<script setup>
import Login from './views/LoginView.vue'
import RegisterView from './views/RegisterView.vue';
</script>

<template>
  <div id="app">
 
   <router-view></router-view>
  <!-- <Login></Login> -->
  <!-- <PhoneLoginView></PhoneLoginView> -->
  <!-- <RegisterView></RegisterView> -->
  </div>
 
</template>
<style scoped>
#app{
  height: 100vh;
}
</style>
