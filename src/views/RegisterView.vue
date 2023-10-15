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

          <input
            id="file-upload1"
            type="file"
            ref="uploadImgDom"
            hidden
            @change="onUploadChange"
          />
        </div>
      </div>
    </div>
    <Input placeholder="例如：陈晨" v-model="userName" text="昵称" />
    <Input placeholder="请填写手机号" v-model="userPhone" text="手机"  type="Number"/>
    <Input
      placeholder="请填写密码"
      v-model="userPasswod"
      text="密码"
      type="password"
    />
    <div class="footer">
      <div class="top">
        <input
          type="radio"
          name=""
          id=""
          :checked="isChecked"
          @click="checked"
        /><span>我已阅读并同意</span><a href="">《软件许可及服务协议》</a>
      </div>
      <div class="center">本页面收集的信息仅用于注册账号</div>
      <button class="agree"  @click="registerCheck">
        同意并继续
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref ,getCurrentInstance} from "vue"
import {useRouter} from "vue-router"
import Input from "@/components/common/Input.vue"
import Close from "@/components/Close.vue"

import { register } from "@/api/index"

import {compressionFile} from "@/utils/index"
const { appContext : { config: { globalProperties } } } = getCurrentInstance()
const router =useRouter()
const userName = ref("")
const userPhone = ref("")
const userPasswod = ref("")
const isChecked = ref(false)
const uploadImgDom = ref(null)
const uploadImgUrl=ref("")
const uploadImgFile=ref(null)

const checked = () => {
  isChecked.value = !isChecked.value
}
const onUploadImg = () => {
  uploadImgDom.value.click()
}
const onUploadChange = async() => {
  const file = uploadImgDom.value.files[0]
  uploadImgFile.value= await compressionFile(file)  
  console.log(uploadImgFile.value)
  console.log(file)
  uploadImgUrl.value = URL.createObjectURL(file)

 
}
const registerCheck = async () => {
 
  if (
    !userName.value.trim() &&
    !userPasswod.value.trim() &&
    !userPhone.value.trim()
  ) {
    alert("Please enter")
    return
  }
  globalProperties.$loading("正在注册中...")
  const registerData = new FormData()
  console.log(uploadImgFile.value,"有值")
  registerData.append("nickname", userName.value)
  registerData.append("password", userPasswod.value)
  registerData.append("phone_number", userPhone.value)
  registerData.append("avatar", uploadImgFile.value)
  const {err,res}= await register(registerData)
  if(err){
    globalProperties.$message("注册失败")
    return  
  }
  console.log(res)
  if(res["code"]!=200){
    globalProperties.$message(res["message"])
    return 
  }
  console.log(res)
  
  globalProperties.$message("注册成功")
  router.back(0)
  
  

}
</script>

<style scoped lang="scss">
.register {
  padding: 5px 18px;

  .title {
    text-align: center;
    font-weight: normal;
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
    width: 100%;
    margin-top: 236px;
    text-align: center;

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
        -webkit-transform: scale(0.8); /*关键*/
      }
      a {
        display: inline-block;
        margin-right: -18px;
        text-decoration: none;
        color: #416ca4;
        font-size: 12px;
        -webkit-transform: scale(0.8); /*关键*/
      }
    }
    .center {
      font-size: 12px;
      -webkit-transform: scale(0.8); /*关键*/
    }
    .agree {
      height: 40px;
      width: 144px;
      margin-top: 30px;
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