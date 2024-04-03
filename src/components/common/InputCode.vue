<template>
  <Input placeholder="请填写手机号(11位)" v-model="data.userPhone" text="手机" type="Number" @input="onPhoneCheck"
    :maxlength="11" />
  <div class="code">
    <Input placeholder="请输入验证码" v-model="data.code" text="验证码" type="Number" :maxlength="4" />
    <CountDown ref="counDownRef" :isIphoneCheck="isIphoneCheck" @sendCode="onSendCode"></CountDown>
  </div>
</template>
<script setup >
import { sendRLCode } from "@/api/index"
import { watch } from "vue"
const  data = reactive({
  userPhone: "",
  code: "",
})

// 验证码控制
const isIphoneCheck = ref(false)
//倒计时验证组件
const counDownRef = ref(null)
const emit = defineEmits(["update:modelValue"])
watch(() => data, () => {
  if (!(isIphoneCheck.value && data.code.length == 4)) {
    console.log("不正确")
    return emit("change", { isSussces: false,...data })
  }
  console.log("正确")
  emit("change", { isSussces: true, ...data })
}, {
  deep: true
})
// 手机号验证
const onPhoneCheck = () => {
  console.log(data.userPhone)
  const reg_tel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/    //11位手机号码正则
  if (!reg_tel.test(data.userPhone)) {
    // globalProperties.$message("不正确")
    isIphoneCheck.value = false
    return 
  }
  console.log("手机号正确")
  isIphoneCheck.value = true

}
// 发送验证码
const onSendCode = async () => {
  console.log("发送验证码")
  const { err, res } = await sendRLCode(data.userPhone)
  if (err) {
    // globalProperties.$message("发送失败")
    return
  }

  if (res["code"] == 200) {
    // globalProperties.$message("发送成功")
    return
  }
  if (res["code"] != 200) {
    // globalProperties.$message(res["message"])
    counDownRef.value.countdown = 0
    return
  }

}


</script>
<style lang="scss" scoped>
.code {
  display: flex;

}



</style>
