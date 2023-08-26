import axios from 'axios'

const client = axios.create({
   baseURL: 'http://49.235.114.194:7002', // 设置基准地址
   timeout: 5000, // 设置请求超时时间（单位：毫秒）
})
// 添加请求拦截器
client.interceptors.request.use(
   config => {
      // 从本地存储或其他地方获取 token
      const token = 'your_token_here';
      // 设置 token 到请求头中
      if (token) {
         config.headers['Authorization'] = `Bearer ${token}`;
      }
      config.headers['Content-Type'] = 'application/json';
      return config;
   },
   error => {
      return Promise.reject(error);
   }
);
const handleNetworkError = (errStatus) => {
   let errMessage = '未知错误'
   if (errStatus) {
      switch (errStatus) {
         case 400:
            errMessage = '错误的请求'
            break
         case 401:
            errMessage = '未授权，请重新登录'
            break
         case 403:
            errMessage = '拒绝访问'
            break
         case 404:
            errMessage = '请求错误,未找到该资源'
            break
         case 405:
            errMessage = '请求方法未允许'
            break
         case 408:
            errMessage = '请求超时'
            break
         case 500:
            errMessage = '服务器端出错'
            break
         case 501:
            errMessage = '网络未实现'
            break
         case 502:
            errMessage = '网络错误'
            break
         case 503:
            errMessage = '服务不可用'
            break
         case 504:
            errMessage = '网络超时'
            break
         case 505:
            errMessage = 'http版本不支持该请求'
            break
         default:
            errMessage = `其他连接错误 --${errStatus}`
      }
   } else {
      errMessage = `无法连接到服务器！`
   }
   return errMessage
}

export async function request(config) {
   try {
      const response = await client.request({ ...config })
      const result = response.data
      return result
   } catch (error) {
      throw new Error(error);
   }

}

export default client