<template>
  <div>
    <qrcode-stream @decode="onDecode" />
  </div>
</template>

<script setup>
import { QrcodeStream  } from "vue-qrcode-reader"


const  onDecode=(result) =>{
  // 处理扫描结果
  console.log("扫描结果:", result)
}
  

</script>