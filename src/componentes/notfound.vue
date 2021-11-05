<template>
  <div class="NotFound">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card height="400" color="transparent" flat>
            <div class="display-3 mt-5">Error 404
            <br />Página no encontrada
            </div>
            <br />
            <br />
            <div class="grey--text lighten-5">
              Lo sentimos pero no hemos podido encontrar la página a la que estás intentando acceder.
            </div>
            <div class="mt-9">
              <br /><small>Escoge otra opción del menú de navegación o deja a nuestra IA predecir tu búsqueda <a target="blank" href="http://tinyurl.com/2g9mqh">aquí</a>.</small>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
 mounted() {
    $('#price').hide()
  }, beforeDestroy() {
    $('#price').show()
  }
}
</script>
