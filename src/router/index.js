import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Me from '../views/Me.vue'
import MeAddress from '../views/MeAddress.vue'
import MeAddressEdit from '../views/MeAddressEdit.vue'
import MeAddressNew from '../views/MeAddressNew.vue'
import MeOrder from '../views/MeOrder.vue'
import Category from '../views/Category.vue'
import GoodDetail from '../views/GoodDetail.vue'
import ToBePay from '../views/ToBePay.vue'
import ToBeReceve from '../views/ToBeReceve.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  },
  {
    path: '/gooddetail',
    name: 'GoodDetail',
    component: GoodDetail
  },
  {
    path: '/me',
    name: 'Me',
    component: Me
  },
  {
    path: '/meaddress',
    name: 'MeAddress',
    component: MeAddress
  },
  {
    path: '/meaddressedit',
    name: 'MeAddressEdit',
    component: MeAddressEdit
  },
  {
    path: '/meaddressnew',
    name: 'MeAddressNew',
    component: MeAddressNew
  },
  {
    path: '/meorder',
    name: 'MeOrder',
    component: MeOrder
  },
  {
    path: '/tobepay',
    name: 'ToBePay',
    component: ToBePay
  },
  {
    path: '/tobereceve',
    name: 'ToBeReceve',
    component: ToBeReceve
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
