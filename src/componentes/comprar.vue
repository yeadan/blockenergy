<template>
  <div class="row ">
    <div class="col-4">
      <bateria></bateria>
    </div>
    <div class="col-8">
      <comprarForm></comprarForm>
    </div>
  </div>
</template>
<script>
import Bateria from './bateria.vue'
import ComprarForm from './comprarForm.vue'
import $ from 'jquery'
export default {
  components: {
    bateria: Bateria,
    comprarForm: ComprarForm
  },
  mounted() {
    $("#myTitle").text("Ofertas de energía");
  
  },
  destroyed() {
    $("#myTitle").text("");
  }
}
</script>
<style scoped>
h2 {
  margin-bottom:25px
}
</style>