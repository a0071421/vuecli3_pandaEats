import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './bus'
import currency from './filters/currency'
import date from './filters/date'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueClipboard from 'vue-clipboard2'
import 'bootstrap'

import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import { email, required, regex, max } from 'vee-validate/dist/rules'
extend('email', {
  ...email,
  message: '請輸入正確email格式:xxx@xxx.xxx'
})
extend('required', required)
extend('regex', {
  ...regex,
  message: '請輸入正確電話格式:09xxxxxxxx、02-xxxxxxxx'
})
extend('max', max)

localize('zh_TW', TW)

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueClipboard)
Vue.component('Loading', Loading)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
Vue.filter('currency', currency)
Vue.filter('date', date)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then(response => {
      if (response.data.success) {
        next()
      } else {
        next({ path: '/login' })
      }
    })
  } else {
    next()
  }
})
