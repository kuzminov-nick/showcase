import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import CatalogView from "@/views/CatalogView.vue"
import Cart from "@/views/Cart.vue"
import Authorization from "@/views/Authorization.vue"
import E404 from "@/views/E404.vue"

const routes = [
  {
    path: '/',
    name: 'catalog',
    component: CatalogView,
    meta: { auth: true, layout: 'Default' }
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: { auth: true, layout: 'Default' }
  },
  {
    path: '/login',
    name: 'login',
    component: Authorization,
    meta: { layout: 'NoHeader' }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/:any(.*)',
    component: E404,
    meta: { layout: 'NoHeader' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let isLogin = store.getters['user/isLogin']

  if (to.name === 'login' && isLogin) {
    next({ name: from.name })
  } else if(to.meta.auth && !isLogin){
    next({ name: 'login' })
  } else{
    next()
  }
})

export default router
