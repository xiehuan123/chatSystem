<template>
  <div :class="['AppHeader', route.path == '/me' ? 'hiden' : '']">
    <header>
      <div class="title">{{ route.name }}{{}}</div>
      <div class="option">
        <Icon iconName="icon-sousuoxiao" :fontSize="20" >

</Icon>
<Icon iconName="icon-jiahao"  :fontSize="24">

</Icon>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import Icon from "./common/Icon.vue";
const route = useRoute();
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
   
    
  }
}
.hiden {
  visibility: hidden;
}
</style>