<template>
      <div class="container">
        <div class="row" v-if="Object.keys(historial).length > 0">
          <div class="d-flex align-items-stretch min-vw-75 max-hw-100" v-for="(oferta, index) in showHechoTrue" :key="index">
            <div class="card mb-2 text-center col-11" >
              <div style="position:relative">
                <img class="card-img-top img-center align-items-stretch"
                  v-bind:src="blockie(oferta.vendedor)" v-bind:title="oferta.vendedor" >
                <div style="color:white;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);" v-bind:title="oferta.vendedor">Vendedor </div>
              </div>
              <div class="card-block">
                <p align="left" class="card-text"><small><strong>Precio: </strong>{{ oferta.precio }}€/kWh</small></p>
                <p align="left" class="card-text"><small><strong>Cantidad: </strong> {{oferta.cantidad }}W</small></p>
                <p align="left" class="card-text"><small><strong>Total: </strong>{{(oferta.cantidad/1000*oferta.precio).toFixed(2)}}€</small></p>
                <p align="left" class="card-text"><small><strong>Eth: </strong>{{(oferta.gwei/1000000000).toFixed(7)}}Ξ </small></p>                  
                <p align="left" class="card-text"><small><strong>Fecha: </strong>{{ timestampToDate(oferta.id) }}</small></p>                  
                <div style="position:relative">
                  <img class="card-img"  v-bind:src="blockie(oferta.comprador)" v-bind:title="oferta.comprador" width="2">
                  <div style="color:white;position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%)" v-bind:title="oferta.comprador">Comprador </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="alert alert-danger" role="alert">
          Historial de ventas vacío
        </div>
      </div>
</template>

<script>
import energy from '../../contracts/energyInstance'
import makeBlockie from 'ethereum-blockies-base64'
import $ from 'jquery'

export default {
  data() { 
    return {
      historial: []
    }
  },
  mounted() {
    $("#myTitle").text("Historial de ventas");

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
  destroyed() {
    $("#myTitle").text("");
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
p {
  padding-left:9%
}
img {
  padding:9%
}
h2 {
  margin-bottom:15%
}
</style>