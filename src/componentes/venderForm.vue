<template>
	<div class="container">
		<!-- Formulario para añadir ofertas -->
		<!-- Quitadas actualizaciones 8-02-20 -->
		<form class="">
	<div class="form-group row" >
	<label for="cantidad" class="col-3 col-form-label"><strong>Cantidad</strong> </label>
		<div class="col-5">
			<input class="form-control" required id="cantidad" v-model="cantidad" v-on:keyup.enter="crearOferta" type="number" placeholder="W">
		</div>
		<div class="col-4">
			<h5 class="col-form-label"  align="left"> <strong>Total </strong><span class="bg-white px-1">{{(cantidad/1000*precio).toFixed(2)}}€</span></h5>
		</div>
	</div>
	<div class="form-group row">
		
		<label class="col-3 col-form-label" for="precio"><strong>Precio</strong></label>
		<div class="col-5">
			<input v-model="precio" v-on:keyup.enter="crearOferta" type="number" id="precio" placeholder="€/kWh" class="form-control">
		</div>
		<div class="col-4">
			<input :disabled="buttonOff" @click="crearOferta" type="button" value="Añadir" class="btn btn-success">
		</div>
	</div>
	</form>
	<br> 
	<!-- Tabla donde se muestran los datos -->
	<section class="data">
		<caption>Ofertas</caption>
			<table class="table table-sm" >
				<thead class="thead">
					<tr>
						<th scope="col">Cantidad</th>
						<th scope="col">Precio</th>
						<th scope="col">Total</th>
						<th></th>
					</tr>
				</thead>
				<tbody v-for="(oferta, index) in ofertas" :key="index">
					<tr v-if="oferta.hecho == false">
						<td>
							<span> <!-- Dato cantidad -->
								{{ oferta.cantidad }}
							</span>
						</td>
						<td>
							<span> <!-- Dato precio -->
								{{ oferta.precio }}
							</span>
						</td>
						<td>
							<span> <!-- Dato precio -->
								{{(oferta.cantidad/1000*oferta.precio).toFixed(2)}}
							</span>
						</td>
						<td>
							<span> <!-- Botón para borrar -->
								<button :disabled="buttonOff" @click="borrarOferta(index)" class="btn-sm btn btn-danger">Borrar</button>
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
import {ACTION_CHANGE_BATTERY_TOTAL, ACTION_CHANGE_BATTERY_USED, ACTION_CHANGE_ADDRESS} from './../store/app.store'

export default {
	data(){ 
		return {
		checked: false,
		cantidad: 0,     //input cantidad
		precio: 0,       //input precio
		buttonOff: false, //bool para bloqueo de botones
		ofertas: []
		}
	},
	mounted() {
		// Coge todas las ofertas de la blockchain 
		// y las pasa a ofertas
		this.llenarOfertas()
	},
	methods: {
		llenarOfertas: function () {
			//Almacenamos todas las ofertas propias
			this.ofertas= []
			energy.methods
			.returnAllAuctions()
			.call()
			.then((result) => {
				var i=0
				let glob=0
				for (i=0;i<result.length;i++) {
					//Solo las ofertas sin aceptar y que sean del usuario
					this.ofertas.push({
					vendedor: result[i].seller,
					id: result[i].id,
					cantidad: result[i].amount,
					precio: result[i].price/1000,
					gwei: result[i].gwei,
					hecho: result[i].done
					})
					//Para solo mostrar las de uno mismo
					if (result[i].seller != this.$store.getters.getAddress)
							this.ofertas[i].hecho = true
					//Actualizamos el nivel de la batería
					if ((result[i].seller == this.$store.getters.getAddress) && (!result[i].done)) {
							glob += parseInt(result[i].amount)
					}
					this.$store.dispatch(ACTION_CHANGE_BATTERY_USED,glob)
					
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
			if (cnt > this.$store.getters.getTotal - this.$store.getters.getUsed) {
				swal('Oops', 'No puedes poner a la venta más energía de la disponible','error');
				return
			}
			//Bloqueamos los botones
			this.buttonOff = true;

			//El id sera un getTime
			var id = new Date().getTime()

			// Alert de transacción
			swal("Transacción procesándose...", {
				buttons: false,
				closeOnClickOutside: false,
				closeOnEsc: false,
				//Pondremos 2 minutos de tiempo máximo por seguridad
				timer: 120000,
			})
			// Llamamos a createAuction en la Blockchain
			return web3.eth.getAccounts().then((accounts) => {
				energy.methods.
				createAuction(id,parseInt(prc),parseInt(cnt))
				.send({ from: accounts[0] })
				.then(() => {
					this.ofertas.push({
						vendedor: accounts[0],
						id: + new Date(),
						cantidad: cnt/1000,
						precio: prc,
					})
					swal.close()
					swal({
						title: "Transacción realizada!",
						text: "Se ha terminado de procesar la transacción",
						icon: "success",
						button: "Ok",
					})
					this.cantidad = 0;
					this.precio = 0;
					this.buttonOff = false;
					this.llenarOfertas()
				}).catch ((error) => {
					this.buttonOff = false
					swal.close()
					swal({
						title: "Transacción no completada!",
						text: "Se ha encontrado algún error durante la transacción",
						icon: "error",
						button: "Ok",
					})
					$(':button').prop('disabled', false);
				})
			})							
			this.cantidad = 0;
			this.precio = 0;
		},
		borrarOferta: function (indice) {
			if (this.$store.getters.getAddress != this.ofertas[indice].vendedor) {
				console.log(" Solo puedes borrar tus ofertas")
				this.llenarOfertas()
				return
			}
			this.buttonOff = true
			swal("Transacción procesándose...", {
				buttons: false,
				closeOnClickOutside: false,
				closeOnEsc: false,
				//Pondremos 2 minutos de tiempo máximo por seguridad
				timer: 120000,
			})
			energy.methods.
			deleteAuction(indice)
			.send({ from: this.$store.getters.getAddress })
			.then(( ) => {
				swal.close()
				swal({
					title: "Transacción realizada!",
					text: "Se ha eliminado la energía a la venta",
					icon: "success",
					button: "Ok",
				})
				this.buttonOff = false
				this.llenarOfertas()
			}).catch ((error) => {
					this.buttonOff = false
					swal.close()
					swal({
					title: "Transacción no completada!",
					text: "Se ha encontrado algún error durante la transacción",
					icon: "error",
					button: "Ok",
					})
					$(':button').prop('disabled', false);
				})                      
		}
	}
}
</script>
<style scoped>
#checkbox {
	position:relative;
	top: 2px;
}
</style>