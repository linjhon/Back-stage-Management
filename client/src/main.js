import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import store from './store';
import {
  routes
} from './routes';
import iView from 'iview';
import axios from 'axios';
import Vueaxios from 'vue-axios';
import './my-theme/index.less';



Vue.use(iView);
Vue.use(VueRouter);
Vue.use(Vueaxios, axios);

const router = new VueRouter({
  routes: routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  // console.log(to)
  // var token = localStorage.getItem('access_token') || '' ;
  // next(vm=>{
  //   if(token){
  //     vm.$http.post('http://localhost:3000/user/token',{token:token}).then(res=>{
  //       if(res.code === '500' ){
  //         vm.$Message.error('登陆超时或无效！');
  //         console.log(res)
  //         vm.$store.state.login = false;
  //       }else if(res.code === '304' || res.code === '200' ){
  //         vm.$store.state.login = true;
  //       }
  //     })
  //   }else{
  //     vm.$store.state.login = false;
  //   }
  // })
  iView.LoadingBar.start();
  var token = JSON.parse(localStorage.getItem('access_token')) || '';
  console.log(token)
  store.state.currentName = token.name;
  console.log(store.state.currentName)
  next()
})

iView.LoadingBar.config({
  color: '#FF9000',
  failedColor: '#f0ad4e'
})

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
});


new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})