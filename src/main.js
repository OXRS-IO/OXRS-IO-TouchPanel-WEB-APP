import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$version = "2023-04-20T16:52:31.964Z"
app.use(router)
app.mount('#app')
