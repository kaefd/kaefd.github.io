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
        checkStatus: 'menunggu',
        dialog2: false,
        pageTitle: 'PENGIRIMAN BARANG',
        selectCategory: 'semua',
        btnTitle: 'Tambah Data',
        btn: 'Tambah Barang',
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
          { title: 'No Pengiriman', key: 'nosend'},
          { title: 'Tgl Pengiriman', key: 'datesend' },
          { title: 'Pelanggan', key: 'customer' },
          { title: 'Tujuan Bongkar', key: 'tbongkar' },
          { title: 'Supir', key: 'driver' },
          { title: 'Polisi', key: 'police' },
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
        ],
        datatext: [
            { name: 'No Pengiriman', key: 'nosend', type: 'text' },
            { name: 'Tgl Pengiriman', key: 'tglsend', type: 'date' },
            { name: 'Pelanggan', key: 'customer', type: 'select' },
            { name: 'Tujuan Bongkar', key: 'tbongkar', type: 'select' },
            { name: 'Supir', key: 'driver', type: 'text' },
            { name: 'Polisi', key: 'police', type: 'text' },
        ],

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
          <!-- date field -->
          <v-div class="d-flex align-center">
            <v-label class="pe-2">Tanggal</v-label>
            <VueDatePicker v-model="date" range :enable-time-picker="false" class="w-50"/>
          </v-div>
        </div>
      </v-responsive>
      <v-responsive cols="6" xs="4">
          <div class="d-flex pt-5 pb-5 align-center float-lg-right float-sm-left w-50">
          
            <!-- search field -->
          <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                variant="outlined"
                class="text-blue-darken-4 me-2"
                hide-details
          ></v-text-field>

            <!-- add data -->
            <v-div class="d-flex">
              <ScreenDialog :pageTitle="pageTitle" :btn="btn" :headDetails="headers" :details="items" :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon" :datatext="datatext"/>
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
            <ScreenDialog :headDetails="headers" :item="item" :details="items" :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha" :actIcon="actIcon" :disable="true"/>
            </template>
          </v-data-table>
  </v-container>

</template>
