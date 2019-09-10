import Vue from 'vue'
import App from './App.vue'
import axios from './networking'
import router from './router'
import VueYoutube from 'vue-youtube'
import store from './store'

Vue.use(VueYoutube)

Vue.config.productionTip = false

Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
