<template>
    <transition name="fade" @after-leave="destroy">
  <div class="Message" v-if="isVisable">
    <div class="content">
      <div class="yuan"> <i :class="['iconfont',icon] "></i>  </div>
      <div class="text">{{ props.message }}</div>
    </div>
  </div>
</transition>
</template>

<script setup>
import { ref, onMounted } from "vue"

const props = defineProps({ 
  // 消息内容
  message: {
    type: String,
    required: true,
    default:"加载中"
  },
  icon:{
    type: String,
    required: true,
    default:"icon-xiaoxi"
  },
  // 停留时长
  duration: Number,
  // 关闭时的回调
  destroy: Function
})
const isVisable=ref(true)
onMounted(() => {
  isVisable.value = true
  setTimeout(() => {
    isVisable.value = false
  }, props.duration)
})



</script>

<style scoped lang='scss'>
.Message {
  position: fixed;
  inset: 0;
  height: 100%;
  width: 100%;
  background-color: $mask-bg; /* 半透明黑色 */
  z-index: 1000; /* 调整遮罩层显示层级 */
  font-size: 18px;
  .content {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30vw;
    height: 30vw;
    background: rgba(79, 79, 79,.8);
    border-radius: 20px;
  }
  .yuan {
    i{
      font-size: 35px;

    }
  }
  @keyframes identifier {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
.fade-enter-active,
.fade-leave-active {
 transition: all 0.5s;
}
.fade-enter-from,
.fade-leave-to {
 opacity: 0;
 transform: translate3d(-50%, -100%);
}
</style>