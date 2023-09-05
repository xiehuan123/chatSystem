<template>
  <div class="userLayout">
    <header class="header">
      <div class="back" @click="onBack()">
        <Icon iconName="icon-arrow-left" />
      </div>
      <div class="title">{{title}}</div>
      <div class="option" v-if="route.name=='会话'">
        <Icon iconName="icon-ellipsis" />
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { computed } from "vue"
import { useRouter,useRoute } from "vue-router"
import { useStore } from "@/store"
import Icon from "@/components/common/Icon.vue"
const router = useRouter()
const route = useRoute()
const store=useStore()
const title=computed(()=>{
  return  route.name=="会话"?store.cuurentSesstion.sesstionName:route.name

})
const onBack = () => {
  router.go(-1)
}
</script>

<style scoped lang='scss'>
.userLayout {
  height: 100%;
  background: $bg-color;
  .header {
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: center;
    background: $bg-color;

    .back {
      width: 50px;

      text-align: center;
    }
    .title {
      width: 100%;
      text-align: center;
    }
    .option {
      text-align: center;
      width: 56px;
      height: 100%;
    }
  }
  .main {
    height: calc(100% - 90px);
    margin-bottom: 50px;
  }
}
</style>