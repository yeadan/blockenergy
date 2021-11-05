<template>
<div align="center" >
  <div id="nivel">  
	<hr>
    <p><small><strong>Nivel batería </strong>: {{ returnTotal }}W </small></p>
	<div class="progress-circle" :class="this.circleTotal" >
		<span>{{(returnTotal/150).toFixed(0)}}%</span>
		<div class="left-half-clipper">
			<div class="first50-bar"></div>
			<div class="value-bar"></div>
		</div>
	</div>
	<hr>
  </div>
  <div id="disponible" >
    <p><small><strong>Nivel disponible</strong>: {{((returnTotal)-(returnUsed)).toFixed(0)}}W</small></p>
	<div class="progress-circle" align="left" :class="this.circleDispo" >
		<span>{{((returnTotal/150)-(returnUsed/150)).toFixed(0)}}%</span>
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
import '../../src/css-circular-prog-bar.css'

export default {
  data() { 
    return { 
		circleTotal: '',
		circleDispo: '',
    }
  }, 
mounted() {
	this.changeLevels()
},
updated() {
	this.changeLevels()
},
computed : {
	returnTotal: function () {
			return this.$store.getters.getTotal
		},
	returnUsed: function () {
		return this.$store.getters.getUsed
	}
},
	methods: {    
		changeLevels: function() {
		//circleTotal
		if ((this.$store.getters.getTotal/150).toFixed(0) > 50 )
			this.circleTotal='over50 p'+ (this.$store.getters.getTotal/150).toFixed(0)
		else 
			this.circleTotal='p'+ (this.$store.getters.getTotal/150).toFixed(0)
		//circleDispo
		if (((this.$store.getters.getTotal/150)-(this.$store.getters.getUsed/150)).toFixed(0) > 50 )
			this.circleDispo='over50 p'+ ((this.$store.getters.getTotal/150)-(this.$store.getters.getUsed/150)).toFixed(0)
		else 
			this.circleDispo='p'+ ((this.$store.getters.getTotal/150)-(this.$store.getters.getUsed/150)).toFixed(0)
		}
	}
}
</script>
