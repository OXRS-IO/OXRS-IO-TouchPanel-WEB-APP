import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$version = "2023-04-22T21:49:34.349Z"
app.use(router)
app.mount('#app')
