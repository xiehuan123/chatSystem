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
      <span>{{ item.name }}</span>
      <div  :class="['dots',getCount(item.meta.name)&&'double']"  v-if="item.path!='/me'&&getCount(item.meta.name)"      >
        {{ getCount(item.meta.name) }}
      </div>
    </div>
     
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue"
import { useRoute, useRouter } from "vue-router"
import {userStore}  from "@/store"
const store=userStore()
const route = useRoute()
const router = useRouter()
// 底部菜单栏选项
const menun =  computed (() => {
 
  return router.options.routes[0]["children"]
})
// 获取状态管理里面的数量
const getCount=computed(()=>{
  return function (name){
    return store.noticeCount[name]
  }
  
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
  height: 60px;
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
  .dots{
      position: absolute;
      width: 20px;
      height: 20px;
      
      top: 12px;
      left: 60px;
      border-radius: 50%;
      font-size: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      background: #fd0000;
   &  .double{
      padding: 0 2px;
    }
  }


}

</style>