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
        items: [
          {
            // numOut: 1,
            // dateOut: 159,
            // doctype: 6.0,
            // docNumb: 24,
            // pelanggan: 4.0,
            // codeGroup: 'idr',
            // total: 2,
            // rp: 14000
          },
        ],
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
    <v-row no-gutters class="bg-white align-center px-4 pb-lg-0 pb-4 my-1 mb-3 rounded-lg">
      <v-responsive class="overflow-visible me-2 w-100 " max-width="600" max-height="70" cols="6" xs="4">
        <div class="d-flex pt-4 pb-5 align-start">
          <!-- select tipe dokumen -->
          <v-label class="my-auto me-1 text-wrap text-body-2">Tipe Dokumen</v-label>
          <v-select
            :items="category"
            v-model="selectCategory"
            density="compact"
            variant="outlined"
            class="text-blue-darken-4 me-2 w-25"
            single-line
            hide-details
          ></v-select>
          <!-- date field -->
          <v-div class="d-flex align-center">
            <v-label class="pe-1">Tanggal</v-label>
            <VueDatePicker v-model="date" range :enable-time-picker="false" class="w-50"/>
          </v-div>
        </div>
      </v-responsive>
      <v-responsive cols="6" xs="4">
          <div class="d-flex pt-5 pb-5 align-center float-lg-right float-sm-left w-100">
          
          <!-- status  -->
          <v-div class="d-flex align-center ms-1">
            <v-label>Status</v-label>
            <v-select
              :items="status"
              v-model="checkStatus"
              density="compact"
              variant="outlined"
              class="text-blue-darken-4 mx-1"
              single-line
              hide-details
            ></v-select>
          </v-div>
            <!-- search field -->
          <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                variant="outlined"
                class="text-blue-darken-4 me-3"
                hide-details
          ></v-text-field>

            <!-- add data -->
            <v-div class="d-flex">
              <ScreenDialog :datatext="datatext" :pageTitle="pageTitle" :btn="btn" :headDetails="headDetails" :details="details" :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon"/>
                <v-btn
                color="indigo-darken-1"
                icon="mdi-download"
                class="rounded-lg ms-1"
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
