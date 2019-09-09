import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/iconfont/iconfont.css'
import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
