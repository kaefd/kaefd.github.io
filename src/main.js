import { createApp } from 'vue';
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from "./plugins/vuetify";
import VueApexCharts from "vue3-apexcharts";
import { loadFonts } from "./plugins/webfontloader";
import "./assets/main.css"

loadFonts();

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(vuetify)
app.use(pinia)
app.use(VueApexCharts)
app.mount('#app')
