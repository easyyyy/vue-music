import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/iconfont/iconfont.css'
import VueTouch from 'vue-touch'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// require styles
import 'swiper/dist/css/swiper.css'
import axios from 'axios'
import FastClick from 'fastclick'
import { Tab, Tabs, ActionSheet, Toast, Circle, NavBar, Image, Slider, Search, Divider, Popup, Button } from 'vant'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.use(Tab).use(Tabs).use(ActionSheet).use(Popup).use(Button)
Vue.use(Toast).use(NavBar).use(Image)
Vue.use(Circle).use(Slider).use(Search).use(Divider)
// FastClick的ios点击穿透解决方案
FastClick.prototype.focus = function (targetElement) {
  let length
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length
    targetElement.focus()
    targetElement.setSelectionRange(length, length)
  } else {
    targetElement.focus()
  }
}
FastClick.attach(document.body)
Vue.prototype.$axios = axios
Vue.prototype.$musicApi = 'http://207.148.91.159:3000'

Vue.use(VueAwesomeSwiper)
Vue.use(VueTouch, { name: 'v-touch' })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    if (sessionStorage.getItem('vue-music-user') === null) {
      sessionStorage.setItem('vue-music-user', '')
    }
    this.$store.dispatch('setUser', sessionStorage.getItem('vue-music-user'))
  }
}).$mount('#app')
