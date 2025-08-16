<!-- Admin Dashboard - the control center for managing books and authors -->
<!-- Think of this as the cockpit where admins can see everything at a glance -->
<template>
  <div class="container-fluid py-4">
    <div class="row">
      <!-- Sidebar -->
      <div class="col-lg-3 col-xl-2 mb-4">
        <div class="admin-nav p-3">
          <h5 class="fw-bold mb-3">
            <i class="fa-solid fa-gear me-2"></i>
            Admin Panel
          </h5>
          <nav class="nav flex-column">
            <router-link to="/admin" class="nav-link active">
              <i class="fa-solid fa-house me-2"></i>
              Dashboard
            </router-link>
            <router-link to="/admin/books" class="nav-link">
              <i class="fa-solid fa-book me-2"></i>
              Manage Books
            </router-link>
            <router-link to="/admin/authors" class="nav-link">
              <i class="fa-solid fa-people-group me-2"></i>
              Manage Authors
            </router-link>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="col-lg-9 col-xl-10">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 class="display-6 fw-bold mb-2">Dashboard Overview</h1>
            <p class="text-muted mb-0">Welcome to the BookVault admin panel</p>
          </div>
          <router-link to="/" class="btn btn-outline-primary">
            <i class="fa-solid fa-arrow-left me-2"></i>
            Back to Site
          </router-link>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading dashboard data...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="alert alert-danger" role="alert">
          <i class="fa-solid fa-triangle-exclamation me-2"></i>
          {{ error }}
          <button @click="retryLoad" class="btn btn-outline-danger btn-sm ms-3">
            Retry
          </button>
        </div>

        <!-- Dashboard Content -->
        <div v-else>
          <!-- Stats Cards -->
          <div class="row g-4 mb-5">
            <div class="col-sm-6 col-xl-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                      <i class="fa-solid fa-book text-primary" style="font-size: 2rem;"></i>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <div class="small text-muted">Total Books</div>
                      <div class="h4 fw-bold mb-0">{{ stats.totalBooks }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-sm-6 col-xl-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                      <i class="fa-solid fa-people-group text-success" style="font-size: 2rem;"></i>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <div class="small text-muted">Total Authors</div>
                      <div class="h4 fw-bold mb-0">{{ stats.totalAuthors }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-sm-6 col-xl-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                      <i class="fa-solid fa-tags text-warning" style="font-size: 2rem;"></i>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <div class="small text-muted">Unique Tags</div>
                      <div class="h4 fw-bold mb-0">{{ stats.uniqueTags }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="col-sm-6 col-xl-3">
              <div class="card">
                <div class="card-body">
                  <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                      <i class="fa-solid fa-calendar-days text-info" style="font-size: 2rem;"></i>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <div class="small text-muted">Latest Year</div>
                      <div class="h4 fw-bold mb-0">{{ stats.latestYear }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="row g-4">
            <!-- Recent Books -->
            <div class="col-lg-6">
              <div class="card h-100">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="mb-0">
                    <i class="fa-solid fa-book me-2"></i>
                    Recent Books
                  </h5>
                  <router-link to="/admin/books" class="btn btn-outline-primary btn-sm">
                    View All
                  </router-link>
                </div>
                <div class="card-body">
                  <div v-if="recentBooks.length === 0" class="text-center text-muted py-3">
                    No books available
                  </div>
                  <div v-else class="list-group list-group-flush">
                    <div 
                      v-for="book in recentBooks" 
                      :key="book.id"
                      class="list-group-item d-flex align-items-center px-0"
                    >
                      <img 
                        :src="book.coverUrl" 
                        :alt="book.title"
                        class="me-3 rounded"
                        style="width: 40px; height: 60px; object-fit: cover;"
                      >
                      <div class="flex-grow-1">
                        <h6 class="mb-1">{{ book.title }}</h6>
                        <small class="text-muted">
                          {{ getAuthorName(book.authorId) }} • {{ book.year }}
                        </small>
                      </div>
                      <router-link 
                        :to="`/admin/books/${book.id}/edit`"
                        class="btn btn-outline-secondary btn-sm"
                      >
                        <i class="fa-solid fa-pen"></i>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Authors -->
            <div class="col-lg-6">
              <div class="card h-100">
                <div class="card-header d-flex justify-content-between align-items-center">
                  <h5 class="mb-0">
                    <i class="fa-solid fa-people-group me-2"></i>
                    Authors
                  </h5>
                  <router-link to="/admin/authors" class="btn btn-outline-success btn-sm">
                    View All
                  </router-link>
                </div>
                <div class="card-body">
                  <div v-if="authors.length === 0" class="text-center text-muted py-3">
                    No authors available
                  </div>
                  <div v-else class="list-group list-group-flush">
                    <div 
                      v-for="author in authors.slice(0, 5)" 
                      :key="author.id"
                      class="list-group-item d-flex align-items-center px-0"
                    >
                      <img 
                        :src="author.avatarUrl" 
                        :alt="author.name"
                        class="me-3 rounded-circle"
                        style="width: 40px; height: 40px; object-fit: cover;"
                      >
                      <div class="flex-grow-1">
                        <h6 class="mb-1">{{ author.name }}</h6>
                        <small class="text-muted">
                          {{ getAuthorBookCount(author.id) }} book{{ getAuthorBookCount(author.id) !== 1 ? 's' : '' }}
                        </small>
                      </div>
                      <router-link 
                        :to="`/admin/authors/${author.id}/edit`"
                        class="btn btn-outline-secondary btn-sm"
                      >
                        <i class="fa-solid fa-pen"></i>
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="row g-4 mt-4">
            <div class="col">
              <div class="card">
                <div class="card-header">
                  <h5 class="mb-0">
                    <i class="fa-solid fa-bolt me-2"></i>
                    Quick Actions
                  </h5>
                </div>
                <div class="card-body">
                  <div class="row g-3">
                    <div class="col-sm-6 col-lg-3">
                      <div class="d-grid">
                        <router-link to="/admin/books/new" class="btn btn-primary">
                          <i class="fa-solid fa-circle-plus me-2"></i>
                          Add New Book
                        </router-link>
                      </div>
                    </div>
                    <div class="col-sm-6 col-lg-3">
                      <div class="d-grid">
                        <router-link to="/admin/authors/new" class="btn btn-success">
                          <i class="fa-solid fa-user-plus me-2"></i>
                          Add New Author
                        </router-link>
                      </div>
                    </div>
                    <div class="col-sm-6 col-lg-3">
                      <div class="d-grid">
                        <router-link to="/books" class="btn btn-outline-primary">
                          <i class="fa-solid fa-eye me-2"></i>
                          View Public Site
                        </router-link>
                      </div>
                    </div>
                    <div class="col-sm-6 col-lg-3">
                      <div class="d-grid">
                        <button @click="refreshData" class="btn btn-outline-secondary">
                          <i class="fa-solid fa-rotate me-2"></i>
                          Refresh Data
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useBooksStore } from '../../stores/books.js'
import { useAuthorsStore } from '../../stores/authors.js'

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()

// Computed
const books = computed(() => booksStore.books)
const authors = computed(() => authorsStore.authors)
const loading = computed(() => booksStore.loading || authorsStore.loading)
const error = computed(() => booksStore.error || authorsStore.error)

const stats = computed(() => {
  const allTags = books.value.flatMap(book => book.tags || [])
  const uniqueTags = [...new Set(allTags)].length
  const years = books.value.map(book => book.year).filter(Boolean)
  const latestYear = years.length > 0 ? Math.max(...years) : new Date().getFullYear()

  return {
    totalBooks: books.value.length,
    totalAuthors: authors.value.length,
    uniqueTags,
    latestYear
  }
})

const recentBooks = computed(() => {
  return books.value
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
})

// Methods
const getAuthorName = (authorId) => {
  const author = authorsStore.getAuthorById(authorId)
  return author ? author.name : 'Unknown Author'
}

const getAuthorBookCount = (authorId) => {
  return books.value.filter(book => String(book.authorId) === String(authorId)).length
}

const retryLoad = async () => {
  await refreshData()
}

const refreshData = async () => {
  await Promise.all([
    booksStore.fetchBooks(true),
    authorsStore.fetchAuthors(true)
  ])
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    booksStore.fetchBooks(),
    authorsStore.fetchAuthors()
  ])
})
</script>