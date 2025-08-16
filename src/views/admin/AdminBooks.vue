<!-- Admin Books page - where admins manage the book collection -->
<!-- Like a librarian's workspace for adding, editing, and organizing books -->
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
            <router-link to="/admin/books" class="nav-link active">
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
            <h1 class="display-6 fw-bold mb-2">Manage Books</h1>
            <p class="text-muted mb-0">Add, edit, and manage your book collection</p>
          </div>
          <div class="d-flex gap-2">
            <router-link to="/admin/books/new" class="btn btn-primary">
              <i class="fa-solid fa-circle-plus me-2"></i>
              Add New Book
            </router-link>
            <router-link to="/admin" class="btn btn-outline-secondary">
              <i class="fa-solid fa-arrow-left me-2"></i>
              Dashboard
            </router-link>
          </div>
        </div>

        <!-- Search and Filters -->
        <div class="row mb-4">
          <div class="col-lg-8">
            <div class="search-container">
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Search books by title, description, or tags..."
              >
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
            </div>
          </div>
          <div class="col-lg-4">
            <select v-model="authorFilter" class="form-select">
              <option value="">All Authors</option>
              <option 
                v-for="author in authors" 
                :key="author.id" 
                :value="author.id"
              >
                {{ author.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading books...</p>
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
        <div v-else-if="filteredBooks.length === 0" class="empty-state">
          <i class="fa-solid fa-book"></i>
          <h3>No Books Found</h3>
          <p v-if="hasFilters">
            No books match your current search criteria.
          </p>
          <p v-else>
            No books have been added to the collection yet.
          </p>
          <div class="d-flex gap-2 justify-content-center">
            <button v-if="hasFilters" @click="clearFilters" class="btn btn-outline-primary">
              Clear Filters
            </button>
            <router-link to="/admin/books/new" class="btn btn-primary">
              Add First Book
            </router-link>
          </div>
        </div>

        <!-- Books Table -->
        <div v-else class="card">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">
              Books ({{ filteredBooks.length }})
            </h5>
            <div class="d-flex align-items-center gap-2">
              <button 
                @click="refreshBooks" 
                class="btn btn-outline-secondary btn-sm"
                :disabled="loading"
              >
                 <i class="fa-solid fa-rotate me-1"></i>
                Refresh
              </button>
            </div>
          </div>
          
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="sticky-top">
                <tr>
                  <th style="width: 80px;">Cover</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Year</th>
                  <th>Tags</th>
                  <th style="width: 120px;">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="book in filteredBooks" :key="book.id">
                  <td>
                    <img 
                      :src="book.coverUrl" 
                      :alt="book.title"
                      class="rounded"
                      style="width: 40px; height: 60px; object-fit: cover;"
                    >
                  </td>
                  <td>
                    <div>
                      <h6 class="mb-1">{{ book.title }}</h6>
                      <small class="text-muted text-truncate d-block" style="max-width: 200px;">
                        {{ book.description }}
                      </small>
                    </div>
                  </td>
                  <td>
                    <span class="text-nowrap">{{ getAuthorName(book.authorId) }}</span>
                  </td>
                  <td>
                    <span class="badge bg-light text-dark">{{ book.year }}</span>
                  </td>
                  <td>
                    <div class="d-flex flex-wrap gap-1">
                      <span 
                        v-for="tag in (book.tags || []).slice(0, 2)" 
                        :key="tag"
                        class="badge bg-primary"
                        style="font-size: 0.7rem;"
                      >
                        {{ tag }}
                      </span>
                      <span 
                        v-if="(book.tags || []).length > 2" 
                        class="badge bg-secondary"
                        style="font-size: 0.7rem;"
                      >
                        +{{ (book.tags || []).length - 2 }}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div class="btn-group btn-group-sm" role="group">
                      <router-link 
                        :to="`/books/${book.id}`"
                        class="btn btn-outline-info"
                        title="View"
                      >
                        <i class="fa-solid fa-eye"></i>
                      </router-link>
                      <router-link 
                        :to="`/admin/books/${book.id}/edit`"
                        class="btn btn-outline-primary"
                        title="Edit"
                      >
                        <i class="fa-solid fa-pen"></i>
                      </router-link>
                      <button 
                        @click="confirmDelete(book)"
                        class="btn btn-outline-danger"
                        title="Delete"
                        :disabled="deleting === book.id"
                      >
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div 
          v-if="bookToDelete"
          class="modal fade show d-block"
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
                  <strong>{{ bookToDelete.title }}</strong>?
                </p>
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
                  @click="deleteBook"
                  type="button" 
                  class="btn btn-danger"
                  :disabled="deleting"
                >
                  <span v-if="deleting" class="spinner-border spinner-border-sm me-2"></span>
                  Delete Book
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
import { useBooksStore } from '../../stores/books.js'
import { useAuthorsStore } from '../../stores/authors.js'

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()

const searchQuery = ref('')
const authorFilter = ref('')
const bookToDelete = ref(null)
const deleting = ref(false)

// Computed
const books = computed(() => booksStore.books)
const authors = computed(() => authorsStore.authors)
const loading = computed(() => booksStore.loading || authorsStore.loading)
const error = computed(() => booksStore.error || authorsStore.error)

const filteredBooks = computed(() => {
  let filtered = books.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(book => 
      book.title.toLowerCase().includes(query) ||
      book.description.toLowerCase().includes(query) ||
      (book.tags || []).some(tag => tag.toLowerCase().includes(query))
    )
  }

  if (authorFilter.value) {
    filtered = filtered.filter(book => 
      String(book.authorId) === String(authorFilter.value)
    )
  }

  return filtered.sort((a, b) => a.title.localeCompare(b.title))
})

const hasFilters = computed(() => {
  return searchQuery.value || authorFilter.value
})

// Methods
const getAuthorName = (authorId) => {
  const author = authorsStore.getAuthorById(authorId)
  return author ? author.name : 'Unknown Author'
}

const clearFilters = () => {
  searchQuery.value = ''
  authorFilter.value = ''
}

const refreshBooks = async () => {
  await booksStore.fetchBooks(true)
}

const retryLoad = async () => {
  await Promise.all([
    booksStore.fetchBooks(true),
    authorsStore.fetchAuthors(true)
  ])
}

const confirmDelete = (book) => {
  bookToDelete.value = book
}

const cancelDelete = () => {
  bookToDelete.value = null
  deleting.value = false
}

const deleteBook = async () => {
  if (!bookToDelete.value) return

  deleting.value = true

  try {
    await booksStore.deleteBook(bookToDelete.value.id)
    bookToDelete.value = null
  } catch (error) {
    console.error('Error deleting book:', error)
  } finally {
    deleting.value = false
  }
}

// Lifecycle
onMounted(async () => {
  await Promise.all([
    booksStore.fetchBooks(),
    authorsStore.fetchAuthors()
  ])
})
</script>