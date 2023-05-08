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
    props:['page','actIcon'],
    data () {
      return {
        drawer: null,
        search: '',
        date: '',
        checkStatus: 'menunggu',
        dialog2: false,
        pageTitle: 'PENGELUARAN BARANG',
        selectCategory: 'semua',
        btnTitle: 'Tambah Data',
        btn: 'Tambah Barang',
        cardTitle: 'Detail Barang',
        fullscreen: 'fullscreen',
        alpha: null,
        datatext: [
            { name: 'No Pengeluaran', key: 'nokeluar', type: 'text' },
            { name: 'Tgl Keluar', key: 'tgkeluar', type: 'date' },
            { name: 'Pelanggan', key: 'customer', type: 'select' },
            { name: 'Kode Group', key: 'codegroup', type: 'select' },
            { name: 'Tipe Dokumen', key: 'doctype', type: 'select' },
            { name: 'No Dokumen', key: 'doctno', type: 'text' },
            { name: 'Tgl Dokumen', key: 'doctdate', type: 'date' },
        ],

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
          { title: 'Nomor Pengeluaran', key: 'numOut'},
          { title: 'Tanggal Keluar', key: 'dateOut' },
          { title: 'Tipe Dokumen', key: 'doctype' },
          { title: 'No Dokumen', key: 'docNumb' },
          { title: 'Pelanggan', key: 'pelanggan' },
          { title: 'Kode Group', key: 'codeGroup' },
          { title: 'Total Penjualan', key: 'total' },
          { title: '', key: 'actions', sortable: false},
        ],
        items: [],
        headDetails:[
          {title: 'Kode Barang', key: 'codeItem' },
          {title: 'Nama Barang', key: 'nameItem' },
          {title: 'HS Code', key: 'hscode' },
          {title: 'Jumlah', key: 'jumlah' },
          {title: 'Jumlah Diterima', key: 'diterima' },
          {title: 'Satuan', key: 'satuan' },
          {title: 'Total Nilai', key: 'totalnilai' },
          {title: '', key: 'actions', sortable: false },
        ],

        details: [
          {
            codeItem : 'AG',
            nameItem : 'Atap Galvalum',
            hscode : '4345466',
            jumlah: 1,
            diterima: 1,
            satuan: 1,
            totalnilai: 1
          }
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
      }
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
          <!-- TIPE DOKUMEN -->
          <div class="w-100">
            <v-label class="text-body-2 text-wrap2">Tipe Dokumen</v-label>
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
          <v-div class="w-100">
            <v-label v-label class="text-body-2 text-blue-darken-4 pe-7">Periode</v-label>
            <VueDatePicker v-model="periode" range :enable-time-picker="false" hide-offset-dates max-range="30" :max-date="new Date()"  @update:v-model="periode" input-class-name="dp-custom-input"/>
          </v-div>
        </div>
      </v-responsive>
      <v-responsive class="me-md-0 ms-md-auto ms-0 me-auto w-100" max-width="400">
          <div class="d-flex align-center">
          
          <!-- status  -->
          <v-div>
            <v-label class="text-body-2">Status</v-label>
            <v-select
              :items="status"
              v-model="checkStatus"
              density="compact"
              variant="solo"
              class="text-blue-darken-4 rounded-select me-2"
              single-line
              hide-details
            ></v-select>
          </v-div>
          
          <!-- add data -->
          <v-div class="d-flex pt-6 w-100">
              <!-- SEARCH -->
              <v-text-field
                    v-model="search"
                    density="compact"
                    label="Search"
                    variant="solo"
                    class="text-blue-darken-4 rounded-select me-2"
                    hide-details
                    single-line
              ></v-text-field>
              <ScreenDialog :datatext="datatext" :pageTitle="pageTitle" :btn="btn" :headDetails="headDetails" :details="details" :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon"/>
                <v-btn
                color="indigo-darken-1"
                icon="mdi-download"
                class="rounded-lg ms-2"
                variant="tonal"
                size="small"
                @click="ExportToExcel('xlsx')"
              ></v-btn>
            </v-div>
          </div>
      </v-responsive>
      </v-row>
      <!-- edit data -->
        <!-- edit data -->
        <v-data-table
            id="tbl_exporttable_to_xls" 
            :headers="headers"
            :items="items"
            :search="search"
            :hover="true"
            :fixed-header="true"
            style="cursor: pointer"
            density="comfortable"
            class="text-body-2 py-3 px-5"
            height="400"
            >
            <!-- dialog actions -->
             <!-- eslint-disable-next-line vue/valid-v-slot -->
            <template v-slot:item.actions="{item}">
            <ScreenDialog :headDetails="headDetails" :item="item" :details="details" :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha" :actIcon="actIcon" :disable="true"/>
            </template>
          </v-data-table>
  </v-container>

</template>
