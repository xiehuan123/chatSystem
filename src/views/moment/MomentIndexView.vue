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
               <Card></Card><Card></Card>
               <Card></Card>
            </div>
           
          
        </div>
      

    </main>



  </div>
  <ShareSheet   v-model:show="show"></ShareSheet>
</template>
<script setup >


import BScroll from "@better-scroll/core"
import { ref, onMounted } from "vue"
import { useStore } from "@/store"
import ShareSheet from "@/components/common/ShareSheet.vue"
const scroll = ref(null)
const show=ref(false)
const store=useStore()
onMounted(() => {
  // 提示，因为transform是对dom操作，所以需要在这个生命周期操作
  scroll.value = new BScroll(".main", {
    mouseWheel: true,
    probeType: 3,
    click:true
  })
 
})

const toMenu=()=>{
  show.value=!show.value
}
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
