export default {
  namespaced: true,
  state: {
    cartItems: [],
  },
  getters: {
    cartItems: state => state.cartItems,
    cartItem: state => (id) => state.cartItems.find(item => item.id === id),
    // productInCart: state => (id) => state.cartItems.some(item => item.id === id),
    totalCount: state => state.cartItems.reduce((sum, current) => sum + current.count, 0)
  },
  mutations: {
    addToCart(state, product) {
      state.cartItems.push({ ...product, count: 1})
    },
    removeFromCart(state, id) {
      state.cartItems = state.cartItems.filter(item => item.id !== id)
    },
    setCount(state, { id, count }) {
      state.cartItems.find(item => item.id === id).count = count
    }
  },
  actions: {
    addToCart({ commit }, product) {
      commit('addToCart', product)
    },
    removeFromCart({ commit }, id) {
      commit('removeFromCart', id)
    },
    setCount({ commit, getters }, { id, count }) {
      if(getters.cartItem(id)) {
        if(!count) {
          commit('removeFromCart', id)
        } else {
          commit('setCount', { id, count })
        }
      }
    }
  }
}