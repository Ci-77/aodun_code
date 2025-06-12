// 实现网络请求的封装
import axios from 'axios'
import querystring from 'querystring'

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
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
    console.error('Request Error:', error)
    return Promise.reject(error)
  },
)
// response 拦截器
service.interceptors.response.use(
  (response) => {
    // 处理响应数据
    if (response.status === 200) {
      // 这里可以根据需要对响应数据进行处理
      return response.data
    }
    return Promise.reject(error)
  },
  (error) => {
    // 网络不通
    const { response } = error
    if (response) {
      console.error('Response Error:', response)
      return Promise.reject(response.data)
    }
    console.error('Response Error:', error)
  },
)
