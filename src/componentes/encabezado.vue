<template>
    <div class="container bg-secondary">
        <router-link style="text-decoration:none" class="text-white" to="/">
            <img src="/public/logo200x200.png" style="height:50px;width:auto" /></router-link>
        <h2 class="tex muted text-align-middle" style="padding-top:2px;float:left">
            <router-link style="text-decoration:none" class="text-white" to="/">BlockEnergy</router-link> </h2>
        <ul class="nav nav-pills float-right bg-secondary" style="vertical-align:bottom">
            <li class="nav-item"><router-link style="padding-top:12px" class="nav-link text-white" to="/">Inicio</router-link></li>
            <li class="nav-item"><router-link style="padding-top:12px" class="nav-link text-white" to="/comprar">Comprar</router-link></li>
            <li class="nav-item"><router-link style="padding-top:12px" class="nav-link text-white" to="/vender">Vender</router-link></li>
            <li class="nav-item"><router-link style="padding-top:12px" class="nav-link text-white" to="/historial">Historial</router-link></li>        
        </ul>           
    </div>    
</template>