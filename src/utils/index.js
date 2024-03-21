
import { pinyin } from "pinyin-pro"
import localforage from "localforage"
import moment from "moment/moment"
import emitter from "@/utils/Bus"
import _ from "lodash"

import CryptoJS from "crypto-js"
moment.defineLocale("zh_CN", {
  relativeTime: {
    future: "%s内",
    past: "%s前",

    m: "1分钟",
    mm: "%d分钟",
    h: "1小时",
    hh: "%d小时",
    d: "1天",
    dd: "%d天",
  
   
  },
})

export const getInitials = (str) => {
  let reg=/[a-zA-Z]/
  console.log(str,"---------------")
  const pinyins = pinyin(str, { pattern: "first" })
  if(!reg.test(pinyins)){
    
    return "#"
  }
  const initials = pinyins.charAt(0).toUpperCase()
  return initials

}
/**
 * @description: 
 * @param {*} 好友列表根据 好友名称做排序
 * @return {*}
 */
export const getResultSort = (data) => {

  const result = {}
  let pinyinFirst = []
  for (const key in data) {
    // 获取昵称首字母拼音 不是字母就是#
    const first = getInitials(data[key]["nickName"])
    // 判断数组有没有相同的分组名
    if(pinyinFirst.includes(first)){
      result[first].push(data[key])
    }else{
      pinyinFirst.push(first)
      result[first]=[data[key]]
    }
   
  }
  pinyinFirst.sort((a, b) => a.localeCompare(b))
  if(pinyinFirst.includes("#")){
    pinyinFirst=pinyinFirst.filter(item=>item!=="#")
    pinyinFirst.push("#")
  }
  return {result,pinyinFirst}
}
export const getFriendResultSort = (data) => {

  const result = []
  for (const key in data) {
    // 根据时间获取几天前 并且分组
    const first = momentFormatTime(data[key]["friend_time"])
    // 判断数组有没有相同的分组名
    const index = result.findIndex(item => item.title == first)
    if (index != -1) {
      result[index]["list"].push(data[key])
    } else {
      result.push({
        title: first,
        list: [data[key]]
      })
    }
  }
  result.sort((a, b) => a.title.localeCompare(b.title))
  return result
}
/**
//  * @description:  将时间转换成 时分秒
 * @param {*} time
 * @return {*}
 */
export const getFormatTime = (time = null) => {

  let now = moment()
 
  let targetMoment = time ? moment(time) : moment()

  if (targetMoment.isSame(now, "day")) {
    // 当天
    let hour = targetMoment.hour()

    if (hour >= 7 && hour < 11) {
      return "上午 " + targetMoment.format("h:mm")
    } else if (hour >= 11 && hour < 14) {
      return "中午 " + targetMoment.format("h:mm")
    } else if (hour >= 14 && hour < 18) {
      return "下午 " + targetMoment.format("h:mm")
    } else if (hour >= 18 && hour < 24) {
      return "晚上 " + targetMoment.format("h:mm")
    } else {
      return "凌晨 " + targetMoment.format("h:mm")
    }
  } else if (targetMoment.isSame(now.clone().subtract(1, "day"), "day")) {
    // 昨天
    return "昨天"
  } else if (targetMoment.isSame(now.clone().subtract(2, "day"), "day")) {
    // 前天
    return "前天"
  } else if (targetMoment.isSame(now, "week")) {
    // 本周
    return targetMoment.format("dddd") // 星期几
  } else if (targetMoment.isSame(now, "month")) {
    // 本月
    return targetMoment.format("M月D日")
  } else if (targetMoment.isSame(now, "year")) {
    // 本年
    return targetMoment.format("M月D日")
  } else {
    // 超过本年
    return targetMoment.format("YYYY年M月D日")
  }
  
}
/**
 * @description: 根据时间获取几天前
 * @param {*} time
 * @return {*}
 */
export const momentFormatTime=(time=null)=>{
  if (!time) return moment().fromNow()
  return moment(time).fromNow()
}
export const getMomentDate=(time=null)=>{
  // 获取今天的日期
  let today = moment().format("YYYY-MM-DD")
  // 将日期转换成“今天”或者“1225月”格式
  {
    if (time === today) {
      return "今天"
    } else {
      let date = moment(time)
      return date.format("DD-MM月")
    }
  }



}
export const  getGroupBy=(data, f)=> {
  let formattedData = _.map(data, item => {
    return { ...item, pub_time: getMomentDate(item.pub_time),"firstImage":item.img_list?.split(",")[0]??null  } // 在这里对属性值进行格式化
  })
  console.log(formattedData)
  return _.groupBy(formattedData, f)
}
// 防抖函数，非立即执行版本
export const debounce = (func, wait = 1000) => {
  let timeout = null

  return function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this
    const args = [...arguments]
    console.log(timeout)
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}


/**
 * @description: 文件转换成base64
 * @param {*} file
 * @return {*}
 */
const fileToDataURL = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = (e) => resolve((e.target ).result)
    reader.readAsDataURL(file)
  })
}
const dataURLToImage = (dataURL) => {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.src = dataURL
  })
}
// const canvastoFile = (canvas, type, quality) => {
//   return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), type, quality))
// }
/**
 * 图片压缩方法
 * @param {Object}  file 图片文件
 * @param {String} type 想压缩成的文件类型
 * @param {Nubmber} quality 压缩质量参数
 * @returns 压缩后的新图片
 */
export const compressionFile = async (file, type = "image/jpeg", quality = 0.5) => {

  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  const base64 = await fileToDataURL(file)
  const img = await dataURLToImage(base64)
  canvas.width = img.width
  canvas.height = img.height
  context.clearRect(0, 0, img.width, img.height)
  context.drawImage(img, 0, 0, img.width, img.height)
  const base64String = canvas.toDataURL(type, quality)
  return base64String
}

/**
 * @description: 兼容浏览器获取视频流的方法
 * @param {*} constrains
 * @return {*}
 */
export const getUserMedia=(constrains)=> {
  if (window.navigator.mediaDevices.getUserMedia) {
    return window.navigator.mediaDevices.getUserMedia(constrains)
  } else if (window.navigator.webkitGetUserMedia) {
    return window.navigator.webkitGetUserMedia(constrains)
  } else if (window.navigator.mozGetUserMedia) {
    return window.navigator.mozGetUserMedia(constrains)
  } else if (window.navigator.getUserMedia) {
    return window.navigator.getUserMedia(constrains)
  }
}

const momentStore = localforage.createInstance({
  name: "momentStore"
})
const socketStore = localforage.createInstance({
  name: "socketStore"
})

// momentStore.setDriver(localforage.SESSIONSTORAGE)
socketStore.setDriver(localforage.LOCALSTORAGE)
/**
 * @description: 
 * @param {*} image bas64字符串
 * @return {*} none
 */
export const setMometimageList=async (image)=>{
  // 获取当前会话存储的朋友圈图片
  const momentImageList=await momentStore.getItem("momentImageList")
  const newmomentImageList=momentImageList||[]   

  // 添加图片
  newmomentImageList.push({id:+new Date(),"image":image})
  // 存储到会话
  await momentStore.setItem("momentImageList",newmomentImageList)
  await momentStore.setItem("momnetImageListLength",newmomentImageList.length)
  // 通知订阅了 朋友圈数据更新的组件做更新
  emitter.emit("moment-store", "")
}

/**
 * @description: 
 * @param {*} key 通过key获取指定里面的参数
 * @return {*} 返回一个值
 */
export const getMomentItem=async (key)=>{
  const data=await momentStore.getItem(key)
 
  return data || []
}
/**
 * @description: 清空朋友圈存储的图片
 * @return {*}
 */
export const clearMomentItem=async()=>{
  momentStore.clear()
}
/**
 * @description: 
 * @param {*} key 通过key获取指定里面的参数
 * @return {*} 返回一个值
 */
export const getSocketItem=async (key)=>{
  const data=await socketStore.getItem(key)
  return data || []}

export const setSocketItem=async (key,value)=>{
  await socketStore.setItem(key,value)
}

export const  px2rem=(px)=>{
  if(/%/ig.test(px)){ // 有百分号%，特殊处理，表述pc是一个有百分号的数，比如：90%
    return px
  }else{
    if(px>=12){
      return (parseFloat(px) / 37.5) + "rem"
    }
    return px + "px"
  }
}
// 判断对象是否有某个属性
export const hasOwnProperty=(obj, key)=>{
  return Object.prototype.hasOwnProperty.call(obj, key)
}

export const  decryptData=(encryptedData,secretKey="12345678")=>{
  const keyBytes = CryptoJS.enc.Utf8.parse(secretKey)
  const encryptedBytes = CryptoJS.enc.Hex.parse(encryptedData)

  const decryptedBytes = CryptoJS.DES.decrypt(
    { ciphertext: encryptedBytes },
    keyBytes,
    {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: keyBytes,
    }
  )
  console.log("结果",CryptoJS.enc.Utf8.stringify(decryptedBytes))
  return CryptoJS.enc.Utf8.stringify(decryptedBytes)
}