import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createWebHistory, createRouter } from 'vue-router'
import App from './App.vue'

import HomePage from './pages/HomePage.vue'
import FavoritePage from './pages/FavoritePage.vue'
import OrdersPage from './pages/OrdersPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/favorites', component: FavoritePage },
  { path: '/orders', component: OrdersPage },
  { path: '/orders/:id', component: OrdersPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
