<template>
  <div class="momentItem">
  
      <div class="time">
        <Text :style="{paddingLeft:'10px',display:'inline-block'}" :size="22" color="#262626" :weight="500">{{formatTitle[0]}}</Text>
        <Text :style="{paddingRgiht:'5px',display:'inline-block'}" :size="14" color="#262626" >{{formatTitle[1]}}</Text>
      </div>
      <div class="momentList">
        <div v-for="moment in momentItem"   :key="moment.mid" @click="onGoto(moment.mid)">
            <div class="image"  v-if="moment.firstImage"   :style="{backgroundImage:`url(${moment.firstImage})`}"></div>
            <div class="content">
                <Text  :size="16" color="#262626">{{moment.content}}</Text>
            </div>  
            
        </div>
      </div>
 
  </div>
</template>
<script setup >
// 根据时间分组 传递过来的数据
import {  defineProps,computed } from "vue"
import { useRouter } from "vue-router"

const props= defineProps({
  momentItem: {
    type: Array,
    default: () => {
      return [{
        "mid": 1,
        "content": "今天天气真好今天天气真好今天天气真好今天天气真好今天天气真好今天天气真好今天天气真好今天天气真好",
        "firstImage":"https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      }] 
      
    }
  },
  title:{
    type:String,
    default:""
  }
})
const router=useRouter()
const formatTitle=computed(()=>{
  return props.title.split("-")
})
const onGoto=(mid)=>{
  router.push({
    path:`/momentDetail/${mid}`
  })
}

</script>
<style lang="scss" scoped>

.momentItem{
  display: flex;
  margin: 10px 0;
  .time{
    flex: 1;
  }
  .momentList{
    flex: 4;
    >div{
      display: flex;
      margin: 5px;
      .image{
        width: 70px;
        height: 70px;
        background-size: cover;
      }
      .content{
        flex: 1;
        padding: 0 10px;
      }
    }
  }
}


</style>
