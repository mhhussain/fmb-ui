import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue')
      },
      // {
      //   path: 'members',
      //   name: 'Members',
      //   component: () => import('@/views/members/MemberList.vue'),
      //   meta: { requiresRole: 'MemAdmin' }
      // },
      // {
      //   path: 'members/create',
      //   name: 'CreateMember',
      //   component: () => import('@/views/members/CreateMember.vue'),
      //   meta: { requiresRole: 'MemAdmin' }
      // },
      // {
      //   path: 'members/:id/edit',
      //   name: 'EditMember',
      //   component: () => import('@/views/members/EditMember.vue'),
      //   meta: { requiresRole: 'MemAdmin' }
      // },
      // {
      //   path: 'households',
      //   name: 'Households',
      //   component: () => import('@/views/households/HouseholdList.vue'),
      //   meta: { requiresRole: 'MemAdmin' }
      // },
      // {
      //   path: 'households/create',
      //   name: 'CreateHousehold',
      //   component: () => import('@/views/households/CreateHousehold.vue'),
      //   meta: { requiresRole: 'MemAdmin' }
      // },
      // {
      //   path: 'households/:id',
      //   name: 'ViewHousehold',
      //   component: () => import('@/views/households/ViewHousehold.vue'),
      //   meta: { requiresRole: 'MemAdmin' }
      // },
      // {
      //   path: 'households/:id/edit',
      //   name: 'EditHousehold',
      //   component: () => import('@/views/households/EditHousehold.vue'),
      //   meta: { requiresRole: 'MemAdmin' }
      // },
      // {
      //   path: 'menus',
      //   name: 'Menus',
      //   component: () => import('@/views/menus/MenuList.vue'),
      //   meta: { requiresRole: 'MenuAdmin' }
      // },
      // {
      //   path: 'menus/create',
      //   name: 'CreateMenu',
      //   component: () => import('@/views/menus/CreateMenu.vue'),
      //   meta: { requiresRole: 'MenuAdmin' }
      // },
      // {
      //   path: 'menus/:id/edit',
      //   name: 'EditMenu',
      //   component: () => import('@/views/menus/EditMenu.vue'),
      //   meta: { requiresRole: 'MenuAdmin' }
      // },
      // {
      //   path: 'fill-reports',
      //   name: 'FillReports',
      //   component: () => import('@/views/filling/FillReportList.vue'),
      //   meta: { requiresRole: 'FillAdmin' }
      // },
      // {
      //   path: 'fill-reports/:date',
      //   name: 'ViewFillReport',
      //   component: () => import('@/views/filling/ViewFillReport.vue'),
      //   meta: { requiresRole: 'FillAdmin' }
      // },
      // {
      //   path: 'vendors',
      //   name: 'Vendors',
      //   component: () => import('@/views/vendors/VendorList.vue'),
      //   meta: { requiresRole: 'MenuAdmin' }
      // },
      // {
      //   path: 'vendors/create',
      //   name: 'CreateVendor',
      //   component: () => import('@/views/vendors/CreateVendor.vue'),
      //   meta: { requiresRole: 'MenuAdmin' }
      // },
      // {
      //   path: 'vendors/:id',
      //   name: 'ViewVendor',
      //   component: () => import('@/views/vendors/ViewVendor.vue'),
      //   meta: { requiresRole: 'MenuAdmin' }
      // },
      // {
      //   path: 'vendors/:id/edit',
      //   name: 'EditVendor',
      //   component: () => import('@/views/vendors/EditVendor.vue'),
      //   meta: { requiresRole: 'MenuAdmin' }
      // },
      // {
      //   path: 'menu-items',
      //   name: 'MenuItems',
      //   component: () => import('@/views/menu-items/MenuItemList.vue'),
      //   meta: { requiresRole: 'MenuAdmin' }
      // },
      // {
      //   path: 'menu-items/create',
      //   name: 'CreateMenuItem',
      //   component: () => import('@/views/menu-items/CreateMenuItem.vue'),
      //   meta: { requiresRole: 'MenuAdmin' }
      // },
      // {
      //   path: 'menu-items/:id/edit',
      //   name: 'EditMenuItem',
      //   component: () => import('@/views/menu-items/EditMenuItem.vue'),
      //   meta: { requiresRole: 'MenuAdmin' }
      // },
      // {
      //   path: 'analytics',
      //   name: 'Analytics',
      //   component: () => import('@/views/Analytics.vue'),
      //   meta: { requiresRole: 'Admin' }
      // },
      // {
      //   path: 'settings',
      //   name: 'Settings',
      //   component: () => import('@/views/Settings.vue'),
      //   meta: { requiresRole: 'Admin' }
      // }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Initialize auth on first load
  if (!authStore.isAuthenticated) {
    authStore.initializeAuth()
  }
  
  // Check if route requires authentication
  if (to.meta.requiresAuth !== false && !authStore.isAuthenticated) {
    next('/login')
    return
  }
  
  // Redirect from login if already authenticated
  if (to.path === '/login' && authStore.isAuthenticated) {
    next('/')
    return
  }
  
  next()
})

export default router 