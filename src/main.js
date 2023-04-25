import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$version = "2023-04-25T07:04:55.953Z"
app.use(router)
app.mount('#app')
