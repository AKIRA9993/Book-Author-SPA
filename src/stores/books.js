import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { booksApi } from '../api/books.js'

export const useBooksStore = defineStore('books', () => {
  // State
  const books = ref([])
  const currentBook = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const selectedAuthor = ref('')
  const lastFetchedAt = ref(null)
  
  // Cache for different query combinations
  const cache = ref(new Map())

  // Getters
  const filteredBooks = computed(() => {
    let result = books.value

    if (searchQuery.value) {
      result = result.filter(book =>
        book.title.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    }

    if (selectedAuthor.value) {
      result = result.filter(book =>
        String(book.authorId) === String(selectedAuthor.value)
      )
    }

    return result
  })

  const bookCount = computed(() => books.value.length)
  
  const recentBooks = computed(() => 
    books.value
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6)
  )

  const booksByAuthor = computed(() => {
    const grouped = {}
    books.value.forEach(book => {
      if (!grouped[book.authorId]) {
        grouped[book.authorId] = []
      }
      grouped[book.authorId].push(book)
    })
    return grouped
  })

  // Actions
  async function fetchBooks(params = {}) {
    const cacheKey = JSON.stringify(params)
    
    // Check cache first (cache for 5 minutes)
    if (cache.value.has(cacheKey)) {
      const cached = cache.value.get(cacheKey)
      if (Date.now() - cached.timestamp < 5 * 60 * 1000) {
        books.value = cached.data
        return cached.data
      }
    }

    loading.value = true
    error.value = null

    try {
      const data = await booksApi.getBooks(params)
      books.value = data
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

  async function fetchBookById(id) {
    // Check if book is already in books array
    const existing = books.value.find(book => String(book.id) === String(id))
    if (existing) {
      currentBook.value = existing
      return existing
    }

    loading.value = true
    error.value = null

    try {
      const book = await booksApi.getBookById(id)
      currentBook.value = book
      
      // Add to books array if not already there
      const existingIndex = books.value.findIndex(b => b.id === book.id)
      if (existingIndex === -1) {
        books.value.push(book)
      }
      
      return book
    } catch (err) {
      error.value = err.message
      currentBook.value = null
      throw err
    } finally {
      loading.value = false
    }
  }

  async function createBook(bookData) {
    loading.value = true
    error.value = null

    try {
      const newBook = await booksApi.createBook(bookData)
      books.value.unshift(newBook) // Add to beginning
      clearCache()
      return newBook
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function updateBook(id, bookData) {
    loading.value = true
    error.value = null

    try {
      const updatedBook = await booksApi.updateBook(id, bookData)
      
      // Update in books array
      const index = books.value.findIndex(book => String(book.id) === String(id))
      if (index !== -1) {
        books.value[index] = updatedBook
      }
      
      // Update current book if it's the same
      if (String(currentBook.value?.id) === String(id)) {
        currentBook.value = updatedBook
      }
      
      clearCache()
      return updatedBook
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function deleteBook(id) {
    loading.value = true
    error.value = null

    try {
      await booksApi.deleteBook(id)
      
      // Remove from books array
      books.value = books.value.filter(book => String(book.id) !== String(id))
      
      // Clear current book if it's the deleted one
      if (String(currentBook.value?.id) === String(id)) {
        currentBook.value = null
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

  async function searchBooks(query) {
    if (!query.trim()) {
      await fetchBooks()
      return books.value
    }

    loading.value = true
    error.value = null

    try {
      const results = await booksApi.searchBooks(query)
      books.value = results
      return results
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function getBooksByAuthor(authorId) {
    try {
      const authorBooks = await booksApi.getBooksByAuthor(authorId)
      return authorBooks
    } catch (err) {
      error.value = err.message
      throw err
    }
  }

  async function checkDuplicateTitle(title, authorId, excludeId = null) {
    try {
      return await booksApi.checkDuplicateTitle(title, authorId, excludeId)
    } catch (err) {
      console.error('Error checking duplicate title:', err)
      return false
    }
  }

  function setSearchQuery(query) {
    searchQuery.value = query
  }

  function setSelectedAuthor(authorId) {
    selectedAuthor.value = authorId
  }

  function clearFilters() {
    searchQuery.value = ''
    selectedAuthor.value = ''
  }

  function clearCache() {
    cache.value.clear()
  }

  function clearError() {
    error.value = null
  }

  function clearCurrentBook() {
    currentBook.value = null
  }

  return {
    // State
    books,
    currentBook,
    loading,
    error,
    searchQuery,
    selectedAuthor,
    lastFetchedAt,
    
    // Getters
    filteredBooks,
    bookCount,
    recentBooks,
    booksByAuthor,
    
    // Actions
    fetchBooks,
    fetchBookById,
    createBook,
    updateBook,
    deleteBook,
    searchBooks,
    getBooksByAuthor,
    checkDuplicateTitle,
    setSearchQuery,
    setSelectedAuthor,
    clearFilters,
    clearCache,
    clearError,
    clearCurrentBook
  }
})