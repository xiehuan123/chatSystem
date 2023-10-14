
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
export const debounce = (func, wait=2000) => {
  let timeout=null
  
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



