<template>
  <div class="momentDetail">
   {{ mid }}
  </div>
</template>
<script setup >

import { useRoute } from "vue-router"
const route=useRoute()
const {mid}=route.params

</script>
<style lang="scss" scoped>
.momentDeatil{
  height: 100%;
}




</style>
