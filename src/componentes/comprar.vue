<template>
  <div class="row ">
    <div class="col-3">
      <bateria></bateria>
    </div>
    <div class="col-9">
      <h2 align="center"> Ofertas de energía </h2>
      <comprarForm></comprarForm>
    </div>
  </div>
</template>
<script>
import Bateria from './bateria.vue'
import ComprarForm from './comprarForm.vue'
export default {
  components: {
    bateria: Bateria,
    comprarForm: ComprarForm
  }
}
</script>
<style scoped>
h2 {
  margin-bottom:25px
}
</style>