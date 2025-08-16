<template>
  <div class="toast-container">
    <transition-group name="toast-fade" tag="div">
      <div 
        v-for="toast in toasts" 
        :key="toast.id" 
        :class="getToastClass(toast.type)"
        class="show mb-2 d-flex align-items-center px-3 py-2"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <div class="me-2">
          <span class="fw-bold">{{ getToastIcon(toast.type) }}</span>
        </div>
        <div class="flex-grow-1">{{ toast.message }}</div>
        <button 
          class="btn btn-sm btn-light ms-3" 
          aria-label="Close"
          @click="removeToast(toast.id)"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast.js'

const { toasts, removeToast, getToastClass, getToastIcon } = useToast()
</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.3s ease;
}
.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>

