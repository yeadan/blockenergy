import Vue from 'vue';
import App from './App.vue';
import store from './store'
import VueRouter from 'vue-router'
import { routes } from './rutas.js'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';

Vue.use(VueRouter)

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
