import axios from "axios"
import {BASE_URL} from "@/utils/CONFIG_ENUM"
import router from "@/router"
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
// 添加响应拦截器
client.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response && error.response.status === 401) {

      router.push({
        path:"/login"
      }) // 替换成你的未登录页面的路由
    }
    return Promise.reject(error)
  }
)
export async function request(config) {
  const result={
    "res":null,
    "err":null
  }
  try {
    const data = await client.request({ ...config })
    const res =data
    result["res"]=res
  } catch (error) {
    result["err"]=error
  }
  return  result
}

export default client