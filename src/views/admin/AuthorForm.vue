<template>
  <div class="container mt-4">
    <h2 class="mb-4">{{ isEdit ? 'Edit Author' : 'Add Author' }}</h2>

    <form @submit.prevent="handleSubmit" novalidate>
      <!-- Name -->
      <div class="mb-3">
        <label for="name" class="form-label">Name *</label>
        <input
          type="text"
          id="name"
          v-model.trim="form.name"
          class="form-control"
          :class="{ 'is-invalid': errors.name }"
          required
        />
        <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
      </div>

      <!-- Bio -->
      <div class="mb-3">
        <label for="bio" class="form-label">Bio</label>
        <textarea
          id="bio"
          v-model.trim="form.bio"
          class="form-control"
          :class="{ 'is-invalid': errors.bio }"
          maxlength="800"
          rows="4"
        ></textarea>
        <div class="invalid-feedback" v-if="errors.bio">{{ errors.bio }}</div>
      </div>

      <!-- Avatar URL -->
      <div class="mb-3">
        <label for="avatarUrl" class="form-label">Avatar URL</label>
        <input
          type="url"
          id="avatarUrl"
          v-model.trim="form.avatarUrl"
          class="form-control"
          :class="{ 'is-invalid': errors.avatarUrl }"
        />
        <div class="invalid-feedback" v-if="errors.avatarUrl">{{ errors.avatarUrl }}</div>
      </div>

      <!-- Buttons -->
      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          {{ submitting ? 'Saving...' : (isEdit ? 'Update Author' : 'Create Author') }}
        </button>
        <button type="button" class="btn btn-secondary" @click="goBack" :disabled="submitting">
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthorsStore } from '@/stores/authors.js'

const route = useRoute()
const router = useRouter()
const authorsStore = useAuthorsStore()

const isEdit = computed(() => !!route.params.id)

const form = reactive({
  name: '',
  bio: '',
  avatarUrl: ''
})

const errors = reactive({})
const submitting = ref(false)

const validate = () => {
  Object.keys(errors).forEach(key => delete errors[key])

  if (!form.name || form.name.length < 2 || form.name.length > 60) {
    errors.name = 'Name must be between 2 and 60 characters.'
  }
  if (form.bio && form.bio.length > 800) {
    errors.bio = 'Bio must be 800 characters or less.'
  }
  if (form.avatarUrl && !isValidUrl(form.avatarUrl)) {
    errors.avatarUrl = 'Please enter a valid URL.'
  }

  return Object.keys(errors).length === 0
}

const isValidUrl = (string) => {
  try {
    new URL(string)
    return true
  } catch {
    return false
  }
}

const handleSubmit = async () => {
  if (!validate()) return
  submitting.value = true

  try {
    if (isEdit.value) {
      await authorsStore.updateAuthor(route.params.id, { ...form })
    } else {
      await authorsStore.createAuthor({ ...form })
    }
    router.push('/admin/authors')
  } catch (err) {
    console.error(err)
    // optionally show toast here
  } finally {
    submitting.value = false
  }
}

const goBack = () => {
  router.back()
}

onMounted(async () => {
  if (isEdit.value) {
    const author = await authorsStore.fetchAuthorById(route.params.id)
    if (author) {
      form.name = author.name
      form.bio = author.bio
      form.avatarUrl = author.avatarUrl
    }
  }
})
</script>
