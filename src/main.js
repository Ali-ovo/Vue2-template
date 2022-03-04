import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRx from 'vue-rx'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

Vue.prototype.isEmpty = function(obj) {
  // 检验null和undefined
  if (!obj && obj !== 0) {
    return true
  }
  // 检验数组

  if (Object.prototype.hasOwnProperty.call(obj, 'key') && obj.length === 0) {
    return true
  }
  // 检验对象
  if (Object.prototype.hasOwnProperty.call(obj, 'key') && Object.keys(obj).length === 0) {
    return true
  }
  return false
}

// 组filter
Vue.prototype.gjfilterFun = function(listQuery, filterItemArr = []) {
  let filter = ''
  for (const key in listQuery) {
    if (filterItemArr.indexOf(key) === -1 && !this.isEmpty(listQuery[key])) {
      let val = listQuery[key]
      if (typeof val === 'string') {
        val = val.replace('\n', ',')
      }
      filter += '%7C' + key + ':' + val
    }
  }
  if (filter.startsWith('%7C')) {
    filter = filter.substring(3)
  }

  return { filter: filter }
}

// 如果想要英文版 element-ui，按如下方式声明
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)
Vue.use(VueRx)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
