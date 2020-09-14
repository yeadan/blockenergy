<template>
  <div class="container">
    <div class="row" v-if="Object.keys(ofertas).length > 0">
      <div v-for="(oferta, index) in ofertas" :key="index" >
        <div v-if="oferta.hecho == false" style="margin:5%" class="card text-center" >
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
//import web3 from '../../contracts/web3'
import energy from '../../contracts/energyInstance'
import makeBlockie from 'ethereum-blockies-base64'
import swal from 'sweetalert'

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
        $("#disponible").hide()
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
  methods: {
    // Comprueba que la address es la actual del Metamask
    comprueba: function (addr) {
      if (addr == this.$store.getters.getAddress) return false
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
      if (Number(this.ofertas[indice].cantidad) + this.$store.getters.getTotal > 15000) {
        swal('Error', 'No cabe tanta energía en tu batería','error')
        return
      }
      let eth = parseFloat(document.getElementById("eth").innerHTML)  
      let gwei = parseInt((this.ofertas[indice].precio/eth)*1000000000) //lo que cuesta en gwei

      //Bloqueamos botones
      this.buttonOff = true
      
      // Alert de transacción
      swal("Transacción procesándose...", {
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
        //Pondremos 2 minutos de tiempo máximo por seguridad
        timer: 120000,
      })
      //Llamada al Smart Contract  
      energy.methods.doneAuction(indice, gwei)
      .send({ from: this.$store.getters.getAddress })
      .then(() => {
        //Actualizamos para vista más rápida
        this.ofertas[indice].hecho = true;
        this.ofertas[indice].gwei = gwei;
        //Desbloqueamos botones
        this.buttonOff = false
        swal.close()
        swal({
          title: "Transacción realizada!",
          text: "Se ha terminado de procesar la transacción",
          icon: "success",
          button: "Ok",
        });
        return energy.methods.returnAllAuctions().call();
      }).catch (() => {
        this.buttonOff = false
        swal.close()
        swal({
          title: "Transacción no completada!",
          text: "Se ha encontrado algún error durante la transacción",
          icon: "error",
          button: "Ok",
        })
        $('.boton').prop('disabled', false)
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