import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import './assets/css/main.css'
import './assets/icon/iconfont.css'
import admin from './store/admin'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios';
import VueAxios from "vue-axios";

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(VueAxios,axios)
Vue.use(router)


new Vue({
  el: '#app',
  router: router,
  store: new Vuex.Store(admin),
  render: h => h(App)
})
