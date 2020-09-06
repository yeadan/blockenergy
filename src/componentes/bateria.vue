<template>
<div align="center" >
  <div id="nivel">  
	<hr>
    <p><small><strong>Nivel batería </strong>: {{this.$root.batteryTotal}}W </small></p>
	<div class="progress-circle" :class="this.circleTotal" >
		<span>{{(this.$root.batteryTotal/150).toFixed(0)}}%</span>
		<div class="left-half-clipper">
			<div class="first50-bar"></div>
			<div class="value-bar"></div>
		</div>
	</div>
	<hr>
  </div>
  <div id="disponible" >
    <p><small><strong>Nivel disponible</strong>: {{((this.$root.batteryTotal)-(this.$root.globalTotal)).toFixed(0)}}W</small></p>
	<div class="progress-circle" align="left" :class="this.circleDispo" >
		<span>{{((this.$root.batteryTotal/150)-(this.$root.globalTotal/150)).toFixed(0)}}%</span>
		<div class="left-half-clipper">
			<div class="first50-bar"></div>
			<div class="value-bar"></div>
		</div>
	</div>
	<hr>
  </div>
</div>
</template>
<script>
import web3 from '../../contracts/web3'
import energy from '../../contracts/energyInstance'
import '../../src/css-circular-prog-bar.css'

export default {
  data() { 
    return { 
		circleTotal: '',
		circleDispo: ''
    }
  }, 
mounted() {
	this.changeLevels()
},
updated() {
	this.changeLevels()
},
  methods: {    
    changeLevels: function() {
		//circleTotal
		if ((this.$root.batteryTotal/150).toFixed(0) > 50 )
			this.circleTotal='over50 p'+ (this.$root.batteryTotal/150).toFixed(0)
		else 
			this.circleTotal='p'+ (this.$root.batteryTotal/150).toFixed(0)
		//circleDispo
		if (((this.$root.batteryTotal/150)-(this.$root.globalTotal/150)).toFixed(0) > 50 )
			this.circleDispo='over50 p'+ ((this.$root.batteryTotal/150)-(this.$root.globalTotal/150)).toFixed(0)
		else 
			this.circleDispo='p'+ ((this.$root.batteryTotal/150)-(this.$root.globalTotal/150)).toFixed(0)
	}
  }
}
</script>
