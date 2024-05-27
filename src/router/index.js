import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ClienteList from '../components/ClienteList.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
