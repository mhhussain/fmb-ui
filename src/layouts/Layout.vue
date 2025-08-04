<template>
  <n-layout has-sider>
    <!-- Main Content -->
    <n-layout>
      <!-- Header -->
      <n-layout-header bordered>
        <div class="header-content">
          <div class="header-left">
            <h1>FMB Admin - {{ env }}</h1>
          </div>

          <div class="header-center">
            <n-button v-on:click="nav()" quaternary>
              Menus
            </n-button>
            <n-button quaternary>
              Households
            </n-button>
            <n-button quaternary>
              Vendors
            </n-button>
          </div>
          
          <div class="header-right">
            <n-dropdown :options="userMenuOptions" @select="handleUserMenuSelect">
              <n-button quaternary>
                <template #icon>
                  <n-icon><PersonOutline /></n-icon>
                </template>
                {{ user?.ITSID || 'Admin' }}
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
        <div class="breadcrumb-container">
          <n-breadcrumb>
            <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
              {{ item.label }}
            </n-breadcrumb-item>
          </n-breadcrumb>
        </div>
        <div class="page-content">
          <router-view />
        </div>
      </n-layout-content>

      <n-layout-footer bordered>
        <n-space justify="right">
          <n-text>FMB Administration</n-text>
          <n-text>Copyright 2025</n-text>
        </n-space>
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMessage } from 'naive-ui'
import { 
  PersonOutline, 
  ChevronDownOutline,
} from '@vicons/ionicons5'
import { useAuthStore } from '@/stores/auth'

import { apiUrl } from '@/utils/helpers';
const env = computed(() => {
  let env = '';
  if (apiUrl.includes('us-central1-xyz-moohh-fmbmobile-test.cloudfunctions.net')) {
    env = 'Test';
  } else if (apiUrl.includes('us-central1-xyz-moohh-fmbmobile.cloudfunctions.net')) {
    env = 'Prod';
  } else if (apiUrl.includes('127.0.0.1:5001')) {
    env = 'Local';
  } else {
    env = 'Unknown';
  }

  return env;
})

const router = useRouter()
const route = useRoute()
const message = useMessage()
const authStore = useAuthStore()

const user = computed(() => authStore.user)


const breadcrumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean);
  const breadcrumbs = [];
  
  pathSegments.forEach((segment, index) => {
    const path = '/' + pathSegments.slice(0, index + 1).join('/');
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
    breadcrumbs.push({ label, path });
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

const nav = () => {
  router.push('/')
}
</script>

<style scoped>
.header-content {
  background-color: #F8D3AF;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15vw 0 12vw;
  height: 64px;
}

.breadcrumb-container {
  padding: 16px 12vw 0 12vw;
  background: #f5f5f5;
}

.page-content {
  padding: 24px 12vw 0 12vw;
  min-height: calc(100vh - 64px);
  background: #f5f5f5;
}
</style> 