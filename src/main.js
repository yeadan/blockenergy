import Vue from 'vue';
import App from './App.vue';
import swal from 'sweetalert'
import VueRouter from 'vue-router'
import { routes } from './rutas.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
 mode: 'history'
})

const vm = new Vue({
  data: { 
    globalTotal: Number=0,
    batteryTotal: Number=0,
    proba: '',
    ofertas: []
  },
  router,
  render: h => h(App)
});

vm.$mount('#app');
