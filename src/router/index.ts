import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoriesView from '../views/categories/IndexView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/categories',
      name: 'categories',
      component: CategoriesView,
      children: [
        {
          path: '',
          name: 'listCategories',
          component: () => import('../views/categories/ListView.vue')
        },
        {
          path: 'create',
          name: 'createCategory',
          component: () => import('../views/categories/CreateView.vue')
        }
      ]
    }
  ]
})

export default router
