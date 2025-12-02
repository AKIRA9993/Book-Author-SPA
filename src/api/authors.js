
// //this api folder in general is made to handle communication between the vue frontend and the backend server 
// //this file is made to connect FE &BE for author-related operations

// import axios from 'axios'
// //setup section is made to get the api URLS,and uses Vites enviroment system for different deployments
// const BASE_URL = (import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL) || 'http://localhost:3000'
// //axios instance creation
// //also making it reusable 
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     'Content-Type': 'application/json'   //all requests automatically use JSON format
//   }
// })

// // Request interceptor 
// //request interceptor runs before every request 
// api.interceptors.request.use(
//   (config) => {
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )

// // Response interceptor for error handling
// //catches and logs all API errors globally
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error)
//     return Promise.reject(error)
//   }
// )

// export const authorsApi = {
//   // Get all authors with optional search
//   async getAuthors(params = {}) {
//     try {
//       const response = await api.get('/authors', { params })
//       return response.data
//     } catch (error) {
//       throw new Error(`Failed to fetch authors: ${error.message}`)
//     }
//   },

//   // Get a single author by ID
//   async getAuthorById(id) {
//     try {
//       const response = await api.get(`/authors/${id}`)
//       return response.data
//     } catch (error) {
//       if (error.response?.status === 404) {
//         throw new Error('Author not found')
//       }
//       throw new Error(`Failed to fetch author: ${error.message}`)
//     }
//   },

//   // Create a new author
//   async createAuthor(authorData) {
//     try {
//       const newAuthor = {
//         ...authorData,
//         createdAt: new Date().toISOString(),
//         updatedAt: new Date().toISOString()
//       }
      
//       const response = await api.post('/authors', newAuthor)
//       return response.data
//     } catch (error) {
//       throw new Error(`Failed to create author: ${error.message}`)
//     }
//   },

//   // Update an existing author
//   async updateAuthor(id, authorData) {
//     try {
//       const updatedAuthor = {
//         ...authorData,
//         updatedAt: new Date().toISOString()
//       }
      
//       const response = await api.put(`/authors/${id}`, updatedAuthor)
//       return response.data
//     } catch (error) {
//       if (error.response?.status === 404) {
//         throw new Error('Author not found')
//       }
//       throw new Error(`Failed to update author: ${error.message}`)
//     }
//   },

//   // Delete an author
//   async deleteAuthor(id) {
//     try {
//       await api.delete(`/authors/${id}`)
//       return true
//     } catch (error) {
//       if (error.response?.status === 404) {
//         throw new Error('Author not found')
//       }
//       throw new Error(`Failed to delete author: ${error.message}`)
//     }
//   },

//   // Search authors by name
//   async searchAuthors(query) {
//     try {
//       const response = await api.get('/authors', {
//         params: { q: query }
//       })
//       return response.data
//     } catch (error) {
//       throw new Error(`Failed to search authors: ${error.message}`)
//     }
//   },

//   // Get author with their books
//   async getAuthorWithBooks(id) {
//     try {
//       const [author, books] = await Promise.all([
//         api.get(`/authors/${id}`),
//         api.get('/books', { params: { authorId: id } })
//       ])
      
//       return {
//         ...author.data,
//         books: books.data
//       }
//     } catch (error) {
//       if (error.response?.status === 404) {
//         throw new Error('Author not found')
//       }
//       throw new Error(`Failed to fetch author with books: ${error.message}`)
//     }
//   },

//   // Check if author can be deleted (has no books)
//   async canDeleteAuthor(id) {
//     try {
//       const response = await api.get('/books', {
//         params: { authorId: id }
//       })
//       return response.data.length === 0
//     } catch (error) {
//       console.error('Error checking if author can be deleted:', error)
//       return false
//     }
//   },

//   // Get authors list for dropdowns (id, name only)
//   async getAuthorsForSelect() {
//     try {
//       const response = await api.get('/authors')
//       return response.data.map(author => ({
//         id: author.id,
//         name: author.name
//       }))
//     } catch (error) {
//       throw new Error(`Failed to fetch authors list: ${error.message}`)
//     }
//   }
// }

// export default authorsApi



// src/api/authors.js
// Updated to use local mock data instead of API calls

import { authors as mockAuthors, books as mockBooks } from '../data/mockData.js'

// Helper to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 4)

// Simulate async behavior (optional - makes it feel like real API)
const delay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms))

// Clone data to avoid mutations
let authorsData = JSON.parse(JSON.stringify(mockAuthors))
let booksData = JSON.parse(JSON.stringify(mockBooks))

export const authorsApi = {
  // Get all authors with optional search
  async getAuthors(params = {}) {
    await delay()
    
    try {
      let result = [...authorsData]
      
      // Search by query
      if (params.q) {
        const query = params.q.toLowerCase()
        result = result.filter(author => 
          author.name.toLowerCase().includes(query) ||
          author.bio?.toLowerCase().includes(query)
        )
      }
      
      return result
    } catch (error) {
      throw new Error(`Failed to fetch authors: ${error.message}`)
    }
  },

  // Get a single author by ID
  async getAuthorById(id) {
    await delay()
    
    try {
      const author = authorsData.find(a => String(a.id) === String(id))
      
      if (!author) {
        throw new Error('Author not found')
      }
      
      return author
    } catch (error) {
      throw error
    }
  },

  // Create a new author
  async createAuthor(authorData) {
    await delay()
    
    try {
      const newAuthor = {
        ...authorData,
        id: generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      authorsData.unshift(newAuthor)
      return newAuthor
    } catch (error) {
      throw new Error(`Failed to create author: ${error.message}`)
    }
  },

  // Update an existing author
  async updateAuthor(id, authorData) {
    await delay()
    
    try {
      const index = authorsData.findIndex(a => String(a.id) === String(id))
      
      if (index === -1) {
        throw new Error('Author not found')
      }
      
      const updatedAuthor = {
        ...authorsData[index],
        ...authorData,
        updatedAt: new Date().toISOString()
      }
      
      authorsData[index] = updatedAuthor
      return updatedAuthor
    } catch (error) {
      throw error
    }
  },

  // Delete an author
  async deleteAuthor(id) {
    await delay()
    
    try {
      const index = authorsData.findIndex(a => String(a.id) === String(id))
      
      if (index === -1) {
        throw new Error('Author not found')
      }
      
      authorsData.splice(index, 1)
      return true
    } catch (error) {
      throw error
    }
  },

  // Search authors by name
  async searchAuthors(query) {
    await delay()
    
    try {
      if (!query) return authorsData
      
      const lowerQuery = query.toLowerCase()
      return authorsData.filter(author =>
        author.name.toLowerCase().includes(lowerQuery) ||
        author.bio?.toLowerCase().includes(lowerQuery)
      )
    } catch (error) {
      throw new Error(`Failed to search authors: ${error.message}`)
    }
  },

  // Get author with their books
  async getAuthorWithBooks(id) {
    await delay()
    
    try {
      const author = authorsData.find(a => String(a.id) === String(id))
      
      if (!author) {
        throw new Error('Author not found')
      }
      
      const authorBooks = booksData.filter(book => 
        String(book.authorId) === String(id)
      )
      
      return {
        ...author,
        books: authorBooks
      }
    } catch (error) {
      throw error
    }
  },

  // Check if author can be deleted (has no books)
  async canDeleteAuthor(id) {
    await delay()
    
    try {
      const authorBooks = booksData.filter(book => 
        String(book.authorId) === String(id)
      )
      return authorBooks.length === 0
    } catch (error) {
      console.error('Error checking if author can be deleted:', error)
      return false
    }
  },

  // Get authors list for dropdowns (id, name only)
  async getAuthorsForSelect() {
    await delay()
    
    try {
      return authorsData.map(author => ({
        id: author.id,
        name: author.name
      }))
    } catch (error) {
      throw new Error(`Failed to fetch authors list: ${error.message}`)
    }
  }
}

export default authorsApi