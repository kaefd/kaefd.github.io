<script setup>
import TableVue from '../components/TableVue.vue';
import DialogCard from '../components/DialogCard.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';

</script>
<script>
  export default {
    components: {
    TableVue, DialogCard, AppBar, NavDrawers
    },
    props:['page','actIcon'],
    data () {
      return {
        drawer: null,
        search: '',
        pageTitle: 'DATA BARANG',
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
          { title: '', key: 'actions', sortable: false},
        ],
        items: [
          {
            categories: 'Bahan Baku',
            codeItem: 159,
            name: 6.0,
            hscode: 24,
            pcs: 4.0,
          },
          {
            categories: 'Bahan Penolong',
            codeItem: 375,
            name: 0.0,
            hscode: 94,
            pcs: 0.0,
          },
          {
            categories: 'Bahan Baku',
            codeItem: 518,
            name: 26.0,
            hscode: 65,
            pcs: 7,
          },
          {
            categories: 'Bahan  Setengah Jadi',
            codeItem: 262,
            name: 16.0,
            hscode: 23,
            pcs: 6.0,
          },
          {
            categories: 'Barang Sisa (Scrap)',
            codeItem: 356,
            name: 16.0,
            hscode: 49,
            pcs: 3.9,
          },
          {
            categories: 'Bahan Baku',
            codeItem: 237,
            name: 9.0,
            hscode: 37,
            pcs: 4.3,
          },
          {
            categories: 'Bahan Baku',
            codeItem: 392,
            name: 0.2,
            hscode: 98,
            pcs: 0,
          },
          {
            categories: 'Bahan Baku',
            codeItem: 305,
            name: 3.7,
            hscode: 67,
            pcs: 4.3,
          },
          {
            categories: 'Bahan Baku',
            codeItem: 408,
            name: 3.2,
            hscode: 87,
            pcs: 6.5,
          },
          {
            categories: 'Bahan Baku',
            codeItem: 452,
            name: 25.0,
            hscode: 51,
            pcs: 4.9,
          },
          {
            categories: 'Bahan Baku',
            codeItem: 159,
            name: 6.0,
            hscode: 24,
            pcs: 4.0,
          },
          {
            categories: 'Bahan Penolong',
            codeItem: 375,
            name: 0.0,
            hscode: 94,
            pcs: 0.0,
          },
          {
            categories: 'Bahan Baku',
            codeItem: 518,
            name: 26.0,
            hscode: 65,
            pcs: 7,
          },
          {
            categories: 'Bahan  Setengah Jadi',
            codeItem: 262,
            name: 16.0,
            hscode: 23,
            pcs: 6.0,
          },
          {
            categories: 'Barang Sisa (Scrap)',
            codeItem: 356,
            name: 16.0,
            hscode: 49,
            pcs: 3.9,
          },
          {
            categories: 'Bahan Baku',
            codeItem: 237,
            name: 9.0,
            hscode: 37,
            pcs: 4.3,
          },
          {
            categories: 'Bahan Baku',
            codeItem: 392,
            name: 0.2,
            hscode: 98,
            pcs: 0,
          },
          {
            categories: 'Bahan Baku',
            codeItem: 305,
            name: 3.7,
            hscode: 67,
            pcs: 4.3,
          },
          {
            categories: 'Bahan Baku',
            codeItem: 408,
            name: 3.2,
            hscode: 87,
            pcs: 6.5,
          },
          {
            categories: 'Bahan Baku',
            codeItem: 452,
            name: 25.0,
            hscode: 51,
            pcs: 4.9,
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
          <v-text-field
                v-model="search"
                density="compact"
                label="Search"
                variant="outlined"
                class="text-blue-darken-4"
              ></v-text-field>
        </div>
      </v-responsive>
      <v-responsive cols="6" xs="4">
          <div class="d-flex float-lg-right float-sm-left">
            <!-- add data -->
            <DialogCard :screen="400" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :headers="headers" :items="items" :category="category" :alpha="alpha"/>
              <v-btn
              color="indigo-darken-1"
              icon="mdi-download"
              class="rounded-lg ms-2"
              variant="tonal"
              size="small"
              @click="exportExcel()"
            ></v-btn>
          </div>
      </v-responsive>
      </v-row>
      <!-- edit data -->
        <TableVue :screen="400"  :headers="headers" :items="selected()" :search="search" :category="category" :selectCategory="selectCategory" :iTitle="this.actIcon[1].text" :btncolor="this.actIcon[1].color" :icon="this.actIcon[1].icon" :iVariant="this.actIcon[1].variant" :alpha="alpha"/>
  </v-container>
  </template>
<style>

.w-30 {
  max-width: 32vw;
}
.w-20 {
  width: 20vw !important;
}
.vh-75 {
  height: 75vh ;
}

</style>