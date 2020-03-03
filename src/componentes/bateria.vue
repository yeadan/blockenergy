<template>
<div class="container" align="center" >
  <div id="nivel">
    <p><small><strong>Nivel batería</strong>: {{nivelTotal}}W </small></p>
    <div class="container" style="position:relative">
      <img width="75%" src="../../public/bateria25.png" v-if="((nivelTotal/150))<25" />
      <img width="75%" src="../../public/bateria50.png" v-if="((nivelTotal/150))>25&&((nivelTotal/150))<51" />
      <img width="75%" src="../../public/bateria75.png" v-if="((nivelTotal/150))>50&&((nivelTotal/150))<76" />
      <img width="75%" src="../../public/bateria100.png" v-if="((nivelTotal/150))>76" />
      <div style="position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);"><small><strong>{{(nivelTotal/150).toFixed(1)}}%</strong></small></div>
    </div>
  </div>
  <div id="disponible" >
    <p><small><strong>Nivel disponible</strong>: {{((nivelTotal)-($root.globalTotal)).toFixed(0)}}W</small></p>
    <div class="container" style="position:relative">
      <img width="75%" src="../../public/bateria25.png" v-if="((nivelTotal/150)-($root.globalTotal/150))<25" />
      <img width="75%" src="../../public/bateria50.png" v-if="((nivelTotal/150)-($root.globalTotal/150))>25&&((nivelTotal/150)-($root.globalTotal/150))<51" />
      <img width="75%" src="../../public/bateria75.png" v-if="((nivelTotal/150)-($root.globalTotal/150))>50&&((nivelTotal/150)-($root.globalTotal/150))<76" />
      <img width="75%" src="../../public/bateria100.png" v-if="((nivelTotal/150)-($root.globalTotal/150))>76" />
      <div style="position: absolute;  top: 50%;  left: 50%;  transform: translate(-50%, -50%);"><small><strong>{{((nivelTotal/150)-($root.globalTotal/150)).toFixed(1)}}%</strong></small></div>
    </div>
  </div>
  <label style="padding-top:25px" class="" for="batery"><strong>Nivel</strong></label>
  <input step="100" :min="0" :max="15000" @input="updateValue"
    v-model="nivelTotal" type="number" name="batery" placeholder="W" class="form-control">
</div>
</template>
<script>
import web3 from '../../contracts/web3'
import energy from '../../contracts/energyInstance'

export default {
        data() { 
          return {
              nivelTotal: this.$root.batteryTotal
          }
        }, 
  methods: {    
    // Para el input de energía. Función prescindible
    //cuando esté implementada la batería
    updateValue(event) {
      var value = event.target.value
      if (value < 0) {
        this.nivelTotal = 0
        return
        } 
      if (value > 15000) {
        this.nivelTotal = 15000
        return
        }

      if (value <= 15000) {
        this.nivelTotal = value
      }
      this.$forceUpdate()
    }
  }
}
</script>


