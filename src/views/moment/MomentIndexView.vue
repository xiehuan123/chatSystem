<template>
  <div class="momentIndex">
    <!-- <header>11111</header> -->

     <BackHeader class="header">
      <template #right>
        <Icon    @click="toMenu" :fontSize="25"  iconName="icon-paishe" />
      </template>
    </BackHeader>
    <main class="main">
    
        <div class="scroll-area">

          <div class="bg">
            <img src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
          </div>
          <div class="content">
            <!-- <div v-for="n in 50" class="item" :key="n">{{ n }}</div> -->
              <div class="info">
                <Text color="#ffffff" :size="18">{{store.user.nickName}}</Text>
                <Avatar :size="55"  :src="store.user.userAvatar"></Avatar>
              </div>
               <Card></Card>
               <Card></Card>
            </div>
           
          
        </div>
      

    </main>



  </div>
</template>
<script setup >


import Avatar from "@/components/common/Avatar.vue"
import IScroll from "iscroll/build/iscroll-probe"
import { ref, onMounted } from "vue"
import { useStore } from "@/store"
const scroll = ref(null)
const store=useStore()
onMounted(() => {
  // 提示，因为transform是对dom操作，所以需要在这个生命周期操作
  scroll.value = new IScroll(".main", {
    mouseWheel: true
  })
  // 第一个参数是dom选择器，建议使用唯一性的id，这里以class为例
  // 第二个参数为参数对象，是iscroll的一些配置
  // 参数配置可以参考 http://wiki.jikexueyuan.com/project/iscroll-5/


})


</script>
<style lang="scss" scoped>
.momentIndex{
 position: relative;
 height: 100%;
 .header
 {
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;
 }
.main {
  position: absolute;
  top: 0;
  height: 100%;
  margin-bottom: 10px;

  /* 给滚动区域固定可滚动高度，并且超出隐藏 */
  .bg{
  
    img{
      width: 100%;
      height: 100%;
    }

  }
  .item{
    touch-action:none
  }
  .content{
    position: relative;
    background-color: $bg-color;
 
    padding-top: 70px;
    padding-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
    .info{
      position: absolute;
      display: flex;
      right: 0;
      top: -32px;
      width: 120px;
      justify-content: space-around;
      right: 10px;
  }
  }
  
}
}



</style>
