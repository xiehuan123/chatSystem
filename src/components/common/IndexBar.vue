<template>
  <div class="indexBar"  @click="onClick($event)">
    <div v-for="(item,index) in alphas" :key="item"    :class="index!=0&&index==selectIndex&&'activt'" :data-index="index" :data-id="item"> 
      <div :data-index="index" :data-id="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<script setup >
import {ref} from "vue"
// 定义26个英文字母
const alphas = ref([])
// 选中
const selectIndex=ref(-1)
const emit=defineEmits(["update:alpha"])
let start = "A".charCodeAt(0) //65
let last = "Z".charCodeAt(0)  //90
alphas.value.push("↑") 
for (start; start <= last; start++) {
  alphas.value.push(String.fromCharCode(start))
}
alphas.value.push("#") 

//点击选项变蓝色
const onClick=(e)=>{
  const {id,index}=e.target.dataset
  if(id){
    selectIndex.value=index
    console.log(id)
    if(index==0) return emit("update:alpha","0")
    return emit("update:alpha",id) 
  }
}
</script>
<style lang="scss" scoped>

.indexBar{
  position: fixed;
  top: 50%;
  right: 2px;
  width: 5vw;

  transform: translateY(-50%);
  font-size: 12px;

  div{
    width: 15px;
    height: 15px;

    line-height: 15px;
    text-align: center;
  
  }
  .activt{
    // color: skyblue;
    color: #fff;
    border-radius: 50% ;
    background: #41fb03;
  }
 
}


</style>
