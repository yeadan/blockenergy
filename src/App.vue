<template>
  <div id="app" class="container">
    <encabezado></encabezado>
<!-- quitados los keep-alive /!-->
    <div class="jumbotron my-0" style="position:relative">
      <div id="price" style=" position: absolute;top: 8px;right: 16px;">
        <label class="h6">Precio Ether </label>
        <span class="bg-white px-1 h6" id="eth"></span>
      </div>
      <router-view></router-view>
    </div>
    <pie></pie>
  </div>
</template>

<script>
import web3 from '../contracts/web3'
import Encabezado from './componentes/encabezado.vue'
import Pie from './componentes/pie.vue'
export default {
  name: 'App',
  components: {
    encabezado: Encabezado,
    pie: Pie
  }, beforeMount() {
    // Ponemos en proba la address actual, 
    // para los cambios en Metamask, cada 500ms
    window.setInterval(() => {
      web3.eth.getAccounts().then((accounts) => {
        if (this.$root.proba != accounts[0]) {
          this.$root.proba = accounts[0];
          console.log("Cambio de address: ",this.$root.proba);
        }
      })
    }, 500)
    //Llamamos a la función que coge el precio del Eth
    this.getEtherPrice()
    this.getBatteryLevel()
  }, methods: {
    //Función para coger el valor actual de Eth, de cryptocompare.com
    getEtherPrice: function (){
        let url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR'
        $.ajax({url: url, success: function(result){
        $("#eth").html(result.EUR+"€")
        }})
    },
    getBatteryLevel: function (){
      //Mientras no haya batería real, capturaremos un 
      // número random externamente para simularla
      let url ='https://www.random.org/integers/?num=1&min=10000&max=15000&col=1&base=10&format=plain&rnd=new'
      $.ajax({url: url, success: function(result){
        console.log("Total de la batería: "+result)
        }}).then( (value) => {
                this.$root.batteryTotal = value
            })
        
    }
  }
}
</script>