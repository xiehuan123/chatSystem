<template>
  <div class="countdown">
    <button :disabled="phoneCheck" @click="startCountdown" class="send-button">
      <span v-if="countdown === 0">发送</span>
      <span v-else> {{ countdown }}</span>
    </button>
  </div>
</template>

<script setup >



const countdown = ref(0)
const countdownInterval = ref(null)
const countdownDuration = 60 // 设置倒计时时长，单位为秒
const emit = defineEmits(["sendCode"])
defineExpose({
  countdown
})
const startCountdown = () => {
  // 模拟发送验证码的逻辑
  // 这里可以添加你的发送验证码的方法
  emit("sendCode")

  // 开始倒计时
  countdown.value = countdownDuration
  countdownInterval.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--
    } else {
      clearInterval(countdownInterval.value)
    }
  }, 1000)
}

const props=defineProps({
  isIphoneCheck: {
    type: Boolean,
    default: false
  }
})
const phoneCheck = computed(() => {
  // 第一种状态 手机号码没输入或者 不正确 或者 倒计时大于0 为true
  if (!props.isIphoneCheck || countdown.value>0){
    return true
  }
  // 第二种种状态 手机号码已输入 且正确  倒计时为0为true
  if (props.isIphoneCheck && countdown.value === 0) {
    return false
  }
})
onBeforeUnmount(() => {
  clearInterval(countdownInterval.value)
})

</script>
<style lang="scss" scoped>
.countdown{
 height: 48px;
  width: 50px;
 line-height: 40px;
 border-bottom: 0.5px solid #dedede;
}
.send-button {
  width: 50px;
  padding: 5px 0;
  background-color: $msg-box-bg;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}


</style>
