import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const token = ref(localStorage.getItem('authToken') || null)
  const isLoading = ref(false)

  // Roles in order of permissions (Admin has highest, Member has lowest)
  const roles = {
    Admin: 6,
    FMAdmin: 5,
    MemAdmin: 4,
    FillAdmin: 3,
    MenuAdmin: 2,
    Member: 1
  }

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const userRole = computed(() => user.value?.role || 'Member')
  const userRoleLevel = computed(() => roles[userRole.value] || 1)
  
  // Check if user has permission for a specific role or higher
  const hasPermission = computed(() => {
    return (requiredRole) => {
      const requiredLevel = roles[requiredRole] || 1
      return userRoleLevel.value >= requiredLevel
    }
  })

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
    localStorage.removeItem('authToken')
    localStorage.removeItem('userInfo')
    
    // Clear store
    user.value = null
    token.value = null
  }

  const initializeAuth = () => {
    const storedToken = localStorage.getItem('authToken')
    const storedUser = localStorage.getItem('userInfo')
    
    if (storedToken && storedUser) {
      try {
        user.value = JSON.parse(storedUser)
        token.value = storedToken
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        logout()
      }
    }
  }

  return {
    // State
    user,
    token,
    isLoading,
    
    // Getters
    isAuthenticated,
    userRole,
    userRoleLevel,
    hasPermission,
    
    // Actions
    login,
    logout,
    initializeAuth
  }
}) 