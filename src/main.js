import { createApp } from 'vue';
import App from './App.vue'
import router from './router'
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "./assets/main.css"
import VueDatePicker from '../node_modules/@vuepic/vue-datepicker/';

loadFonts();

const app = createApp(App)
app.component('VueDatePicker', VueDatePicker);
app.use(router)
app.use(vuetify)
app.mount('#app')
