<template>
  <div class="" v-show="false">

    <input type="file" :id="triggerId" :accept="accept" @change="onUploadChange" :multiple="multiple">

  </div>
</template>
<script setup >
// 本组件作用上传图片
import { uploadImage } from "@/api/index"
import { compressionFile } from "@/utils/index"
defineProps({
  // file 相关参数
  accept: {
    type: String,
    default: "image/*"
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false
  },
  // 触发ID
  triggerId: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(["update:modelValue","change"])
const onUploadChange=async (e)=>{
  const files = e.target.files
  if (files.length <=0) {
    // 未选择文件
    return 
  }
  const imgList = []
  for (const key in files) {
    if (Object.hasOwnProperty.call(files, key)) {
      const file = files[key]
      const compressFileBase64 = await compressionFile(file)
      imgList.push({
        id: +new Date(),
        image: compressFileBase64
      })
    }
  }
  
  const {res,err} = await uploadImage({
    imgList
  
  })
  if (err) {
    console.log(err)
    return
  }
  if (res.code == 200) {
    console.log(res.data)
    emit("update:modelValue", res.data)
    emit("change", res.data)
    return
  }
  
 
}
</script>
<style lang="scss" scoped>




</style>
