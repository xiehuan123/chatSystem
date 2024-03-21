<template>
    <router-link :to="path" class="Close">
      
    <div class="Close">
      <Icon iconName="icon-cuowuguanbiquxiao" :fontSize="24"></Icon>
   
    </div>
    </router-link>
</template>

<script setup>

defineProps({
  path:{
    type:String,
    default:"/index"
  }
})
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}
.Close {
  height: 32px;
  width: 32px;
  transform: translateX(-50%);
}
</style>  