<template>
  <div class="findlist">
    <ListItem
      v-for="item in infoList"
      :key="item.sesstionId"
      :sesstioItem="item"
      :height="45"
      :border="border"
    >
      <template #right>
        <Icon iconName="icon-arrow-right"> </Icon>
      </template>
      <template #left>
        <div class="avatar">
          <Icon :iconName="item?.avatar" :fontSize="24"> </Icon>
        </div>
      </template>
    </ListItem>
  </div>
</template>

<script setup>
import ListItem from "./ListItem.vue"
import Icon from "./common/Icon.vue"
defineProps({
  infoList: {
    type: Array,
    required: true,
  },
  border: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped lang="scss">
.findlist {
  .avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
  }
  .iconSize {
    font-size: 20px;
  }
}
</style>