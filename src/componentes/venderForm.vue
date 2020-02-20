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
                        <th scope="col">Cantidad</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(oferta, index) in $root.ofertas " :key="index">
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
                    cantidad: 0,     //input cantidad
                    precio: 0,       //input precio
                    buttonOff: false //bool para bloqueo de botones
                }
            },
    mounted() {
        //Mostramos la batería de 'ventas'
        $("#nivel").hide()
        $("#disponible").show()
        // Función para manejar el error de Metamask 
        // al cancelar las transacciones
        window.onerror = function(message, source, line, column, error) {
            if (error.message == 'Number.isInteger is not a function') {
            this.buttonOff = false
            $(':button').prop('disabled', false);
        }
      }
      // Coge todas las ofertas de la blockchain 
      // y las pasa a $root.ofertas
      this.llenarOfertas()
      
  },
    methods: {
        llenarOfertas: function () {
            //Almacenamos todas las ofertas propias
            energy.methods
            .returnAllAuctions()
            .call()
            .then((result) => {
                this.$root.ofertas = []
                var i=0
                let glob=0
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
                    //Para solo mostrar las de uno mismo
                    if (result[i].seller != this.$root.proba)
                        this.$root.ofertas[i].hecho = true
                    //Actualizamos el nivel de la batería
                    if ((result[i].seller == this.$root.proba) && (!result[i].done)) {
                        glob += parseInt(result[i].amount)
                    }
                    this.$root.globalTotal = glob
                }
            })
        },
        crearOferta: function () {
            //Creamos una oferta de energía
            if ( !this.cantidad || !this.precio ) {
                swal('Error','Rellena todos los campos.','error');
                return;
            }          
            let cnt = this.cantidad
            let prc = this.precio*1000

            if (cnt < 100) {
                swal('Error','La cantidad no puede ser menos de 100.','error');
                return;
            }
            if (parseInt(prc) <= 0) {
                swal('Error','El precio no puede ser tan pequeño.','error');
                return;
            }
            if (cnt > this.$root.batteryTotal - this.$root.globalTotal) {
                swal('Oops', 'No puedes poner a la venta más energía de la disponible','error');
                return
            }
            //Bloqueamos los botones
            this.buttonOff = true;

            //El id sera un getTime
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
                    //Borramos inputs, desbloqueamos botones y actualizamos ofertas
                    this.cantidad = 0;
                    this.precio = 0;
                    this.buttonOff = false;
                    this.llenarOfertas()
                })
            })
                     
            this.cantidad = 0;
            this.precio = 0;
  
        },
        borrarOferta: function (indice) {
            if (this.$root.proba != this.$root.ofertas[indice].vendedor) {
                this.llenarOfertas()
                return
            }
            this.buttonOff = true
            energy.methods.
            deleteAuction(indice)
            .send({ from: this.$root.proba })
            .then(( ) => {
                this.buttonOff = false
                this.llenarOfertas()
            })                      
        }
    }
}
</script>
