<template>
  <div class="row ">
    <div class="col">
      <h2 align="center"> Historial de ventas </h2>
      <div class="container">
        <div class="row" v-if="Object.keys(historial).length > 0">
          <div class="min-vw-75 max-hw-100" v-for="(oferta, index) in showHechoTrue" :key="index">
            <div class="card text-center col-11" >
              <div style="position:relative">
                <img class="card-img-top img-center"
                  v-bind:src="blockie(oferta.vendedor)" v-bind:title=oferta.vendedor >
                <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);" v-bind:title=oferta.vendedor>Vendedor </div>
              </div>
              <div class="card-block">
                <p align="left" class="card-text"><small><strong>Precio: </strong>{{ oferta.precio }}€/kWh</small></p>
                <p align="left" class="card-text"><small><strong>Cantidad: </strong> {{oferta.cantidad }}W</small></p>
                <p align="left" class="card-text"><small><strong>Total: </strong>{{(oferta.cantidad/1000*oferta.precio).toFixed(2)}}€</small></p>
                <p align="left" class="card-text"><small><strong>Eth: </strong>{{(oferta.gwei/1000000000).toFixed(7)}}Ξ </small></p>                  
                <p align="left" class="card-text"><small><strong>Fecha: </strong>{{ timestampToDate(oferta.id) }}</small></p>                  
                <div style="position:relative">
                  <img class="card-img"  v-bind:src="blockie(oferta.comprador)" v-bind:title=oferta.comprador width="2">
                  <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)" v-bind:title=oferta.comprador>Comprador </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="alert alert-danger" role="alert">
          Historial de ventas vacío
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
  data() { 
    return {
      historial: []
    }
  },
  components: {
    bateria: Bateria
  },
  mounted() {
    // Coge todas las ofertas de la blockchain y las pasa a historial
    energy.methods
    .returnAllAuctions()
    .call()
    .then((result) => {
      //console.log(result)
      this.historial = []
      var i=0
      for (i=0;i<result.length;i++) {
          this.historial.push({
            vendedor: result[i].seller,
            id: result[i].id,
            cantidad: result[i].amount,
            precio: result[i].price/1000,
            comprador: result[i].buyer,
            hecho: result[i].done,
            gwei: result[i].totalGWEI
          })
      }
    });
  },
  computed: {
    // Solo mostraremos en el v-for cuando oferta.hecho == true
    showHechoTrue: function () {
      return this.historial.filter(function (oferta) {
        return oferta.hecho == true
      })
    }
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

<style scoped>
img {
  padding:5%
}
h2 {
  margin-bottom:25px
}
</style>