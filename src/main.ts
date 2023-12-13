import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { IonicVue } from '@ionic/vue'
import { createPinia } from 'pinia'

// Plugins
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import VueApexCharts from "vue3-apexcharts"
import 'remixicon/fonts/remixicon.css'
import './config'
/* Core CSS required for Ionic components to work properly */
// import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
// import '@ionic/vue/css/normalize.css';
// import '@ionic/vue/css/structure.css';
// import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
// import '@ionic/vue/css/padding.css';
// import '@ionic/vue/css/float-elements.css';
// import '@ionic/vue/css/text-alignment.css';
// import '@ionic/vue/css/text-transformation.css';
// import '@ionic/vue/css/flex-utils.css';
// import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/style.css';
import 'animate.css';
// Custom Components
import BaseTable from './components/table/BaseTable.vue'
import BasePage from './layout/BasePage.vue'
import PillsBtn from './components/button/PillsBtn.vue'
import BaseButton from './components/button/BaseButton.vue'
import TableList from './components/table/TableList.vue';
import BaseInput from './components/form/BaseInput.vue';
import BaseChart from './components/chart/BaseChart.vue';
import BaseFilter from './components/BaseFilter.vue';
import BaseDialog from './components/dialog/BaseDialog.vue';
import DialogInput from './components/dialog/DialogInput.vue';
import BaseLoader from './components/loader/BaseLoader.vue';
import BaseDetail from './layout/BaseDetail.vue';

const pinia = createPinia()
const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(pinia)
  .use(VueApexCharts)
  .component('apexchart', VueApexCharts)
  .component('VueDatePicker', VueDatePicker)
  .component('base-page', BasePage)
  .component('base-chart', BaseChart)
  .component('base-detail', BaseDetail)
  .component('base-table', BaseTable)
  .component('base-dialog', BaseDialog)
  .component('input-dialog', DialogInput)
  .component('base-table-list', TableList)
  .component('base-input', BaseInput)
  .component('pills-button', PillsBtn)
  .component('base-button', BaseButton)
  .component('base-chart', BaseChart)
  .component('base-filter', BaseFilter)
  .component('base-loader', BaseLoader)
  
router.isReady().then(() => {
  app.mount('#app');
});