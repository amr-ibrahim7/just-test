import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/MoviesPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/movie/:id',
      name: 'movie-details',
      component: () => import('../views/MovieDetailsPage.vue'),
    },
  ],
})

export default router
