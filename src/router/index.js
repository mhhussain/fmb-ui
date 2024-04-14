// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue'),
      },
      {
        path: 'menu',
        name: 'Menu',
        component: () => import(/* webpackChunkName: "menu" */ '@/views/Menu.vue'),
      },
      {
        path: 'vendors',
        name: 'Vendors',
        component: () => import(/* webpackChunkName: "vendors" */ '@/views/Vendors.vue'),
      },
      {
        path: 'members',
        name: 'Members',
        component: () => import(/* webpackChunkName: "members" */ '@/views/Members.vue'),
      },
      {
        path: 'budget',
        name: 'Budget',
        component: () => import(/* webpackChunkName: "budget" */ '@/views/Budget.vue'),
      },
      {
        path: 'thaali',
        name: 'Thaali',
        component: () => import(/* webpackChunkName: "thaali" */ '@/views/Thaali.vue'),
      },
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import(/* webpackChunkName: "feedback" */ '@/views/Feedback.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
