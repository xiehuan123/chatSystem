<template>
    
    <div class="Close" @click="onBack()">
      <Icon iconName="icon-cuowuguanbiquxiao" :fontSize="24"></Icon>
   
    </div>

</template>

<script setup>
const router = useRouter()
const  onBack=()=>{
  router.back()
}
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