import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Home.vue'
import Shop from '../components/shop/Shop.vue'
import Classification from '../components/classification/Classification.vue'
import My from '../components/my/My.vue'
import Login from '../components/login/Login.vue'
import Settlement from '../components/settlement/Settlement.vue'
import Address from '../components/address/Address.vue'
import AddressEdit from '../components/addressedit/AddressEdit.vue'
import Allorder from '../components/allorder/Allorder.vue'

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
