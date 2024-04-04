<template>
    <BackHeader> 表情下载
    <template #right>
      <div></div>
    </template>
  </BackHeader>
  <div class="emoji-grid">
    
    <!-- 循环遍历表情列表 -->
    <div v-for="(emoji, index) in emojis" :key="index" class="emoji-item">
      <img :src="emoji.url" alt="Emoji" class="emoji-image">
      <!-- 下载按钮 -->
      <div class="triangle" @click="downloadFile(emoji,+new Date()+'.jpg')">
  
     
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const Baseurl=ref(

  `http://${import.meta.env.VITE_PEER_HOST}:${import.meta.env.VITE_PEER_PORT}/image`
)
// 表情列表，包含表情的url
const emojis = ref([
  // 生成100个表情
  ...Array.from({ length: 70 }, (_, index) => ({
    url: `${Baseurl.value}/${index + 1}.jpg`
  }))
])

// 下载表情
const downloadFile = (emoji, fileName) => {
  fetch(emoji.url)
    .then(response => response.blob())
    .then(blob => {
      // 创建一个临时链接
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.download = fileName

      // 触发点击事件以下载文件
      link.click()

      // 释放URL对象
      URL.revokeObjectURL(link.href)
    })
    .catch(error => {
      console.error("Error downloading file:", error)
    })
}

</script>

<style lang="scss" scoped>
.emoji-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 九宫格布局，每行3个表情 */
  gap: 10px; /* 表情之间的间隔 */
}

.emoji-item {
  position: relative; /* 相对定位，用于设置下载按钮位置 */
}

.emoji-image {
  width: 100%;
  height: auto;
}

.download-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
}
.triangle {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-left: 30px solid transparent;
  border-bottom: 30px solid transparent;
  border-top: 30px solid rgb(44, 227, 209); /* 设置三角形的颜色 */
  span{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 12px;
  }
}
</style>
