<template>
  <div class="row " >
    <div class="col-4">
      <bateria></bateria>
    </div>
    <div class="col-8">
      <venderForm></venderForm>
    </div>
  </div>
</template>
<script>
import Bateria from './bateria.vue'
import VenderForm from './venderForm.vue'
import $ from 'jquery'
export default {
  components: {
    bateria: Bateria,
    venderForm: VenderForm
  },
  mounted() {
    $("#myTitle").text("Vender energía");
  
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
