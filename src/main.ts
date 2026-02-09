import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles/index'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.mount('#app')

// 给 window 添加自定义属性，需要扩展全局接口
;(window as any).$vue = app
