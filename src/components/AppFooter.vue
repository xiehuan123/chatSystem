<template>
  <div class="footer">
    <div
      v-for="item in menun"
      :key="item.path"
      @click="onGoto(item.path)"
      :class="item.path == selectPath ? 'active' : ''"
    >
    <Icon :iconName="item?.meta?.icon" :active="item.path == selectPath ? 'active' : ''" :fontSize="28">

    </Icon>
  <!-- <i>
    <svg :class="['icon',item.path == selectPath ? 'active' : '']" aria-hidden="true">
  <use :href="item?.meta?.icon"></use>
</svg>
  </i> -->


  
      <!-- <i :class="item?.meta?.icon"></i> -->
      <span>{{ item.name }}</span>
      <Dots  v-if="item.path=='/weixin'&&count>0"    :position="true"  :top="15" :right="28" :num="count" ></Dots>
      </div>
     
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import { useStore } from "@/store"
const store=useStore()
const route = useRoute()
const router = useRouter()
// 底部菜单栏选项
const menun =  computed (() => {
  return router.options.routes[0]["children"]
})
// 默认选中的菜单
const selectPath = ref(route.path)
// 跳转到指定的
const onGoto = (path) => {
  console.log(path)
  selectPath.value = path
  router.push({
    path,
  })
}
const count=ref(0)

// 未读消息
watch(()=>store.infoList,(val)=>{
  let temp=0
  val.forEach(item=>{
    console.log(item.num)
    temp+=item.num
  })
  count.value=temp
}, { deep: true })
</script>

<style scoped lang="scss">
.footer {
  position: fixed;
  display: flex;
  bottom: 0;
  height: 70px;
  width: 100%;
  background: $taBar-bg;
  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    span {
      font-size: 12px;
    }
  }

}

</style>