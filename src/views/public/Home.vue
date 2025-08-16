<!-- Home page - the landing page that welcomes users to our book collection -->
<!-- Think of this as the front door of our website - first impressions matter! -->
<template>
  <div>
    <!-- Hero -->
    <section class="hero-section">
      <div class="container py-5">
        <div class="row align-items-center g-4">
          <div class="col-lg-7">
            <h1 class="display-5 fw-bold mb-3">Discover, Read, and Manage Your Favorite Books</h1>
            <p class="lead mb-4">Explore a curated library of books and authors. Search, filter, and learn more — then manage everything in the admin dashboard.</p>
            <div class="d-flex flex-wrap gap-2">
              <router-link to="/books" class="btn btn-primary">
                <i class="fa-solid fa-book me-2"></i>
                Browse Books
              </router-link>
              <router-link to="/about" class="btn btn-outline-light">
                <i class="fa-solid fa-circle-info me-2"></i>
                About
              </router-link>
              <router-link to="/admin" class="btn btn-outline-light">
                <i class="fa-solid fa-gauge-high me-2"></i>
                Admin
              </router-link>
            </div>
          </div>
          <div class="col-lg-5 text-center">
            <i class="fa-solid fa-book-open-reader" style="font-size:6rem"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Books -->
    <section class="py-5">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="h3 mb-0">Recent Books</h2>
          <router-link to="/books" class="btn btn-sm btn-outline-primary">
            View All
          </router-link>
        </div>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
        </div>
        <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-else>
          <div class="row g-4">
            <div v-for="book in recentBooks" :key="book.id" class="col-sm-6 col-lg-4 col-xl-3">
              <BookCard :book="book" />
            </div>
          </div>
          <div v-if="recentBooks.length === 0" class="empty-state">
            <i class="fa-solid fa-book"></i>
            <h3 class="mt-2">No books yet</h3>
          </div>
        </div>
      </div>
    </section>
  </div>
  
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useBooksStore } from '@/stores/books.js'
import { useAuthorsStore } from '@/stores/authors.js'
import BookCard from '@/components/BookCard.vue'

const booksStore = useBooksStore()
const authorsStore = useAuthorsStore()

const loading = computed(() => booksStore.loading || authorsStore.loading)
const error = computed(() => booksStore.error || authorsStore.error)
const recentBooks = computed(() => booksStore.recentBooks)

onMounted(async () => {
  await Promise.all([
    booksStore.fetchBooks(),
    authorsStore.fetchAuthors()
  ])
})
</script>

<style scoped>
</style>

