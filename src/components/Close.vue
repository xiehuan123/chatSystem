<template>
  <router-link to="/index">
    <div class="Close">
      <i class="iconfont icon-cuowuguanbiquxiao"></i>
    </div>
  </router-link>
</template>

<script setup>
import { ref, computed } from "vue";
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.Close {
  height: 32px;
  width: 32px;
  font-weight: normal;
  font-size: 20px;
  i {
    font-size: 24px;
  }
}
</style>  