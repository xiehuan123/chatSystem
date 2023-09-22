<template>
  <i :class="['icon', active,className]" :style="{fontSize:fontSize+'px',color:color}">
    <svg class="icon" aria-hidden="true">
      <use :href="'#' + iconName"></use>
    </svg>
  </i>
</template>

<script setup>
import { defineProps } from "vue"
const props = defineProps({
  iconName: {
    type: String,

    default: "",
  },
  active: {
    type: String,
    default: "",
  },
  fontSize: {
    type: Number,
    default: 16,
  },
  className:{
    type: String,
    default: "",
  },
  color:{
    type: String,
    default: "",
  }
})
console.log(props, "icon")
</script>

<style scoped lang='scss'>
.icon {
  width: 1em;
  height: 1.1em;
  vertical-align: -0.15em;
  fill: currentColor;
  padding: 2px 3px;
}
.active {
  color: rgb(16, 185, 99);
  // stroke: blue; /* 更改为您想要的线条颜色 */
}
</style>