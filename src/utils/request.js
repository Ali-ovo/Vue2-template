import axios from 'axios'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // A modern alternative to CSS resets

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}


// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  //withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000,// request timeout
  headers: {
    'Accept': 'application/json',
    'Content-Type': "application/json;charset=utf-8",
  }
})


const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {

    // if (response.data.code == 0) return response.data

    // if (response.data.code == 1000001) {
    //   return Promise.reject(response.data.message)
    // }

    const { code = '' } = response.data
    // if (
    //   code.indexOf('TokenFailure.') === 0 ||
    //   code === 'AuthFailure.WechatDecodeMobileFailure' ||
    //   code.indexOf('AuthFailure.') === 0 ||
    //   code === 401
    // ) {
    //   return uni.navigateTo({
    //     url: "/pages/ChooseLogin/ChooseLogin",
    //   })
    // }
    return response.data
  }


  Message({
    message: codeMessage[response.status] || response.errMsg,
    type: 'error',
    duration: 5 * 1000
  })

  return Promise.reject(codeMessage[response.status] || response.errMsg)
}

// 请求拦截
service.interceptors.request.use(config => {
  NProgress.start()


  // config.headers.Authorization = 'Beraer eyJhbGciOiJIUzUxMiJ9.eyJleHRlbmQiOnt9LCJzdWIiOiI1NjA4NTc0MCIsImFkbWluIjpmYWxzZSwidXNlclR5cGUiOiJDIiwiZXhwIjoxNjM1NDc3MTg3LCJ1c2VySWQiOiIxNDM1MjAyOTgxMDYwNDY0NjQxIiwiaWF0IjoxNjMyODg1MTg3LCJ1c2VybmFtZSI6IjU2MDg1NzQwIn0.viimmjkfvyCmwm8Yf8YxsI6ozDbdisvl-vpZK_-E1hm9zCgAlpNxfzhsE9VrL8belq1BkqRWBpjMTAk7a745yw'


  // if (config.method === 'post') {
  // }
  // if (!!window.sessionStorage.ukeytoken) {
  //   config.headers.Authorization = window.sessionStorage.ukeytoken;
  // }

  return config
}, error => {
  // do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
}
)

// 响应拦截
service.interceptors.response.use(response => {
  const status = response.status

  NProgress.done()

  // const data = response.data
  // 不处理前台配置
  // if (response.config.url.includes('/app.config.json')) {
  //   return data;
  // }

  // if (data.result) {
  //   if (data.result === 'S')
  //     return data.attach || {};
  //   return Promise.reject(data.result + ',' + data.errorMsg || 'Error');
  // }
  // 可能是下载的文档流
  return response
}, error => {
  console.log(error + ' debug')
  Message({
    message: error.response.data.message || '操作失败!',
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)


export function switchReq({ method = 'GET', url, params }) {
  switch (method) {
    case 'GET':
      return service.get(url, { params: { ...params } })
    case 'POST':
      return service.post(url, params)
    case 'FORM':
      return service.post(url, {}, { params: { ...params } })
    default:
      return Promise.resolve({})
  }
}

export default function request(url, { params = {}, method = "GET" }) {
  if (!url) {
    console.log('发送了空的请求！')
    return undefined
  }


  return switchReq({ method, url, params })
    .then(checkStatus)
    .catch((error) => {
      console.log(error)
    })
}

