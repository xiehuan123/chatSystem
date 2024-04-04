<template>
  <BackHeader> 二维码生成

    <template #right>
      <div></div>
    </template>
  </BackHeader>
  <div class="qrcode-generator">
    <input v-model="content" placeholder="输入内容" class="input-field">
    <button @click="generateQRCode" class="button">生成</button>
    <button @click="exportQRCode" class="button">导出</button>
    <div v-if="qrCode" class="preview">
      <img :src="qrCode" alt="QR Code" class="qr-image">
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import QRCode from "qrcode"

const content = ref("") // 输入内容
const qrCode = ref("") // 生成的二维码图片

// 生成二维码
const generateQRCode = () => {
  if (content.value) {
    QRCode.toDataURL(content.value)
      .then(url => {
        qrCode.value = url
      })
      .catch(error => {
        console.error("Failed to generate QR code:", error)
      })
  }
}

// 导出二维码
const exportQRCode = () => {
  if (qrCode.value) {
    const link = document.createElement("a")
    link.href = qrCode.value
    link.download = + Date.now() + ".png"
    link.click()
  }
}
</script>

<style scoped>
.qrcode-generator {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-field {
  width: 80%;
  padding: 12px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
}

.button {
  width: 80%;
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  transition: background-color 0.3s ease;
  margin: 5px 0;
}

.button:hover {
  background-color: #0056b3;
}

.preview {
  margin-top: 20px;
}

.qr-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>