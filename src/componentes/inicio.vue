<template>
  <div>
    <carousel></carousel>
  </div>
</template>

<script>
import Carousel from './carousel.vue'
import $ from 'jquery'
export default {

  components: {
    carousel: Carousel
  }, mounted() {
    $('#price').hide()
  }, beforeDestroy() {
    $('#price').show()
  }
}
</script>
