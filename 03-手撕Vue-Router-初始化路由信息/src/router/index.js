import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from './Nue-Router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'hash', // #/home /home
  base: process.env.BASE_URL,
  routes
})

export default router
