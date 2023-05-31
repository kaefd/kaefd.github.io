<script setup>
import TableVue from '../components/TableVue.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';
import api from '../api';

</script>

<script>
  export default {
    components: {
    TableVue, AppBar, NavDrawers
    },
    props:['page','actIcon'],
    data () {
      return {
        drawer: null,
        search: '',
        pageTitle: 'LAPORAN STOK BARANG',
        selectCategory: 'semua',
        btnTitle: 'Tambah Data',
        cardTitle: 'Detail Barang',
        alpha: 1,
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
          { title: 'Kategori Barang', key: 'kategori_barang'},
          { title: 'Kode Barang', key: 'kode_barang' },
          { title: 'Nama Barang', key: 'nama_barang' },
          { title: 'HS Kode', key: 'hs_code' },
          { title: 'Satuan', key: 'satuan' },
          { title: 'Stok Akhir', key: 'stok_akhir' },
          { title: '', key: 'actions', sortable: false},
        ],
        items: '',
        barang: '',
      }
    },
    methods: {

      getData() {
        api.getData('/group_barang')
        .then(response => {
          this.items = response.data
        })
        .catch(() => {
          window.location.href = '/login'
        })
      },
      getDataBarang() {
        api.getData('/barang?status=true')
        .then(response => {
          this.barang = response.data
        })
        .catch(() => {
          window.location.href = '/login'
        })
      },

      
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
    mounted() {
      this.getData()
      this.getDataBarang()
    }
  }
</script>

<template>
    <NavDrawers v-model="drawer"/>
    <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>

    <v-container>
    <v-row no-gutters class="bg-white align-center pa-4 mb-4 rounded-lg w-100">
      <v-responsive class="d-flex align-center mb-sm-0 mb-3" max-width="400" max-height="70">
        <div class="d-flex w-100">
          <div class="w-100">
            <!-- KATEGORI -->
          <v-label class="text-body-2 text-blue-darken-4">Kategori</v-label>
          <v-select
            :items="categories"
            v-model="selectCategory"
            density="compact"
            variant="tonal"
            class="bg-indigo-lighten-5 text-blue-darken-4 rounded-lg me-2 w-100"
            single-line
            hide-details
          ></v-select>
          </div>
          <div class="w-100">
            <v-label class="text-body-2 text-blue-darken-4">Tipe Dokumen</v-label>
            <v-select
            label="Tipe Dokumen"
            :items="category"
            v-model="selectCategory"
            density="compact"
            variant="tonal"
            class="text-blue-darken-4 ms-2 bg-indigo-lighten-5 me-2 rounded-lg"
            single-line
            hide-details
            ></v-select>
          </div>
        </div>
      </v-responsive>
      <v-responsive class="me-sm-0 ms-sm-auto ms-0 me-auto" min-width="300" max-width="400">
          <div class="d-flex w-100 align-center mt-sm-6 m-0">
            <!-- SEARCH -->
            <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                variant="tonal"
                class="text-blue-darken-4 bg-indigo-lighten-5 me-2 rounded-lg"
                hide-details
                single-line
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
        <TableVue id="tbl_exporttable_to_xls" :barang="barang"  :screen="400"  :headers="headers" :items="items" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha" :laporanstok="true" />
  </v-container>


</template>