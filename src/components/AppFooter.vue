<template>
  <div class="footer">
    <div
      v-for="item in menun"
      :key="item.path"
      @click="onGoto(item.path)"
      :class="item.path == selectPath ? 'active' : ''"
    >
  <i>
    <svg class="icon" aria-hidden="true">
  <use :href="item?.meta?.icon"></use>
</svg>
  </i>


  
      <!-- <i :class="item?.meta?.icon"></i> -->
      <span>{{ item.name }}</span>
      <Dots  :position="true"  :top="15" :right="28" ></Dots>
      </div>
     
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Dots from "./Dots.vue";
const route = useRoute();
const router = useRouter();
const menun = computed(() => {
  return router.options.routes[0]["children"];
});
const selectPath = ref(route.path);
const onGoto = (path) => {
  console.log(path);
  selectPath.value = path;
  router.push({
    path,
  });
};
</script>

<style scoped lang="scss">
.footer {
  position: fixed;
  display: flex;
  bottom: 0;
  height: 70px;
  width: 100%;
  background: rgb(238, 238, 238);
  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    i{
      font-size: 28px;
     
    }
    span {
      font-size: 12px;
    }
  }
  .active {
    color: rgb(221, 242, 189);
  }
}
</style>