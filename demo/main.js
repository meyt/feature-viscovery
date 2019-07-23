import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import 'vuetify/dist/vuetify.min.css'
import featureViscovery from '../src/feature-viscovery'

Vue.use(Vuetify, {
  iconfont: 'md'
})

Vue.component('feature-viscovery', featureViscovery)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
