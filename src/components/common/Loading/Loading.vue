<template>
    <transition name="fade" @after-leave="destroy">
      <div class="Loading" v-if="isVisableLoading">
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
  isVisableLoading:{
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
    width: 35vw;
    height: 35vw;
    background: rgba(79, 79, 79,.8);
    border-radius: 20px;
  }
  .yuan {
    width: 40px;
    height: 40px;
    border: 3px solid  rgb(209, 209, 209)   ;

    border-radius: 40px;
    clip-path: polygon(50% 0%, 100% 0%, 100% 3600%, 50% 50%);
    -webkit-clip-path: polygon(50% 0%, 100% 0%, 100% 3600%, 50% 50%);

    animation: identifier 1.5s infinite;
  }
  .text{
    color: white;
    margin-top: 15px;
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