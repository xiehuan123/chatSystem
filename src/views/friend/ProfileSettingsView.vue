<template>
  <div class="profileSettings">
   <BackHeader>资料设置
      <template #right>
        <div></div>
      </template>
    </BackHeader>
    <ScrollLayout >

      <textItem  @click="onClick(item.id)" v-for="item in meun" :key="item.id" :item="item" >
      
      </textItem>

    </ScrollLayout>
  </div>
</template>
<script setup >
import {friendDelete} from "@/api/frindeShip"
import { useRoute } from "vue-router"
import { getCurrentInstance } from "vue"
const route=useRoute()
const meun = ref([
  {
    id: 1,
    name: "设置备注和标签",
    height: 45,

  },
  {
    id: 2,
    name: "朋友权限",
    marginBorde: true,

    height: 45,


  },
  {
    id: 3,
    name: "把他(她)推荐给朋友",
    height: 45,
    marginTop:true

  },
  {
    id: 4,
    name: "添加到桌面",
    height: 45,
    marginBorde: true,
    

  },
  {
    id: 5,
    name: "设为星标朋友",
    height: 45,
    marginTop: true,
    select:true

  }, {
    id: 6,
    name: "加入黑名单",
    height: 45,
    marginTop: true,
    select:true

  }, {
    id: 7,
    name: "投诉",
    height: 45,
    marginBorde: true,
  },
  {
    id: 8,
    content: "删除",
    contentColor:"red",
    right:true,
    height: 45,
    marginTop: true
   

  },

])
const { appContext : { config: { globalProperties } } } = getCurrentInstance()
const {uid,nickName} =route.params
const onClick=(id)=>{
  if(id!=8){
    return
  }
  globalProperties.$confirm({message: `将联系人"${nickName}"删除，将同时删除与该联系人的聊天记录`,
    title: "删除联系人",
    succedText:"删除",
    failedText:"取消",
    succed(){
      console.log(uid)
      friendDelete(uid).then(res=>{
        if(res.code==200){
          globalProperties.$toast("删除成功")
          route.push("/addressbook")
        }
      })
    },
    failed(){
      console.log("取消")
    }
  })
} 


</script>
<style lang="scss" scoped>
.profileSettings{
  background: $bg-color;
}



</style>
