<template>
  <transition name="fade" @after-leave="destroy">
    <div class="Confirm" v-if="isVisable">
      <div class="content">
        <div class="title">提示</div>
        <div class="text">{{ props.message }}</div>
        <div class="option">
          <div class="esc" @click="onEsc()" v-if="props.failedText">
            {{ props.failedText || "取消" }}
          </div>
          <div class="sure" @click="onSure()" v-if="props.succedText">
            {{ props.succedText || "确定" }}
          </div>
        </div>
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
    default:"删除该朋友圈吗？"
  },
  icon:{
    type: String,
    required: true,
    default:"icon-xiaoxi"
  },
  failedText: {
    type: String,
    required: true,
    default:"取消"
  },
  succedText: {
    type: String,
    required: true,
    default:"确定"
  },

  // 关闭时的回调
  destroy: Function,
  // 成功回调
  succed: Function,
  // 取消回调
  failed: Function,
  // 回调
  finalled:Function
})
const isVisable=ref(false)
onMounted(() => {

  isVisable.value = true

})
const onEsc=()=>{
  isVisable.value = false
  props.failed()
  props.destroy()
  props.finalled()
}
const onSure=()=>{
  isVisable.value = false
  props.succed()
  props.destroy()
  props.finalled()
}


</script>

<style scoped lang='scss'>
.Confirm {
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

    align-items: center;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85vw;
  
    background: #fff;
    border-radius: 10px;
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-top: 20px;
    }
    .text{
      line-height: 30px;
      color: #262626;
      height: 80px;
      padding: 10px 12px;
    }
    
    .option{
      display: flex;
      width: 100%;
    
      >div{
        flex: 1;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-top: solid #ccc .5px;
      }
      .esc{
        border-right: solid .5px #ccc;
      }
      .sure{
        color: #ff4d4f;
      }
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