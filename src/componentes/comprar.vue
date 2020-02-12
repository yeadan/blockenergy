<template>
  <div class="jumbotron">
    <div class="row ">
      <div class="col-3">
        <bateria></bateria>
      </div>
      <div class="col-9">
        <h2 style="margin-bottom:25px" align="center"> Ofertas de energía </h2>
        <comprarForm></comprarForm>
      </div>
    </div>
  </div>
</template>
<script>
import Bateria from './bateria.vue'
import ComprarForm from './comprarForm.vue'
export default {
  name: 'APP',
  components: {
    bateria: Bateria,
    comprarForm: ComprarForm
  }
}
</script>

