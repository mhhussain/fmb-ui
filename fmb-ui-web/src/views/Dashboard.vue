<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Dashboard</h1>
      <p>Welcome to the FMB Administrative Dashboard</p>
    </div>

    <div class="stats-grid">
      <n-card class="stat-card">
        <div class="stat-content">
          <div class="stat-icon">
            <n-icon size="32" color="#18a058">
              <PeopleOutline />
            </n-icon>
          </div>
          <div class="stat-info">
            <h3>{{ stats.members || 0 }}</h3>
            <p>Total Members</p>
          </div>
        </div>
      </n-card>

      <n-card class="stat-card">
        <div class="stat-content">
          <div class="stat-icon">
            <n-icon size="32" color="#2080f0">
              <HomeOutline />
            </n-icon>
          </div>
          <div class="stat-info">
            <h3>{{ stats.households || 0 }}</h3>
            <p>Total Households</p>
          </div>
        </div>
      </n-card>

      <n-card class="stat-card">
        <div class="stat-content">
          <div class="stat-icon">
            <n-icon size="32" color="#f0a020">
              <RestaurantOutline />
            </n-icon>
          </div>
          <div class="stat-info">
            <h3>{{ stats.vendors || 0 }}</h3>
            <p>Active Vendors</p>
          </div>
        </div>
      </n-card>

      <n-card class="stat-card">
        <div class="stat-content">
          <div class="stat-icon">
            <n-icon size="32" color="#d03050">
              <CalendarOutline />
            </n-icon>
          </div>
          <div class="stat-info">
            <h3>{{ stats.fillReports || 0 }}</h3>
            <p>Fill Reports</p>
          </div>
        </div>
      </n-card>
    </div>

    <div class="dashboard-content">
      <div class="content-grid">
        <n-card title="Quick Actions" class="action-card">
          <div class="action-buttons">
            <n-button
              v-if="hasPermission('MemAdmin')"
              type="primary"
              @click="router.push('/members')"
              block
            >
              Manage Members
            </n-button>
            
            <n-button
              v-if="hasPermission('MemAdmin')"
              type="info"
              @click="router.push('/households')"
              block
            >
              Manage Households
            </n-button>
            
            <n-button
              v-if="hasPermission('MenuAdmin')"
              type="success"
              @click="router.push('/menus')"
              block
            >
              Manage Menus
            </n-button>
            
            <n-button
              v-if="hasPermission('FillAdmin')"
              type="warning"
              @click="router.push('/fill-reports')"
              block
            >
              View Fill Reports
            </n-button>
          </div>
        </n-card>

        <n-card title="Recent Activity" class="activity-card">
          <div class="activity-list">
            <div v-if="recentActivity.length === 0" class="no-activity">
              <p>No recent activity</p>
            </div>
            <div v-else class="activity-items">
              <div
                v-for="activity in recentActivity"
                :key="activity.id"
                class="activity-item"
              >
                <div class="activity-icon">
                  <n-icon size="16">
                    <component :is="activity.icon" />
                  </n-icon>
                </div>
                <div class="activity-content">
                  <p class="activity-text">{{ activity.text }}</p>
                  <p class="activity-time">{{ formatTime(activity.time) }}</p>
                </div>
              </div>
            </div>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  PeopleOutline, 
  HomeOutline, 
  RestaurantOutline, 
  CalendarOutline,
  CheckmarkCircleOutline,
  AlertCircleOutline
} from '@vicons/ionicons5'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const stats = ref({
  members: 0,
  households: 0,
  vendors: 0,
  fillReports: 0
})

const recentActivity = ref([])

const hasPermission = computed(() => authStore.hasPermission)

onMounted(async () => {
  // TODO: Load actual stats from API
  stats.value = {
    members: 1250,
    households: 450,
    vendors: 8,
    fillReports: 12
  }

  // Mock recent activity
  recentActivity.value = [
    {
      id: 1,
      text: 'New member registered: John Doe',
      time: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      icon: 'PeopleOutline'
    },
    {
      id: 2,
      text: 'Fill report generated for 2025-01-15',
      time: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      icon: 'CalendarOutline'
    },
    {
      id: 3,
      text: 'Menu updated for next week',
      time: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      icon: 'RestaurantOutline'
    }
  ]
})

const formatTime = (time) => {
  const now = new Date()
  const diff = now - time
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) {
    return `${minutes} minutes ago`
  } else if (hours < 24) {
    return `${hours} hours ago`
  } else {
    return `${days} days ago`
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  margin-bottom: 32px;
}

.dashboard-header h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 600;
  color: #333;
}

.dashboard-header p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  border-radius: 8px;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  background: #f5f5f5;
}

.stat-info h3 {
  margin: 0 0 4px 0;
  font-size: 24px;
  font-weight: 600;
  color: #333;
}

.stat-info p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.action-card,
.activity-card {
  border-radius: 8px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.activity-list {
  max-height: 300px;
  overflow-y: auto;
}

.no-activity {
  text-align: center;
  padding: 32px;
  color: #999;
}

.activity-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  border-radius: 6px;
  background: #f9f9f9;
}

.activity-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: #e0e0e0;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-text {
  margin: 0 0 4px 0;
  font-size: 14px;
  color: #333;
}

.activity-time {
  margin: 0;
  font-size: 12px;
  color: #999;
}

@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style> 