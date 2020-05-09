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
    globalTotal: Number=0,      //Energía utilizada
    batteryTotal: Number=10000, //Energía en la batería
    proba: '',                  //Address actual
    ofertas: []                 //Array de ofertas
  },
  router,
  render: h => h(App)
});

vm.$mount('#app');
