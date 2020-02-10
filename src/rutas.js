import InicioComponent from './componentes/inicio.vue'
import ComprarComponent from './componentes/comprar.vue'
import VenderComponent from './componentes/vender.vue'
import HistorialComponent from './componentes/historial.vue'

export const routes = [
    { path:'', component: InicioComponent},
    { path:'/comprar', component: ComprarComponent},
    { path:'/vender', component: VenderComponent},
    { path:'/historial', component: HistorialComponent},

]