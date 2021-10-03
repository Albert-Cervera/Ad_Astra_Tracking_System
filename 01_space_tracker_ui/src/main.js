import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import BootstrapVue from 'bootstrap'
createApp(App).use(store).use(router).use(ElementPlus).use(BootstrapVue).mount('#app')