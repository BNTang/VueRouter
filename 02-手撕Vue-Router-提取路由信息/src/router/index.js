import Vue from 'vue'
import VueRouter from './NueTwo-Router'
import Home from '../views/Home'
import About from '../views/About'

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
