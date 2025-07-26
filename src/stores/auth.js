import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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
      // Placeholder authentication - replace with actual API call
      if (itsId && password === 'admin123') {
        // Mock user data - replace with actual API response
        const mockUser = {
          itsId,
          name: 'Admin User',
          role: 'Admin',
          permissions: ['all']
        }
        
        const mockToken = 'mock-jwt-token-' + Date.now()
        
        // Store in localStorage
        localStorage.setItem('authToken', mockToken)
        localStorage.setItem('userInfo', JSON.stringify(mockUser))
        
        // Update store
        user.value = mockUser
        token.value = mockToken
        
        return { success: true, user: mockUser }
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