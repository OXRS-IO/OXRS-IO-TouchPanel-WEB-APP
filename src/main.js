import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$version = "2023-04-25T08:26:39.965Z"
app.use(router)
app.mount('#app')
