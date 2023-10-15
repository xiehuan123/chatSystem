
import { pinyin } from "pinyin-pro"
import moment from "moment/moment"
export const getInitials = (str) => {
  const pinyins = pinyin(str, { pattern: "first" })
  const initials = pinyins.charAt(0).toUpperCase()
  return initials

}
export const getResultSort = (data) => {

  const result = []
  for (const key in data) {
    const first = getInitials(data[key]["nickname"])
    console.log(first)
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
export const getFormatTime = (time = null) => {
  if (!time) return moment().format("HH:mm:ss")
  return moment(time).format("HH:mm:ss")
}
// 防抖函数，非立即执行版本
export const debounce = (func, wait = 2000) => {
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
const canvastoFile = (canvas, type, quality) => {
  return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), type, quality))
}
/**
 * 图片压缩方法
 * @param {Object}  file 图片文件
 * @param {String} type 想压缩成的文件类型
 * @param {Nubmber} quality 压缩质量参数
 * @returns 压缩后的新图片
 */
export const compressionFile = async (file, type = "image/jpeg", quality = 0.5) => {
  const fileName = file.name
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  const base64 = await fileToDataURL(file)
  const img = await dataURLToImage(base64)
  canvas.width = img.width
  canvas.height = img.height
  context.clearRect(0, 0, img.width, img.height)
  context.drawImage(img, 0, 0, img.width, img.height)
  const blob = await canvastoFile(canvas, type, quality) // quality:0.5可根据实际情况计算
  const newFile = await new File([blob], fileName, {
    type: type
  })
  return newFile
}





