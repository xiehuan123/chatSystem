<template>
  <div class="login">
    <Close></Close>
    <h3 class="title">微信号/QQ号/邮箱登陆</h3>
 
      <Input text="账号" type="text"  v-model="userName" placeholder="请填写微信号/QQ号/邮箱" ></Input>
      <Input text="密码" type="password"  v-model="userPassword" placeholder="请输入密码" ></Input>

    <div class="login_phone" @click="phoneLogin">用手机号登陆</div>
    <div class="footer">
      <h4 class="tip">上述微信号/QQ号/邮箱仅用于登陆验证</h4>
      <button class="agree" :disabled="!showSubmitBtn" @click="agreeLogin">
        同意并登录
      </button>
      <div class="menu">
        <a href="#">找回密码</a>
        <a href="#">紧急冻结</a>
        <a href="#">安全中心</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed ,getCurrentInstance} from "vue"

import {  login } from "@/api/index"
import { useRouter,useRoute } from "vue-router"
import { useStore } from "@/store/index"
const { appContext : { config: { globalProperties } } } = getCurrentInstance()
const router = useRouter()
const route=useRoute()
const store = useStore()

const userName = ref("13087259146")
const userPassword = ref("123456")
const showSubmitBtn=computed(()=>{
  return userName.value.length&&userPassword.value.length
})

const phoneLogin = () => {
  router.push({
    path: "/phonelogin",
  })
}
const agreeLogin = async () => {
  globalProperties.$loading("正在登录中...")
  const {res,err}=await login({
    userName:userName.value,
    userPassword:userPassword.value,
  })
  if(err){
    throw err 
  }
    
  console.log(res)
  if(res["code"]!=200){
    globalProperties.$message(res["message"])
    return 
  }
  store.setUser({userAvatar:res["data"]["avatar"],
    userSex:res["data"]["gender"],
    useriPhone:res["data"]["phone_number"],
    userWx:res["data"]["wechat_id"],
    userRigon:res["data"]["region"],
    uId:res["data"]["uid"],nickName:res["data"]["nickName"],
    QRcode:res["data"]["QRcode"]
  })
  store.setToken(res["token"])
  store.openSocket(res["token"])
  // const t=await test(store.user.uId)
  // console.log(t)
  const path=route.query.redirect||"/"
  globalProperties.$message("登陆成功")
  console.log(path)
  router.push({
    path:path
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
    margin-top: 26px;
    color: #3c759e;
  }
  .title {
    font-weight: normal;
    text-align: center;
    margin-bottom: 32px;
  }
  .ipt {
    .top {
      height: 42px;
      font-size: 14px;
      line-height: 42px;
      border-bottom: 0.5px solid #dedede;
      input {
        margin-left: 50px;
        border: 0; // 去除未选中状态边框
        outline: none; // 去除选中状态边框
        background-color: rgba(0, 0, 0, 0); // 透明背景
      }
    }
    .bottom {
      height: 42px;
      font-size: 14px;
      line-height: 42px;
      border-bottom: 0.5px solid #dedede;
      input {
        margin-left: 50px;
        border: 0; // 去除未选中状态边框
        outline: none; // 去除选中状态边框
        background-color: rgba(0, 0, 0, 0); // 透明背景
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