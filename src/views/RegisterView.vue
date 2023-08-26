<template>
  <div class="register">
    <Close></Close>
    <h3 class="title">手机号注册</h3>
    <div class="form-group">
      <div class="box">
        <div class="upload">
          <div id="image-preview1" class="image-preview"></div>
          <label for="file-upload1" class="upload-label">
            <i class="fas fa-cloud-upload-alt"></i> 水印
          </label>
          <input id="file-upload1" type="file" name="shuiying" hidden />
        </div>
        <div class="upload">
          <div id="image-preview2" class="image-preview"></div>
          <label for="file-upload2" class="upload-label">
            <i class="fas fa-cloud-upload-alt"></i> 原图
          </label>
          <input id="file-upload2" type="file" name="image" hidden />
        </div>
      </div>
    </div>
    <div class="nickname">
      昵称<input
        type="text"
        class="ipt"
        placeholder="例如：陈晨"
        v-model="nickname"
      />
    </div>
    <FillPhone @getPhone="retPhone"></FillPhone>
    <FillPassword @getPassword="retPassword"></FillPassword>
    <div class="footer">
      <div class="top">
        <input type="radio" name="" id="" :checked="isChecked" @click="checked"/><span>我已阅读并同意</span
        ><a href="">《软件许可及服务协议》</a>
      </div>
      <div class="center">本页面收集的信息仅用于注册账号</div>
      <button class="agree" :disabled="!nickname.length" @click="register">
        同意并继续
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import FillPhone from "../components/FillPhone.vue";
import FillPassword from "../components/FillPassword.vue";
import Close from "../components/Close.vue";
import { zhuce } from "../api/index";
Window.onload = function () {
  const fileUpload1 = document.getElementById("file-upload1");
  const imagePreview1 = document.getElementById("image-preview1");
  fileUpload1.addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageUrl = e.target.result;
      imagePreview1.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
      imagePreview1.style.display = "block";
    };

    reader.readAsDataURL(file);
  });

  const fileUpload2 = document.getElementById("file-upload2");
  const imagePreview2 = document.getElementById("image-preview2");

  fileUpload2.addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const imageUrl = e.target.result;
      // const imageUrl = '../assets//image/test.jpg'
      imagePreview2.innerHTML = `<img src="${imageUrl}" alt="Preview">`;
      // imagePreview2.innerHTML = `<img src="../assets//image/test.jpg" alt="Preview">`;
      imagePreview2.style.display = "block";
    };

    reader.readAsDataURL(file);
  });
};

const nickname = ref("");
let myPhone = ref("");
let myPassword = ref("");
let isChecked = ref(false);
const retPassword = (password) => {
  myPassword = password;
};
const retPhone = (phone) => {
  myPhone = phone;
};

const checked = () => {
  console.log('aaa',isChecked)
  isChecked = !isChecked;
}

const register = () => {
  if (
    !nickname.value.trim() &&
    !myPassword.value.trim() &&
    !myPhone.value.trim()
  ) {
    alert("Please enter");
    return
  }
  zhuce({
    phone: myPhone,
    password: myPassword,
    nickname,
  }).then((data) => {});
};
</script>

<style scoped lang="scss">
.register {
  padding: 18px;
  .title {
    text-align: center;
    font-weight: normal;
  }
  .nickname {
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
}
</style>  