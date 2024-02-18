
<template>
  <div class="momentPublish">
  
    <BackHeader>

      <template #right>

        <MyButton @click="onPublishMoment()">发表</MyButton>
      </template>
    </BackHeader>
      <div class="main">
        <div class="edit"  placeholder="这一刻的想法..." contenteditable  ref="contentRef">
        </div>
        <div class="imgList" ref="imgListDom">
          <div v-for="item in imgList" :key="item.id">
          
          <img :src="item.image" alt="" :data-id="item.id">
          </div>
          <div @click="onOpenOPtions()"  v-show="imgList.length<9">

          </div>
        </div>
    
    
      </div>
      <div  class="footer">
        <ul>
          <li><Icon iconName="icon-pyqwz" :font-size="25"></Icon><span>所在位置 <Icon iconName="icon-arrow-right"></Icon></span>  </li>
          <li><Icon iconName="icon-aite" :font-size="25"></Icon><span>提醒谁看 <Icon iconName="icon-arrow-right"></Icon></span></li>
          <li><Icon iconName="icon-iconrenxiang" :font-size="25"></Icon><span>谁可以看 <Icon iconName="icon-arrow-right"></Icon></span> </li>
          <li><Icon icon-name="icon-qqdt" :font-size="25"></Icon> </li>
        </ul>         

      </div>

  </div>
  <ShareSheet   v-model:show="show"></ShareSheet>
</template>
<script setup >
import BackHeader from "@/components/common/BackHeader.vue"
import MyButton from "@/components/common/myButton.vue"
import {ref,onMounted,getCurrentInstance} from "vue"

import emitter from "@/utils/Bus"
import Icon from "@/components/common/Icon.vue"
import {publishMoment} from "@/api/moment"
import router from "@/router"
import { momentIndexDB } from "@/store"
const { appContext : { config: { globalProperties } } } = getCurrentInstance()
const imgList=ref([])
const show=ref(false)
const momentIndexDBStore=momentIndexDB()
const imgListDom=ref(null)
// 文本内容
const contentRef=ref(null)

// const momentOptionList=ref([
//   {
//     sesstionId: 1,
//     sesstionName: "所在位置",
//     path:"/momentIndex",
//     avatar: "icon-iconfontzhizuobiaozhunbduan36",
//   },
//   {
//     sesstionId: 2,
//     sesstionName: "提醒谁看",
//     avatar: "icon-a-rongqi18",
//     marginTop: true,
//   },
//   {
//     sesstionId: 3,
//     sesstionName: "谁可以看房",
//     avatar: "icon-a-rongqi18",
//     marginTop: true,
//   },
 

// ])
const onOpenOPtions=()=>{
  show.value=true
}

onMounted(async ()=>{
  imgList.value=await momentIndexDBStore.getMomentItem("momentImageList")
  
})
// 朋友圈存储的图片数据更新
emitter.on("moment-store",async ()=>{
  imgList.value=await momentIndexDBStore.getMomentItem("momentImageList")
})
// 发布朋友圈
const onPublishMoment=async ()=>{
  globalProperties.$loading("发表中...")
  const content=contentRef.value.innerText
  const imgList=await momentIndexDBStore.getMomentItem("momentImageList")
  await publishMoment({content,imgList})
  await momentIndexDBStore.clearMomentItem()
  globalProperties.$message("发表成功")
  router.back(-1)
}

</script>
<style lang="scss" scoped>
.momentPublish{
  height: 100%;
  color: $theme-font-color;
  .main{
    padding: 20px;
    min-height: 40%;
    max-height: 100%;
    overflow: scroll;
   
    .edit{
      width: 100%;
      min-height: 100px;
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
        margin: 2px 2px;
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

        background: linear-gradient(currentColor, currentColor) no-repeat center/3em 2px, 
                linear-gradient(currentColor, currentColor) no-repeat center/2px 3em,
                ghostwhite;
        // &::before{
        //   position: absolute;
        //   content: "";
        //   width: 30%;
        //   height: 2px;
        //   background-color: #615858;
        // }
        //  &::after{
        //   position: absolute;
        //   content: "";
        //   width: 2px;
        //   height: 30%;
        //   background-color: #615858;
        // }
      }
      }
     
     
    }
    

  }
  .footer{
    padding: 20px;
    ul{
      list-style: none;
      li{
        display: flex;
        padding-left: 5px;
        // background-color: #ccc;
        line-height: 45px;
        &:first-child span{
          &::before{
            content: none;
          }
 
       
        }
        &:last-child{
          margin-top: 20px;
          span{
            &::before{
              content: none;
            }
          }
        }
        >span{
          display: inline-block;
          position: relative;
          padding:0 10px;
          display: flex;
          justify-content: space-between;
          flex: 1;
          
          &::before{
            position: absolute;
            right: 0;
            bottom: 0;
            left: 10px;
            height: 1px;
            content: '';
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
            background-color: #c8c7cc;
          }
        }
        
      }
    }
  }
}



</style>
