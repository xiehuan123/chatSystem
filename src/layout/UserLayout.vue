<template>
  <div class="userLayout"  >
    <header class="header">
      <div class="back" @click="onBack()">
        <Icon iconName="icon-arrow-left" />
      </div>
      <div class="title">{{title}} <span v-if="store.cuurentSesstion.us==2">({{ store.cuurentSesstion.memberPerson }})</span></div>
      <div class="option" v-if="route.name=='会话'"  @click="onGotoView()">
        <Icon iconName="icon-ellipsis" />
      </div>
    </header>

    
         <router-view ></router-view>

     

    
  </div>
</template>

<script setup>
import { computed, } from "vue"
import {useRoute,useRouter } from "vue-router"
import { userStore } from "@/store"

//import Icon from "@/components/common/Icon.vue"
const router = useRouter()
const route = useRoute()
const store=userStore()

// 跳转view
const onGotoView=()=>{
  if(route.name!="会话"){
    return
  }
  if(store.cuurentSesstion.us==1){
    router.push({name:"chatInfo"})
    return
  }
  if(store.cuurentSesstion.us==2){
    router.push({name:"groupDetail"})
    return
  }
  
}

const title=computed(()=>{
  return  route.name=="会话"?store.cuurentSesstion.sesstionName:route.name

})


// // 跳转上一级
const onBack = () => {
  router.go(-1)
}





</script>

<style scoped lang='scss'>
.userLayout {
  height: 100%;
  background: #F7FAFD;
  .header {
    position: relative;
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: center;
    background: $bg-color;
    z-index: 99;
    .back {
      width: 50px;

      text-align: center;
    }
    .title {
      width: 100%;
      text-align: center;
    }
    .option {
      text-align: center;
      width: 56px;
      height: 100%;
    }
  }
  .main {
    height: calc(100% - 90px);
    margin-bottom: 50px;
  }
}
</style>