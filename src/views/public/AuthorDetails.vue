<!-- Author Details page - shows detailed info about a specific author -->
<!-- Like a biography page with author info and all their books -->
<template>
  <div class="container py-4" v-if="author">
    <div class="row g-4">
      <div class="col-md-4 text-center">
        <img :src="author.avatarUrl" :alt="author.name" class="rounded-circle" style="width:160px;height:160px;object-fit:cover;">
        <h1 class="fw-bold mt-3">{{ author.name }}</h1>
        <p class="text-muted">{{ author.bio }}</p>
      </div>
      <div class="col-md-8">
        <h2 class="h4 mb-3">Books by {{ author.name }}</h2>
        <div class="row g-4">
          <div v-for="book in books" :key="book.id" class="col-sm-6 col-lg-4">
            <BookCard :book="book" />
          </div>
          <div v-if="books.length === 0" class="empty-state w-100">
            <i class="fa-solid fa-book"></i>
            <h3 class="mt-2">No books</h3>
          </div>
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
import { useAuthorsStore } from '@/stores/authors.js'
import { useBooksStore } from '@/stores/books.js'
import BookCard from '@/components/BookCard.vue'

const route = useRoute()
const authorsStore = useAuthorsStore()
const booksStore = useBooksStore()

const author = computed(() => authorsStore.currentAuthor)
const books = computed(() => {
  if (!author.value) return []
  return booksStore.books.filter(b => String(b.authorId) === String(author.value.id))
})

onMounted(async () => {
  await Promise.all([
    authorsStore.fetchAuthorById(route.params.id),
    booksStore.fetchBooks()
  ])
})
</script>

<style scoped>
</style>

