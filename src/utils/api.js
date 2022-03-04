import request from '@/utils/request'

// const Urls = {
//   'development': {
//     'info': '开发环境API',
//     'tableUrl': 'http://172.28.210.103:13001' // http://192.168.3.179:8035 http://101.132.154.28:8211
//   },
//   'production': {
//     'info': '生产环境API',
//     'tableUrl': 'http://101.132.154.28:8211'
//   }
// }

// const apiUrl = Urls[process.env.NODE_ENV].tableUrl


export async function marketStatus(params) {
  return request('/stockit/v1/market/status', {
    method: 'GET',
    params
  })
}

export async function homeNewStock(params) {
  return request('/stockit/v1/stock/data-app/trade/reminder/ipo', {
    method: 'GET',
    params
  })
}

export async function saveSearchHityory(params) {
  return request('/gwapi/tpfm/v1/search-history/save', {
    method: "POST",
    params
  })
}




