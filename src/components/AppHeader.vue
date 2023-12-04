<template>
  <div :class="['AppHeader', route.path == '/me' ? 'meBg' : '']">
    <header :class="route.path == '/me' ? 'hiden' : ''">
      <div class="title">{{ route.name }}{{}}</div>
      <div class="option">
        <Icon iconName="icon-sousuoxiao" :fontSize="20"  @click="onGotoSearch()"> </Icon>
      
        <Icon iconName="icon-jiahao" :fontSize="24" @click="onShowMeun($event)" > </Icon>
        
      </div>
      
    </header>
  </div>
</template>

<script setup>
import {defineEmits} from "vue"
import { useRoute,useRouter } from "vue-router"

const route = useRoute()
const router=useRouter()
const emit=defineEmits(["onShowMeun"])

const onShowMeun=(e)=>{
  console.log(e.target)
  console.log("显示")
  emit("onShowMeun")
 

}
const onGotoSearch=()=>{
  router.push({
    path:""
  })
}


</script>

<style scoped lang="scss">
.AppHeader {
  position: fixed;
  height: 40px;
  top: 0;
  line-height: 40px;
  width: 100%;
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