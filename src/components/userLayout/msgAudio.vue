<template>
  <div class="msgaudio" v-bind="$attrs">
    <audio :src="wav" ref="audioMedia"  controls style="display: none;"></audio>

            
{{duration }}"
    <!-- <div class="box">
    <div class="wifi-symbol">
      <div class="wifi-circle first"></div>
      <div class="wifi-circle second"></div>
      <div class="wifi-circle third"></div>
      <div class="wifi-circle fourth"></div>
    </div>
  </div> -->
  </div>
</template>

<script setup>
import { ref,defineProps,watch ,useAttrs} from "vue"
const attrs=useAttrs()
console.log(attrs)
const props=defineProps({
  wav:{
    type:String,
    default:"",

  },
  play:{
    type:Boolean,
    default:false,
  },
  duration:{
    type:Number,
    default:0,
  }
})
const audioMedia=ref(null)
watch(()=>props.play,(newVal)=>{
  if(newVal){
    audioMedia.value.play()
  }else{
    audioMedia.value.pause()
  }
})
</script>

<style scoped lang='scss'>
.msgaudio{
  width: 50px;
  height: 50px;
  .box {
  position: relative;
  width: 240px;
  height: 240px;
  transform: rotate(-90deg) scale(.2);
  
.wifi-symbol {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  transform: rotate(45deg);
  position: absolute;
  top: -30%;
  .wifi-circle {
  border: 20px solid #ccc;
  border-radius: 50%;
  position: absolute;
 
}

.first {
  width: 140%;
  height: 140%;
  top: 30%;
  left: 30%;
  animation: identifier 1s 1s  forwards  ;
}
.second {
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  animation: identifier 1s 2s  forwards ;
}
.third {
  width: 60%;
  height: 60%;
  top: 70%;
  left: 70%;
  animation: identifier 1s 3s   forwards;
}
.fourth {
  width: 15%;
  height: 15%;
  top: 90%;
  left: 90%;
  animation: identifier 1s 4s   forwards;
}
}
}
}


@keyframes identifier {
  100%{
    opacity: 0;
  }
}
</style>