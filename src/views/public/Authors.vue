<!-- Authors page - displays all authors with search functionality -->
<!-- Like a directory of all the writers in our book collection -->
<template>
  <div class="container py-4">
    <div class="row mb-3">
      <div class="col-md-6">
        <label for="q" class="form-label">Search authors</label>
        <input id="q" v-model="query" type="text" class="form-control" placeholder="e.g. Brandon">
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-else class="row g-4">
      <div v-for="a in filtered" :key="a.id" class="col-sm-6 col-lg-4">
        <AuthorCard :author="a" />
      </div>
      <div v-if="filtered.length === 0" class="empty-state w-100">
        <i class="fa-solid fa-people-group"></i>
        <h3 class="mt-2">No authors found</h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useAuthorsStore } from '@/stores/authors.js'
import { useBooksStore } from '@/stores/books.js'
import AuthorCard from '@/components/AuthorCard.vue'

const authorsStore = useAuthorsStore()
const booksStore = useBooksStore()
const query = ref('')

const loading = computed(() => authorsStore.loading || booksStore.loading)
const error = computed(() => authorsStore.error || booksStore.error)

const filtered = computed(() => {
  if (!query.value) return authorsStore.authors
  const q = query.value.toLowerCase()
  return authorsStore.authors.filter(a => a.name.toLowerCase().includes(q))
})

watch(query, () => {/* local filter */})

onMounted(async () => {
  await Promise.all([
    authorsStore.fetchAuthors(),
    booksStore.fetchBooks()
  ])
})
</script>

<style scoped>
</style>

