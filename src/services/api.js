import axios from 'axios'

// API Configuration
const API_BASE_URL = 'https://us-central1-xyz-moohh-fmbmobile-test.cloudfunctions.net/app'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - redirect to login
      localStorage.removeItem('authToken')
      localStorage.removeItem('userInfo')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const endpoints = {
  // Authentication
  login: '/auth/login',
  
  // Members
  members: '/api/v1/admin/mumineen',
  member: (id) => `/api/v1/admin/mumineen/${id}`,
  
  // Households
  households: '/api/v2/admin/households',
  household: (id) => `/api/v1/household/${id}`,
  
  // Vendors
  vendors: '/api/v1/admin/vendor',
  vendor: (id) => `/api/v1/admin/vendor/${id}`,
  
  // Menu Items
  menuItems: '/api/v1/admin/item',
  menuItem: (id) => `/api/v1/admin/item/${id}`,
  
  // Fill Reports
  fillReports: '/api/v2/admin/fills',
  fillReport: (date) => `/api/v2/admin/fills/${date}`,
  inventory: (date, householdId) => `/api/v2/admin/fills/${date}/household/${householdId}/inventory`,
  
  // Messaging
  sendTopicNotification: '/api/v1/admin/messaging/send/topic',
  sendTokenNotification: '/api/v1/admin/messaging/send/token',
}

export default api 