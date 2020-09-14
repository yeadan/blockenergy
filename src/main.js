import Vue from 'vue';
import App from './App.vue';
import swal from 'sweetalert'
import store from './store'
import VueRouter from 'vue-router'
import { routes } from './rutas.js'

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
