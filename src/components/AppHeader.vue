<template>
  <div :class="['AppHeader', route.path == '/me' ? 'hiden' : '']">
    <header>
      <div class="title">{{ route.name }}{{}}</div>
      <div class="option">
        <Icon iconName="icon-sousuoxiao" :fontSize="20"> </Icon>
        <Icon iconName="icon-jiahao" :fontSize="24" @click="onShowMeun()" ref="meunDom"> </Icon>
        
      </div>
      <meunList @update:visible="onClose()"  :visible="isiMeun" ref="meunListDom"></meunList>
    </header>
  </div>
</template>

<script setup>
import {ref,} from "vue"
import { useRoute } from "vue-router"
import Icon from "./common/Icon.vue"
import meunList from "./meunList.vue"
const route = useRoute()
const isiMeun=ref(false)
const meunListDom=ref(null)
const meunDom=ref(null)
const onShowMeun=()=>{
  isiMeun.value=!isiMeun.value


}
const onClose=(data)=>{

  isiMeun.value=data
}


</script>

<style scoped lang="scss">
header {
  position: relative;
  height: 40px;
  background: $bg-color;
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
    width: 56px;
    height: 100%;
    .jiahao:hover{
      color: aqua;
    }
  }
}
.hiden {
  visibility: hidden;
}
</style>