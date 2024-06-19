import * as productsApi from "@/api/products"

export default {
  namespaced: true,
  state: {
    products: [],
    filters: {
      category: 'All',
      minPrice: '',
      maxPrice: ''
    },
    allBtnText: 'All'
  },
  getters: {
    products: state => state.products,
    updatedProducts: state => {
      let { category, minPrice, maxPrice } = state.filters

      return state.products.filter(product => {
        const byCategory = category === state.allBtnText ? true : product.category === category
        const byMinPrice = minPrice === '' ? true : product.price >= minPrice
        const byMaxPrice = maxPrice === '' ? true : product.price <= maxPrice

        return byCategory && byMinPrice && byMaxPrice
      })
    },
    filters: state => state.filters,
    allBtnText: state => state.allBtnText,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    setFilters(state, filters) {
      state.filters = filters
    },
  },
  actions: {
    async loadProducts({ commit }) {
      const products = await productsApi.getProducts()

      commit('setProducts', products)

      return products
    },
    setProducts({ commit }, products) {
      commit('setProducts', products)
    },
    setFilters({ commit }, filters) {
      commit('setFilters', filters)
    }
  }
}