import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "./assets/main.css"
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

loadFonts();

const app = createApp(App)
app.component('VueDatePicker', VueDatePicker);
app.use(router)
app.use(vuetify)
app.mount('#app')