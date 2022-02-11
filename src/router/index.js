import Vue from 'vue';
import VueRouter from 'vue-router';
// import Search from '../views/SimpleSearch.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: () => import('../views/Favourites.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
