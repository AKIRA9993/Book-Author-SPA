<template>
  <div class="card h-100 custom-card">
    <img :src="book.coverUrl" :alt="book.title" class="card-img-top" style="height: 220px; object-fit: cover;">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title mb-1">{{ book.title }}</h5>
      <small class="text-muted mb-2">by {{ authorName }}</small>
      <p class="card-text text-muted text-truncate-3 mb-3">{{ book.description }}</p>
      <div class="mt-auto d-flex justify-content-between align-items-center">
        <div class="d-flex flex-wrap gap-1">
          <span v-for="tag in (book.tags || []).slice(0,2)" :key="tag" class="badge bg-primary">{{ tag }}</span>
          <span v-if="(book.tags || []).length > 2" class="badge bg-secondary">+{{ (book.tags || []).length - 2 }}</span>
        </div>
        <router-link :to="`/books/${book.id}`" class="btn btn-sm btn-outline-primary">
          <i class="fa-solid fa-circle-info me-1"></i>
          Details
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthorsStore } from '@/stores/authors.js'

const props = defineProps({
  book: { type: Object, required: true }
})

const authorsStore = useAuthorsStore()
const authorName = computed(() => authorsStore.getAuthorName(props.book.authorId))
</script>

<style scoped>
.custom-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.custom-card .card-title {
  color: white;
}

.custom-card .text-muted {
  color: rgba(255, 255, 255, 0.8) !important;
}

.custom-card .badge {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: white;
}

.custom-card .btn-outline-primary {
  border-color: white;
  color: white;
}

.custom-card .btn-outline-primary:hover {
  background-color: white;
  color: #667eea;
}
</style>
