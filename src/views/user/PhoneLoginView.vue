<template>
  <div class="login">
    <Close></Close>
    <h3 class="title">手机号登陆</h3>
    <div class="ipt">
      <div class="top">
        国家/地区 <span class="select">中国大陆（+86）</span>
      </div>
      <InputCode @change="onChangeLoginData"></InputCode>

    </div>
    <RouterLink class="login_phone" to="/login">用微信/手机号/邮箱登陆</RouterLink>

    <div class="footer">
      <h4 class="tip">上述手机号仅用于登陆验证</h4>
      <button class="agree" :disabled="!loginData.isSussces" @click="agreeLogin">同意登录</button>
      <div class="menu">
        <RouterLink to="/retrieve">找回密码</RouterLink>
        <a href="#">紧急冻结</a>
        <a href="#">安全中心</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { login, } from "@/api/index"

import { useRouter, useRoute } from "vue-router"
import { userStore, callStore } from "@/store/index"
const { appContext: { config: { globalProperties } } } = getCurrentInstance()
const router = useRouter()
const route = useRoute()
const store = userStore()
const CallStore = callStore()
const loginData=ref(
  {
    userName: "",
    code: "",
    isSussces: false,
    type: "phone"
  }
)
// 组件的传递的 登录数据
const onChangeLoginData=(data)=>{
  console.log("loginData", data)

  loginData.value={
    ...data,
    userName:data.userPhone,
    type:"phone"
  }
  console.log("loginData",loginData)
}
const agreeLogin = async () => {
  globalProperties.$loading("正在登录中...")
  const { res, err } = await login(
    loginData.value)
  if (err) {
    throw err
  }
  if (res["code"] === 100001) {
    globalProperties.$confirm({
      message: "您的账号已经在异地登录,请稍后重试",
      failedText: "取消",
      succedText: "确认",
    },)
    // 异地登录
    return
  }
  if (res["code"] != 200) {


    globalProperties.$message(res["message"])
    return
  }
  store.setUser({
    userAvatar: res["data"]["avatar"],
    userSex: res["data"]["gender"],
    useriPhone: res["data"]["phone_number"],
    userWx: res["data"]["wechat_id"],
    userRigon: res["data"]["region"],
    uid: res["data"]["uid"], nickName: res["data"]["nickName"],
    QRcode: res["data"]["QRcode"]
  })
  store.setToken(res["data"]["token"])
  store.openSocket(res["data"]["token"])
  CallStore.openPeer(store.user.uid)
  globalProperties.$message("登陆成功")
  const path = route.query.redirect || "/"
 

  router.push({
    path: path
  })

}
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
    display: inline-block;
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
    .code {
      display: flex;
    
    }
  }
    .footer {
      width: calc(100% - 28px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      bottom: 20px;
  
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
        background-color: #07c060;
        border-radius: 8px;
        color: white;
      }
  
      // .agree::disabled {
      //   background-color: #e1e1e1;
      //   color: #b4b4b4;
      // }
      .agree[disabled] {
        background-color: #e1e1e1;
        color: #b4b4b4;
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