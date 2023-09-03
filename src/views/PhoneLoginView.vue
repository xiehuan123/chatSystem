<template>
  <div class="login">
   <Close></Close>
    <h3 class="title">手机号登陆</h3>
    <div class="ipt">
      <div class="top">
        国家/地区 <span class="select">中国大陆（+86）</span>
      </div>
      <Input></Input>
    </div>
    <div class="login_phone">用微信/手机号/邮箱登陆</div>
    <div class="footer">
      <h4 class="tip">上述手机号仅用于登陆验证</h4>
      <button class="agree">同意并继续</button>
      <div class="menu">
        <a href="#">找回密码</a>
        <a href="#">紧急冻结</a>
        <a href="#">安全中心</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import Input from "../components/common/Input.vue"
import Close from "../components/Close.vue"
</script>

<style scoped lang="scss">
.login {
  padding: 14px;
  .close {
    height: 32px;
    width: 32px;
    font-weight: normal;
    font-size: 20px;
    i {
      font-size: 24px;
    }
  }
  .login_phone {
    margin-top: 26px;
    color: #3c759e;
  }
  .title {
    text-align: center;
    margin-bottom: 32px;

    font-weight: normal;
  }
  .ipt {
    .top {
      height: 42px;
      font-size: 14px;
      line-height: 42px;
      .select {
        margin-left: 28px;
        color: #6e6e6e;
      }
    }
  }
  .footer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 250px;
    .tip {
      font-size: 10px;
      margin-bottom: 20px;
      color: #d4d4d4;
    }
    .agree {
      height: 40px;
      width: 144px;
      margin-bottom: 30px;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
      background-color: #e1e1e1;
      border-radius: 8px;
      color: #b5b5b5;
    }
    .menu {
      a {
        height: 20px;
        text-decoration: none;
        color: #3c759e;
        padding: 0 10px;
      }
      a:nth-child(-n + 2) {
        border-right: 0.2px solid #3c759e;
      }
    }
  }
}
</style>