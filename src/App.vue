<template>
  <div id="app" class="container">
    <encabezado></encabezado>
<!-- quitados los keep-alive /!-->
      <router-view></router-view>
    <pie></pie>
  </div>
</template>

<script>
import web3 from '../contracts/web3'
import Encabezado from './componentes/encabezado.vue'
import Pie from './componentes/pie.vue'
export default {
  name: 'App',
  components: {
    encabezado: Encabezado,
    pie: Pie
  }, beforeMount() {
    // Ponemos en proba la address actual, 
    // para los cambios en Metamask, cada 500ms
    window.setInterval(() => {
      web3.eth.getAccounts().then((accounts) => {
        if (this.$root.proba != accounts[0]) {
          this.$root.proba = accounts[0];
          console.log("Cambio de address: ",this.$root.proba);
        }
      })
    }, 500)
  }
}
</script>