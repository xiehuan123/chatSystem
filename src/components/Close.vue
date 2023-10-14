<template>
  <router-link to="/index">
    <div class="Close">
      <Icon iconName="icon-cuowuguanbiquxiao" :fontSize="24"></Icon>
   
    </div>
  </router-link>
</template>

<script setup>
import Icon from "@/components//common/Icon.vue"
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.Close {
  height: 32px;
  width: 32px;
}
</style>  