import Vue from 'vue'
import VueMeta from 'vue-meta'
import Vuetify from 'vuetify/lib'

import App from './App.vue'
import router from './router'
import store from './store'

import featureViscovery from '../src/feature-viscovery'

import 'vuetify/src/stylus/app.styl'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
  iconfont: 'md'
})


Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
})

Vue.component('feature-viscovery', featureViscovery)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
