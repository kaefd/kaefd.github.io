import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

loadFonts();

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueSweetalert2)
app.mount('#app')
