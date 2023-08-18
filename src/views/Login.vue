<template>
  <div class="login">
    <div class="close">X</div>
    <h3 class="title">微信号/QQ号/邮箱登陆</h3>
    <div class="ipt">
      <div class="top">
        账号<input type="text" placeholder="请填写微信号/QQ号/邮箱">
      </div>
      <div class="bottom">
        密码<input type="password" placeholder="请填写密码">
      </div>
    </div>
    <div class="login_phone">用手机号登陆</div>
    <div class="footer">
      <h4 class="tip">上述微信号/QQ号/邮箱仅用于登陆验证</h4>
      <button class="agree">同意并登录</button>
      <div class="menu">
        <a href="#">找回密码</a>
        <a href="#">紧急冻结</a>
        <a href="#">安全中心</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

</script>

<style scoped lang="scss">
.login {
  padding: 10px;
  height: 100vh;
  .close {
    height: 32px;
    width: 32px;
    font-weight: normal;
    font-size: 20px;
  }
  .login_phone {
    margin-top: 26px;
    color: #3C759E;
  }
  .title {
    text-align: center;
    margin-bottom: 32px;
  }
  .ipt {
    .top {
      height: 42px;
      font-size: 18px;
      line-height: 42px;
      border-bottom: 0.5px solid #000;
      input {
        margin-left: 50px;
        border: 0;  // 去除未选中状态边框
        outline: none; // 去除选中状态边框
        background-color: rgba(0, 0, 0, 0);// 透明背景
      }
    }
    .bottom {
      height: 42px;
      font-size: 18px;
      line-height: 42px;
      border-bottom: 0.5px solid #000;
      input {
        margin-left: 50px;
        border: 0;  // 去除未选中状态边框
        outline: none; // 去除选中状态边框
        background-color: rgba(0, 0, 0, 0);// 透明背景
      }
    }
  }
  .footer {
    width: 100%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    margin-top: 300px;
    .tip {
      font-size: 10px;
     margin-bottom: 20px;
    }
    .agree {
      height: 32px;
      width: 125px;
      margin-bottom: 30px;
    }
    .menu {
      a {
        height: 20px;
        text-decoration: none;
        color: #3C759E;
        border-right: 0.2px solid #3C759E;
        padding:0 4px;
      }
    }
  }
}
</style>