<template>
  <div class="application">
    <BackHeader :option="false">申请添加朋友</BackHeader>
    <div class="option">
      <Text>发送添加朋友申请</Text>

        <textarea :style="{ height: 60 + 'px' }"  :value="greeting"> </textarea>
    </div>
    <div class="option">
      <Text>设置备注</Text>
 
        <input type="text"  />
    </div>

   

     <div class="option">
      <Text>添加标签与描述</Text>
      <div class="operation">
        <div>
          <Text color="#000000">标签</Text>
          <Icon iconName="icon-arrow-right"></Icon>
        </div>
        <div>
          <Text color="#000000">描述</Text>
          <Icon iconName="icon-arrow-right"></Icon>
        </div>
      </div>
    </div>

     <div class="option">
      <Text>设置朋友圈权限</Text>
      <div class="operation">
        <div>
          <Text color="#000000">聊天、朋友圈、微信运动等</Text>
          <Icon iconName="icon-arrow-right"></Icon>
        </div>
        <div>
          <Text color="#000000">仅聊天</Text>
          <Icon iconName="icon-arrow-right"></Icon>
        </div>
      </div>
    </div>

     <div class="option">
      <Text @click="onAddfriend">朋友圈和状态</Text>
      <div class="operation">
        <div >
          <Text color="#000000">不让他(她)看</Text>
          <Swtich></Swtich>
        </div>
       
      </div>
    </div>
  </div>
</template>
<script setup>
import {getCurrentInstance,computed} from "vue"
import {useRoute} from "vue-router"
import { useStore } from "@/store"
import {sendhFriend} from "@/api/frindeShip"

import Swtich from "@/components/common/Swtich.vue"
const { appContext : { config: { globalProperties } } } = getCurrentInstance()
const route=useRoute()
const store=useStore()
const {uid}=route.params
console.log(route.params)
const greeting=computed(()=>{
  return "我是"+store.user?.nickName
})
const onAddfriend=async ()=>{

  globalProperties.$loading("发送中...")
  const {err,res}=await sendhFriend({uid})
  if(err){
    throw err
  }
  if(res["code"]!=200){
    globalProperties.$message("发送失败")
    return 
  }
  
  globalProperties.$message("发送成功")
}
</script>
<style lang="scss" scoped>
.option {
  padding: 5px 20px;
  .operation{
    overflow: hidden;
    border-radius: 8px;
    box-sizing: border-box;
    background: rgb(237, 237, 237);
    >div{
      display: flex;
      justify-content: space-between;
      padding: 10px 10px;
    }
  }
  textarea,
  input {
    border: none;
    outline: none;
    resize: none;
    background: rgb(237, 237, 237);
    height: 35px;
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    box-sizing: border-box;
   
  }
}
</style>
