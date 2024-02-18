<template>
  <div class="application">
    <BackHeader :option="false" v-if="flag==1">申请添加朋友</BackHeader>
    <BackHeader :option="false" v-if="flag==2">通过朋友验证</BackHeader>
    <main>
    <div class="option" v-if="flag==1"> 
      <Text :size="12">发送添加朋友申请</Text>

        <textarea :style="{ height: 80 + 'px' }" v-model="greeting"> </textarea>
    </div>
    <div class="option">
      <Text :size="12" >设置备注</Text>
        <div class="operation">
    
          <input type="text">
    
        
      </div>
        
    </div>
     <div class="option">
      <Text :size="12">添加标签与描述</Text>
      <div class="operation">
        <div>
          <Text color="#262626">标签</Text>
          <Icon iconName="icon-arrow-right"></Icon>
        </div>
        <hr>
        <div>
          <Text color="#262626">描述</Text>
          <Icon iconName="icon-arrow-right"></Icon>
        </div>
      </div>
    </div>

     <div class="option">
      <Text :size="12">设置朋友圈权限</Text>
      <div class="operation">
        <div>
          <Text color="#262626">聊天、朋友圈、微信运动等</Text>
          <Icon iconName="icon-arrow-right"></Icon>
        </div>
        <hr>
        <div>
          <Text color="#262626">仅聊天</Text>
          <Icon iconName="icon-arrow-right"></Icon>
        </div>
      </div>
    </div>
     <div class="option">
      <Text  :size="12">朋友圈和状态</Text>
      <div class="operation">
        <div >
          <Text color="#262626">不让他(她)看</Text>
          <Swtich  v-model:isSelected="xunzhon"></Swtich>
        </div>
        <hr>
        <div >
          <Text color="#262626">不看他(她)</Text>
          <Swtich></Swtich>
        </div>
      </div>
    </div>

    </main>

    
 <div class="submit">
          <button @click="onAddfriend" v-if="flag==1">发送</button>
          <button @click="onFinishfriend" v-if="flag==2">完成</button>
        </div>
  </div>
 
</template>
<script setup>
import {getCurrentInstance,ref} from "vue"
import {useRoute} from "vue-router"
import { userStore } from "@/store"
import {sendhFriend,finishFriend} from "@/api/frindeShip"
import Swtich from "@/components/common/Swtich.vue"
import router from "@/router"
const { appContext : { config: { globalProperties } } } = getCurrentInstance()
const route=useRoute()
const store=userStore()
const {uid,flag}=route.params
const xunzhon=ref(false)
const greeting=ref("我是"+store.user?.nickName)

const onAddfriend=async ()=>{
  console.log(greeting.value)
  globalProperties.$loading("发送中...")
  const {err,res}=await sendhFriend({uid:parseInt(uid),msg:greeting.value})
  if(err){
    throw err
  }
  if(res["code"]!=200){
    globalProperties.$message("发送失败")
    return 
  }
  
  globalProperties.$message("发送成功")
  store.$socket.emit("messageNotice",{ message:{type:"addressBook",count:1},reception:[uid]})
  router.back()
}

const onFinishfriend=async ()=>{
  console.log(789798)
  globalProperties.$loading("同意中...")
  const {err,res}=await finishFriend({uid:parseInt(uid)})
  if(err){
    throw err
  }
  if(res["code"]!=200){
    globalProperties.$message("同意失败")
    return 
  }
  
  globalProperties.$message("同意成功")
  router.back()
}
</script>
<style lang="scss" scoped>
.application{
  
  main{
    height:  calc(100vh - 140px);
    overflow: scroll;
.option {
  padding: 5px 20px;
  hr{
    border: solid .5px #e5e0e0;
  }
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
    padding: 20px 10px;
    border-radius: 8px;
    box-sizing: border-box;
    font-size: 15px;
   
  }
  textarea{
    padding: 10px;
  }
}


  }

.submit{
  padding: 30px 25%;
  button{
  display: inline-block;
  border: none;
  background: $msg-box-bg;
  width: 100%;
  color: #ffffff;
  padding: 10px;
  border-radius: 5px;
  }
}
}


</style>
