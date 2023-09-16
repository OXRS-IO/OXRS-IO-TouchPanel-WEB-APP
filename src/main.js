import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$version = "2023-09-16T03:38:57.214Z"
app.use(router)
app.mount('#app')
