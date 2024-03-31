<template>

  <div class="groupAvatarBox">
    <img v-for="image in image_urls" :key="image" :src="image" />
    <div v-for="empty in 9 - image_urls.length" :key="empty">
    </div>
  </div>

</template>
<script setup>

defineProps({
  image_urls: {
    type: Array,
    default: () => ["/uploads/wx_6bf95d44_test2/avatar.png", "/uploads/wx_6bf95d44_test2/avatar.png", "/uploads/wx_6bf95d44_test2/avatar.png", "/uploads/wx_6bf95d44_test2/avatar.png", "/uploads/wx_6bf95d44_test2/avatar.png", "/uploads/wx_6bf95d44_test2/avatar.png", "/uploads/wx_6bf95d44_test2/avatar.png"]
      
    
  }
})
</script>

<style lang="scss" scoped>
    .groupAvatarBox {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
     
      gap: 1px;
      margin-right: 10px;
      padding: 2px;
      border-radius: 3px;
      width: 50px;
      height: 50px;
      background-color: #ebe3e3;
      >img {
        width: 15px;
        height: 15px;
      }
  
    }
</style>