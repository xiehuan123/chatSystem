<template>
  <div class="webFrame">
    <BackHeader>结果

      <template #right>
        <div></div>
      </template>
    </BackHeader>
    <template v-if="isURL">
      <iframe :src="text" width="100%" height="100%" frameborder="0"></iframe>
    </template>
    <template v-else>
      <div>{{ content }}</div>
    </template>
  </div>

</template>

<script setup>

const router = useRoute()
const { content } = router.query
const text = ref(content)
const isURL = computed(() => {
  const pattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
  return pattern.test(text.value)
})


</script>

<style lang="scss" scoped>
.webFrame{
  overflow: hidden;
  height: 100%;
  iframe{
    height: calc(100% - 40px);
  }

}

</style>
