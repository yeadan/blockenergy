<template>
<div class="container" align="center" >
   <!-- <h3 align="left">Estado de la Batería</h3> -->
        <p v-if="((nivelTotal/150)-($root.batteryTotal/150))>0"><strong>Nivel batería</strong>: {{((nivelTotal)-($root.batteryTotal)).toFixed(0)}}W
        ( {{((nivelTotal/150)-($root.batteryTotal/150)).toFixed(1)}} %)</p>
        <p v-else><strong>Nivel batería</strong>: 0% </p>
        <p><strong>Energía disponible</strong>: {{((nivelTotal)-($root.globalTotal)).toFixed(0)}}W
        ( {{((nivelTotal/150)-($root.globalTotal/150)).toFixed(1)}} %)</p>
        <img width="75%" src="../../public/bateria25.png" v-if="((nivelTotal/150)-($root.batteryTotal/150))<25" />
        <img width="75%" src="../../public/bateria50.png" v-if="((nivelTotal/150)-($root.batteryTotal/150))>25&&((nivelTotal/150)-($root.batteryTotal/150))<51" />
        <img width="75%" src="../../public/bateria75.png" v-if="((nivelTotal/150)-($root.batteryTotal/150))>50&&((nivelTotal/150)-($root.batteryTotal/150))<76" />
        <img width="75%" src="../../public/bateria100.png" v-if="((nivelTotal/150)-($root.batteryTotal/150))>76" />
        <label style="padding-top:25px" class="" for="batery"><strong>Nivel</strong></label>
        <input v-model="nivelTotal" v-on:keyup.enter="nivelTotal" type="number" name="batery" placeholder="W" class="form-control">
        
</div>
</template>
<script>
import web3 from '../../contracts/web3'
import energy from '../../contracts/energyInstance'

export default {
        data() { 
                return {
                        nivelActual: 0,
                        nivelTotal: 0
                }
        }/*,
        mounted() {
                // Sumamons la energía ofertada para retirarla del
                // total utilizable
                // No utilizado de momento
                
                energy.methods
                .returnAllAuctions()
                .call()
                .then((result) => {
                        for (var i=0;i<result.length;i++) {
                                if (!result[i].done){
                                        this.nivelActual += parseInt(result[i].amount)
                                }
                        }
                })
        }*/
}
</script>


