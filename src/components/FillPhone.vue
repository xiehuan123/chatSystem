<template>
  <div class="FillPhone">
    手机号<input
      type="text"
      class="ipt"
      placeholder="请填写手机号"
      @change="getInfo"
      v-model="phone"
    />
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { defineEmits } from "vue";
const phone = ref("");
const emit = defineEmits(["getPhone"]);
const getInfo = () => {
  console.log('phone',phone)
  emit("getPhone", phone);
};
</script>

<style scoped lang="scss">
.FillPhone {
  width: 100%;
  height: 48px;
  font-size: 16px;
  line-height: 48px;
  .ipt {
    margin-left: 31px;
    border: 0; // 去除未选中状态边框
    outline: none; // 去除选中状态边框
    background-color: rgba(0, 0, 0, 0); // 透明背景
  }
  border-bottom: 0.5px solid #dedede;
}
</style>  