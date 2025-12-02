// //same concept as the author api but for the book-related things


// import axios from 'axios'

// const BASE_URL = (import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL) || 'http://localhost:3000'

// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// // Request interceptor for loading states
// api.interceptors.request.use(
//   (config) => {
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error)
//     return Promise.reject(error)
//   }
// )

// export const booksApi = {
//   // Get all books with optional search and filters
//   async getBooks(params = {}) {
//     try {
//       const response = await api.get('/books', { params })
//       return response.data
//     } catch (error) {
//       throw new Error(`Failed to fetch books: ${error.message}`)
//     }
//   },

//   // Get a single book by ID
//   async getBookById(id) {
//     try {
//       const response = await api.get(`/books/${id}`)
//       return response.data
//     } catch (error) {
//       if (error.response?.status === 404) {
//         throw new Error('Book not found')
//       }
//       throw new Error(`Failed to fetch book: ${error.message}`)
//     }
//   },

//   // Create a new book
//   async createBook(bookData) {
//     try {
//       // Add timestamps
//       const newBook = {
//         ...bookData,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       }
      
//       const response = await api.post('/books', newBook)
//       return response.data
//     } catch (error) {
//       throw new Error(`Failed to create book: ${error.message}`)
//     }
//   },

//   // Update an existing book
//   async updateBook(id, bookData) {
//     try {
//       const updatedBook = {
//         ...bookData,
//         updatedAt: new Date().toISOString()
//       }
      
//       const response = await api.put(`/books/${id}`, updatedBook)
//       return response.data
//     } catch (error) {
//       if (error.response?.status === 404) {
//         throw new Error('Book not found')
//       }
//       throw new Error(`Failed to update book: ${error.message}`)
//     }
//   },

//   // Delete a book
//   async deleteBook(id) {
//     try {
//       await api.delete(`/books/${id}`)
//       return true
//     } catch (error) {
//       if (error.response?.status === 404) {
//         throw new Error('Book not found')
//       }
//       throw new Error(`Failed to delete book: ${error.message}`)
//     }
//   },

//   // Search books by title
//   async searchBooks(query) {
//     try {
//       const response = await api.get('/books', {
//         params: { q: query }
//       })
//       return response.data
//     } catch (error) {
//       throw new Error(`Failed to search books: ${error.message}`)
//     }
//   },

//   // Get books by author ID
//   async getBooksByAuthor(authorId) {
//     try {
//       const response = await api.get('/books', {
//         params: { authorId }
//       })
//       return response.data
//     } catch (error) {
//       throw new Error(`Failed to fetch books by author: ${error.message}`)
//     }
//   },

//   // Check if book title exists for an author (for validation)
//   async checkDuplicateTitle(title, authorId, excludeId = null) {
//     try {
//       const response = await api.get('/books', {
//         params: { 
//           title,
//           authorId
//         }
//       })
      
//       const existingBooks = response.data.filter(book => 
//         book.title.toLowerCase() === title.toLowerCase() && 
//         String(book.authorId) === String(authorId) &&
//         (excludeId ? String(book.id) !== String(excludeId) : true)
//       )
      
//       return existingBooks.length > 0
//     } catch (error) {
//       console.error('Error checking duplicate title:', error)
//       return false
//     }
//   }
// }

// export default booksApi




// src/api/books.js
// Updated to use local mock data instead of API calls

import { books as mockBooks } from '../data/mockData.js'

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 4)

// Simulate async behavior
const delay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms))

// Clone data to avoid mutations
let booksData = JSON.parse(JSON.stringify(mockBooks))

export const booksApi = {
  // Get all books with optional search and filters
  async getBooks(params = {}) {
    await delay()
    
    try {
      let result = [...booksData]
      
      // Filter by authorId
      if (params.authorId) {
        result = result.filter(book => 
          String(book.authorId) === String(params.authorId)
        )
      }
      
      // Search by query
      if (params.q) {
        const query = params.q.toLowerCase()
        result = result.filter(book =>
          book.title.toLowerCase().includes(query) ||
          book.description?.toLowerCase().includes(query)
        )
      }
      
      // Filter by title (exact match for duplicate checking)
      if (params.title) {
        result = result.filter(book =>
          book.title.toLowerCase() === params.title.toLowerCase()
        )
      }
      
      return result
    } catch (error) {
      throw new Error(`Failed to fetch books: ${error.message}`)
    }
  },

  // Get a single book by ID
  async getBookById(id) {
    await delay()
    
    try {
      const book = booksData.find(b => String(b.id) === String(id))
      
      if (!book) {
        throw new Error('Book not found')
      }
      
      return book
    } catch (error) {
      throw error
    }
  },

  // Create a new book
  async createBook(bookData) {
    await delay()
    
    try {
      const newBook = {
        ...bookData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      booksData.unshift(newBook)
      return newBook
    } catch (error) {
      throw new Error(`Failed to create book: ${error.message}`)
    }
  },

  // Update an existing book
  async updateBook(id, bookData) {
    await delay()
    
    try {
      const index = booksData.findIndex(b => String(b.id) === String(id))
      
      if (index === -1) {
        throw new Error('Book not found')
      }
      
      const updatedBook = {
        ...booksData[index],
        ...bookData,
        updatedAt: new Date().toISOString()
      }
      
      booksData[index] = updatedBook
      return updatedBook
    } catch (error) {
      throw error
    }
  },

  // Delete a book
  async deleteBook(id) {
    await delay()
    
    try {
      const index = booksData.findIndex(b => String(b.id) === String(id))
      
      if (index === -1) {
        throw new Error('Book not found')
      }
      
      booksData.splice(index, 1)
      return true
    } catch (error) {
      throw error
    }
  },

  // Search books by title
  async searchBooks(query) {
    await delay()
    
    try {
      if (!query) return booksData
      
      const lowerQuery = query.toLowerCase()
      return booksData.filter(book =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.description?.toLowerCase().includes(lowerQuery)
      )
    } catch (error) {
      throw new Error(`Failed to search books: ${error.message}`)
    }
  },

  // Get books by author ID
  async getBooksByAuthor(authorId) {
    await delay()
    
    try {
      return booksData.filter(book => 
        String(book.authorId) === String(authorId)
      )
    } catch (error) {
      throw new Error(`Failed to fetch books by author: ${error.message}`)
    }
  },

  // Check if book title exists for an author (for validation)
  async checkDuplicateTitle(title, authorId, excludeId = null) {
    await delay()
    
    try {
      const existingBooks = booksData.filter(book => 
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