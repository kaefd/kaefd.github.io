<script setup>
import TableVue from '../components/TableVue.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { ref, onMounted } from 'vue';

</script>

<script>

  export default {
    components: {
    TableVue, AppBar, NavDrawers,VueDatePicker
    },
    props:['actIcon'],
    data () {
      return {
        drawer: null,
        search: '',
        date: '',
        pageTitle: 'LAPORAN PEMASUKAN BARANG',
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
          { title: 'Nomor Pemasukan', key: 'numIn'},
          { title: 'Tanggal Masuk', key: 'dateIn' },
          { title: 'Tipe Dokumen', key: 'doctype' },
          { title: 'No Dokumen', key: 'docNumb' },
          { title: 'Supplier', key: 'supplier' },
          { title: 'Mata Uang', key: 'matauang' },
          { title: 'Total Nilai', key: 'total' },
          { title: 'Total Nilai(Rp)', key: 'rp' },
          { title: '', key: 'actions', sortable: false},
        ],
        items: [
          {
            numIn: 1,
            dateIn: 159,
            doctype: 6.0,
            docNumb: 24,
            supplier: 4.0,
            matauang: 'idr',
            total: 2,
            rp: 14000
          },
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
    <v-row no-gutters class="bg-white align-center pa-4 mb-3 rounded-lg">
      <v-responsive class="overflow-visible me-2 w-100"  max-width="400">
        <div class="d-flex w-100">
          <!-- TIPE DOKUMEN -->
          <v-div class="w-100">
            <v-label class="text-body-2 pe-7">Tipe Dokumen</v-label>
            <v-select
              label="Select"
              :items="category"
              v-model="selectCategory"
              density="compact"
              variant="solo"
              class="text-blue-darken-4 rounded-select me-2"
              single-line
              hide-details
            ></v-select>
          </v-div>
          <!-- PERIODE -->
          <v-div class="w-100">
            <v-label v-label class="text-body-2 text-blue-darken-4 pe-7">Periode</v-label>
            <VueDatePicker v-model="periode" range :enable-time-picker="false" hide-offset-dates max-range="30" :max-date="new Date()"  @update:v-model="periode" input-class-name="dp-custom-input"/>
          </v-div>
        </div>
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" max-width="400">
          <div class="d-flex align-center  pt-6">
          <!-- SEARCH -->
          <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                variant="solo"
                class="text-blue-darken me-2 rounded-select w-50"
                single-line
                hide-details
          ></v-text-field>
              <v-btn
              color="indigo-darken-1"
              icon="mdi-download"
              class="rounded-lg"
              variant="tonal"
              size="small"
              @click="ExportToExcel('xlsx')"
            ></v-btn>
          </div>
      </v-responsive>
      </v-row>
      <!-- edit data -->
        <TableVue id="tbl_exporttable_to_xls" :screen="400"  :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha" />
  </v-container>

</template>
