# Blockenergy - dAPP para intercambios de energía en Blockchain v.1.7.0
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
git clone https://github.com/yeadan/blockenergy
cd blockenergy
npm install
```
Instala la extensión de [Metamask](https://metamask.io/), que será el enlace con la blockchain. En el metamask escoge la red de pruebas Ropsten y créate algunas direcciones con ethers.

Una vez instalados el Metamask y todas las dependencias se podrá ejecutar en local con el comando:

```bash
npm run dev
```


## Estructura 

### Inicio
Página de inicio. Un Carousel con 3 imágenes como presentación    

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
Solo puedes vender una cantidad de energía si está disponible en tu batería   
Los precios y las cantidades de las ofertas tienes que ser números  positivos   
No se pueden poner a la venta menos de 100w   

 ---
### Historial

Página de historial de ventas. Enseña las direcciones del comprador y del vendedor, la cantidad de energía vendida y los precios de venta (con su equivalencia en Ether del momento de la venta)   

---
### Batería (No implementado)

La idea es que en la página de compras y ventas esté a disposición del usuario el nivel de su batería, y con ese nivel poder llevar un control de las compras y las ventas. Al no tener acceso, en la implementación, a ninguna batería, solo aparece una batería donde se le asigna un número aleatorio (con un http GET externo para que se acerque a cómo sería realmente). Esta cantidad es la que se irá utilizando para las compras y ventas   

   
#### Próximos cambios:   
Cambiar la batería a algo fijo y que se cambie dinámicamente el contenido   
   
 
#### Hecho v7:   
General: Cambiados los v-if dentro de los v-for por computed para mejorar el render (así no evalúa lo que no queremos)   
General: Mejorado el formateo de línea en los ficheros   
General: Actualizada versión Webpack   
Web3: Añadido alert por si no se tiene instalado Metamask   
