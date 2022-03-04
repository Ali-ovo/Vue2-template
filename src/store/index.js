import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const store = new Vuex.Store({
  modules: {
    settings,
    user
  },
  strict: debug
})

export default store
