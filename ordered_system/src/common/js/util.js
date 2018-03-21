import axios from 'axios'
// 创建axios实例
const service = axios.create({
  timeout: 15000
})
// request拦截器
service.interceptors.request.use(config => {
  config.headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'openid': sessionStorage.getItem('openid')
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
    * code为非20000是抛错 可结合自己业务进行修改
    */
    const res = response
    if (res.status == 200) {
      // if (sessionStorage.getItem("authorization") == null || sessionStorage.getItem("authorization") == "" || sessionStorage.getItem("authorization") == "undefined") {
      //   if (res.headers.authorization != undefined) {
      //     sessionStorage.setItem("authorization", res.headers.authorization)
      //   }
      // }
      return res.data
    } else {
      return Promise.reject('error')
    }
  },
  error => {
    if (("" + error).indexOf("401") > -1) {
      // router.go(-1)
    }
    return Promise.reject(error)
  }
)

export default service
