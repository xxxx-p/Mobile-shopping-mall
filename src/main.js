import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible' //移动端rem适配
import "./assets/css/icon.css";
import "./assets/css/main.css";
Vue.config.productionTip = false;

/** vant组件库引入组件 */
import { Toast, Dialog, Cell, NavBar, Icon, SubmitBar, AddressList, AddressEdit, Popup, Picker, Tab, Tabs } from 'vant';
Vue.use(Toast)
Vue.use(Dialog);
Vue.use(Cell);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(SubmitBar);
Vue.use(AddressList);
Vue.use(AddressEdit);
Vue.use(Popup);
Vue.use(Picker);
Vue.use(Tab);
Vue.use(Tabs);


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
