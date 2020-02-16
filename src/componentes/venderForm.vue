<template>
    <div class="container">
        <!-- Formulario para añadir ofertas -->
        <!-- Quitadas actualizaciones 8-02-20 -->
        <section class="form">
            <form action="" align="center" >
                <div class=" form-group row">
                    <label for="cantidad" class="col-2 col-form-label"><strong>Cantidad</strong> </label>
                    <input required name="cantidad" id="cantidad" v-model="cantidad" v-on:keyup.enter="crearOferta" type="number" class="col-3 form-control" placeholder="W">
                    <p class="col-1"></p>
                    <h5 class="col-4 col-form-label"  align="left"> <strong>Total</strong> {{(cantidad/1000*precio).toFixed(2)}} €</h5>
                    <p class="col-2"></p>
                    <label class="col-2 col-form-label" for="precio"><strong>Precio</strong></label>
                    <input v-model="precio" v-on:keyup.enter="crearOferta" type="number" name="precio" placeholder="€/Wh" class="col-3 form-control">
                    <p class="col-1"></p>
                <!-- Botón para añadir -->
                    <input align="left" :disabled="buttonOff" @click="crearOferta" type="button" value="Añadir" class="col-2 btn btn-success form-control">
                </div>
            </form>
        </section>
        <!-- Tabla donde se muestran los datos -->
        <section class="data">
            <caption>Ofertas</caption>
            <table class="table" >
                <thead>
                    <tr>
                 <!--<th scope="col">id</th>!-->
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(oferta, index) in $root.ofertas " :key="index">
                        <!--<td>{{ oferta.id }}</td>!-->
                        <td v-if="oferta.hecho == false">
                            <span >
                                <!-- Dato cantidad -->
                                {{ oferta.cantidad }}
                            </span>
                        </td>
                        <td v-if="oferta.hecho == false">
                            <span>
                                <!-- Dato precio -->
                                {{ oferta.precio }}
                            </span>
                        </td>
                        <td v-if="oferta.hecho == false">
                            <span>
                                <!-- Dato precio -->
                                {{(oferta.cantidad/1000*oferta.precio).toFixed(2)}}
                            </span>
                        </td>
                        
                        <td v-if="oferta.hecho == false">
                            <span>
                                <!-- Botón para borrar -->
                                <button :disabled="buttonOff" @click="borrarOferta(index)" class="btn btn-danger">Borrar</button>
                            </span>
                        </td>
                    
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script>
import web3 from '../../contracts/web3'
import energy from '../../contracts/energyInstance'

export default {
    data(){ return {
                    // Input cantidad
                    cantidad: 0,
                    // Input precio
                    precio: 0,
                    buttonOff: false
                }
            },
    beforeMount(){
      this.ofertar()
    }, 
    mounted() {
    // Función para manejar el error de Metamask al cancelar las
      // transacciones
      window.onerror = function(message, source, line, column, error) {
         if (error.message == 'Number.isInteger is not a function') {
          this.buttonOff = false
          $(':button').prop('disabled', false);
        }
      }
      
      this.llenarOfertas()
      
  },
    methods: {
        llenarOfertas: function () {
            // Coge todas las ofertas de la blockchain y las 
            //pasa a $root.ofertas
            energy.methods
            .returnAllAuctions()
            .call()
            .then((result) => {
                //console.log(result)
                this.$root.ofertas = []
                var i=0
                for (i=0;i<result.length;i++) {
                    //Solo las ofertas sin aceptar y que sean del usuario
                    this.$root.ofertas.push({
                    vendedor: result[i].seller,
                    id: result[i].id,
                    cantidad: result[i].amount,
                    precio: result[i].price/1000,
                    gwei: result[i].gwei,
                    hecho: result[i].done
                    })
                    //para solo mostrar las de uno mismo
                    if (result[i].seller != this.$root.proba)
                        this.$root.ofertas[i].hecho = true
                }
            })
        },
        ofertar: function () {
            web3.eth.getAccounts().then((accounts) => {
                this.$root.proba = accounts[0];
                //console.log(this.$root.proba)
            })
        },
        crearOferta: function () {
            if ( !this.cantidad || !this.precio ) {
                swal('Error','Rellena todos los campos.','error');
                return;
            }          
            let cnt = this.cantidad
            let prc = this.precio*1000

            if ( cnt < 100 ) {
                swal('Error','La cantidad no puede ser menos de 100.','error');
                return;
            }
            if (  parseInt(prc) <= 0) {
                swal('Error','El precio no puede ser tan pequeño.','error');
                return;
            }
            //Bloqueamos los botones
            this.buttonOff = true;

            //
            //La batería no está actualizada
            //if (this.$root.globalTotal + parseInt(this.cantidad) >15000) {
           //     swal('Oops', 'No puedes poner a la venta más energía de la disponible','error');
            //    return;
           // }
            // El id sera un getTime
            var id = new Date().getTime()
            // Llamamos a createAuction en la Blockchain
            return web3.eth.getAccounts().then((accounts) => {
                energy.methods.
                createAuction(id,parseInt(prc),parseInt(cnt))
                .send({ from: accounts[0] })
                .then(() => {
                    this.$root.ofertas.push({
                        vendedor: accounts[0],
                        id: + new Date(),
                        cantidad: cnt/1000,
                        precio: prc,
                    })
                    this.cantidad = 0;
                    this.precio = 0;
                    this.buttonOff = false;
                    //console.log(this.$root.ofertas)
                     this.llenarOfertas()
                    //return energy.methods.returnAllAuctions().call()
                })
            })
                     
            //Actualizamos la batería - batería no actualizada
            //this.$root.globalTotal += parseInt(this.cantidad);
            // Vaciamos el formulario de añadir
            this.cantidad = 0;
            this.precio = 0;
  
        },
        borrarOferta: function (indice) {
            this.buttonOff = true
            energy.methods.
            deleteAuction(indice)
            .send({ from: this.$root.proba })
            .then(( ) => {
                this.buttonOff = false
                this.llenarOfertas()
            })    
                        /* desactualizado
                        // Borramos de la lista
                        this.$root.globalTotal -= parseInt(this.$root.ofertas[oferta_id].cantidad);
                        
                       // this.ofertas.splice(oferta_id, 1);
                        this.$root.ofertas.splice(oferta_id, 1);
                        */
                       
        }
    }
}
</script>
