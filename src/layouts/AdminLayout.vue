<template>
  <n-layout has-sider>
    <!-- Sidebar -->
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="sidebar-header">
        <h2 v-if="!collapsed">FMB Admin</h2>
        <h2 v-else>FMB</h2>
      </div>
      
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :value="activeKey"
        @update:value="handleMenuUpdate"
      />
    </n-layout-sider>

    <!-- Main Content -->
    <n-layout>
      <!-- Header -->
      <n-layout-header bordered>
        <div class="header-content">
          <div class="header-left">
            <n-button
              quaternary
              circle
              @click="collapsed = !collapsed"
            >
              <template #icon>
                <n-icon><MenuOutline /></n-icon>
              </template>
            </n-button>
            
            <n-breadcrumb>
              <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
                {{ item.label }}
              </n-breadcrumb-item>
            </n-breadcrumb>
          </div>
          
          <div class="header-right">
            <n-dropdown :options="userMenuOptions" @select="handleUserMenuSelect">
              <n-button quaternary>
                <template #icon>
                  <n-icon><PersonOutline /></n-icon>
                </template>
                {{ user?.name || 'Admin' }}
                <template #suffix>
                  <n-icon><ChevronDownOutline /></n-icon>
                </template>
              </n-button>
            </n-dropdown>
          </div>
        </div>
      </n-layout-header>

      <!-- Page Content -->
      <n-layout-content>
        <div class="page-content">
          <router-view />
        </div>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { ref, computed, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { 
  MenuOutline, 
  PersonOutline, 
  ChevronDownOutline,
  PeopleOutline,
  HomeOutline,
  RestaurantOutline,
  CalendarOutline,
  SettingsOutline,
  BarChartOutline
} from '@vicons/ionicons5'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const message = useMessage()
const authStore = useAuthStore()

const collapsed = ref(false)
const user = computed(() => authStore.user)

// Menu options based on user permissions
const menuOptions = computed(() => {
  const options = [
    {
      label: 'Dashboard',
      key: '/',
      icon: renderIcon(HomeOutline)
    }
  ]

  // Member Management - requires MemAdmin or higher
  if (authStore.hasPermission('MemAdmin')) {
    options.push({
      label: 'Members',
      key: '/members',
      icon: renderIcon(PeopleOutline)
    })
  }

  // Household Management - requires MemAdmin or higher
  if (authStore.hasPermission('MemAdmin')) {
    options.push({
      label: 'Households',
      key: '/households',
      icon: renderIcon(HomeOutline)
    })
  }

  // Menu Management - requires MenuAdmin or higher
  if (authStore.hasPermission('MenuAdmin')) {
    options.push({
      label: 'Menus',
      key: '/menus',
      icon: renderIcon(RestaurantOutline)
    })
  }

  // Filling Management - requires FillAdmin or higher
  if (authStore.hasPermission('FillAdmin')) {
    options.push({
      label: 'Fill Reports',
      key: '/fill-reports',
      icon: renderIcon(CalendarOutline)
    })
  }

  // Vendor Management - requires MenuAdmin or higher
  if (authStore.hasPermission('MenuAdmin')) {
    options.push({
      label: 'Vendors',
      key: '/vendors',
      icon: renderIcon(RestaurantOutline)
    })
  }

  // Analytics - requires Admin or higher
  if (authStore.hasPermission('Admin')) {
    options.push({
      label: 'Analytics',
      key: '/analytics',
      icon: renderIcon(BarChartOutline)
    })
  }

  // Settings - requires Admin or higher
  if (authStore.hasPermission('Admin')) {
    options.push({
      label: 'Settings',
      key: '/settings',
      icon: renderIcon(SettingsOutline)
    })
  }

  return options
})

const activeKey = computed(() => route.path)

const breadcrumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const breadcrumbs = [{ label: 'Dashboard', path: '/' }]
  
  pathSegments.forEach((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/')
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')
    breadcrumbs.push({ label, path })
  })
  
  return breadcrumbs
})

const userMenuOptions = [
  {
    label: 'Profile',
    key: 'profile'
  },
  {
    label: 'Logout',
    key: 'logout'
  }
]

const handleMenuUpdate = (key) => {
  router.push(key)
}

const handleUserMenuSelect = (key) => {
  if (key === 'logout') {
    authStore.logout()
    message.success('Logged out successfully')
    router.push('/login')
  } else if (key === 'profile') {
    // TODO: Implement profile page
    message.info('Profile page coming soon')
  }
}

const renderIcon = (icon) => {
  return () => h(icon)
}
</script>

<style scoped>
.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  text-align: center;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 64px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-right {
  display: flex;
  align-items: center;
}

.page-content {
  padding: 24px;
  min-height: calc(100vh - 64px);
  background: #f5f5f5;
}
</style> 