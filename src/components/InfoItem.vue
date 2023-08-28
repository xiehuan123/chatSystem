<template>
  <div class="infoitem">
    <span class="text">{{ text }}</span><Icon iconName="icon-arrow-right"></Icon>
  </div>
</template>

<script setup>
import Icon from "./common/Icon.vue";

const info = defineProps({
	text:{
		type:String,//类型字符串
		default:'当前Child.vue的默认值'//如果没有传递msg参数,默认值是这个
	},
})

</script>

<style lang="scss" scoped>
.infoitem {
  height: 42px;
  line-height: 42px;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid #c3c3c3;
  margin: 0 12px;
}
</style>