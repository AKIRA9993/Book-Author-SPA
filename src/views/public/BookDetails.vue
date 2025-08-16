<!-- Book Details page - shows detailed info about a specific book -->
<!-- Like opening a book to see its full description, author info, and cover -->
<template>
  <div class="container py-4" v-if="book">
    <div class="row g-4">
      <div class="col-md-4 text-center">
        <img :src="book.coverUrl" :alt="book.title" class="img-fluid rounded" style="max-height:420px;object-fit:cover;">
      </div>
      <div class="col-md-8">
        <h1 class="fw-bold">{{ book.title }}</h1>
        <p class="text-muted">by {{ authorName }} • {{ book.year }}</p>
        <div class="mb-3 d-flex flex-wrap gap-2">
          <span v-for="tag in book.tags" :key="tag" class="badge bg-primary">{{ tag }}</span>
        </div>
        <p class="lead">{{ book.description }}</p>
        <div class="d-flex gap-2 mt-3">
          <router-link to="/books" class="btn btn-outline-secondary">
            <i class="fa-solid fa-arrow-left me-2"></i>
            Back
          </router-link>
          <router-link :to="`/admin/books/${book.id}/edit`" class="btn btn-primary">
            <i class="fa-solid fa-pen-to-square me-2"></i>
            Edit (Admin)
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container py-5 text-center">
    <div class="spinner-border text-primary" role="status"></div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBooksStore } from '@/stores/books.js'
import { useAuthorsStore } from '@/stores/authors.js'

const route = useRoute()
const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()

const book = computed(() => booksStore.currentBook)
const authorName = computed(() => {
  if (!book.value) return ''
  return authorsStore.getAuthorName(book.value.authorId)
})

onMounted(async () => {
  await Promise.all([
    booksStore.fetchBookById(route.params.id),
    authorsStore.fetchAuthors()
  ])
})
</script>

<style scoped>
</style>

