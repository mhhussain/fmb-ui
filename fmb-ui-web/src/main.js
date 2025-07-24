import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// Naive UI
import naive from 'naive-ui'

// Create app
const app = createApp(App)

// Use plugins
app.use(createPinia())
app.use(router)
app.use(naive)

// Mount app
app.mount('#app')
