import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/login.vue';
import Home from '../pages/home.vue';
import Dashboard from '../pages/dashboard.vue';
import NotFound from '../pages/NotFound.vue';
import panel from '../components/panel.vue';
import prueba from '../components/prueba.vue';

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
      },{ path: 'prueba', name: 'prueba', component: prueba },{ path: 'Home', name: 'Home', component: Home },
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