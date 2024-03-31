<template>
  <div class="input" >
    <span class="text">
      {{text}}
    </span>
    <input
      :type=type
      class="ipt"
      :placeholder="placeholder"
      @input="updateValue"
      :value="modelValue"
      @change="$emit('change', $event.target.value)"
    />
  </div>
</template>

<script setup>
import { defineEmits } from "vue"
defineProps({
  
  
  text:{
    type:String,
    default:""
  },
  type:{
    type:String,
    default:"text"
  },
  placeholder:{
    type:String,
    default:"text"
  },
  modelValue:{
    type:String,
    default:"text"
  }

})
const emit = defineEmits(["update:modelValue"])
const updateValue = (event) => {
  emit("update:modelValue", event.target.value)
}
</script>

<style scoped lang="scss">
.input {
  display: flex;
  width: 100%;
  height: 48px;
  font-size: 14px;
  line-height: 48px;
  .text{
    min-width: 60px;
  }
  .ipt {
    flex: 1;
    border: 0; // 去除未选中状态边框
    outline: none; // 去除选中状态边框
    background-color: rgba(0, 0, 0, 0); // 透明背景
  }
  border-bottom: 0.5px solid #dedede;
}
</style>  