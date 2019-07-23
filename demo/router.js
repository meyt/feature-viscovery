import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home.vue'
import Coordinate from './views/coordinate.vue'
import AutoAim from './views/auto-aim.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/coordinate',
      name: 'coordinate',
      component: Coordinate
    },
    {
      path: '/auto-aim',
      name: 'autoaim',
      component: AutoAim
    }
  ]
})
