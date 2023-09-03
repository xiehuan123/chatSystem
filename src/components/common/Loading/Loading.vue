<template>
    <transition name="fade" @after-leave="destroy">
      <div class="Loading" v-if="isVisable">
    <div class="content">
      <div class="yuan"></div>
      <div class="text">{{ props.message }}</div>
    </div>
  </div></transition>
 
</template>

<script setup>

const props = defineProps({ 
  // 消息内容
  message: {
    type: String,
    required: true,
    defalut:"加载中"
  },
  isVisable:{
    type: Boolean,
    required: true,
    defalut:true
  },
  // 关闭时的回调
  destroy: Function
})




</script>

<style scoped lang='scss'>
.Loading {
  position: fixed;
  inset: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2); /* 半透明黑色 */
  z-index: 1000; /* 调整遮罩层显示层级 */
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
    background: #887676;
    border-radius: 20px;
  }
  .yuan {
    width: 40px;
    height: 40px;
    border: 3px solid rgb(108, 103, 95);
    border-radius: 40px;
    clip-path: polygon(50% 0%, 100% 0%, 100% 3600%, 50% 50%);
    -webkit-clip-path: polygon(50% 0%, 100% 0%, 100% 3600%, 50% 50%);

    animation: identifier 1.5s infinite;
  }
  // .yuan::before{
  //   content:"";
  //   position: absolute;
  //   width: 50px;
  //   height: 50px;
  //   border-top-color: aliceblue ;
  //   border-top: aliceblue solid 1px;
  //   border-radius: 50%;

  // }
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