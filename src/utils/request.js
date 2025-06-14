// 实现网络请求的封装
import axios from 'axios'
import querystring from 'querystring'
import { ElMessage } from 'element-plus'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,// api 的 base_url
  timeout: 5000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 在请求发送之前做一些处理
    // 比如添加 token 等
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    if (config.method === 'post') {
      config.data = querystring.stringify(config.data)
    }
    return config
  },
  (error) => {
    // 处理请求错误
    ElMessage.error("请求发送失败")
    console.error('Request Error:', error)
    return Promise.reject(error)
  },
)
// response 拦截器
service.interceptors.response.use(
  (response) => {
    // 处理响应数据
    if (response.data && response.data.code === 0) {
      // 这里可以根据需要对响应数据进行处理
      ElMessage.success(response.data.msg||"操作成功")
      return Promise.reject(response.data)
    }
    ElMessage.error(response.data.msg||"操作失败")
    return Promise.reject(error)
  },
  (error) => {
    // 网络不通
    const { response } = error
    if (response) {
      ElMessage.error(response.data.msg||"网络错误")
      console.error('Response Error:', response)
      return Promise.reject(response.data)
    }
    console.error('Response Error:', error)
  },
)
export default service
