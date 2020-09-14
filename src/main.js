import Vue from 'vue';
import App from './App.vue';
import store from './store'
import VueRouter from 'vue-router'
import { routes } from './rutas.js'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueRouter)

window.$ = window.jQuery = require('jquery')

Vue.use({
  install: function(Vue){
      Vue.prototype.$jQuery = require('jquery'); // you'll have this.$jQuery anywhere in your vue project
      }
  });

const router = new VueRouter({
  routes,
 mode: 'history'
})

const vm = new Vue({
  router,
  render: h => h(App),
  store
});

vm.$mount('#app');
