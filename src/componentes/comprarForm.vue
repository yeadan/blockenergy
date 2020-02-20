<template>
<div class="container">
          <div class="row" v-if="Object.keys($root.ofertas).length > 0">
            <div  v-for="(oferta, index) in $root.ofertas" :key="index" >
              <div v-if="oferta.hecho == false" class="col-12">
              <div style="margin-top:5%" class="card text-center" >
                <img class="card-img-top" style="padding:5%" v-bind:src="blockie(oferta.vendedor)" v-bind:title=oferta.vendedor width="2">
                <p style="padding:5%;position: absolute;top: 15.5%;left: 50%;transform: translate(-50%, -50%);" v-bind:title=oferta.vendedor>Vendedor </p>
                <div class="card-block">
                  <p style="margin:5px" align="left" class="card-text"><small><strong>Precio: </strong>{{ oferta.precio }}€/kWh</small></p>
                  <p style="margin:5px" align="left" class="card-text"><small><strong>Cantidad: </strong>{{oferta.cantidad }}W</small></p>
                  <p style="margin:5px" align="left" class="card-text"><small><strong>Total: </strong>{{(oferta.cantidad/1000*oferta.precio).toFixed(2)}}€</small></p>
                  <button style="margin:5px" class="btn btn-success" :disabled="buttonOff" @click="comprar(oferta.vendedor,index)">Comprar</button>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div  v-else class="alert alert-danger" role="alert">
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
                    buttonOff: false
                }
            },
    mounted() {
      // Mostramos la batería de 'compras'
      $("#nivel").show()
      $("#disponible").hide()
      // Función para manejar el error de Metamask al cancelar las
      // transacciones. Si detecta el error, desbloquea los botones
      window.onerror = function(message, source, line, column, error) {
         if (error.message == 'Number.isInteger is not a function') {
          this.buttonOff = false
          $(':button').prop('disabled', false);
        }
      }
      //Coge todas las ofertas de la blockchain y las 
      //pasa a $root.ofertas
      energy.methods
      .returnAllAuctions()
      .call()
      .then((result) => {
        console.log(result)
        this.$root.ofertas = []
        var i=0
        for (i=0;i<result.length;i++) {
            this.$root.ofertas.push({
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
  methods: {
    // Comprueba que la address es la actual del Metamask
    comprueba: function (addr) {
      if (addr == this.$root.proba) return false
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
      let eth = parseFloat(document.getElementById("eth").innerHTML)  
      let gwei = parseInt((this.$root.ofertas[indice].precio/eth)*1000000000) //lo que cuesta en gwei

      //Bloqueamos botones
      this.buttonOff = true
      //Llamada al Smart Contract
      energy.methods.doneAuction(indice, gwei)
      .send({ from: this.$root.proba })
      .then(() => {
        //Actualizamos para vista más rápida
        this.$root.ofertas[indice].hecho = true;
        this.$root.ofertas[indice].gwei = gwei;
        //Desbloqueamos botones
        this.buttonOff = false
        return energy.methods.returnAllAuctions().call();
      })              
    }
  }
}
</script>
