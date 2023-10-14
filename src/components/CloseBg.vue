<template>

    <div class="CloseBg" v-show="isShow">
      
    </div>

</template>

<script setup>
import {defineProps} from "vue"
defineProps({
  isShow:{
    type:Boolean,
    default:false
  }
})
</script>

<style scoped lang="scss">
.CloseBg {
    position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background-color: rgb(182, 182, 182);
  transform: rotate(45deg);
  margin: 2px 5px;

  &::after,&::before{
      position: absolute;
      content: "";
     
   background-color: rgb(255, 255, 255);
  }
  &::after{
 width: 70%;
      height: 2px;

  }
   &::before{
 width: 2px;
      height: 70%;

  }

}
</style>  