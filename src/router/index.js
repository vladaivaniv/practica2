import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Tienda from '../views/Tienda.vue'
import Contacto from '../views/Contacto.vue'
import CartaPanes from '../views/CartaPanes.vue'
import QuienesSomos from '../views/QuienesSomos.vue'
Vue.use(VueRouter)

const routes = [        
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/tienda",
      name: "tienda",
      component: Tienda,
    },
    {
      path: "/contacto",
      name: "contacto",
      component: Contacto,
  },
  {
    path: "/carta",
    name: "carta",
    component: CartaPanes
  },
  {
    path: "/quienessomos",
    name: "quienesSomos",
    component: QuienesSomos
  }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router