<template>
  <div>
    <qrcode-stream @decode="onDecode" />
    <router-view></router-view>
  </div>
</template>

<script setup>
import { QrcodeStream  } from "vue-qrcode-reader"


const  onDecode=(result) =>{
  alert(result)
  // 处理扫描结果
  console.log("扫描结果:", result)
}
  

</script>