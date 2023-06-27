<script setup>
import { RouterView } from 'vue-router'
import NavDrawers from './components/drawer/NavDrawers.vue';
import api from './service/api';
</script>

<script>
export default {
  components: {
    NavDrawers,
  },
    data () {
      return {
        databarang: '',
        actIcon: [
          { text: 'Tambah Data', icon: 'mdi-plus', color: '#3B7AA9', variant: 'tonal' },
          { text: 'Edit Data', icon: 'mdi-square-edit-outline', color: '#3B7AA9', variant: 'text', width: '30px', height: '30px' },
          { text: 'Hapus Data', icon: 'mdi-delete', color: 'red-darken-1', variant: 'text', width: '30px', height: '30px' },
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
      getBarang(){
        api.getBarang()
        .then(response => {
          this.databarang = response.data
        })
        .catch(() => {
          return this.$router.push('login');
        })
      },
     
    },
    mounted() {
      this.page()
      this.getBarang()
      // this.getPembelian()
      // this.getProduksihead()
      // this.getPenjualanHead()
      // this.getPengirimanHead()
    }
  }
</script>

  <template>
      <v-layout>
        <NavDrawers v-if="pageTitle != null" :pageTitle="pageTitle" :item="items" :pemasukan="pemasukan" :produksi="produksi" :pengeluaran="pengeluaran" :kirim="kirim"/>
        <v-main class="vh-100 vw-100">
            <RouterView :actIcon="actIcon" :cetak="cetak" @page="page" @pages="page" :databarang="databarang" />
        </v-main>
      </v-layout>
  </template>

<style>



</style>
  
