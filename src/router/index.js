// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/Menu.vue'),
      },
      {
        path: 'week/:id/report',
        name: 'FillReport',
        component: () => import('@/views/FillReport.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
