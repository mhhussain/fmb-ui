import axios from 'axios'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { apiUrl } from '@/utils/helpers';


export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('authToken') || null)
  const isLoading = ref(false)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)

  // Actions
  const login = async (itsId, password) => {
    isLoading.value = true
    try {
      const response = await axios.get(`${apiUrl}/api/v2/mumineen/${itsId}`);

      // Placeholder authentication - replace with actual API call
      if (response.data.ITSID) {

        const userData = response.data;
        
        const newToken = 'jwt-token-' + Date.now();
        
        // Store in localStorage
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('userInfo', JSON.stringify(userData));
        
        // Update store
        user.value = userData
        token.value = newToken
        
        return { success: true, user: userData }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('userInfo')
    
    // Clear store
    user.value = null
  }

  const initializeAuth = () => {
    const storedUser = localStorage.getItem('userInfo')
    
    if (storedUser) {
      try {
        user.value = JSON.parse(storedUser)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        logout()
      }
    }
  }

  return {
    // State
    user,
    isLoading,
    
    // Getters
    isAuthenticated,
    
    // Actions
    login,
    logout,
    initializeAuth
  }
}) 