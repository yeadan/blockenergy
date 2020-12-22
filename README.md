# Blockenergy - dAPP para intercambios de energía en Blockchain v.1.9.0
*Esta dApp está basada en mi Trabajo de Fin de Grado de Ingeniería Informática de 2019, el cual puedes encontrar [aquí](https://drive.google.com/file/d/1nc4Z30IAWintO9_fmyKp3WAgtheShIaL/view?usp=sharing), en una versión más actualizada.*    
*Esta versión no incluye los pagos en criptomonedas ni la conexión IoT de las baterías. Utiliza la red de pruebas de Etherscan [Ropsten](https://ropsten.etherscan.io/). Inspirado en el repositorio de [openberry](https://github.com/openberry-ac/Auction)*
  
## Prerrequisitos
* **Node** - v10.x.x 
* **npm** - v6.x.x 

## Creado con:
* [Solidity](https://solidity.readthedocs.io/en/v0.6.1/) - Lenguaje de programación de los smart contracts para Ethereum
* [Vue.js](https://vuejs.org/) - Framework de Javascript utilizado
* [web3.js](https://github.com/ethereum/web3.js/) - Librería de Javascript utilizada para interactuar con la blockchain de Ethereum   
* [Remix](https://remix.ethereum.org/) - IDE de Solidity para crear, compilar y probar smart contracts
* [Metamask](https://metamask.io/) - Plugin de Chrome que hace de puente entre la dApp y el navegador   

## Dependencias:
  "[ethereum-blockies-base64](https://https://www.npmjs.com/package/ethereum-blockies-base64)" - Librería para generar identidades como bloques en PNG, codificados en base64   
  "[vue-router](https://router.vuejs.org/)" - Enrutador para Vue.js   
  "[vuex](https://vuex.vuejs.org/)" - Librería para gestión del estado (State Management) de aplicaciones Vue.js   
  "[sweetalert](https://sweetalert2.github.io/)" - Reemplazo para la función alert de Javascript  
  "[Bootstrap 4](https://blog.getbootstrap.com/2019/11/28/bootstrap-4-4-1/)" - Framework de CSS    
  "[jQuery](https://jquery.com/)" - Biblioteca de Javascript para simplificar las interacciones con el DOM   
  "[css-circular-prog-bar](https://tiagobalmeida.github.io/posts/making-a-pure-css-circular-progress-bar.html)" - Progress bar en CSS puro.     


## Ejecución

Clona este repositorio en local e instala las dependencias como sigue:

```bash
git clone https://github.com/yeadan/blockenergy
cd blockenergy
npm install
```
Instala la extensión de [Metamask](https://metamask.io/), que será el enlace con la blockchain. En el metamask escoge la red de pruebas Ropsten y créate algunas direcciones con ethers.

Una vez instalados el Metamask y todas las dependencias se podrá ejecutar en local con el comando:

```bash
npm run dev
```   
   
   Este repositorio está online en [Netlify](https://blockenergy.netlify.app)   


## Estructura 

### Inicio
Página de inicio. Un Carousel con 3 imágenes como presentación    

---

### Comprar
Página donde se pueden ver las ofertas de energía y comprarlas   

__Restricciones__:   
No se puede aceptar una oferta propia   
No se pueden aceptar ofertas ya ejecutadas   
No se puede comprar energía si no hay espacio suficiente en tu batería    

---
### Vender
Página para poder crear y borrar ofertas de energía  

__Restricciones__:    
Solo se ven las ofertas propias   
Solo puedes vender una cantidad de energía si está disponible en tu batería   
Los precios y las cantidades de las ofertas tienes que ser números  positivos   
No se pueden poner a la venta menos de 100w   

 ---
### Historial

Página de historial de ventas. Enseña las direcciones del comprador y del vendedor, la cantidad de energía vendida, la fecha en que se puso a la venta y los precios de venta (con su equivalencia en Ether del momento de la venta)   

---
### Batería (No implementado)

La idea es que en la página de compras y ventas esté a disposición del usuario el nivel de su batería, y con ese nivel poder llevar un control de las compras y las ventas. Al no tener acceso, en la implementación, a ninguna batería, solo aparece una batería donde se le asigna un número aleatorio (con un http GET externo para que se acerque a cómo sería realmente). Esta cantidad es la que se irá utilizando para las compras y ventas, donde los indicadores están hechos únicamente con CSS.   
   
#### Próximos cambios:    
 
    
#### Hecho v9:   
General: Reconstruido el proyecto con webpack    
General: Añadido Vuex y quitados los componentes del localstorage   
General: Arreglados problemas de renderización por utilizar el filter de JS   
General: Arreglados problemas de string y numbers en las variables de batería   
General: Actualizados los mensajes de error al rechazar una transacción en Metamask   
General: Añadido un sweetalert con link de búsqueda de Metamask si no hay ethereum browser   
Compras/Ventas: Añadidas alerts para controlar transacciones  
General: Añadidas resolutions al package.json    
Compras: Añadida la energía comprada a la batería   
Compras: Cambiada la vista completamente   
Historial: Pequeños cambios de vista (color texto, padding cards, responsive)   
General: Actualizadas dependencias url-loader y npm-notifier   
      
#### Donaciones 
   
<a href="https://www.buymeacoffee.com/yeadan" target="_blank"><img src="https://github.com/yeadan/blockenergy/blob/master/public/default-orange.png" alt="Buy Me A Coffee" style="height: 26px !important;width: 109px !important;" ></a>   
    
BTC: 32kZW9Z381DDPn54Sho8U5jQ53UhLC8rTv