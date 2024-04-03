<template>
  <div class="register">

    <Close></Close>
    <h3 class="title">手机号注册</h3>
    <div class="form-group">
      <div class="box">
        <div class="upload" @click="onUploadImg">
          <div id="image-preview1" class="image-preview">
            <img :src="uploadImgUrl" alt="" v-show="uploadImgUrl">
          </div>

          <input id="file-upload1" type="file" ref="uploadImgDom" hidden  @change="onUploadChange" />
        </div>
      </div>
    </div>
    <div class="main">
      <Input placeholder="例如：陈晨" v-model="userName" text="昵称" />
      <Input placeholder="请填写手机号(11位)" v-model="userPhone" text="手机" type="Number" @change="onPhoneCheck" />
      <div class="code">
        <Input placeholder="请输入验证码" v-model="code" text="验证码" type="Number" />
        <CountDown ref="counDownRef" :isIphoneCheck="isIphoneCheck" @sendCode="onSendCode"></CountDown>
      </div>
      <Input placeholder="请填写密码" v-model="userPasswod" text="密码" type="password" />
    </div>

    <div class="footer">
      <div>
        <div class="top">
          <input type="radio" name="" id="" :checked="isChecked" @click="checked" /><span>我已阅读并同意</span><a
            href="">《软件许可及服务协议》</a>
        </div>
        <div class="center">本页面收集的信息仅用于注册账号</div>

      </div>
      <button class="agree" @click="onRegisterSubmit" :disabled="disabledCheck">
        同意并继续
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref ,getCurrentInstance, computed} from "vue"
import {useRouter} from "vue-router"


import { register, sendRegisterCode } from "@/api/index"

import {compressionFile} from "@/utils/index"

const { appContext : { config: { globalProperties } } } = getCurrentInstance()
const router =useRouter()
// 用户名
const userName = ref("")
// 用户手机号
const userPhone = ref("")
// 用户密码
const userPasswod = ref("")
// 是否同意协议
const isChecked = ref(false)
// 上传图片dom
const uploadImgDom = ref(null)
// 上传图片地址
const uploadImgUrl=ref("")
// 上传图片文件
const uploadImgFile=ref(null)
// 验证码
const code = ref("")
// 验证码控制
const isIphoneCheck=ref(false)
//倒计时验证组件
const counDownRef=ref(null)
// 手机号验证
const onPhoneCheck = () => {
  const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/    //11位手机号码正则
  if (!reg_tel.test(userPhone.value)) {
    globalProperties.$message("不正确")
    isIphoneCheck.value = false
    return 
  }
  console.log("手机号正确")
  isIphoneCheck.value = true
}
// 发送验证码
const onSendCode = async () => {
  console.log("发送验证码")
  const { err, res } = await sendRegisterCode(userPhone.value)
  if(err){
    globalProperties.$message("发送失败")
    return 
  }

  if(res["code"]==200){
    globalProperties.$message("发送成功")
    return 
  }
  if(res["code"]!=200){
    globalProperties.$message(res["message"])
    counDownRef.value.countdown=0
    return 
  }

}
const checked = () => {
  isChecked.value = !isChecked.value
}
const onUploadImg = () => {
  console.log("上传图片", uploadImgDom.value)
  uploadImgDom.value.click()
}
const onUploadChange = async() => {
  const file = uploadImgDom.value.files[0]
  uploadImgFile.value= await compressionFile(file)  
  uploadImgUrl.value = URL.createObjectURL(file)
}
const disabledCheck=computed(()=>{
  
  return  !(userName.value.trim() &&userPasswod.value.trim() 
  &&userPhone.value.trim()&&isChecked.value &&code.value.trim())
})
const onRegisterSubmit = async () => {
 
  globalProperties.$loading("正在注册中...")
  const registerData = new FormData()

  registerData.append("nickName", userName.value)
  registerData.append("password", userPasswod.value)
  registerData.append("phone_number", userPhone.value)
  registerData.append("avatar", uploadImgFile.value)
  registerData.append("code", code.value)
  const {err,res}= await register(registerData)
  if(err){
    globalProperties.$message("注册失败")
    return  
  }
  if(res["code"]!=200){
    globalProperties.$loading("正在注册中...")
    globalProperties.$message(res["message"])
    return 
  }

  
  globalProperties.$message("注册成功")
  router.push({
    path:"/login"
  }) 
  
  

}
</script>

<style scoped lang="scss">
.register {
  padding: 18px 18px;
  display: flex;
  height: 100%;
  flex-direction: column; 
  box-sizing: border-box;

  .title {
    text-align: center;
    font-weight: normal;
  }
  .code {
          display: flex;

        }
  .userName {
    width: 100%;
    height: 48px;
    font-size: 16px;
    line-height: 48px;
    .ipt {
      margin-left: 50px;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
      background-color: rgba(0, 0, 0, 0); // 透明背景
    }
    border-bottom: 1.4px solid #dedede;
  }
  .footer {
  
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    .top {
      height: 24px;
      line-height: 24px;
      input {
        transform: translateY(2px);
        margin-right: -4px;
      }
      span {
        display: inline-block;
        margin-right: -24px;
        font-size: 12px;
        transform: scale(0.8); /*关键*/
      }
      a {
        display: inline-block;
        margin-right: -18px;
        text-decoration: none;
        color: #416ca4;
        font-size: 12px;
        transform: scale(0.8); /*关键*/
      }
    }
    .center {
      font-size: 12px;
    transform: scale(0.8); /*关键*/
    }
    .agree {
      height: 40px;
      width: 144px;
      margin-top: 10px;
      border: 0; // 去除未选中状态边框
      outline: none; // 去除选中状态边框
      background-color: #07c060;
      border-radius: 8px;
      color: white;
    }
    .agree[disabled] {
      background-color: #e1e1e1;
      color: #b4b4b4;
    }
  }
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    .upload {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 80px;
      width: 80px;
      border: 2px dashed #ccc;
      border-radius: 10px;
      overflow: hidden;
      cursor: pointer;
      :hover {
        border-color: #999;
      }
      :hover .upload-label {
        color: #999;
      }
      .image-preview {
        width: 100%;
        height: 100%;
        
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>  