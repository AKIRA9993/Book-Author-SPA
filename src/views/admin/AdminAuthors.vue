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
            <router-link to="/admin" class="nav-link">
              <i class="fa-solid fa-house me-2"></i>
              Dashboard
            </router-link>
            <router-link to="/admin/books" class="nav-link">
              <i class="fa-solid fa-book me-2"></i>
              Manage Books
            </router-link>
            <router-link to="/admin/authors" class="nav-link active">
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
            <h1 class="display-6 fw-bold mb-2">Manage Authors</h1>
            <p class="text-muted mb-0">Add, edit, and manage authors in your collection</p>
          </div>
          <div class="d-flex gap-2">
            <router-link to="/admin/authors/new" class="btn btn-primary">
              <i class="fa-solid fa-user-plus me-2"></i>
              Add New Author
            </router-link>
            <router-link to="/admin" class="btn btn-outline-secondary">
              <i class="fa-solid fa-arrow-left me-2"></i>
              Dashboard
            </router-link>
          </div>
        </div>

        <!-- Search -->
        <div class="row mb-4">
          <div class="col-lg-8">
            <div class="search-container">
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Search authors by name or bio..."
              >
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
            </div>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading authors...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="alert alert-danger" role="alert">
          <i class="fa-solid fa-triangle-exclamation me-2"></i>
          {{ error }}
          <button @click="retryLoad" class="btn btn-outline-danger btn-sm ms-3">
            Retry
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredAuthors.length === 0" class="empty-state">
          <i class="fa-solid fa-people-group"></i>
          <h3>No Authors Found</h3>
          <p v-if="searchQuery">
            No authors match your search criteria.
          </p>
          <p v-else>
            <!-- Admin Authors page - where admins manage the author collection -->
            <!-- Like a directory manager for adding, editing, and organizing author profiles -->
          </p>
          <div class="d-flex gap-2 justify-content-center">
            <button v-if="searchQuery" @click="clearSearch" class="btn btn-outline-primary">
              Clear Search
            </button>
            <router-link to="/admin/authors/new" class="btn btn-primary">
              Add First Author
            </router-link>
          </div>
        </div>

        <!-- Authors Grid -->
        <div v-else class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              Authors ({{ filteredAuthors.length }})
            </h5>
            <div class="d-flex align-items-center gap-2">
              <button 
                @click="refreshAuthors" 
                class="btn btn-outline-secondary btn-sm"
                :disabled="loading"
              >
                 <i class="fa-solid fa-rotate me-1"></i>
                Refresh
              </button>
            </div>
          </div>
          
          <div class="card-body">
            <div class="row">
              <div 
                v-for="author in filteredAuthors" 
                :key="author.id"
                class="col-lg-6 col-xl-4 mb-4"
              >
                <div class="card h-100">
                  <div class="card-body">
                    <div class="d-flex align-items-start mb-3">
                      <img 
                        :src="author.avatarUrl" 
                        :alt="author.name"
                        class="rounded-circle me-3"
                        style="width: 60px; height: 60px; object-fit: cover;"
                      >
                      <div class="flex-grow-1">
                        <h6 class="card-title mb-1">{{ author.name }}</h6>
                        <p class="card-text text-muted small mb-2">
                          {{ author.bio }}
                        </p>
                        
                        <!-- Stats -->
                        <div class="d-flex flex-column gap-1">
                          <small class="text-muted">
                            <i class="fa-solid fa-book me-1"></i>
                            {{ getBookCount(author.id) }} book{{ getBookCount(author.id) !== 1 ? 's' : '' }}
                          </small>
                          <small class="text-muted">
                            Created {{ formatDate(author.createdAt) }}
                          </small>
                        </div>
                      </div>
                    </div>
                    
                    <!-- Actions -->
                    <div class="d-flex gap-1">
                      <router-link 
                        :to="`/authors/${author.id}`"
                        class="btn btn-outline-info btn-sm"
                        title="View"
                      >
                        <i class="fa-solid fa-eye"></i>
                      </router-link>
                      <router-link 
                        :to="`/admin/authors/${author.id}/edit`"
                        class="btn btn-outline-primary btn-sm"
                        title="Edit"
                      >
                        <i class="fa-solid fa-pen"></i>
                      </router-link>
                      <button 
                        @click="confirmDelete(author)"
                        class="btn btn-outline-danger btn-sm"
                        title="Delete"
                        :disabled="deleting === author.id"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div 
          v-if="authorToDelete"
          class="modal d-block"
          tabindex="-1"
          style="background-color: rgba(0,0,0,0.5);"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Confirm Delete</h5>
                <button 
                  @click="cancelDelete"
                  type="button" 
                  class="btn-close"
                ></button>
              </div>
              <div class="modal-body">
                <p>
                  Are you sure you want to delete 
                  <strong>{{ authorToDelete.name }}</strong>?
                </p>
                 <div v-if="getBookCount(authorToDelete.id) > 0" class="alert alert-warning">
                   <i class="fa-solid fa-triangle-exclamation me-2"></i>
                  This author has {{ getBookCount(authorToDelete.id) }} book(s) 
                  associated with them. Deleting the author may cause issues.
                </div>
                <p class="text-muted mb-0">This action cannot be undone.</p>
              </div>
              <div class="modal-footer">
                <button 
                  @click="cancelDelete"
                  type="button" 
                  class="btn btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  @click="deleteAuthor"
                  type="button" 
                  class="btn btn-danger"
                  :disabled="deleting"
                >
                  <span v-if="deleting" class="spinner-border spinner-border-sm me-2"></span>
                  Delete Author
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthorsStore } from '../../stores/authors.js'
import { useBooksStore } from '../../stores/books.js'

const authorsStore = useAuthorsStore()
const booksStore = useBooksStore()

const searchQuery = ref('')
const authorToDelete = ref(null)
const deleting = ref(false)

// Computed
const authors = computed(() => authorsStore.authors)
const books = computed(() => booksStore.books)
const loading = computed(() => authorsStore.loading || booksStore.loading)
const error = computed(() => authorsStore.error || booksStore.error)

const filteredAuthors = computed(() => {
  if (!searchQuery.value) return authors.value

  const query = searchQuery.value.toLowerCase()
  return authors.value.filter(author => 
    author.name.toLowerCase().includes(query) ||
    author.bio.toLowerCase().includes(query)
  )
})

// Methods
const getBookCount = (authorId) => {
  return books.value.filter(book => String(book.authorId) === String(authorId)).length
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
}

const clearSearch = () => {
  searchQuery.value = ''
}

const refreshAuthors = async () => {
  await authorsStore.fetchAuthors(true)
}

const retryLoad = async () => {
  await Promise.all([
    authorsStore.fetchAuthors(true),
    booksStore.fetchBooks(true)
  ])
}

const confirmDelete = (author) => {
  authorToDelete.value = author
}

const cancelDelete = () => {
  authorToDelete.value = null
  deleting.value = false
}

const deleteAuthor = async () => {
  if (!authorToDelete.value) return

  deleting.value = true

  try {
    await authorsStore.deleteAuthor(authorToDelete.value.id)
    authorToDelete.value = null
  } catch (error) {
    console.error('Error deleting author:', error)
  } finally {
    deleting.value = false
  }
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    authorsStore.fetchAuthors(),
    booksStore.fetchBooks()
  ])
})
</script>