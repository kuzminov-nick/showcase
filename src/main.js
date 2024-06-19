import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

store.dispatch('user/checkLogin')
createApp(App).use(store).use(router).mount('#app')