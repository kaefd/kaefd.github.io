<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import ScreenDialog from '../components/ScreenDialog.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


import { ref, onMounted } from 'vue';

</script>

<script>

  export default {
    components: {
    ScreenDialog, AppBar, NavDrawers,VueDatePicker, VDataTable
    },
    props:['actIcon'],
    data () {
      return {
        drawer: null,
        search: '',
        date: '',
        dialog2: false,
        pageTitle: 'PEMASUKAN BARANG',
        btn: 'Tambah Barang',
        selectCategory: 'semua',
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        category: [
          'semua',
          'Bahan Baku',
          'Bahan Penolong',
          'Barang Setengah Jadi',
          'Barang Jadi',
          'Barang Sisa (Scrap)',
          'Mesin & Peralatan',
        ],
        headers: [
          { title: 'Nomor Pemasukan', key: 'no_pembelian'},
          { title: 'Tanggal Masuk', key: 'tgl_pembelian' },
          { title: 'Tipe Dokumen', key: 'tipe_dokumen' },
          { title: 'No Dokumen', key: 'no_dokumen' },
          { title: 'Supplier', key: 'kode_supplier' },
          { title: 'Mata Uang', key: 'mata_uang' },
          { title: 'Total Nilai', key: 'total_nilai' },
          { title: 'Total Nilai(Rp)', key: 'rp' },
          { title: '', key: 'actions', sortable: false},
        ],
        items: [],
        headDetails:[
          {title: 'Kode Barang', key: 'kode_barang' },
          {title: 'Nama Barang', key: 'nama_barang' },
          {title: 'HS Code', key: 'hs_code' },
          {title: 'Jumlah', key: 'jumlah' },
          {title: 'Jumlah Diterima', key: 'jumlah_diterima' },
          {title: 'Satuan', key: 'satuan' },
          {title: 'Total Nilai', key: 'total_nilai' },
          {title: '', key: 'actions', sortable: false },
        ],

        details: [],
        datatext: [
            { name: 'No Pemasukan', key: 'nokeluar', type: 'text' },
            { name: 'Tgl Masuk', key: 'tgkeluar', type: 'date' },
            { name: 'Supplier', key: 'customer', type: 'select' },
            { name: 'Tipe Dokumen', key: 'doctype', type: 'select' },
            { name: 'No Dokumen', key: 'doctno', type: 'text' },
            { name: 'Tgl Dokumen', key: 'doctdate', type: 'date' },
            { name: 'No Invoice', key: 'noinvoice', type: 'text' },
            { name: 'No BL', key: 'nobl', type: 'text' },
            { name: 'Mata Uang', key: 'matauang', type: 'text' },
            { name: 'Kurs', key: 'kurs', type: 'text' },
        ],
        itemDetail: [
                { name: 'Jumlah', key: 'jumlah' },
                { name: 'Jumlah Diterima', key: 'received' },
                { name: 'Nilai Total', key: 'total' }
            ]


      }
    },
    methods: {
      selected(){        
        //show row selected
        if(this.selectCategory == 'semua'){
          return this.items
        } else {
          return this.items.filter(item => item.categories === this.selectCategory )
          }
      },
      ExportToExcel(type, fn, dl) {
       var elt = document.getElementById('tbl_exporttable_to_xls');
       // eslint-disable-next-line no-undef
       var wb = XLSX.utils.table_to_book(elt, { sheet: "sheet1" });
       return dl ?
         // eslint-disable-next-line no-undef
         XLSX.write(wb, { bookType: type, bookSST: true, type: 'base64' }):
         // eslint-disable-next-line no-undef
         XLSX.writeFile(wb, fn || (this.pageTitle+'.' + (type || 'xlsx')));
       },
       async getData() {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:8000/pembelian_head', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            const data = await response.json()
            this.items = data
          }
          catch (error) {
            console.log(error);
          }
       },
       async getDetail() {
        try {
            const token = localStorage.getItem('token')
            const response = await fetch('http://localhost:8000/pembelian_detail', {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            const data = await response.json()
            this.details = data
          }
          catch (error) {
            console.log(error);
          }
       }
    },
    mounted() {
      this.getData(),
      this.getDetail()
    },

  }

  const date = ref();
    // For demo purposes assign range from the current date
    onMounted(() => {
      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      date.value = [startDate, endDate];

    })

</script>

<template>
  
  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>

  <v-container>
    <v-row no-gutters class="bg-white align-center pa-4 mb-3 rounded-lg">
      <v-responsive class="overflow-visible me-2 w-100" max-width="400">
        <div class="d-flex align-start w-100">
          <div class="d-flex align-center w-100">
            <!-- TIPE DOKUMEN -->
            <div class="w-100">
              <v-label class="text-body-2 text-wrap">Tipe Dokumen</v-label>
              <v-select
                :items="category"
                v-model="selectCategory"
                density="compact"
                variant="solo"
                class="text-blue-darken-4 rounded-select me-2"
                single-line
                hide-details
              ></v-select>
            </div>
            <!-- PERIODE -->
            <div class="w-100">
              <v-label v-label class="text-body-2 pe-7">Periode</v-label>
              <VueDatePicker v-model="date" range :enable-time-picker="false" calendar-class-name="dp-custom-calendar"/>
            </div>
          </div>
        </div>
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" max-width="400">
          <div class="d-flex align-center pt-6">
            <div class="w-100 d-flex align-center">
              <!-- SEARCH -->
              <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                variant="solo"
                class="text-blue-darken-4 rounded-select me-2"
                single-line
                hide-details
              ></v-text-field>
  
              <!-- ADD DATA -->
              <ScreenDialog :itemDetail="itemDetail" :datatext="datatext" :btn="btn" :headDetails="headDetails" :details="details" :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon" :pageTitle="pageTitle"/>
              
              <!-- EXPORT DATA   -->
              <v-btn
                color="indigo-darken-1"
                icon="mdi-download"
                class="rounded-lg ms-2"
                variant="tonal"
                size="small"
                @click="ExportToExcel('xlsx')"
            ></v-btn>
          </div>
          </div>
      </v-responsive>
      </v-row>
        <!-- EDIT DATA -->
        <v-sheet class="pt-5 rounded-lg">
          <v-data-table
              id="tbl_exporttable_to_xls" 
              :headers="headers"
              :items="items"
              :search="search"
              :hover="true"
              :fixed-header="true"
              density="comfortable"
              class="text-body-2 py-3 px-5 rounded-select"
              height="400"
              >
              <!-- dialog actions -->
              <!-- eslint-disable-next-line vue/valid-v-slot -->
              <template v-slot:item.actions="{item}">
                <ScreenDialog :itemDetail="itemDetail" :item="item" :pageTitle="pageTitle" :btn="btn" :headDetails="headDetails" :details="details" :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha" :actIcon="actIcon" :disable="true"/>
              </template>
            </v-data-table>
        </v-sheet>
  </v-container>

</template>

<style lang="scss">
.v-data-table-header__content {
  text-align: center;
}

.dp__main {
    border-radius: 7px;
    padding-bottom: 2px;
    border: 1px solid #273d9e !important;
  }

</style>