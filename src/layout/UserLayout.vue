<template>
  <div class="userLayout">
    <header class="header">
      <div class="back">
        <i class="">
          <svg class="icon" aria-hidden="true">
            <use href="#icon-arrow-left"></use>
          </svg>
        </i>
      </div>
      <div class="title">暮年</div>
      <div class="option">
        <i class="">
          <svg class="icon" aria-hidden="true">
            <use href="#icon-ellipsis"></use>
          </svg>
        </i>
      </div>
    </header>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import  Footer from "../components/userLayout/Footer.vue"
</script>

<style scoped lang='scss'>
.userLayout {
  .header {
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: center;
     background: #ccc;

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

}
</style>