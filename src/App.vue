<script setup>
import { RouterView } from 'vue-router'
import AppBar from './components/appbar/AppBar.vue';
import NavDrawers from './components/drawer/NavDrawers.vue';
</script>

<script>
export default {
  components: {
    NavDrawers,
    AppBar,
  },
    data () {
      return {
        drawer: false,
        databarang: '',
        actIcon: [
          { text: 'Tambah Data', icon: 'mdi-plus', color: '#3B7AA9', variant: 'tonal' },
          { text: 'Edit Data', icon: 'mdi-square-edit-outline', color: '#3B7AA9', variant: 'text', width: '30px', height: '30px' },
          { text: 'Hapus Data', icon: 'mdi-delete', color: 'rgb(123, 172, 192)-darken-1', variant: 'text', width: '30px', height: '30px' },
          { text: 'Detail Data', icon: 'mdi-dots-vertical', color: 'grey-darken-1', variant: 'text', width: '30px', height: '30px' },
        ],
        cetak: [
          {title: 'export ke xlsx', icon: 'mdi-download', key: 'xlsx'},
          {title: 'export ke pdf', icon: 'mdi-file-pdf-box', key: 'pdf'},
        ],

        pageTitle: '',
        pemasukan: '',
        produksi: '',
        pengeluaran: '',
        kirim: ''
      }
    },
    methods: {
      page(value) {
        this.pageTitle = value
      },
    },
    mounted() {
      this.page()
      // this.getPembelian()
      // this.getProduksihead()
      // this.getPenjualanHead()
      // this.getPengirimanHead()
    }
  }
</script>

  <template>
      <v-layout>
        <NavDrawers v-model="drawer" v-if="pageTitle != null" :pageTitle="pageTitle" :item="items" :pemasukan="pemasukan" :produksi="produksi" :pengeluaran="pengeluaran" :kirim="kirim"/>
        <AppBar v-if="pageTitle != null" :pageTitle="pageTitle">
          <template #app-btn>
              <!-- APP BAR ICON -->
                <v-div class="me-5">
                  <input type="checkbox" id="menu_checkbox" @click="drawer = !drawer" :checked="drawer">
                  <label for="menu_checkbox">
                    <div></div>
                    <div></div>
                    <div></div>
                  </label>
                </v-div>
          </template>
        </AppBar>
        <v-main class="vh-100 vw-100">
            <RouterView :actIcon="actIcon" :cetak="cetak" @page="page" @pages="page"/>
        </v-main>
      </v-layout>
  </template>

<style scoped>
#menu_checkbox {
  display: none;
}

label {
  margin-bottom: 2px;
  display: block;
  width: 20px;
  height: 20px;
  cursor: pointer;
}

label:before {
  content: "";
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: 1.2s cubic-bezier(0, 0.96, 1, 0.02) background-color;
}

label div {
  position: relative;
  top: 0;
  height: 4px;
  background-color: rgb(123, 172, 192);
  margin-bottom: 4px;
  transition: 0.3s ease transform, 0.3s ease top, 0.3s ease width,
    0.3s ease right;
  border-radius: 2px;
}

label div:first-child {
  transform-origin: 0;
}

label div:last-child {
  margin-bottom: 0;
  transform-origin: 31.7px;
}

label div:nth-child(2) {
  right: 0;
  width: 20px;
}

#menu_checkbox:checked + label div:first-child {
  left: 0.5px;
  top: -1.3px;
  transform: rotateZ(45deg);
  background: rgb(123, 172, 192);
}

#menu_checkbox:checked + label div:last-child {
  top: 9.7px;
  left: -4px;
  transform: rotateZ(45deg);
  background: rgb(123, 172, 192);
}

#menu_checkbox:checked + label div:nth-child(2) {
  width: 26px;
  top: -0.1px;
  left: -3px;
  transform: rotateZ(-45deg);
  background: rgb(123, 172, 192);
}


</style>
  
