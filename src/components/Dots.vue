<template>
  <div
    v-if="props.num"
    class="dots"
   
  >
    {{ props.num }}
  </div>
  <!-- <div
    v-else
    class="dots"
    :style="{
      position: position ? 'absolute' : '',
      top: top + 'px',
      right: right + 'px',
      height: height + 'px',
      width: width + 'px',
    }"
  ></div> -->
</template>

<script setup>
const props = defineProps({
  num: {
    default: 0,
    type: Number,
  },
  top: {
    default: 5,
    type: Number,
  },
  right: {
    default: 20,
    type: Number,
  },
  width: {
    default: 10,
    type: Number,
  },
  height: {
    default: 10,
    type: Number,
  },
  position: {
    default: false,
    type: Boolean,
  },
})

</script>

<style scoped>
.dots {
  position: absolute;
  
  padding: 3px;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  background: #fd0000;
}
</style>