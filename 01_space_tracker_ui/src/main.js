import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
//import satellite from 'satellite.js'
//var satellite = require('satellite.js');
createApp(App).use(store).use(router).use(ElementPlus).mount('#app')
//createApp(App).use(store).use(router).use(ElementPlus).use(satellite).mount('#app')