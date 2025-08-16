<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <!-- Brand --><!--vue router link for navigation-->
      <router-link to="/" class="navbar-brand fw-bold">
        📚 Books & Authors
      </router-link>
      
      <!-- Mobile toggle -->
       <!--data bootstrap toggles-->
      <button
        class="navbar-toggler"
        type="button"
        
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <!-- Navigation -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <!-- Public Navigation -->
          <li class="nav-item">
            <router-link to="/" class="nav-link" exact-active-class="active">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/books" class="nav-link" active-class="active">
              Books
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/authors" class="nav-link" active-class="active">
              Authors
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active">
              About
            </router-link>
          </li>
        </ul>
        
        <!-- Admin Navigation -->
        <ul class="navbar-nav">
          <li class="nav-item dropdown" v-if="isAuthenticated">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </a>
            <ul class="dropdown-menu">
              <li>
                <router-link to="/admin" class="dropdown-item">
                  Dashboard
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <router-link to="/admin/books" class="dropdown-item">
                  Manage Books
                </router-link>
              </li>
              <li>
                <router-link to="/admin/authors" class="dropdown-item">
                  Manage Authors
                </router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a href="#" class="dropdown-item" @click.prevent="handleLogout">
                  Logout
                </a>
              </li>
            </ul>
          </li>
          
          <!-- Login Button -->
          <li class="nav-item" v-if="!isAuthenticated">
            <button
              class="btn btn-outline-light btn-sm"
              @click="handleLogin"
            >
              Admin Login
            </button>
          </li>
          
          <!-- User Info -->
          <li class="nav-item" v-if="isAuthenticated">
            <span class="navbar-text">
              Welcome, {{ userName }}!
            </span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.js'
import { useToast } from '../composables/useToast.js'

const router = useRouter()
const authStore = useAuthStore()
const { success } = useToast()

// Computed properties
const isAuthenticated = computed(() => authStore.isAuthenticated)
const userName = computed(() => authStore.userName)

// Methods
function handleLogin() {
  authStore.login()
  success('Logged in successfully!')
  router.push('/admin')
}

function handleLogout() {
  authStore.logout()
  success('Logged out successfully!')
  router.push('/')
}
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  position: relative;
  transition: color 0.15s ease-in-out;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 0.85);
}

.nav-link.active {
  color: #fff;
  font-weight: 500;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background-color: #fff;
  border-radius: 2px;
}

.dropdown-menu {
  border: 0;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.dropdown-item {
  transition: background-color 0.15s ease-in-out;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}

.navbar-text {
  color: rgba(255, 255, 255, 0.85) !important;
  font-size: 0.9rem;
}

.btn-outline-light {
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-outline-light:hover {
  background-color: #fff;
  color: #0d6efd;
}

/* Mobile styles */
@media (max-width: 991px) {
  .navbar-collapse {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0.375rem;
    margin-top: 1rem;
    padding: 1rem;
  }
  
  .nav-link.active::after {
    display: none;
  }
  
  .dropdown-menu {
    background-color: rgba(255, 255, 255, 0.95);
  }
  
  .navbar-nav .nav-item {
    margin-bottom: 0.5rem;
  }
  
  .navbar-text {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
}
</style>