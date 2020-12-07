<template>
  <div
    class="container"
    style="position: relative; height: auto !important; min-height: 100%"
  >
    <div class="row" v-if="Object.keys(ofertas).length > 0">
      <div
        class="col-lg-4 col-md-6 col-sd-12"
        v-for="(oferta, index) in ofertas"
        :key="index"
        :id="index"
      >
        <div class="card mb-4" :class="index">
          <table class="text-center" align="center">
            <div :class="index" class="iblock">
              <img
                style="width: 100%; padding-top: 10px; padding-bottom: 10px"
                v-bind:src="blockie(oferta.vendedor)"
                v-bind:title="oferta.vendedor"
              />
              <div class="icentered" v-bind:title="oferta.vendedor">
                Vendedor
              </div>
            </div>
          </table>

          <table :class="index" class="text-center" align="center">
            <th style="width: 45%">Precio</th>
            <th style="width: 10%"></th>
            <th style="width: 45%">Cantidad</th>
            <tbody>
              <td>{{ oferta.precio }}€/kWh</td>
              <td></td>
              <td>{{ oferta.cantidad }}W</td>
            </tbody>
          </table>
          <table class="text-center" align="center">
            <tbody>
              <td style="width: 45%">
                <strong>Total </strong><br />{{
                  ((oferta.cantidad / 1000) * oferta.precio).toFixed(2)
                }}€
              </td>
              <td style="width: 10%"></td>
              <td style="width: 45%">
                <button
                  class="btn btn-success btn-sm boton"
                  :disabled="buttonOff"
                  @click="comprar(oferta.vendedor, index)"
                >
                  Comprar
                </button>
              </td>
            </tbody>
          </table>
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
import energy from "../../contracts/energyInstance";
import makeBlockie from "ethereum-blockies-base64";
import swal from "sweetalert";
import { ACTION_CHANGE_BATTERY_TOTAL } from "./../store/app.store";
import $ from "jquery";

export default {
  data() {
    return {
      buttonOff: false,
      ofertas: [],
    };
  },
  beforeDestroy() {
    $("#disponible").show();
  },
  mounted() {
    $("#disponible").hide();
    // Coge todas las ofertas de la blockchain
    //y las pasa a 'ofertas'
    energy.methods
      .returnAllAuctions()
      .call()
      .then((result) => {
        var i = 0;
        for (i = 0; i < result.length; i++) {
          this.ofertas.push({
            vendedor: result[i].seller,
            hecho: result[i].done,
            id: result[i].id,
            cantidad: result[i].amount,
            precio: result[i].price / 1000,
            gwei: result[i].totalGWEI,
          });
        }
      });
  },
  updated() {
    let i;
    for (i = 0; i < this.ofertas.length; i++) {
      if (this.ofertas[i].hecho) {
        console.log(i);
        $("#" + i).hide();
        $("." + i).hide();
      }
    }
  },
  methods: {
    // Comprueba que la address es la actual del Metamask
    comprueba: function (addr) {
      if (addr == this.$store.getters.getAddress) return false;
      else return true;
    },
    //Para las imágenes personalizadas (blockies) de cada address
    blockie: function (result) {
      return makeBlockie(result);
    },
    //Comprar energía en función de las ofertas que hay activas
    comprar: function (comprador, indice) {
      if (this.comprueba(comprador) == false) {
        swal("Error", "No puedes comprar tu propia energía", "error");
        return;
      }
      if (
        Number(this.ofertas[indice].cantidad) + this.$store.getters.getTotal >
        15000
      ) {
        swal("Error", "No cabe tanta energía en tu batería", "error");
        return;
      }
      let eth = parseFloat(document.getElementById("eth").innerHTML);
      let gwei = parseInt((this.ofertas[indice].precio / eth) * 1000000000); //lo que cuesta en gwei

      //Bloqueamos botones
      this.buttonOff = true;

      // Alert de transacción
      swal("Transacción procesándose...", {
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
        //Pondremos 2 minutos de tiempo máximo por seguridad
        timer: 120000,
      });
      //Llamada al Smart Contract
      energy.methods
        .doneAuction(indice, gwei)
        .send({ from: this.$store.getters.getAddress })
        .then(() => {
          //Actualizamos para vista más rápida
          this.ofertas[indice].hecho = true;
          this.ofertas[indice].gwei = gwei;
          //Desbloqueamos botones
          this.buttonOff = false;
          swal.close();
          swal({
            title: "Transacción realizada!",
            text: "Se ha terminado de procesar la transacción",
            icon: "success",
            button: "Ok",
          });
          this.$store.dispatch(
            ACTION_CHANGE_BATTERY_TOTAL,
            Number(this.ofertas[indice].cantidad) + this.$store.getters.getTotal
          );
          return energy.methods.returnAllAuctions().call();
        })
        .catch((error) => {
          this.buttonOff = false;
          console.log(error);
          swal.close();
          swal({
            title: "Transacción no completada!",
            text: "Se ha encontrado algún error durante la transacción",
            icon: "error",
            button: "Ok",
          });
          $(".boton").prop("disabled", false);
        });
    },
  },
};
</script>
<style scoped>
.iblock {
  position: relative;
  text-align: center;
  color: white;
}

/* Centered text */
.icentered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  letter-spacing: 0.05em
}
table {
  padding: 10px;
}
</style>