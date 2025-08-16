<!-- Books page - displays all books with search and filter functionality -->
<!-- This is like a library catalog where users can browse and find books -->
<template>
  <div class="container py-4">
    <div class="d-flex flex-column flex-md-row gap-3 align-items-stretch align-items-md-end mb-3">
      <div class="flex-grow-1">
        <label for="q" class="form-label">Search by title</label>
        <input id="q" v-model="query" type="text" class="form-control" placeholder="e.g. Mistborn">
      </div>
      <div style="min-width:220px">
        <label for="author" class="form-label">Filter by author</label>
        <select id="author" v-model="authorFilter" class="form-select">
          <option value="">All Authors</option>
          <option v-for="a in authors" :key="a.id" :value="a.id">{{ a.name }}</option>
        </select>
      </div>
      <div>
        <button class="btn btn-outline-secondary w-100" @click="clearFilters">
          <i class="fa-solid fa-eraser me-2"></i>
          Clear
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-else class="row g-4">
      <div v-for="book in filtered" :key="book.id" class="col-sm-6 col-lg-4 col-xl-3">
        <BookCard :book="book" />
      </div>
      <div v-if="filtered.length === 0" class="empty-state w-100">
        <i class="fa-solid fa-book"></i>
        <h3 class="mt-2">No books found</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useBooksStore } from '@/stores/books.js'
import { useAuthorsStore } from '@/stores/authors.js'
import BookCard from '@/components/BookCard.vue'

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()

const query = ref('')
const authorFilter = ref('')

const loading = computed(() => booksStore.loading || authorsStore.loading)
const error = computed(() => booksStore.error || authorsStore.error)
const authors = computed(() => authorsStore.authors)

const filtered = computed(() => {
  let list = booksStore.books
  if (query.value) {
    const q = query.value.toLowerCase()
    list = list.filter(b => b.title.toLowerCase().includes(q))
  }
  if (authorFilter.value) {
    list = list.filter(b => String(b.authorId) === String(authorFilter.value))
  }
  return list
})

watch(query, () => {/* local filter only */})
watch(authorFilter, () => {/* local filter only */})

function clearFilters() {
  query.value = ''
  authorFilter.value = ''
}

onMounted(async () => {
  await Promise.all([
    booksStore.fetchBooks(),
    authorsStore.fetchAuthors()
  ])
})
</script>

<style scoped>
</style>

