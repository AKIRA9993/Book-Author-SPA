//the entry point file
//this file has the key for everything
//it initializes the router and pinia(state mangmenet)
//connects the components to the web page
//tells vue to start up
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router.js'

// Bootstrap CSS is loaded via CDN in index.html
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)//the state mangment
app.use(router)

app.mount('#app')