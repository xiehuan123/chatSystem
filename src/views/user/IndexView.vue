<template>
  <div class="index">
    <div class="bottom">
      <button class="login" @click="login">登陆</button>
      <button class="register" @click="register">注册</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
const router = useRouter()

const login = () => {
  router.push({
    path: "/login",
  })
}

const register = () => {
  router.push({
    path: "/register",
  })
}
</script>

<style scoped lang="scss">
.index {
  height: 100%;
  position: relative;
  background-image: url(@/assets/image/index.jpg);
  margin: 0px;
  background-size: contain;
  background-attachment: fixed;
  .bottom {
    width: 100%;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    .login {
      height: 40px;
      width: 100px;
      margin-left: 20px;
      background-color: #07c060;
      border: none;
      color: white;
      border-radius: 8px;
    }
    .register {
      height: 40px;
      width: 100px;
      margin-right: 20px;
      border: none;
      color: white;
      background-color: #191919;
      border-radius: 8%;
    }
  }
}
</style>  