<template>
	<div class="container bg-secondary">
		<nav class="navbar navbar-expand-md navbar-dark bg-secondary">  
			<router-link style="text-decoration:none" class="navbar-brand text-white" to="/"><h2>BlockEnergy</h2></router-link>
			<a class="navbar-brand mr-auto" href="/">
				<img src="../../public/logo200x200.png" style="height:50px;width:auto" />
			</a>
		<button class="navbar-toggler ml-auto custom-toggler" type="button" data-toggle="collapse" data-target="#mi-navbar">
			<span class="navbar-toggler-icon"></span>
		</button>
			<div id="mi-navbar" class="collapse navbar-collapse" >
				<div class="navbar-nav ml-auto">
					<router-link class="nav-link text-white" to="/">Inicio</router-link>
					<router-link class="nav-link text-white" to="/comprar">Comprar</router-link>
					<router-link class="nav-link text-white" to="/vender">Vender</router-link>
					<router-link class="nav-link text-white" to="/historial">Historial</router-link>                           
				</div>
			</div>
		</nav>         
	</div>    
</template>


