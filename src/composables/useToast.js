import { ref, reactive } from 'vue'

// Global toast state
const toasts = ref([])
let toastId = 0

export function useToast() {
  // Toast types
  const TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
  }

  // Add a new toast
  function addToast(message, type = TYPES.INFO, duration = 5000) {
    const id = ++toastId
    const toast = reactive({
      id,
      message,
      type,
      visible: false,
      removing: false
    })

    toasts.value.push(toast)

    // Show toast with slight delay for animation
    setTimeout(() => {
      toast.visible = true
    }, 10)

    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  // Remove a toast
  function removeToast(id) {
    const toastIndex = toasts.value.findIndex(t => t.id === id)
    if (toastIndex > -1) {
      const toast = toasts.value[toastIndex]
      toast.removing = true
      
      // Remove from array after animation
      setTimeout(() => {
        const currentIndex = toasts.value.findIndex(t => t.id === id)
        if (currentIndex > -1) {
          toasts.value.splice(currentIndex, 1)
        }
      }, 300)
    }
  }

  // Clear all toasts
  function clearToasts() {
    toasts.value.forEach(toast => {
      toast.removing = true
    })
    
    setTimeout(() => {
      toasts.value.length = 0
    }, 300)
  }

  // Convenience methods
  function success(message, duration) {
    return addToast(message, TYPES.SUCCESS, duration)
  }

  function error(message, duration = 8000) {
    return addToast(message, TYPES.ERROR, duration)
  }

  function warning(message, duration) {
    return addToast(message, TYPES.WARNING, duration)
  }

  function info(message, duration) {
    return addToast(message, TYPES.INFO, duration)
  }

  // Toast configuration
  function getToastClass(type) {
    const baseClass = 'toast align-items-center border-0'
    switch (type) {
      case TYPES.SUCCESS:
        return `${baseClass} text-bg-success`
      case TYPES.ERROR:
        return `${baseClass} text-bg-danger`
      case TYPES.WARNING:
        return `${baseClass} text-bg-warning`
      case TYPES.INFO:
      default:
        return `${baseClass} text-bg-primary`
    }
  }

  function getToastIcon(type) {
    switch (type) {
      case TYPES.SUCCESS:
        return '✓'
      case TYPES.ERROR:
        return '✕'
      case TYPES.WARNING:
        return '⚠'
      case TYPES.INFO:
      default:
        return 'ℹ'
    }
  }

  return {
    // State
    toasts,
    
    // Types
    TYPES,
    
    // Methods
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info,
    getToastClass,
    getToastIcon
  }
}