<!--
 * @Author: xiehuan123 1208044257@qq.com
 * @Date: 2023-12-18 15:21:09
 * @LastEditors: xiehuan123 1208044257@qq.com
 * @LastEditTime: 2023-12-19 21:45:47
 * @FilePath: /chatSystem/src/views/moment/MomentPublish.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="momentPublish">
  
    <BackHeader>

      <template #right>

        <MyButton>发表</MyButton>
      </template>
    </BackHeader>
      <div class="main">
        <div class="edit"  placeholder="这一刻的想法..." contenteditable  ref="textareaDom">
        </div>
        <div class="imgList" ref="imgListDom">
          <div v-for="item in imgList" :key="item.id">
          
          <img :src="item.image" alt="" :data-id="item.id">
          </div>
          <div @click="onOpenOPtions()">

          </div>
        </div>
    
    
      </div>

  </div>
  <ShareSheet   v-model:show="show"></ShareSheet>
</template>
<script setup >
import BackHeader from "@/components/common/BackHeader.vue"
import MyButton from "@/components/common/myButton.vue"
import {ref,onMounted} from "vue"

import{getMomentItem} from "@/utils/index"
import emitter from "@/utils/Bus"
const imgList=ref([])
const show=ref(false)

const imgListDom=ref(null)



const onOpenOPtions=()=>{
  show.value=true
}

onMounted(async ()=>{
  imgList.value=await getMomentItem("momentImageList")
  
})
// 朋友圈存储的图片数据更新
emitter.on("moment-store",async ()=>{
  imgList.value=await getMomentItem("momentImageList")
})

</script>
<style lang="scss" scoped>
.momentPublish{
  height: 100%;
  .main{
    padding: 20px;
    height: 45%;
    .edit{
      width: 100%;
      min-height: 20%;
      max-height: 100%;
      overflow: hidden;
      &:focus{
        outline: none;
      }
      &:empty::before{
        content: attr(placeholder);
        color: #ccc;
      }
    }
    .imgList{
      display: flex;
      flex-wrap: wrap;
     
      >div{
        width: 100px;
        height: 100px;
        margin: 2px 5px;
        background-color: #ccc;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        &:last-child{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        &::before{
          position: absolute;
          content: "";
          width: 30%;
          height: 2px;
          background-color: #615858;
        }
         &::after{
          position: absolute;
          content: "";
          width: 2px;
          height: 30%;
          background-color: #615858;
        }
      }
      }
     
     
    }
    

  }
}



</style>
