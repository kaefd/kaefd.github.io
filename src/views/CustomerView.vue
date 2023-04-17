<script setup>
import TableVue from '../components/TableVue.vue';
import DialogCard from '../components/DialogCard.vue';
import NavDrawers from '../components/NavDrawers.vue';
import AppBar from '../components/AppBar.vue';

</script>
<script>
  export default {
    components: {
    TableVue, DialogCard, NavDrawers, AppBar
    
},
    data () {
      return {
        drawer: null,
        pageTitle: 'DATA PELANGGAN',
        search: '',
        alpha: 1,
        actIcon: [
          { text: 'Tambah Data', icon: 'mdi-plus', color: 'indigo-darken-1', variant: 'tonal' },
          { text: 'Edit Data', icon: 'mdi-dots-vertical', color: 'grey-darken-1', variant: 'text' },
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
          { title: 'Kode Pelanggan', key: 'custCode'},
          { title: 'Nama', key: 'custName' },
          { title: 'Alamat', key: 'address' },
          { title: 'NPWP', key: 'npwp' },
          { title: '', key: 'actions', sortable: false},
        ],
        items: [
          {
            custCode: '6689789',
            custName: 159,
            address: 6.0,
            npwp: 24,
          },
          {
            custCode: '45654645',
            custName: 375,
            address: 0.0,
            npwp: 94,
          },
          {
            custCode: '6689789',
            custName: 518,
            address: 26.0,
            npwp: 65,
          },
          {
            custCode: '564564564',
            custName: 262,
            address: 16.0,
            npwp: 23,
          },
          {
            custCode: '65646464',
            custName: 356,
            address: 16.0,
            npwp: 49,
          },
          {
            custCode: '6689789',
            custName: 237,
            address: 9.0,
            npwp: 37,
          },
          {
            custCode: '6689789',
            custName: 392,
            address: 0.2,
            npwp: 98,
          },
        ],
      }
    },
  }
</script>
<template>
  <NavDrawers v-model="drawer"/>
  <AppBar @click.stop="drawer = !drawer" :pageTitle="pageTitle"/>
  <v-container>
    <v-row no-gutters class="bg-white align-center justify-between px-4 my-1 mb-3 rounded-lg">
    <v-responsive class="d-flex me-2" max-width="300" cols="6" xs="4">
      <div class="d-flex mt-5">
        <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              class="text-blue-darken-4"
              variant="outlined"
            ></v-text-field>
      </div>
    </v-responsive>
    <v-responsive cols="6" xs="4">
        <div class="d-flex float-right">
          <!-- add data -->
            <DialogCard :screen="400" :iTitle="actIcon[0].text" :btncolor="actIcon[0].color" :icon="actIcon[0].icon" :iVariant="actIcon[0].variant" :headers="headers" :items="items" :category="category"  :alpha="alpha"/>
            <v-btn
            color="indigo-darken-1"
            icon="mdi-download"
            class="rounded-lg ms-2"
            variant="tonal"
            size="small"
          ></v-btn>
        </div>
    </v-responsive>
    </v-row>
    <!-- edit -->
    <TableVue :screen="400"  :headers="headers" :items="items" :search="search" :category="category" :iTitle="actIcon[1].text" :btncolor="actIcon[1].color" :icon="actIcon[1].icon" :iVariant="actIcon[1].variant" :alpha="alpha"/>
  </v-container>
  </template>
<style>

.w-30 {
  max-width: 32vw;
}
.w-15 {
  width: 15vw !important;
}
</style>