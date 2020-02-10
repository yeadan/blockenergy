<template>
  <div id="app" class="container">
    <encabezado></encabezado>
<!-- quitados los keep-alive /!-->
      <router-view></router-view>
    <pie></pie>
  </div>
</template>

<script>
import Encabezado from './componentes/encabezado.vue'
import Pie from './componentes/pie.vue'
export default {
  name: 'App',
  components: {
    encabezado: Encabezado,
    pie: Pie
  }
}
</script>

<style>

</style>
