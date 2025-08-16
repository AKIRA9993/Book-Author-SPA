//api composable file
//this file handles all api calls and loading states
//provides reusable api functions with error handling
//manages toast notifications for api responses
import { ref } from 'vue'
import { useToast } from './useToast.js'

export function useApi() {
  const { success, error: showError } = useToast()
  
  // Create an API handler with loading and error states
  function createApiHandler(apiFunction, options = {}) {
    const loading = ref(false)
    const error = ref(null)
    const data = ref(null)

    const {
      successMessage = null,
      errorMessage = null,
      showSuccessToast = false,
      showErrorToast = true,
      onSuccess = null,
      onError = null,
      resetDataOnCall = true
    } = options

    const execute = async (...args) => {
      loading.value = true
      error.value = null
      
      if (resetDataOnCall) {
        data.value = null
      }

      try {
        const result = await apiFunction(...args)
        data.value = result

        // Show success toast if configured
        if (showSuccessToast && successMessage) {
          success(successMessage)
        }

        // Call success callback
        if (onSuccess) {
          onSuccess(result)
        }

        return result
      } catch (err) {
        error.value = err.message || 'An error occurred'

        // Show error toast if configured
        if (showErrorToast) {
          const message = errorMessage || err.message || 'An error occurred'
          showError(message)
        }

        // Call error callback
        if (onError) {
          onError(err)
        }

        throw err
      } finally {
        loading.value = false
      }
    }

    const reset = () => {
      loading.value = false
      error.value = null
      data.value = null
    }

    return {
      loading,
      error,
      data,
      execute,
      reset
    }
  }

  // Handle async operations with try-catch and toast notifications
  async function handleAsync(
    asyncFunction,
    {
      successMessage = null,
      errorMessage = null,
      showSuccessToast = false,
      showErrorToast = true,
      onSuccess = null,
      onError = null
    } = {}
  ) {
    try {
      const result = await asyncFunction()

      if (showSuccessToast && successMessage) {
        success(successMessage)
      }

      if (onSuccess) {
        onSuccess(result)
      }

      return result
    } catch (err) {
      const message = errorMessage || err.message || 'An error occurred'
      
      if (showErrorToast) {
        showError(message)
      }

      if (onError) {
        onError(err)
      }

      throw err
    }
  }

  // Debounce function for search inputs
  function debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  // Format date for display
  function formatDate(dateString) {
    if (!dateString) return ''
    
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return ''
    }
  }

  // Format date time for display
  function formatDateTime(dateString) {
    if (!dateString) return ''
    
    try {
      const date = new Date(dateString)
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return ''
    }
  }

  // Handle image load errors
  function handleImageError(event, fallbackSrc = '/placeholder-image.jpg') {
    event.target.src = fallbackSrc
  }

  // Scroll to element
  function scrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId)
    if (element) {
      const top = element.offsetTop - offset
      window.scrollTo({
        top,
        behavior: 'smooth'
      })
    }
  }

  // Copy text to clipboard
  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text)
      success('Copied to clipboard')
    } catch (err) {
      showError('Failed to copy to clipboard')
    }
  }

  // Generate placeholder image URL
  function getPlaceholderImage(width = 300, height = 400, seed = 1) {
    return `https://picsum.photos/${width}/${height}?random=${seed}`
  }

  // Truncate text with ellipsis
  function truncateText(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }

  // Parse comma-separated tags
  function parseTags(tagsString) {
    if (!tagsString) return []
    return tagsString
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
  }

  // Convert tags array to string
  function tagsToString(tagsArray) {
    if (!tagsArray || !Array.isArray(tagsArray)) return ''
    return tagsArray.join(', ')
  }

  // Validate file type and size
  function validateFile(file, allowedTypes = [], maxSize = 5 * 1024 * 1024) {
    if (!file) return { valid: false, error: 'No file selected' }

    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: `File type not allowed. Allowed types: ${allowedTypes.join(', ')}`
      }
    }

    if (file.size > maxSize) {
      const maxSizeMB = Math.round(maxSize / (1024 * 1024))
      return {
        valid: false,
        error: `File size too large. Maximum size: ${maxSizeMB}MB`
      }
    }

    return { valid: true }
  }

  // Generate unique ID
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Check if object is empty
  function isEmpty(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object
  }

  // Deep clone object
  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  // Compare two objects for equality
  function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  }

  return {
    createApiHandler,
    handleAsync,
    debounce,
    formatDate,
    formatDateTime,
    handleImageError,
    scrollToElement,
    copyToClipboard,
    getPlaceholderImage,
    truncateText,
    parseTags,
    tagsToString,
    validateFile,
    generateId,
    isEmpty,
    deepClone,
    isEqual
  }
}