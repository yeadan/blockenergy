<template>
<div class="container" align="center" >
  <div id="nivel">
    <p><small><strong>Nivel batería</strong>: {{this.$root.batteryTotal}}W </small></p>
    <div class="container" style="position:relative">
      <img width="75%" src="../../public/bateria25.png" v-if="((this.$root.batteryTotal/150))<25" />
      <img width="75%" src="../../public/bateria50.png" v-if="((this.$root.batteryTotal/150))>25&&((this.$root.batteryTotal/150))<51" />
      <img width="75%" src="../../public/bateria75.png" v-if="((this.$root.batteryTotal/150))>50&&((this.$root.batteryTotal/150))<76" />
      <img width="75%" src="../../public/bateria100.png" v-if="((this.$root.batteryTotal/150))>76" />
      <div style="position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);"><small><strong>{{(this.$root.batteryTotal/150).toFixed(1)}}%</strong></small></div>
    </div>
  </div>
  <div id="disponible" >
    <hr>
    <p><small><strong>Nivel disponible</strong>: {{((this.$root.batteryTotal)-($root.globalTotal)).toFixed(0)}}W</small></p>
    <div class="container" style="position:relative">
      <img width="75%" src="../../public/bateria25.png" v-if="((this.$root.batteryTotal/150)-($root.globalTotal/150))<25" />
      <img width="75%" src="../../public/bateria50.png" v-if="((this.$root.batteryTotal/150)-($root.globalTotal/150))>25&&((this.$root.batteryTotal/150)-($root.globalTotal/150))<51" />
      <img width="75%" src="../../public/bateria75.png" v-if="((this.$root.batteryTotal/150)-($root.globalTotal/150))>50&&((this.$root.batteryTotal/150)-($root.globalTotal/150))<76" />
      <img width="75%" src="../../public/bateria100.png" v-if="((this.$root.batteryTotal/150)-($root.globalTotal/150))>76" />
      <div style="position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);"><small><strong>{{((this.$root.batteryTotal/150)-($root.globalTotal/150)).toFixed(1)}}%</strong></small></div>
    </div>
  </div>
</div>
</template>
<script>
import web3 from '../../contracts/web3'
import energy from '../../contracts/energyInstance'

export default {
  data() { 
    return {
        
    }
  }, 
       
  methods: {    
    // Para el input de energía. Función prescindible
    //cuando esté implementada la batería
    
  }
}
</script>


