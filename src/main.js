import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$version = "2023-09-16T02:16:03.105Z"
app.use(router)
app.mount('#app')
