
import { marketStatus, homeNewStock, saveSearchHityory } from "@/utils/api"
import request from '@/utils/request'


const state = {
  fixedHeader: false,
  sidebarLogo: false,
  sidebar: {
    opened: true,
    withoutAnimation: false
  },
  device: 'desktop'
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },

  async marketStatus({ commit, state }, { payload, callback }) {
    const response = await marketStatus(payload)
    callback && callback(response)
  },
  // 盘中指数数据
  async homeNewStock({ commit, state }, { payload, callback }) {
    const response = await homeNewStock(payload)
    callback && callback(response)
  },



  async saveSearchHityory({ commit, state }, { payload, callback }) {
    const response = await saveSearchHityory(payload)
    callback && callback(response)
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

