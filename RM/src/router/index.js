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
      },
      { path: 'estatus', name: 'estatus', component: estatus },
      { path: 'insumos', name: 'insumos', component: insumos },
      { path: 'areas', name: 'areas', component: areas },
      { path: 'espacios_vista', name: 'espacios_vista', component: espacios_vista },
    ],
    meta: { requiresAuth: true }, 
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

// Navigation Guard para proteger las rutas hijas
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('authToken'); // Asegúrate de que el nombre coincida con el del login

  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login'); // Si no hay token, redirige a login
  } else {
    next(); // Si hay token o no se necesita autenticación, continúa
  }
});

export default router;
