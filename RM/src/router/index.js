import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/login.vue';
import Home from '../pages/home.vue';
import dashboard from '../pages/dashboard.vue';
import NotFound from '../pages/NotFound.vue';
const routes = [{
    path: '/',
    name: 'home',
    component: Home, 
  },
    { path: '/Login',
      name: 'login', 
      component: Login },
      { path: '/dashboard',
        name: 'dashboard',
        component: dashboard },{
          path: '/:pathMatch(.*)*', 
          name: 'NotFound',
          component: NotFound,
        },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
