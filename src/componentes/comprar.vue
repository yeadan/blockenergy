<template>
  <div class="jumbotron">
    <div class="row align-items-center">
      <div class="col-3">
        <bateria></bateria>
      </div>
      <div class="col-9">
        <h2 style="margin-bottom:25px" align="center"> Ofertas de energía </h2>
        <div class="container">
          <div class="row" v-if="Object.keys($root.ofertas).length > 0">
            <div  v-for="(oferta, index) in $root.ofertas" :key="index" >
              <div v-if="oferta.hecho == false">
              <div style="margin-top:5%" class="card text-center col-11" >
                <img class="card-img-top" style="padding:5%" v-bind:src="blockie(oferta.vendedor)" v-bind:title=oferta.vendedor width="2">
                <p style="padding:5%;position: absolute;top: 15.5%;left: 50%;transform: translate(-50%, -50%);" v-bind:title=oferta.vendedor>Vendedor </p>
                <div class="card-block">
                 <!-- <p class="card-header"> {{ oferta.vendedor }}</p> /!-->
                  <p style="margin:5px" align="left" class="card-text"><strong>Precio: </strong><small>{{ oferta.precio }}€/Wh</small></p>
                  <p style="margin:5px" align="left" class="card-text"><strong>Cantidad: </strong><small>{{oferta.cantidad }}W</small></p>
                  <p style="margin:5px" align="left" class="card-text"><strong>Total: </strong><small>{{(oferta.cantidad/1000*oferta.precio).toFixed(2)}}€</small></p>
                  <button style="margin:5px" class="btn btn-success" @click="comprar(oferta.vendedor,index)">Comprar</button>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div  v-else class="alert alert-danger" role="alert">
            Actualmente no hay ofertas disponibles
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Bateria from './bateria.vue'
import web3 from '../../contracts/web3'
import energy from '../../contracts/energyInstance'
import makeBlockie from 'ethereum-blockies-base64'

export default {
  name: 'APP',
  components: {
    bateria: Bateria
  },
    beforeMount(){
      this.ofertar()
    },
    mounted() {
      // Coge todas las ofertas de la blockchain y las 
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
              precio: result[i].price,
            })
        }
        console.log(this.$root.ofertas)
    });
  },
  methods: {
    ofertar: function () {
      web3.eth.getAccounts().then((accounts) => {
                    this.$root.proba = accounts[0];
                    console.log(this.$root.proba)
      })
    },
    prueba: function (sergio) {
      if (sergio == this.$root.proba) return false
      else return true 
    },
    blockie: function (result) {
      return makeBlockie(result)
    },
    comprar: function (comprador,indice) {
      if (this.prueba(comprador) == false) {
        swal('Error', 'No puedes comprar tu propia energía','error')
        return
      }
      energy.methods.
      doneAuction(indice)
      .send({ from: this.$root.proba })
      .then(() => {
        // Actualizamos para vista más rápida
        this.$root.ofertas[indice].hecho = true;
        //console.log(accounts[0])
      return energy.methods.returnAllAuctions().call();
      })    
      // Actualiza los valores de la batería y el globalTotal
      // *** Uso de la batería desactualizado ***
      //this.$root.batteryTotal += parseInt(this.$root.ofertas[oferta_id].cantidad)
    }
  }
}
</script>

