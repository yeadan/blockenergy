<template>
<div class="jumbotron">
      <div class="row align-items-center">
        <div class="col-4">
          <bateria></bateria>
        </div>
        <div class="col-8">
          <div class="container">
        <h2 style="margin-bottom:25px" align="center"> Vender energía </h2>
        <venderForm></venderForm>
    </div>
        </div>
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