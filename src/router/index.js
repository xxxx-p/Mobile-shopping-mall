import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../components/home/Home.vue')
const Shop = () => import('../components/shop/Shop.vue')
const Classification = () => import('../components/classification/Classification.vue')
const My = () => import('../components/my/My.vue')
const Login = () => import('../components/login/Login.vue')
const Settlement = () => import('../components/settlement/Settlement.vue')
const Address = () => import('../components/address/Address.vue')
const AddressEdit = () => import('../components/addressedit/AddressEdit.vue')
const Allorder = () => import('../components/allorder/Allorder.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/Classification',
    name: 'Classification',
    component: Classification
  },
  {
    path: '/My',
    name: 'My',
    component: My
  }, {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Settlement',
    name: 'Settlement',
    component: Settlement
  },
  {
    path: '/Address',
    name: 'Address',
    component: Address
  },
  {
    path: '/AddressEdit',
    name: 'AddressEdit',
    component: AddressEdit
  },
  {
    path: '/Allorder',
    name: 'Allorder',
    component: Allorder
  }
]

const router = new VueRouter({
  routes
})

export default router
