<template>
  <div>
    <div class="card-image">
      <figure class="image is-4by3">
        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">titulo producto</p>
        </div>
        <div>
          <button class="button is-small"  >
            <span class="icon is-small">
              <i class="fa fa-heart"></i>
            </span>
          </button>
          <button class="button is-small"  >
            <span class="icon is-small">
              <i class="fa fa-heart-o"></i>
            </span>
          </button>
        </div>
      </div>
      <div class="content is-clearfix">
        <p>descrip product</p>

        <p class="is-pulled-right">
          <span class="title is-4"><strong>&euro; product price</strong></span>
        </p>
      </div>
      <div class="card-footer btn-actions">
        <div class="card-footer-item field is-grouped">
          <div class="buttons">
            <button class="button is-primary"  >añadir carro</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>