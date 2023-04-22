import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$version = "2023-04-22T22:33:04.177Z"
app.use(router)
app.mount('#app')
