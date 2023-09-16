import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$version = "2023-09-16T01:03:32.190Z"
app.use(router)
app.mount('#app')
