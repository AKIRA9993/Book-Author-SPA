// Authentication store file
// This file manages user login/logout state
// Handles user data and authentication status
// Provides reactive state for the entire app
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const userName = computed(() => user.value?.name || 'Admin')
  const userRole = computed(() => user.value?.role || 'admin')

  // Actions
  function login(userData = null) {
    loading.value = true
    error.value = null
    
    try {
      // Simulate login for demo purposes
      user.value = userData || {
        id: 1,
        name: 'Admin User',
        email: 'admin@booksauthors.com',
        role: 'admin'
      }
      
      isAuthenticated.value = true
      
      // Store in localStorage (optional persistence)
      localStorage.setItem('auth_user', JSON.stringify(user.value))
      localStorage.setItem('is_authenticated', 'true')
      
    } catch (err) {
      error.value = 'Login failed'
      console.error('Login error:', err)
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
    error.value = null
    
    // Clear localStorage
    localStorage.removeItem('auth_user')
    localStorage.removeItem('is_authenticated')
  }

  function checkAuthStatus() {
    // Check if user was previously authenticated
    const storedUser = localStorage.getItem('auth_user')
    const storedAuth = localStorage.getItem('is_authenticated')
    
    if (storedAuth === 'true' && storedUser) {
      try {
        user.value = JSON.parse(storedUser)
        isAuthenticated.value = true
      } catch (err) {
        console.error('Error parsing stored user:', err)
        logout()
      }
    }
  }

  function clearError() {
    error.value = null
  }

  // Initialize auth status on store creation
  checkAuthStatus()

  return {
    // State
    user,
    isAuthenticated,
    loading,
    error,
    
    // Getters
    userName,
    userRole,
    
    // Actions
    login,
    logout,
    checkAuthStatus,
    clearError
  }
})