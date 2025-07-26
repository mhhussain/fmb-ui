<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>FMB Admin</h1>
      </div>
      
      <n-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        @submit.prevent="handleLogin"
      >
        <n-form-item label="ITS ID" path="itsId">
          <n-input
            v-model:value="formData.itsId"
            placeholder="Enter your ITS ID"
            :disabled="isLoading"
            @keyup.enter="handleLogin"
          />
        </n-form-item>
        
        <n-form-item label="Password" path="password">
          <n-input
            v-model:value="formData.password"
            type="password"
            placeholder="Enter password"
            :disabled="isLoading"
            @keyup.enter="handleLogin"
          />
        </n-form-item>
        
        <n-form-item>
          <n-button
            type="primary"
            size="large"
            :loading="isLoading"
            :disabled="!formData.itsId || !formData.password"
            @click="handleLogin"
            block
          >
            {{ isLoading ? 'Logging in...' : 'Log In' }}
          </n-button>
        </n-form-item>
      </n-form>
      
      <div class="login-footer">
        <p class="text-muted">
          Temporary login screen for testing purposes.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const message = useMessage()
const authStore = useAuthStore()

const formRef = ref(null)
const isLoading = ref(false)

const formData = reactive({
  itsId: '',
  password: ''
})

const rules = {
  itsId: [
    { required: true, message: 'ITS ID is required', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Password is required', trigger: 'blur' }
  ]
}

const handleLogin = async () => {
  try {
    await formRef.value?.validate()
    
    isLoading.value = true
    await authStore.login(formData.itsId, formData.password)
    
    message.success('Login successful')
    router.push('/')
  } catch (error) {
    console.error('Login error:', error)
    message.error(error.message || 'Login failed. Please check your credentials.')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fa8824 0%, #7649f1 100%);
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 500px;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.login-header h1 {
  margin: 0 0 8px 0;
  color: #333;
  font-size: 28px;
  font-weight: 600;
}

.login-header p {
  margin: 0;
  color: #666;
  font-size: 16px;
}

.login-footer {
  margin-top: 24px;
  text-align: center;
}

.text-muted {
  color: #999;
  font-size: 14px;
  margin: 0;
}
</style> 