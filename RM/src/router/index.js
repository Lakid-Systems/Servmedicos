import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/login.vue';
import Home from '../pages/home.vue';
import Dashboard from '../pages/dashboard.vue';
import NotFound from '../pages/NotFound.vue';
import panel from '../components/panel.vue';
import espacios_vista from '../components/espacios_vista.vue';
import estatus from '../pages/estatus.vue';
import insumos from '../components/insumos.vue';
import areas from '../components/areas.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/',
    component: panel, // Usa el layout para las rutas hijas
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
      },{ 
        path: 'estatus', name: 'estatus', component: estatus },{
          path: 'insumos', name: 'insumos', component: insumos },{
            path: 'areas', name: 'areas', component: areas },{
              path: 'espacios_vista', name: 'espacios_vista', component: espacios_vista },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;