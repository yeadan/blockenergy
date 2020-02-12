# Blockenergy - dAPP para intercambios de energía en Blockchain v.1.3.0
*Esta versión no incluye los pagos en criptomonedas ni la conexión IoT de las baterías. Utiliza la red de pruebas de Etherscan [Ropsten](https://ropsten.etherscan.io/). Inspirado en el repositorio de [openberry](https://github.com/openberry-ac/Auction)*
  
## Prerrequisitos
* **Node** - v10.x.x 
* **npm** - v6.x.x 

## Creado con:
* [Solidity](https://solidity.readthedocs.io/en/v0.6.1/) - Lenguaje de programación de los smart contracts para Ethereum
* [Vue.js](https://vuejs.org/) - Framework de Javascript utilizado
* [web3.js](https://github.com/ethereum/web3.js/) - Librería de Javascript utilizada para interactuar con la blockchain de Ethereum   
* [Remix](https://remix.ethereum.org/) - IDE de Solidity para crear, compilar y probar smart contracts
* [Metamask](https://metamask.io/) - Plugin de Chrome que hace de puente entre la dApp y el navegador navegador

## Dependencias:
  "[ethereum-blockies-base64](https://https://www.npmjs.com/package/ethereum-blockies-base64)" - Librería para generar identidades como bloques en PNG, codificados en base64   
  "[vue-router](https://router.vuejs.org/)" - Enrutador para Vue.js   
  "[sweetalert](https://sweetalert2.github.io/)" - Reemplazo para la función alert de Javascript  
  "[Bootstrap 4](https://blog.getbootstrap.com/2019/11/28/bootstrap-4-4-1/)" - Framework de CSS 




## Ejecución

Clona este repositorio en local e instala las dependencias como sigue:

```bash
git clone https://github.com/yeadan/blockenergy-v.1.2
cd blockenergy-v.1.2
npm install
```
Instala la extensión de [Metamask](https://metamask.io/), que será el enlace con la blockchain. En el metamask escoge la red de pruebas Ropsten y créate algunas direcciones con ethers.

Una vez instalados el Metamask y todas las dependencias se podrá ejecutar en local con el comando:

```bash
npm run dev
```


## Estructura 

### Inicio
Página de inicio. No implementada en la versión actual  

---

### Comprar
Página donde se pueden ver las ofertas de energía y comprarlas   

__Restricciones__: 
No se puede aceptar una oferta propia   
No se pueden aceptar ofertas ya ejecutadas   
~~No se puede comprar energía si no hay espacio en tu batería~~ (no implementado)   

---
### Vender
Página para poder crear y borrar ofertas de energía  

__Restricciones__: 
Solo se ven las ofertas propias   
~~Solo puedes vender una cantidad de energía si está disponible en tu batería~~ (no implementado)   
Los precios y las cantidades de las ofertas tienes que ser números enteros positivos   

 ---
### Historial

Página de historial de ventas. Enseña las direcciones del comprador y del vendedor   

---


#### Bugs conocidos:

 - En Metamask, bajo algunas condiciones, los cambios de direcciones no se reflejan automáticamente  
 - Si se cancela el intento de borrado de una oferta (desde Metamask) se quedan bloqueados los botones hasta que se cambia de sección, o bien se refresca la página    

#### Próximos cambios:

 - Añadir más restricciones (requires) en las funciones del smart contract   
 - Optimizar más el código de los smart contracts para reducir el *gas* utilizado   
 - Aislas las funciones repetidas en compras y ventas (y posiblemente en Historial) 
 - Posible: cambiar el precio en Kw/h en vez de w/h y multiplicar? para guardarlo en Ethereum     
 
 #### Hecho v3
 - Cambiados cantidad y precio a integer, y obviados los decimales   
 - Ventas: Al hacer click en un botón se bloquean todos hasta terminar una transacción   
 - Ventas: Se actualiza automáticamente al terminar una transacción   
 - Compras: Al hacer click en un botón se bloquean todos hasta terminar una transacción   
 - Compras: Separado el vue component en dos partes al estilo de ventas (comprar y ComprarForm)   
 - Historial: Cambiado el centrado de los items, quitado el center   