<template>
  <div :class="['AppHeader', route.path == '/me' ? 'meBg' : '']">
    <header :class="route.path == '/me' ? 'hiden' : ''">
      <div class="title">{{ route.name }}{{}}</div>
      <div class="option">
        <Icon iconName="icon-sousuoxiao" :fontSize="20"  @click="onGotoSearch()"> </Icon>
      
        <Icon iconName="icon-jiahao" :fontSize="24" @click="onShowMeun($event)" > </Icon>
        
      </div>
      <!-- 通过这种形式就不用写 事件了 子组件触发就直接改了这个值 -->
      <meunList  v-model:visible="isiMeun" ></meunList>
    </header>
  </div>
</template>

<script setup>
import {ref,} from "vue"
import { useRoute,useRouter } from "vue-router"

const route = useRoute()
const router=useRouter()
const isiMeun=ref(false)

const onShowMeun=(e)=>{
  console.log(e.target)
  console.log("显示")
  isiMeun.value=!isiMeun.value

}
const onGotoSearch=()=>{
  router.push({
    path:""
  })
}


</script>

<style scoped lang="scss">
header {
  position: relative;
  height: 40px;

  line-height: 40px;
  .title {
    text-align: center;
  }
  .option {
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    width: 70px;
    height: 100%;
    .jiahao:hover{
      color: aqua;
    }
  }
}
.hiden {
  visibility: hidden;
}
.meBg{
  background: rgb(255, 255, 255);
}
</style>