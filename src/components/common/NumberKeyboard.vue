<template>
  <div class="NumberKeyboard" v-if="show" >
    <div v-for="item in optionList" :key="item" @click="onClick(item)">
      {{  item }}
    </div>



  </div>
</template>
<script setup >

const optionList=ref([1,2,3,4,5,6,7,8,9,"",0,"x"])
defineProps({
  show:{
    type:Boolean,
    default:false
  },
  
})
const emit=defineEmits(["blur","delete","input"])
const onClick=(item)=>{
  if(item==="x"){
    emit("delete","")
  }else if(item===""){
    emit("blur","")
  }else{
    emit("input",item)
  }
}

</script>
<style lang="scss" scoped>
.NumberKeyboard{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 30%;
  display: grid;
  grid-template-columns: repeat(3,1fr);
  box-sizing: border-box;

  margin-bottom: 10px;
  >div{
 
    text-align: center;
    line-height: 50px;
     border: solid 1px transparent;
    &:active{
      border: solid 1px #91e26c;
      box-shadow: 0 1px 5px 2px #91e26c;
    }
  }
}



</style>
