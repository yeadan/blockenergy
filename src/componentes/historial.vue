<template>
  <div class="jumbotron">
    <div class="row ">
      <div class="col">
        <h2 style="margin-bottom:25px" align="center"> Historial de ventas </h2>
        <div class="container">
          <div class="row" v-if="Object.keys($root.ofertas).length > 0">
            <div class=" min-vw-75 max-hw-100" v-for="(oferta, index) in $root.ofertas" :key="index">
              <div v-if="oferta.hecho == true"  class="card text-center col-11" >
                <img class="card-img-top img-center" style="padding:5%" 
                  v-bind:src="blockie(oferta.vendedor)" v-bind:title=oferta.vendedor >
                <p style="padding:5%;position: absolute;top: 15%;left: 50%;transform: translate(-50%, -50%);text-align: center;" v-bind:title=oferta.vendedor>Vendedor </p>
                <div class="card-block">
                  <p style="margin:5px" align="left" class="card-text"><small><strong>Precio: </strong>{{ oferta.precio }}€/kWh</small></p>
                  <p style="margin:5px" align="left" class="card-text"><small><strong>Cantidad: </strong> {{oferta.cantidad }}W</small></p>
                  <p style="margin:5px" align="left" class="card-text"><small><strong>Total: </strong>{{(oferta.cantidad/1000*oferta.precio).toFixed(2)}}€</small></p>
                  <p style="margin:5px" align="left" class="card-text"><small><strong>Eth: </strong>{{(oferta.gwei/1000000000).toFixed(7)}}Ξ </small></p>                  
                  <p style="margin:5px" align="left" class="card-text"><small><strong>Fecha: </strong>{{ timestampToDate(oferta.id) }}</small></p>                  
                  <img class="card-img" style="padding:5%" v-bind:src="blockie(oferta.comprador)" v-bind:title=oferta.comprador width="2">
                  <p style="padding:5%;position: absolute;top: 85%;left: 50%;transform: translate(-50%, -50%);text-align: center;" v-bind:title=oferta.comprador>Comprador </p>
                </div>
              </div>
            </div>
          </div>
          <div  v-else class="alert alert-danger" role="alert">
            Historial de ventas vacío
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
  components: {
    bateria: Bateria
  },
  mounted() {
    // Coge todas las ofertas de la blockchain y las pasa a $root.ofertas
    energy.methods
    .returnAllAuctions()
    .call()
    .then((result) => {
    console.log(result)
    this.$root.ofertas = []
    var i=0
    for (i=0;i<result.length;i++) {
      // Solo las hechas
      if (result[i].done) {
        this.$root.ofertas.push({
          vendedor: result[i].seller,
          id: result[i].id,
          cantidad: result[i].amount,
          precio: result[i].price/1000,
          comprador: result[i].buyer,
          hecho: result[i].done,
          gwei: result[i].totalGWEI
        })
      }
    }
    });
  },
  methods: {
    // Uso de la librería para crear blockies
    blockie: function (result) {
      if (result != undefined)
        return makeBlockie(result)
    },
    timestampToDate: function (timestamp) {
      var date = new Date(timestamp*1);
      return date.toLocaleString();
    }
  }
}
</script>