import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authorsApi } from '../api/authors.js'

export const useAuthorsStore = defineStore('authors', () => {
  // State
  const authors = ref([])
  const currentAuthor = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const lastFetchedAt = ref(null)
  
  // Cache for different queries
  const cache = ref(new Map())

  // Getters
  const filteredAuthors = computed(() => {
    if (!searchQuery.value) return authors.value
    
    return authors.value.filter(author =>
      author.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })

  const authorCount = computed(() => authors.value.length)

  const authorsForSelect = computed(() =>
    authors.value.map(author => ({
      id: author.id,
      name: author.name
    }))
  )

  // Actions
  async function fetchAuthors(params = {}) {
    const cacheKey = JSON.stringify(params)
    
    // Check cache first (cache for 5 minutes)
    if (cache.value.has(cacheKey)) {
      const cached = cache.value.get(cacheKey)
      if (Date.now() - cached.timestamp < 5 * 60 * 1000) {
        authors.value = cached.data
        return cached.data
      }
    }

    loading.value = true
    error.value = null

    try {
      const data = await authorsApi.getAuthors(params)
      authors.value = data
      lastFetchedAt.value = new Date()
      
      // Cache the result
      cache.value.set(cacheKey, {
        data,
        timestamp: Date.now()
      })
      
      return data
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchAuthorById(id) {
    // Check if author is already in authors array
    const existing = authors.value.find(author => String(author.id) === String(id))
    if (existing) {
      currentAuthor.value = existing
      return existing
    }

    loading.value = true
    error.value = null

    try {
      const author = await authorsApi.getAuthorById(id)
      currentAuthor.value = author
      
      // Add to authors array if not already there
      const existingIndex = authors.value.findIndex(a => a.id === author.id)
      if (existingIndex === -1) {
        authors.value.push(author)
      }
      
      return author
    } catch (err) {
      error.value = err.message
      currentAuthor.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchAuthorWithBooks(id) {
    loading.value = true
    error.value = null

    try {
      const authorWithBooks = await authorsApi.getAuthorWithBooks(id)
      currentAuthor.value = authorWithBooks
      
      // Update in authors array
      const index = authors.value.findIndex(author => String(author.id) === String(id))
      if (index !== -1) {
        authors.value[index] = { ...authorWithBooks }
        delete authors.value[index].books // Don't store books in main array
      } else {
        const authorData = { ...authorWithBooks }
        delete authorData.books
        authors.value.push(authorData)
      }
      
      return authorWithBooks
    } catch (err) {
      error.value = err.message
      currentAuthor.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createAuthor(authorData) {
    loading.value = true
    error.value = null

    try {
      const newAuthor = await authorsApi.createAuthor(authorData)
      authors.value.unshift(newAuthor) // Add to beginning
      clearCache()
      return newAuthor
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateAuthor(id, authorData) {
    loading.value = true
    error.value = null

    try {
      const updatedAuthor = await authorsApi.updateAuthor(id, authorData)
      
      // Update in authors array
      const index = authors.value.findIndex(author => String(author.id) === String(id))
      if (index !== -1) {
        authors.value[index] = updatedAuthor
      }
      
      // Update current author if it's the same
      if (String(currentAuthor.value?.id) === String(id)) {
        currentAuthor.value = {
          ...updatedAuthor,
          books: currentAuthor.value.books // Preserve books if they exist
        }
      }
      
      clearCache()
      return updatedAuthor
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteAuthor(id) {
    loading.value = true
    error.value = null

    try {
      // Check if author can be deleted (no books)
      const canDelete = await authorsApi.canDeleteAuthor(id)
      if (!canDelete) {
        throw new Error('Cannot delete author with existing books')
      }

      await authorsApi.deleteAuthor(id)
      
      // Remove from authors array
      authors.value = authors.value.filter(author => String(author.id) !== String(id))
      
      // Clear current author if it's the deleted one
      if (String(currentAuthor.value?.id) === String(id)) {
        currentAuthor.value = null
      }
      
      clearCache()
      return true
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function searchAuthors(query) {
    if (!query.trim()) {
      await fetchAuthors()
      return authors.value
    }

    loading.value = true
    error.value = null

    try {
      const results = await authorsApi.searchAuthors(query)
      authors.value = results
      return results
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function getAuthorsForSelect() {
    try {
      // Use cached authors if available and recent
      if (authors.value.length > 0 && lastFetchedAt.value) {
        const timeSinceLastFetch = Date.now() - new Date(lastFetchedAt.value).getTime()
        if (timeSinceLastFetch < 5 * 60 * 1000) { // 5 minutes
          return authorsForSelect.value
        }
      }

      const authorsList = await authorsApi.getAuthorsForSelect()
      return authorsList
    } catch (err) {
      error.value = err.message
      return authorsForSelect.value // Return cached version on error
    }
  }

  function setSearchQuery(query) {
    searchQuery.value = query
  }

  function clearSearch() {
    searchQuery.value = ''
  }

  function clearCache() {
    cache.value.clear()
  }

  function clearError() {
    error.value = null
  }

  function clearCurrentAuthor() {
    currentAuthor.value = null
  }

  function getAuthorById(id) {
    return authors.value.find(author => String(author.id) === String(id))
  }

  function getAuthorName(id) {
    const author = getAuthorById(id)
    return author ? author.name : 'Unknown Author'
  }

  return {
    // State
    authors,
    currentAuthor,
    loading,
    error,
    searchQuery,
    lastFetchedAt,
    
    // Getters
    filteredAuthors,
    authorCount,
    authorsForSelect,
    
    // Actions
    fetchAuthors,
    fetchAuthorById,
    fetchAuthorWithBooks,
    createAuthor,
    updateAuthor,
    deleteAuthor,
    searchAuthors,
    getAuthorsForSelect,
    setSearchQuery,
    clearSearch,
    clearCache,
    clearError,
    clearCurrentAuthor,
    getAuthorById,
    getAuthorName
  }
})