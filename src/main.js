import Vue from 'vue'
import App from './App.vue'
import { http } from './networking'
import router from './router'
import VueYoutube from 'vue-youtube'
import store from './store'
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents, {
  swipeTolerance: 50,
})
Vue.use(VueYoutube)

Vue.config.productionTip = false

Vue.prototype.$http = http
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
