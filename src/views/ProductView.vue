<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import ScreenDialog2 from '../components/ScreenDialog2.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { ref, onMounted } from 'vue';

</script>

<script>

  export default {
    components: {
    ScreenDialog2, AppBar, NavDrawers,VueDatePicker, VDataTable
    },
    props:['actIcon'],
    data () {
      return {
        drawer: null,
        search: '',
        date: '',
        dialog2: false,
        pageTitle: 'PRODUKSI BARANG',
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
          { title: 'Nomor Produksi', key: 'noProduct'},
          { title: 'Tgl Produksi', key: 'tglProduct' },
          { title: 'Kode Group', key: 'codeGroup' },
          { title: 'Bahan Baku', key: 'bhnbaku' },
          { title: 'Jumlah Bahan Baku', key: 'jmlbaku' },
          { title: 'Barang Jadi', key: 'brgjadi' },
          { title: 'Jumlah Barang Jadi', key: 'jmljadi' },
          { title: '', key: 'actions', sortable: false},
        ],
        items: [
          {
            noProduct: 1,
            tglProduct: '2023-03-12',
            codeGroup: 'DJJVE7',
            bhnbaku: 24,
            jmlbaku: 40,
            brgjadi: 33,
            jmljadi: 100,
          },
        ],
        headItem: [
            { title: 'No', key: 'no' },
            { title: 'Kode Barang', key: 'codeItem' },
            { title: 'Nama Barang', key: 'nameItem' },
            { title: 'Jumlah', key: 'jumlah' },
            { title: 'Satuan', key: 'satuan' },
            { title: '', key: 'actions', sortable: false },
        ],
        fastItem: [
            {
             no: 1,
             codeItem: '8789G',
             nameItem: 'Galvalum',
             jumlah: 1,
             satuan: 'KG',
            }
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
      <v-responsive class="overflow-visible me-2 w-100" max-width="700" max-height="70" cols="6" xs="4">
        <!-- PERIODE -->
        <div class="d-flex align-center">
          <v-label class="text-body-2 pe-3">Periode</v-label>
          <VueDatePicker v-model="date" :enable-time-picker="false" range/>
        </div>
      </v-responsive>
      <v-responsive cols="6" xs="4">
          <div class="d-flex align-center float-lg-right float-sm-left w-75">
          <!-- SEARCH -->
          <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                variant="outlined"
                class="text-blue-darken-4 pt-5 me-2"
          ></v-text-field>

            <!-- TAMBAH DATA -->
            <ScreenDialog2 :headers="headItem" :items="items" :fastItem="fastItem" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :alpha="alpha" :actIcon="actIcon"/>
            <!-- EXPORT DATA -->
            <v-btn
              color="indigo-darken-1"
              icon="mdi-download"
              class="rounded-lg ms-2"
              variant="tonal"
              size="small"
              @click="ExportToExcel('xlsx')"
            ></v-btn>
          </div>
      </v-responsive>
      </v-row>
        <!-- EDIT DATA -->
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
        <!-- <TableVue :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="this.actIcon[1].text" :btncolor="this.actIcon[1].color" :icon="this.actIcon[1].icon" :iVariant="this.actIcon[1].variant" :alpha="alpha" /> -->
  </v-container>

</template>
