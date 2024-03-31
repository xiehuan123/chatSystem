<template>
  <div class="phoneCode">

    <h3 class="title">手机号注册</h3>
    <div class="code">
      <Input placeholder="请输入验证码" v-model="code" text="验证码" type="Number" />
      <CountDown @sendCode="onSendCode"></CountDown>
    </div>
    <footer >

      <button class="agree">完成</button>
    </footer>
  </div>
</template>
<script setup>
const code = ref("")
const onSendCode = () => {
  console.log("发送验证码")
}


</script>
<style lang="scss" scoped>
.phoneCode {
  display: flex;
  flex-direction: column;
  padding: 18px 18px;
  height: 100%;
  box-sizing: border-box;

  .title {
    text-align: center;
    font-weight: normal;
  }

  .code {
    display: flex;
    margin-top: 30px;
  }

  footer {
    display: flex;
    flex: 1;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
    button {
      height: 40px;
      width: 144px;
      margin-bottom: 30px;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
      background-color: #07c060;
      border-radius: 8px;
      color: white;
    }

    button[disabled] {
      background-color: #e1e1e1;
      color: #b4b4b4;
    }
  }
}
</style>
