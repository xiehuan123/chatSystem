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
      @change="onChange"
      :maxlength="maxlength"
      

    />
  </div>
</template>

<script setup>
import { defineEmits } from "vue"
const props=defineProps({
  
  
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
  },
  maxlength:{
    type:Number
  }

})
const emit = defineEmits(["update:modelValue","change"])
const updateValue = (event) => {

  if (event.target.value.length > props.maxlength){
    event.target.value = event.target.value.slice(0,props.maxlength)
  }
  emit("update:modelValue", event.target.value)
  emit("input", event.target.value)
}
const onChange = (event) => {
  emit("change", event.target.value)
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