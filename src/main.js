import { createApp } from 'vue';
import App from './App.vue'
import router from './router'

import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import VueSweetalert2 from 'vue-sweetalert2';

loadFonts();

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(VueSweetalert2)
app.mount('#app')
