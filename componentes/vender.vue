<template>
  <div class="row " >
    <div class="col-3">
      <bateria></bateria>
    </div>
    <div class="col-9">
      <h2 align="center"> Vender energía </h2>
      <venderForm></venderForm>
    </div>
  </div>
</template>
<script>
import Bateria from './bateria.vue'
import VenderForm from './venderForm.vue'
export default {
  components: {
    bateria: Bateria,
    venderForm: VenderForm
  }
}
</script>
<style scoped>
h2 {
  margin-bottom:25px
}
</style>
