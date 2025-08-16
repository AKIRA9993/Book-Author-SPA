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
            <h1 class="display-6 fw-bold mb-2">
              {{ isEditing ? 'Edit Book' : 'Add New Book' }}
            </h1>
            <p class="text-muted mb-0">
              {{ isEditing ? 'Update book information' : 'Add a new book to your collection' }}
            </p>
          </div>
          <router-link to="/admin/books" class="btn btn-outline-secondary">
            <i class="fa-solid fa-arrow-left me-2"></i>
            Back to Books
          </router-link>
        </div>

        <!-- Loading State -->
        <div v-if="initialLoading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-3 text-muted">Loading book data...</p>
        </div>

        <!-- Form -->
        <div v-else class="row">
          <div class="col-lg-8">
            <form @submit.prevent="handleSubmit" novalidate>
              <div class="card">
                <div class="card-header">
                  <h5 class="mb-0">Book Information</h5>
                </div>
                <div class="card-body">
                  <!-- Title -->
                  <div class="mb-3">
                    <label for="title" class="form-label">
                      Title <span class="text-danger">*</span>
                    </label>
                    <input
                      id="title"
                      v-model="formData.title"
                      @blur="validateField('title')"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors.title }"
                      placeholder="Enter book title"
                      maxlength="100"
                    >
                    <div class="form-text">3-100 characters</div>
                    <div v-if="errors.title" class="invalid-feedback">
                      {{ errors.title }}
                    </div>
                  </div>

                  <!-- Author -->
                  <div class="mb-3">
                    <label for="authorId" class="form-label">
                      Author <span class="text-danger">*</span>
                    </label>
                    <select
                      id="authorId"
                      v-model="formData.authorId"
                      @change="validateField('authorId')"
                      class="form-select"
                      :class="{ 'is-invalid': errors.authorId }"
                    >
                      <option value="">Select an author</option>
                      <option 
                        v-for="author in authors" 
                        :key="author.id" 
                        :value="author.id"
                      >
                        {{ author.name }}
                      </option>
                    </select>
                    <div v-if="errors.authorId" class="invalid-feedback">
                      {{ errors.authorId }}
                    </div>
                  </div>

                  <!-- Year -->
                  <div class="mb-3">
                    <label for="year" class="form-label">
                      Publication Year <span class="text-danger">*</span>
                    </label>
                    <input
                      id="year"
                      v-model.number="formData.year"
                      @blur="validateField('year')"
                      type="number"
                      class="form-control"
                      :class="{ 'is-invalid': errors.year }"
                      :min="1800"
                      :max="currentYear"
                      placeholder="2023"
                    >
                    <div class="form-text">Between 1800 and {{ currentYear }}</div>
                    <div v-if="errors.year" class="invalid-feedback">
                      {{ errors.year }}
                    </div>
                  </div>

                  <!-- Tags -->
                  <div class="mb-3">
                    <label for="tags" class="form-label">Tags</label>
                    <input
                      id="tags"
                      v-model="tagsInput"
                      @blur="validateField('tags')"
                      type="text"
                      class="form-control"
                      :class="{ 'is-invalid': errors.tags }"
                      placeholder="fiction, fantasy, adventure (comma-separated)"
                    >
                    <div class="form-text">0-8 tags, each 2-20 characters (comma-separated)</div>
                    <div v-if="errors.tags" class="invalid-feedback">
                      {{ errors.tags }}
                    </div>
                    
                    <!-- Tag Preview -->
                    <div v-if="formData.tags && formData.tags.length > 0" class="mt-2">
                      <small class="text-muted">Preview:</small>
                      <div class="d-flex flex-wrap gap-1 mt-1">
                        <span 
                          v-for="tag in formData.tags" 
                          :key="tag"
                          class="badge bg-primary"
                        >
                          {{ tag }}
                        </span>
                      </div>
                    </div>
                  </div>

                  <!-- Cover URL -->
                  <div class="mb-3">
                    <label for="coverUrl" class="form-label">Cover Image URL</label>
                    <input
                      id="coverUrl"
                      v-model="formData.coverUrl"
                      @blur="validateField('coverUrl')"
                      type="url"
                      class="form-control"
                      :class="{ 'is-invalid': errors.coverUrl }"
                      placeholder="https://example.com/book-cover.jpg"
                    >
                    <div class="form-text">Valid URL to book cover image</div>
                    <div v-if="errors.coverUrl" class="invalid-feedback">
                      {{ errors.coverUrl }}
                    </div>
                  </div>

                  <!-- Description -->
                  <div class="mb-3">
                    <label for="description" class="form-label">Description</label>
                    <textarea
                      id="description"
                      v-model="formData.description"
                      @blur="validateField('description')"
                      class="form-control"
                      :class="{ 'is-invalid': errors.description }"
                      rows="6"
                      maxlength="2000"
                      placeholder="Enter book description..."
                    ></textarea>
                    <div class="form-text">
                      {{ formData.description ? formData.description.length : 0 }}/2000 characters
                    </div>
                    <div v-if="errors.description" class="invalid-feedback">
                      {{ errors.description }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Form Actions -->
              <div class="d-flex justify-content-between align-items-center mt-4">
                <router-link to="/admin/books" class="btn btn-outline-secondary">
                  Cancel
                </router-link>
                
                <div class="d-flex gap-2">
                  <button 
                    v-if="isEditing"
                    @click="viewBook"
                    type="button"
                    class="btn btn-outline-info"
                    >
                     <i class="fa-solid fa-eye me-2"></i>
                    View Book
                  </button>
                  <button 
                    type="submit" 
                    class="btn btn-primary"
                    :disabled="loading || hasErrors"
                  >
                    <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                    {{ isEditing ? 'Update Book' : 'Create Book' }}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <!-- Preview -->
          <div class="col-lg-4">
            <div class="card sticky-top" style="top: 2rem;">
              <div class="card-header">
                <h5 class="mb-0">Preview</h5>
              </div>
              <div class="card-body">
                <div class="text-center mb-3">
                  <img 
                    :src="formData.coverUrl || 'https://via.placeholder.com/200x300?text=No+Cover'" 
                    :alt="formData.title || 'Book Cover'"
                    class="img-fluid rounded"
                    style="max-width: 150px; height: 225px; object-fit: cover;"
                  >
                </div>
                
                <h6 class="fw-bold">{{ formData.title || 'Book Title' }}</h6>
                <p class="text-muted mb-2">
                  by {{ getAuthorName(formData.authorId) || 'Select Author' }}
                </p>
                
                <div v-if="formData.year" class="mb-2">
                  <small class="text-muted">Published: {{ formData.year }}</small>
                </div>
                
                <div v-if="formData.tags && formData.tags.length > 0" class="mb-3">
                  <div class="d-flex flex-wrap gap-1">
                    <span 
                      v-for="tag in formData.tags" 
                      :key="tag"
                      class="badge bg-primary"
                      style="font-size: 0.7rem;"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
                
                <p class="small text-muted" style="max-height: 150px; overflow-y: auto;">
                  {{ formData.description || 'No description provided.' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBooksStore } from '../../stores/books.js'
import { useAuthorsStore } from '../../stores/authors.js'
import { useValidation } from '../../composables/useValidation.js'

const props = defineProps({
  id: {
    type: String,
    default: null
  }
})

const route = useRoute()
const router = useRouter()
const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()
const { errors, rules, validateForm, clearErrors } = useValidation()

const isEditing = computed(() => !!props.id)
const initialLoading = ref(false)
const loading = ref(false)
const currentYear = new Date().getFullYear()

const formData = ref({
  title: '',
  authorId: '',
  year: '',
  tags: [],
  coverUrl: '',
  description: ''
})

const tagsInput = ref('')

// Computed
const authors = computed(() => authorsStore.authors)
const hasErrors = computed(() => Object.keys(errors).length > 0)

// Validation rules
const formRules = computed(() => ({
  title: [
    rules.required(),
    rules.minLength(3),
    rules.maxLength(100)
  ],
  authorId: [
    rules.required('Please select an author'),
    rules.authorExists(authors.value)
  ],
  year: [
    rules.required('Year is required'),
    rules.year()
  ],
  tags: [
    (value) => {
      if (value && value.length > 8) {
        return 'Maximum 8 tags allowed'
      }
      if (value && value.some(tag => tag.length < 2 || tag.length > 20)) {
        return 'Each tag must be 2-20 characters'
      }
      return null
    }
  ],
  coverUrl: [
    rules.url()
  ],
  description: [
    rules.maxLength(2000)
  ]
}))

// Watch tags input to update formData.tags
watch(tagsInput, (newValue) => {
  if (newValue) {
    formData.value.tags = newValue
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
      .slice(0, 8) // Limit to 8 tags
  } else {
    formData.value.tags = []
  }
})

// Methods
const getAuthorName = (authorId) => {
  if (!authorId) return null
  const author = authorsStore.getAuthorById(authorId)
  return author ? author.name : null
}

const validateField = (field) => {
  const fieldRules = formRules.value[field]
  if (fieldRules) {
    const isValid = fieldRules.every(rule => {
      const error = rule(formData.value[field])
      if (error) {
        errors[field] = error
        return false
      }
      return true
    })
    if (isValid) {
      delete errors[field]
    }
  }
}

const checkDuplicateTitle = async () => {
  if (!formData.value.title || !formData.value.authorId) return null

  const existingBooks = booksStore.books.filter(book => 
    String(book.authorId) === String(formData.value.authorId) &&
    book.title.toLowerCase() === formData.value.title.toLowerCase()
  )

  // If editing, exclude the current book
  if (isEditing.value) {
    const currentBookIndex = existingBooks.findIndex(book => 
      String(book.id) === String(props.id)
    )
    if (currentBookIndex > -1) {
      existingBooks.splice(currentBookIndex, 1)
    }
  }

  if (existingBooks.length > 0) {
    return 'This author already has a book with this title'
  }
  
  return null
}

const loadBook = async () => {
  if (!isEditing.value) return

  initialLoading.value = true
  try {
    const book = await booksStore.fetchBookById(props.id)
    
    formData.value = {
      title: book.title,
      authorId: book.authorId,
      year: book.year,
      tags: book.tags || [],
      coverUrl: book.coverUrl || '',
      description: book.description || ''
    }

    // Set tags input
    tagsInput.value = (book.tags || []).join(', ')

  } catch (error) {
    console.error('Error loading book:', error)
  } finally {
    initialLoading.value = false
  }
}

const handleSubmit = async () => {
  clearErrors()

  // Validate all fields
  const isValid = validateForm(formData.value, formRules.value)
  
  // Check for duplicate title
  const duplicateError = await checkDuplicateTitle()
  if (duplicateError) {
    errors.title = duplicateError
    return
  }

  if (!isValid) return

  loading.value = true

  try {
    const bookData = {
      title: formData.value.title.trim(),
      authorId: formData.value.authorId,
      year: parseInt(formData.value.year),
      tags: formData.value.tags,
      coverUrl: formData.value.coverUrl.trim() || `https://picsum.photos/200/300?random=${Date.now()}`,
      description: formData.value.description.trim()
    }

    if (isEditing.value) {
      await booksStore.updateBook(props.id, bookData)
    } else {
      await booksStore.createBook(bookData)
    }

    router.push('/admin/books')
  } catch (error) {
    console.error('Error saving book:', error)
  } finally {
    loading.value = false
  }
}

const viewBook = () => {
  router.push(`/books/${props.id}`)
}

// Lifecycle
onMounted(async () => {
  await authorsStore.fetchAuthors()
  await booksStore.fetchBooks()
  
  if (isEditing.value) {
    await loadBook()
  }
})
</script>