<template>
  <div :class="['AppHeader' ,route.path=='/me' ?'hiden':'']" >
    <header><div class="title" >{{route.name}}{{  }}</div> <div class="option">  <i class="iconfont icon-sousuoxiao"></i> <i class="iconfont icon-jiahao"></i></div></header>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute();
</script>

<style scoped lang="scss">
header{
  position: relative;
  height: 40px;
  background: #ccc;
  line-height: 40px;
 .title{
  text-align: center;
 }
  .option{
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    width: 56px;
    height: 100%;
    background: #f4dcdc;
    .icon-sousuoxiao,.icon-jiahao{
      font-size: 20px;
      
    }

   

  }
 
}
.hiden{

visibility: hidden;
}

</style>