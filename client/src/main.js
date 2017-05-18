import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {routes} from './routes';
import iView from 'iview';
import axios from 'axios';
import Vueaxios from 'vue-axios';
import './my-theme/index.less';

Vue.use(iView);
Vue.use(VueRouter);

Vue.use(Vueaxios,axios);
const router = new VueRouter({
  routes:routes,
  mode:'history'

});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
