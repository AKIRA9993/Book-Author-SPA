<!--the root component that serves as my fondation of my entire vue app-->
<!--this file or any app.vue in general is like the frame that holds everything that includes .vue together-->
<!--this component includes all my other .vue components there for its the only one connected/imported into the main.js-->
<!--the entry point for ui-->

<template>
  <div id="app">
    <AppHeader />
    
    <main>
      <router-view /><!--its like a magic tool it doesnt interfere with anything but the given url-->
    </main>
    
    <AppFooter />
    
    <!-- Toast Container -->
    <BaseToast />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import BaseToast from './components/ui/BaseToast.vue'
</script>

<style>
/* Global Styles - only essential overrides */
:root {
  --bs-font-sans-serif: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
  font-family: var(--bs-font-sans-serif);
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
  padding-top: 0;
}

/* Custom Button Styles */
.btn-primary {
  --bs-btn-bg: #324665;
  --bs-btn-border-color:#324665;
  --bs-btn-hover-bg:#324665;
  --bs-btn-hover-border-color: #324665;
}

.btn-outline-primary {
  --bs-btn-color: #172943;
  --bs-btn-border-color: #172943;
  --bs-btn-hover-color: #fff;
  --bs-btn-hover-bg: #172943;
}

/* Loading States */
.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(19, 95, 112, 0.638);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

/* Form Validation */
.is-invalid {
  border-color: #a40b1a9c;
}

.invalid-feedback {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #880d1983;
}

/* Accessibility */ 
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Mobile First Responsive */
@media (max-width: 576px) {
  .container-fluid {
    padding-left: 15px;
    padding-right: 15px;
  }
  
  .card {
    margin-bottom: 1rem;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  
  .btn + .btn {
    margin-left: 0;
  }
}

@media (min-width: 768px) {
  .btn {
    width: auto;
    margin-bottom: 0;
  }
  
  .btn + .btn {
    margin-left: 0.5rem;
  }
}
</style>