//same concept as the author api but for the book-related things


import axios from 'axios'

const BASE_URL = (import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL) || 'http://localhost:3000'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor for loading states
api.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export const booksApi = {
  // Get all books with optional search and filters
  async getBooks(params = {}) {
    try {
      const response = await api.get('/books', { params })
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch books: ${error.message}`)
    }
  },

  // Get a single book by ID
  async getBookById(id) {
    try {
      const response = await api.get(`/books/${id}`)
      return response.data
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Book not found')
      }
      throw new Error(`Failed to fetch book: ${error.message}`)
    }
  },

  // Create a new book
  async createBook(bookData) {
    try {
      // Add timestamps
      const newBook = {
        ...bookData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      const response = await api.post('/books', newBook)
      return response.data
    } catch (error) {
      throw new Error(`Failed to create book: ${error.message}`)
    }
  },

  // Update an existing book
  async updateBook(id, bookData) {
    try {
      const updatedBook = {
        ...bookData,
        updatedAt: new Date().toISOString()
      }
      
      const response = await api.put(`/books/${id}`, updatedBook)
      return response.data
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Book not found')
      }
      throw new Error(`Failed to update book: ${error.message}`)
    }
  },

  // Delete a book
  async deleteBook(id) {
    try {
      await api.delete(`/books/${id}`)
      return true
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Book not found')
      }
      throw new Error(`Failed to delete book: ${error.message}`)
    }
  },

  // Search books by title
  async searchBooks(query) {
    try {
      const response = await api.get('/books', {
        params: { q: query }
      })
      return response.data
    } catch (error) {
      throw new Error(`Failed to search books: ${error.message}`)
    }
  },

  // Get books by author ID
  async getBooksByAuthor(authorId) {
    try {
      const response = await api.get('/books', {
        params: { authorId }
      })
      return response.data
    } catch (error) {
      throw new Error(`Failed to fetch books by author: ${error.message}`)
    }
  },

  // Check if book title exists for an author (for validation)
  async checkDuplicateTitle(title, authorId, excludeId = null) {
    try {
      const response = await api.get('/books', {
        params: { 
          title,
          authorId
        }
      })
      
      const existingBooks = response.data.filter(book => 
        book.title.toLowerCase() === title.toLowerCase() && 
        String(book.authorId) === String(authorId) &&
        (excludeId ? String(book.id) !== String(excludeId) : true)
      )
      
      return existingBooks.length > 0
    } catch (error) {
      console.error('Error checking duplicate title:', error)
      return false
    }
  }
}

export default booksApi