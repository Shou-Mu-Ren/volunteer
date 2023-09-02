import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)

// 引入默认样式
import '../src/assets/css/reset.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

import axios from 'axios'
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
