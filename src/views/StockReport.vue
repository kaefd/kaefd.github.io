<script setup>
import TableVue from '../components/TableVue.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';

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
          { title: 'Kategori Barang', key: 'categories'},
          { title: 'Kode Barang', key: 'codeItem' },
          { title: 'Nama Barang', key: 'name' },
          { title: 'HS Kode', key: 'hscode' },
          { title: 'Satuan', key: 'pcs' },
          { title: 'Stok Akhir', key: 'totalStock' },
          { title: '', key: 'actions', sortable: false},
        ],
        items: [
          {
            categories: 'Bahan Baku',
            codeItem: 'CAG',
            name: 'Coil Atap Galvalum',
            hscode: '7225900',
            pcs: 'KG',
            totalStock: 7888979,
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
      
    }
  }
</script>

<template>
    <NavDrawers v-model="drawer"/>
    <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>

    <v-container>
    <v-row no-gutters class="bg-white align-center px-4 pb-lg-0 pb-4 my-1 mb-3 rounded-lg">
      <v-responsive class="d-flex me-2 w-100" max-width="400" max-height="70" cols="6" xs="4">
        <div class="d-flex mt-4">
          <v-select
            label="Tipe Dokumen"
            :items="category"
            v-model="selectCategory"
            density="compact"
            variant="outlined"
            class="text-blue-darken-4 me-2 w-25"
            single-line
          ></v-select>
          <v-select
            label="Tipe Dokumen"
            :items="category"
            v-model="selectCategory"
            density="compact"
            variant="outlined"
            class="text-blue-darken-4 me-2 w-25"
            single-line
          ></v-select>
        </div>
      </v-responsive>
      <v-responsive cols="6" xs="4">
          <div class="d-flex align-center float-lg-right float-sm-left w-50">
            <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                variant="outlined"
                class="text-blue-darken-4 mt-5"
            ></v-text-field>

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
      <!-- edit data -->
        <TableVue id="tbl_exporttable_to_xls"  :screen="400"  :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha"/>
  </v-container>


</template>