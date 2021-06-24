import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import Vant from 'vant';
import 'vant/lib/index.css';
import { Toast } from 'vant';

Vue.use(Toast);

Vue.prototype.$axios = axios
Vue.prototype.baseurl = 'http://10.20.59.41:8024'

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
