<template>

<header class="header" :style="{backgroundColor:bg}">
      <div class="back" @click="toBack">
        <Icon iconName="icon-arrow-left" :fontSize="20"/>
      </div>
      <div class="title"><slot></slot>  </div>
      <div class="option" >
        <slot name="right"><Icon  v-show="option"  @click="toMenu"  iconName="icon-ellipsis" /></slot>
     
      </div>
    </header>

</template>
<script setup >
import{defineProps} from "vue"
import { useRouter } from "vue-router"
const router=useRouter()
defineProps({
  option:{
    type:Boolean,
    default:true
  },
  bg:{
    type:String,
    default:"#fffff"
  }
  
})
const toBack = () => {

  console.log("aaa")
  router.go(-1)
}
const toMenu = () => {
  console.log("菜单")
}



</script>
<style lang="scss" scoped>
  .header {
    display: flex;
    height: 40px;
   
    line-height: 40px;
    justify-content: center;

    .back {
      width: 40px;

      text-align: center;
    }
    .title {
      flex: 1;
      text-align: center;
    }
    .option {
      text-align: center;
      height: 100%;
      padding-right: 10px ;
    }
  }



</style>
