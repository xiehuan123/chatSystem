<template>
  <div class="userInfo">
    <BackHeader>设置
      <template #right>
        <div></div>
      </template>
    </BackHeader>
    <ScrollLayout >

      <textItem v-for="item in meun" :key="item.id" :item="item">
      </textItem>
      <Text :style="{ color: 'red', padding: '10px 10px' }" :weight="400" color="#272727" :size="12">隐私</Text>
      <textItem v-for="item in yinsi" :key="item.id" :item="item" @click="onGotoView(item.id)">
      </textItem>

    </ScrollLayout>

  </div>
</template>

<script setup>

import { logoutFunc } from "@/store/index"
import confirm from "@/components/common/Confirm"

const meun = ref([
  {
    id: 1,
    name: "账号与安全",
    height: 45,

  },
  {
    id: 2,
    name: "青少年模式",

    marginTop: true,
    height: 45,


  },
  {
    id: 3,
    name: "关怀模式",
    height: 45,
    marginBorde: true

  },
  {
    id: 4,
    name: "新消息通知",
    height: 45,

    marginTop: true,

  },
  {
    id: 5,
    name: "聊天",
    height: 45,
    marginBorde: true,


  }, {
    id: 6,
    name: "设备",
    height: 45,
    marginBorde: true

  }, {
    id: 7,
    name: "通用",



  },

])
const yinsi = ref([
  {
    id: 8,
    name: "朋友权限",
    height: 45,

  },
  {
    id: 9,
    name: "个人信息与权限",

    marginTop: true,
    height: 45,


  },
  {
    id: 10,
    name: "个人信息收集清单",
    height: 45,
    marginBorde: true

  },
  {
    id: 11,
    name: "第三方共享清单",
    height: 45,
    marginBorde: true,
  },
  {
    id: 12,
    name: "插件",
    height: 45,

    marginTop: true,

  },
  {
    id: 13,
    name: "关于微信",
    height: 45,

    marginTop: true,

  },
  {
    id: 13,
    name: "帮助反馈",
    height: 45,
    marginBorde: true,

  },
  {
    id: 14,
    name: "切换账号",
    height: 45,
    marginTop: true,
    right:true
  },
  {
    id: 15,
    name: "退出",
    height: 45,
    marginTop: true,
    right:true

  },
  
])
const onGotoView=(id)=>{
  switch (id) {
  case 15:
    confirm({"message":"确认退出登录", succed(){
      logoutFunc()
    }})
    break
  
  default:
    break
  }
}
</script>

<style scoped lang='scss'>
.userInfo {
  height: 100%;
  background: $bg-color;
}
</style>