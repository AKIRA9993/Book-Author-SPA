//defining the routing structure for the application
//always think of routing like its the boss who tells the folder files where to go
// Vue Router Configuration 

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/auth.js'


// Public Views
import Home from './views/public/Home.vue'
import About from './views/public/About.vue'
import Books from './views/public/Books.vue'
import BookDetails from './views/public/BookDetails.vue'
import Authors from './views/public/Authors.vue'
import AuthorDetails from './views/public/AuthorDetails.vue'

// Admin Views  
import Dashboard from './views/admin/Dashboard.vue'
import AdminBooks from './views/admin/AdminBooks.vue'
import AdminAuthors from './views/admin/AdminAuthors.vue'
import BookForm from './views/admin/BookForm.vue'
import AuthorForm from './views/admin/AuthorForm.vue'

// Routes array 
const routes = [
  // Public Routes (anyone can access these)
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home' }
  },
  {
    path: '/about',
    name: 'About', 
    component: About,
    meta: { title: 'About Us' }
  },
  {
    path: '/books',
    name: 'Books',
    component: Books,
    meta: { title: 'Books' }
  },
  {
    path: '/books/:id', // dynamic route parameter
    name: 'BookDetails',
    component: BookDetails,
    meta: { title: 'Book Details' },
    props: true // this passes the id as a prop to the component(for better yesyability,reusability)
  },
  {
    path: '/authors',
    name: 'Authors',
    component: Authors,
    meta: { title: 'Authors' }
  },
  {
    path: '/authors/:id',
    name: 'AuthorDetails',
    component: AuthorDetails,
    meta: { title: 'Author Details' },
    props: true
  },
  
  // Admin Routes (need authentication)
  {
    path: '/admin',
    name: 'Dashboard',
    component: Dashboard,//reusing the same component 
    meta: { title: 'Admin Dashboard', requiresAuth: true }
  },
  {
    path: '/admin/books',
    name: 'AdminBooks',
    component: AdminBooks,
    meta: { title: 'Manage Books', requiresAuth: true }
  },
  {
    path: '/admin/books/new',
    name: 'CreateBook',
    component: BookForm,
    meta: { title: 'Create Book', requiresAuth: true }
  },
  {
    path: '/admin/books/:id/edit',
    name: 'EditBook',
    component: BookForm, // reusing the same form component
    meta: { title: 'Edit Book', requiresAuth: true },
    props: true
  },
  {
    path: '/admin/authors',
    name: 'AdminAuthors',
    component: AdminAuthors,
    meta: { title: 'Manage Authors', requiresAuth: true }
  },
  {
    path: '/admin/authors/new',
    name: 'CreateAuthor',
    component: AuthorForm,
    meta: { title: 'Create Author', requiresAuth: true }
  },
  {
    path: '/admin/authors/:id/edit',
    name: 'EditAuthor',
    component: AuthorForm,
    meta: { title: 'Edit Author', requiresAuth: true },
    props: true
  },
  //.* is a regex that matches any character  and the extra *makes it repeatable so it can match multiple path segements
  // Catch-all route for 404 errors
  {
    path: '/:pathMatch(.*)*',
    redirect: '/' // just send them back home if page not found instead of showing the 404 page
  }
]
//this is used for creating a smooth,user-friendly navigation expirence
// Create the router instance
const router = createRouter({
  history: createWebHistory(), // using HTML5 history mode,to make the URL look normal(without inclding#)
  routes,
  // scroll behavior 
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition // restore scroll position when going back
    } else {
      return { top: 0 } // scroll to top for new pages
    }
  }
})

// Navigation guards - this runs before every route change
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Set page title dynamically 
  if (to.meta.title) {
    document.title = `${to.meta.title} | Books & Authors`
  }
  
  // Check if route requires authentication
  // NOTE: For this assignment I'm just auto-logging in for demo
  // In real app would redirect to login page
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    authStore.login() // temporary for demo
  }
  
  next() // continue to route
})

export default router