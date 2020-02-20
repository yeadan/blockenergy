<template>
<div class="container" align="center" >
        <div id="nivel">
        <p ><small><strong>Nivel batería</strong>: {{nivelTotal}}W
        ( {{(nivelTotal/150).toFixed(1)}} %)</small></p>
        <img width="75%" src="../../public/bateria25.png" v-if="((nivelTotal/150))<25" />
        <img width="75%" src="../../public/bateria50.png" v-if="((nivelTotal/150))>25&&((nivelTotal/150))<51" />
        <img width="75%" src="../../public/bateria75.png" v-if="((nivelTotal/150))>50&&((nivelTotal/150))<76" />
        <img width="75%" src="../../public/bateria100.png" v-if="((nivelTotal/150))>76" />
        </div>
        <div id="disponible">
        <p><small><strong>Nivel disponible</strong>: {{((nivelTotal)-($root.globalTotal)).toFixed(0)}}W
        ( {{((nivelTotal/150)-($root.globalTotal/150)).toFixed(1)}} %)</small></p>
        <img width="75%" src="../../public/bateria25.png" v-if="((nivelTotal/150)-($root.globalTotal/150))<25" />
        <img width="75%" src="../../public/bateria50.png" v-if="((nivelTotal/150)-($root.globalTotal/150))>25&&((nivelTotal/150)-($root.globalTotal/150))<51" />
        <img width="75%" src="../../public/bateria75.png" v-if="((nivelTotal/150)-($root.globalTotal/150))>50&&((nivelTotal/150)-($root.globalTotal/150))<76" />
        <img width="75%" src="../../public/bateria100.png" v-if="((nivelTotal/150)-($root.globalTotal/150))>76" />
         </div>
        <label style="padding-top:25px" class="" for="batery"><strong>Nivel</strong></label>
        <input step="100" :min="0" :max="15000" @input="updateValue"
        v-model="nivelTotal" type="number" name="batery" placeholder="W" class="form-control">
        <hr>
        <label class="h6">Precio Ether </label>
        <span style="background-color:#fff" class="h6" id="eth"></span>
</div>
</template>
<script>
import web3 from '../../contracts/web3'
import energy from '../../contracts/energyInstance'

export default {
        data() { 
                return {
                     //   nivelActual: 0,
                        nivelTotal: this.$root.batteryTotal
                }
        }, 
  beforeMount() {
    // Cogeremos el precio actual del Ether
    this.getEtherPrice()
  },
  methods: {
    //Función para coger el valor actual de Ethe, de cryptocompare.com
    getEtherPrice: function (){
        let url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR'
        $.ajax({url: url, success: function(result){
        $("#eth").html(result.EUR+"€")
        }})
    },
    //Para el input de energía. Función prescindible.
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


