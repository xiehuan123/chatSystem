
<template>
  <BackHeader> 在线翻译
    <template #right>
      <div></div>
    </template>

  </BackHeader>
  <div class="translator">

    <div class="input-container">
      <textarea v-model="inputText" placeholder="输入要翻译的文本"></textarea>
      <select v-model="sourceLanguage">
        <option value="auto">自动检测</option>
        <option value="zh">中文</option>
        <option value="en">英文</option>
        <option value="fr">法语</option>
        <option value="de">德语</option>
        <option value="ja">日语</option>
      </select>
      <select v-model="targetLanguage">
        <option value="zh">中文</option>
        <option value="en">英文</option>
        <option value="fr">法语</option>
        <option value="de">德语</option>
        <option value="ja">日语</option>
      </select>
      <button @click="translate" :disabled="!inputText">翻译</button>
    </div>
    <div class="output-container">
      <p v-if="translation">翻译结果：</p>
      <p>{{ translation }}</p>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { getTranslate } from "@/api/index"
const inputText = ref("")
const translation = ref("")
const sourceLanguage = ref("auto")
const targetLanguage = ref("zh") // 默认翻译目标语言为中文

const translate = async () => {
  
  try {
    const {err,res} = await getTranslate({
      text: inputText.value,
      sourceLanguage: sourceLanguage.value,
      targetLanguage: targetLanguage.value,
    
    }) 
    if (err) {
      translation.value = "翻译失败"
      throw err
     
    }
    if (res["code"] != 200) {
      translation.value = "翻译失败"
      throw new Error(res["message"])
    }
    console.log("翻译结果:", res["data"])
    translation.value = res["data"]
  } catch (error) {
    console.error("翻译失败:", error)
    translation.value = "翻译失败"
  }
}
</script>

<style scoped>
.translator {
  max-width: 400px;
  margin: 0 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

.input-container {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  outline: none;
  resize: none;
}

select {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  outline: none;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
button:hover {
  background-color: #0056b3;
}

.output-container {
  text-align: center;
}

p {
  margin: 10px 0;
}
</style>
