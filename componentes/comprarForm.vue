<template>
  <div class="container">
    <div class="row" v-if="Object.keys(ofertas).length > 0">
      <div v-for="(oferta, index) in showHechoFalse" :key="index" >
        <div style="margin:5%" class="card text-center" >
          <div style="position: relative">
            <img class="card-img-top" v-bind:src="blockie(oferta.vendedor)" v-bind:title=oferta.vendedor width="2">     
            <div style="position: absolute;top: 50%;  left: 50%;;transform: translate(-50%, -50%);" v-bind:title=oferta.vendedor>Vendedor </div>
          </div>
          <div class="card-block">
            <p align="left" class="card-text"><small><strong>Precio: </strong>{{ oferta.precio }}€/kWh</small></p>
            <p align="left" class="card-text"><small><strong>Cantidad: </strong>{{oferta.cantidad }}W</small></p>
            <p align="left" class="card-text"><small><strong>Total: </strong>{{(oferta.cantidad/1000*oferta.precio).toFixed(2)}}€</small></p>
            <button class="btn btn-success boton" :disabled="buttonOff" @click="comprar(oferta.vendedor,index)">Comprar</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-danger" role="alert">
      Actualmente no hay ofertas disponibles
    </div>
  </div>
</template>
<script>
import web3 from '../../contracts/web3'
import energy from '../../contracts/energyInstance'
import makeBlockie from 'ethereum-blockies-base64'

export default {
      data(){ return {
                  buttonOff: false,
                  ofertas:[]
              }
            },
      beforeDestroy(){
        $("#disponible").show()
            },
      mounted() {
            //  $("#nivel").hide()
        $("#disponible").hide()
      // Función para manejar el error de Metamask al cancelar las
      // transacciones. Si detecta el error, desbloquea los botones
      window.onerror = function(message, source, line, column, error) {
         if (error.message == 'Number.isInteger is not a function') {
          this.buttonOff = false
          $('.boton').prop('disabled', false);
        }
      }
      // Coge todas las ofertas de la blockchain 
      //y las pasa a 'ofertas'
      energy.methods
      .returnAllAuctions()
      .call()
      .then((result) => {
        var i=0
        for (i=0;i<result.length;i++) {
            this.ofertas.push({
              vendedor: result[i].seller,
              hecho: result[i].done,
              id: result[i].id,
              cantidad: result[i].amount,
              precio: result[i].price/1000,
              gwei: result[i].totalGWEI
            })
        }
    });
  },
  computed: {
    // Solo mostraremos en el v-for cuando oferta.hecho == false
    showHechoFalse: function () {
      return this.ofertas.filter(function (oferta) {
        return oferta.hecho == false
      })
    }
  },
  methods: {
    // Comprueba que la address es la actual del Metamask
    comprueba: function (addr) {
      if (addr == this.$root.adress) return false
      else return true 
    },
    //Para las imágenes personalizadas (blockies) de cada address
    blockie: function (result) {
      return makeBlockie(result)
    },
    //Comprar energía en función de las ofertas que hay activas
    comprar: function (comprador,indice) {
      if (this.comprueba(comprador) == false) {
        swal('Error', 'No puedes comprar tu propia energía','error')
        return
      }
      if (this.ofertas[indice].cantidad + this.$root.batteryTotal > 15000) {
        swal('Error', 'No cabe tanta energía en tu batería','error')
        return
      }
      let eth = parseFloat(document.getElementById("eth").innerHTML)  
      let gwei = parseInt((this.ofertas[indice].precio/eth)*1000000000) //lo que cuesta en gwei

      //Bloqueamos botones
      this.buttonOff = true
      
      //Llamada al Smart Contract
      energy.methods.doneAuction(indice, gwei)
      .send({ from: this.$root.adress })
      .then(() => {
        //Actualizamos para vista más rápida
        this.ofertas[indice].hecho = true;
        this.ofertas[indice].gwei = gwei;
        //Desbloqueamos botones
        this.buttonOff = false
        return energy.methods.returnAllAuctions().call();
      })              
    }
  }
}
</script>
<style scoped>
img {
  padding:5%
}
.boton {
  margin:5px
}
.card-text {
  margin:5px
}
</style>