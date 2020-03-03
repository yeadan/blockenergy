<template>
    <div class="container bg-secondary">
        <nav class="navbar navbar-expand-lg navbar-dark bg-secondary">  
            <router-link style="text-decoration:none" class="navbar-brand text-white" to="/"><h2>BlockEnergy</h2></router-link>
            <a class="navbar-brand mr-auto" href="/">
                <img src="/public/logo200x200.png" style="height:50px;width:auto" />
            </a>
            <div class="collpase navbar-collapse" >
                <div class="navbar-nav ml-auto">
                    <div class="collpase navbar-collapse">
                        <router-link class="nav-link text-white" to="/">Inicio</router-link>
                    </div>
                    <div class="collpase navbar-collapse">
                        <router-link class="nav-link text-white" to="/comprar">Comprar</router-link>
                    </div>
                    <div class="collpase navbar-collapse">
                        <router-link class="nav-link text-white" to="/vender">Vender</router-link>
                    </div>     
                    <div class="collpase navbar-collapse">
                        <router-link class="nav-link text-white" to="/historial">Historial</router-link>
                    </div>                                   
                </div>
            </div>
        </nav>         
    </div>    
</template>