import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'

Vue.prototype.$http = Axios;

const xtoken = localStorage.getItem('token')
if (xtoken) {
  Vue.prototype.$http.defaults.headers.common['x-auth-token'] = xtoken
}

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
