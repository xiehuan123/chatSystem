import axios from "axios"
import {BASE_URL} from "../utils/const"
const client = axios.create({
  baseURL:BASE_URL,
  // baseURL: "http://127.0.0.1:5000", // 设置基准地址
  timeout: 5000, // 设置请求超时时间（单位：毫秒）
})
// 添加请求拦截器
client.interceptors.request.use(
  config => {
    // 从本地存储或其他地方获取 token
    const token = window.localStorage.getItem("token")||""
    // 设置 token 到请求头中
    if (token) {
      config.headers["Authorization"] = token
    }
    
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export async function request(config) {
  const result={
    "res":null,
    "err":null
  }
  try {
    const response = await client.request({ ...config })
    const res = response.data
    result["res"]=res
  } catch (error) {
    result["err"]=error
  }
  return  result
}

export default client