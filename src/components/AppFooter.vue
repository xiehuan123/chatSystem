<template>
  <div class="footer">
    <div
      v-for="item in menun"
      :key="item.path"
      @click="onGoto(item.path)"
      :class="item.path == selectPath ? 'active' : ''"
    >
    <Icon :iconName="item?.meta?.icon" :active="item.path == selectPath ? 'active' : ''" :fontSize="28">

    </Icon>
  <!-- <i>
    <svg :class="['icon',item.path == selectPath ? 'active' : '']" aria-hidden="true">
  <use :href="item?.meta?.icon"></use>
</svg>
  </i> -->


  
      <!-- <i :class="item?.meta?.icon"></i> -->
      <span>{{ item.name }}</span>
      <Dots  :position="true"  :top="15" :right="28" ></Dots>
      </div>
     
  </div>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRoute, useRouter } from "vue-router"
import Dots from "./Dots.vue"
import Icon from "./common/Icon.vue"
const route = useRoute()
const router = useRouter()
const menun =  computed (() => {
  return router.options.routes[0]["children"]
})
const selectPath = ref(route.path)
const onGoto = (path) => {
  console.log(path)
  selectPath.value = path
  router.push({
    path,
  })
}
</script>

<style scoped lang="scss">
.footer {
  position: fixed;
  display: flex;
  bottom: 0;
  height: 70px;
  width: 100%;
  background: $bg-color;
  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    span {
      font-size: 12px;
    }
  }

}

</style>