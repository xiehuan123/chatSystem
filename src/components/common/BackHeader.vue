<!--
 * @Author: xiehuan123 1208044257@qq.com
 * @Date: 2023-10-17 23:43:35
 * @LastEditors: xiehuan123 1208044257@qq.com
 * @LastEditTime: 2023-12-05 15:13:26
 * @FilePath: /chatSystem/src/components/common/BackHeader.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
      position: relative;
    
      text-align: center;
      height: 100%;
      padding-right: 10px ;
    }
  }



</style>
