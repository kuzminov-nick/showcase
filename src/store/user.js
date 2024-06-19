export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    isLogin: state => !!state.user
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions: {
    setUser({ commit }, user) {
      localStorage.setItem('user', JSON.stringify(user))
      commit('setUser', user)
    },
    checkLogin({ commit }) {
      let user = localStorage.getItem('user')
      commit('setUser', user)
    }
  }
}