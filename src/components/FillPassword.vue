<template>
  <div class="FillPassword">
    密码<input
      type="password"
      class="ipt"
      placeholder="请填写密码"
      v-model="password"
      @change="getInfo"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { defineEmits } from "vue";
const password = ref("");
const emit = defineEmits(["getPassword"]);
const getInfo = () => {
  console.log("password: ", password);
  emit("getPassword", password);
};
</script>

<style scoped lang="scss">
.FillPassword {
  width: 100%;
  height: 48px;
  font-size: 14px;
  line-height: 48px;
  .ipt {
    margin-left: 50px;
    border: 0; // 去除未选中状态边框
    outline: none; // 去除选中状态边框
    background-color: rgba(0, 0, 0, 0); // 透明背景
  }
  border-bottom: 0.5px solid #dedede;
}
</style>  