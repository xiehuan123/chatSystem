<template>

<header class="header">
      <div class="back" @click="toBack">
        <Icon iconName="icon-arrow-left" />
      </div>
      <div class="title"><slot></slot>  </div>
      <div class="option" @click="toMenu">
        <Icon  v-show="option"  iconName="icon-ellipsis" />
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
    background-color: white;

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



</style>
