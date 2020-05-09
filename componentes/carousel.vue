<template>
  <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100" src="../../public/marjan-grabowski-HgcdpLIa5jo-unsplash.jpg" alt="First slide">
        <div class="carousel-caption d-none d-md-block">
          <h5>Fácil de usar</h5>
          <p>Hazlo tú mismo y ahorra de una forma simple</p>
        </div>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="../../public/city-4317139_1920.jpg" alt="Second slide">
          <div class="carousel-caption d-none d-md-block">
            <h5>Tecnología del futuro</h5>
            <p>Utiliza Blockchain para ganar en 
                rapidez, transparencia y seguridad</p>
          </div>
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="../../public/be004a66602cbee3f524e9907855-1452889.jpg" alt="Third slide">
        <div class="carousel-caption d-none d-md-block">
          <h5>Sin intermediarios</h5>
          <p>Los mismos vecinos crearán un mercado energético</p>
        </div>
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>
<style>
.carousel-item img {
  height: 100%;
  width: 100%;
}
</style>