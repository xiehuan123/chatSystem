<template>
  <div class="indexBar"  @click="onClick($event)">
    <div v-for="(item,index) in alphas" :key="item"    :class="index!=0&&index==selectIndex&&'activt'" :data-index="index" :data-id="item"> 
      <!-- <Text :size="12" color="#000000"><a href="" style="transform: scale(.2);" >  {{ item }}</a></Text>  -->
      <!-- <a :href="filterHref(item)" :data-index="index">{{ item }}</a> -->
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
let start = "A".charCodeAt(0) //65
let last = "Z".charCodeAt(0)  //90
alphas.value.push("↑") 
for (start; start <= last; start++) {
  alphas.value.push(String.fromCharCode(start))
}
alphas.value.push("#") 
// const filterHref=computed(()=>{
//   return function (href){
//     return  "#"+href
//   }
// })
//点击选项变蓝色
const onClick=(e)=>{

  if(e.target.hasAttribute("data-index")){
    
    selectIndex.value=e.target.getAttribute("data-index")
    console.log(e.target.getAttribute("data-index"))
    if(selectIndex.value==0){
      document.querySelector(".addressBook").scrollIntoView({block:"start"})
      return 
    }

    document.getElementById(e.target.getAttribute("data-id"))?.scrollIntoView()
    // console.log(selectIndex.value)
  }
}
</script>
<style lang="scss" scoped>

.indexBar{
  position: fixed;
  top: 50%;
  right: 2px;
  width: 5vw;

  transform: translateY(-55%);
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
