import { defineStore } from "pinia"
import {ref} from "vue"
import localforage from "localforage"
// import moment from "moment/moment"
import emitter from "@/utils/Bus"
// 消息本地备份
export const messageIndexDB = defineStore("messageIndexDB",()=>{
  const messageStore =ref(localforage.createInstance({
    name: "messageStore"
  })) 
  const messageList=ref([])
  // 获取本地消息
  const getMessage= async ()=>{
    const value= await messageStore.value.getItem("messageList")
   
    messageList.value= JSON.parse(value)||[]

  }
  // 备份本地消息
  const setMessageList=async (data)=>{
    messageStore.value.setItem("messageList",JSON.stringify(data) )
  }

  getMessage()


  return {messageList,setMessageList}
})
// 朋友圈草稿备份

export const momentIndexDB = defineStore("momentIndexDB",()=>{

  const momentStore =ref(localforage.createInstance({"name":"momentStore"}))


  // 获取已保存的草稿
  const getMomentItem=async (key)=>{
    const data=await momentStore.value.getItem(key)
 
    return data || []
  }
  
  // 保存草稿  {imageList:[{id:1,image:"图片地址"}]}
  const setMometimageList=async (image)=>{
  // 获取当前会话存储的朋友圈图片
    const momentImageList=await momentStore.value.getItem("momentImageList")
    const newmomentImageList=momentImageList||[]   
    // 添加图片
    newmomentImageList.push({id:+new Date(),"image":image})
    // 存储到会话
    await momentStore.value.setItem("momentImageList",newmomentImageList)
    await momentStore.value.setItem("momnetImageListLength",newmomentImageList.length)
    // 通知订阅了 朋友圈数据更新的组件做更新
    emitter.emit("moment-store", "")
  }
  // 添加保存的文本内容
  const addMomentContent=async (content)=>{

    await momentStore.value.setItem("momentContent",JSON.stringify(content))
  }
  // 清空本地保存的朋友圈相关内容
  const clearMomentItem=async()=>{
    momentStore.value.clear()
  }
  return {setMometimageList,addMomentContent,getMomentItem,clearMomentItem}
})