<template>
  <div class="card h-100">
    <div class="card-body d-flex">
      <img :src="author.avatarUrl" :alt="author.name" class="rounded-circle me-3" style="width:64px;height:64px;object-fit:cover;">
      <div class="flex-grow-1">
        <h5 class="card-title mb-1">{{ author.name }}</h5>
        <p class="card-text text-muted text-truncate-3 mb-3">{{ author.bio }}</p>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">
            <i class="fa-solid fa-book me-1"></i>
            {{ bookCount }} book{{ bookCount === 1 ? '' : 's' }}
          </small>
          <router-link :to="`/authors/${author.id}`" class="btn btn-sm btn-outline-secondary">
            <i class="fa-solid fa-user me-1"></i>
            Profile
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useBooksStore } from '@/stores/books.js'

const props = defineProps({
  author: { type: Object, required: true }
})

const booksStore = useBooksStore()
const bookCount = computed(() => booksStore.books.filter(b => b.authorId === props.author.id).length)
</script>

<style scoped>
</style>

